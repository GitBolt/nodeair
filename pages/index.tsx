import { DefaultHead } from '@/components/Head'
import { Navbar } from '@/components/Navbar'
import styles from '@/styles/modules/Index.module.scss'

export default function Index() {  
  return (
    <>
      <DefaultHead title={'NodeAir - Have more than just wallet address.'} />
        <Navbar/>
        <h1 className={styles.heading}>Customize your wallet, look how you want to be.</h1>
        <p className={styles.description}>Get more than a simple wallet address, customize and share your Solana identity with anyone in minutes.</p>
    </>
  )
}