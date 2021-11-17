import Link from 'next/link'
import { connectWallet } from '@/components/Wallet'
import styles from '@/styles/modules/Navbar.module.scss'

export const Navbar = () => {
    return (
      <header className={styles.navbar}>
        <nav>
          <ul className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/">Support</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Guide</Link>
          </ul>
        </nav>
        <button className={styles.connect_button} onClick={() => connectWallet(true)}>Connect wallet</button>
      </header>
    )
  }
  
  