import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js'
import Router from 'next/router';

export const connectWallet = async (showToast = true, onlyIfTrusted = false, returnString = true) => {
  if ("solana" in window) {
    let res
    try {
      res = await window.solana.connect({ onlyIfTrusted: onlyIfTrusted })
    } catch (e: any){
      if (e.code != 4001) {
        toast.error("Unexpected error, try contacting support.")
      }
      return
    }
    if (showToast) { toast.success('Connected to wallet!'); }
    if (returnString) {
      return res.publicKey.toString();
    }
    return res.publicKey;
  }
  window.open("https://phantom.app/", "_blank");
}


export const usdToSol = async (usd: number) => {
  let price;
  const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT")
  price = await res.json()
  price = price.price
  return usd / price
}


export const sendPayment = async (to: PublicKey, usd: number) => {
  const sol = await usdToSol(usd)

  const publicKey = await connectWallet(false, false, false);
  const network = process.env.SOL_NETWORK || "https://api.devnet.solana.com"
  const connection = new Connection(network);
  const transaction = new Transaction()
    .add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: to,
        lamports: Number(sol) * 1000000000
      })
    );
  const { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = publicKey;
  try {
    const signedTransaction = await window.solana.signTransaction(transaction)
    const txid = await connection.sendRawTransaction(signedTransaction.serialize());
    const loadingToastId = toast.loading("Confirming transaction, this will take few seconds...")
    await connection.confirmTransaction(txid);
    toast.dismiss(loadingToastId)
    toast.info("Transaction complete!")
    return txid
  } catch (error: any) {
    if (error.code == 4001) {
      toast.error("Transaction rejected")
    } else {
      console.log("e", error)
      toast.error("Insufficient balance")
    }

    return false
  }
}


export const registerWallet = async (event: any, username: string, usd: number) => {
  event.preventDefault();

  const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
  const pubKey = await connectWallet(false, false)
  const checkData = {
    public_key: pubKey,
    username: username
  }
  fetch(`${API_URL}/checks/taken_fields`, {
    body: JSON.stringify(checkData),
    headers: { "Content-Type": "application/json" },
    method: "POST"
  })
    .then(async res => {
      if (res.ok) {
        const payment = await sendPayment(new PublicKey("B3BhJ1nvPvEhx3hq3nfK8hx4WYcKZdbhavSobZEA44ai"), usd)
        if (true) {
          const data = {
            public_key: pubKey,
            username: username,
            signature: payment
          }
          fetch(`${API_URL}/register`, {
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
          })
            .then(async res => {
              if (res.ok) {
                Router.push("/dashboard")
              } else {
                const json = await res.json()
                toast.error(json)
              }
            })
        }
      } else {
        res.json().then(json => {
          if (json.error == "Public key already registered") {
            toast.info(`${json.error}\nRedirecting to dashboard...`, { autoClose: 3000, toastId: "to_prevent_duplication" })
            localStorage.setItem("username", json.username)
            setTimeout(() => Router.push("/dashboard"), 3000)

          } else {
            toast.error(json.error, { toastId: "to_prevent_duplication" })
          }

        })
      }
    })
}


export const signMessage = async (e: any) => {
  e.preventDefault();
  const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
  const publicKey = await connectWallet(false, false);
  const res = await fetch(`${API_URL}/signature/create`, {
    body: JSON.stringify({ public_key: publicKey }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (res.ok) {
    const json = await res.json();
    const message = new TextEncoder().encode(json.hash);
    const sig = await window.solana.signMessage(message, "utf8");
    return sig.signature;
  } else {
    toast.error("You are being rate limited");
  }

};



