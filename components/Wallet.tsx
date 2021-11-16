import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';


export const connectWallet = async () => {
  if ("solana" in window) {
    const res = await window.solana.connect();
    const button = document.querySelector(".Navbar_connect_button__32n_j")
    if (button != null) {
      const pubKey = res.publicKey.toString()
      let start =pubKey.substring(0, 5)
      let end = pubKey.substring(39, 44)
      button.innerHTML = start + "..." + end
    }
    toast.success('Connected to wallet!');
      return res.publicKey;
  } 
    window.open("https://phantom.app/", "_blank");
  }


export const usdToSol = async (usd: number ) => {
  let price;
  const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT")
  price = await res.json()
  price = price.price 
  return usd/price
}


export const sendPayment = async (to: PublicKey, usd: number) => {
  const sol = await usdToSol(usd)
  console.log("Converted SOL: ", sol)

  const publicKey = await connectWallet();
  const network = "https://api.devnet.solana.com";
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
    const signedTransaction = await window.solana.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTransaction.serialize());
    const loadingToastId = toast.loading("Confirming transaction, this will take a few seconds...")
    await connection.confirmTransaction(txid);
    toast.dismiss(loadingToastId)
    toast.info("Transaction complete!")

  } catch (error) {
    toast.error("Transaction rejected")
  }
}


export const registerWallet = async (event: any, username: string, usd: number) => {
  console.log("Initial USD: ", usd)
  event.preventDefault();

  const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
  console.log(API_URL)
  let pubKey = window.solana._publicKey
  if (pubKey == null) {
    pubKey = connectWallet()
  }
  
  const data = {
      public_key: pubKey.toString(),
      username: username
    }

  fetch(`${API_URL}/register`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST"
    })
    .then(async res => {
      if(res.ok) {
        await sendPayment(new PublicKey('B3BhJ1nvPvEhx3hq3nfK8hx4WYcKZdbhavSobZEA44ai'), usd)
        toast.success("Profile registered successfully");     
      } else {
        res.json().then(json => toast.error(json.error))
      }
    })
    .catch((err) => console.log("Error at register", err))
  }
