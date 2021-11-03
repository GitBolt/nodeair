import Link from 'next/link'
import { registerWallet } from '@/components/Wallet'
import styles from '@/styles/modules/Navbar.module.scss'

export const Navbar = () => {
    return (
      <header className={styles.navbar}>
        <nav>
          <ul className={styles.links}>
            <Link href="/"><a>Home</a></Link>
            <Link href="/"><a>Support</a></Link>
            <Link href="/"><a>Pricing</a></Link>
            <Link href="/"><a>Guide</a></Link>
          </ul>
        </nav>
        <button className={styles.connect_button} onClick={registerWallet}>Connect wallet</button>
      </header>
    )
  }
  
  