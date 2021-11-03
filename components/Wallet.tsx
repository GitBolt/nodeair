export const connectWallet = async () => {
  if ("solana" in window) {
    // @ts-ignore
    const response = await window.solana.connect();
    return response.publicKey;
  }
  window.open("https://phantom.app/", "_blank");
}

export const registerWallet = async () => {
  const { API_URL }: any = process.env;
  const pubKey = await connectWallet();
  const data = {
      public_key: pubKey.toString()
    }

  fetch(`${API_URL}/register`, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST"
    })
    .then((res) => console.log(res.json())).catch((err) => console.log(err))
  }
