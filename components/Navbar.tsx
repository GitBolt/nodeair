import Link from 'next/link'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { connectWallet } from '@/components/Wallet'
import styles from '@/styles/modules/Navbar.module.scss'


export const Navbar = (props: any) => {
  const [publicKey, setPublicKey] = useState<string>(props.publicKey)

  const handleButtonChange = async() => {
    const pubKey = await connectWallet(publicKey ? false : true)
    setPublicKey(pubKey.replace(pubKey.slice(5,40), "..."))
    props.setCheckUserOnConnect(true)
  }
  
  useEffect(() => {
    setTimeout(() => {
      const pubKey = window.solana._publicKey
      {pubKey ? setPublicKey(pubKey.replace(pubKey.slice(5,40), "...")) : null}
    }, 1000)
  }, [])

  return (
    <header className={styles.navbar}>
      <nav>
        <ul className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="https://discord.gg/94zMschwDW">Support</Link>
          <Link href="https://api.nodeair.io">API</Link>
          {/* <Link href="/">Pricing</Link> */}
        </ul>
      </nav>
      {props.isRegistered?
      <button className={styles.connectButton} onClick={() => Router.push("/dashboard")}><div></div>{publicKey}</button>:
      <button className={styles.connectButton} onClick={() => handleButtonChange()}>{publicKey ? <> <div></div> {publicKey} </> : "Connect wallet"}</button>
      }
    </header>
  )
}

