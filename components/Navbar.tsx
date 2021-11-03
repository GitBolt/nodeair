import { connectWallet, registerWallet } from '@/components/Wallet'
import styles from '@/styles/modules/Navbar.module.scss'

export const Navbar = () => {
    return (
      <header className={styles.navbar}>
        <nav>
          <ul className={styles.links}>
            <li><a href="/">Home</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Guide</a></li>
          </ul>
        </nav>
        <button className={styles.connect_button} onClick={registerWallet}>Connect wallet</button>
      </header>
    )
  }
  
  