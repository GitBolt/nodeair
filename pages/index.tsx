import Image from 'next/image';
import { DefaultHead } from '@/components/Head'
import { Navbar } from '@/components/Navbar'
import { registerWallet } from '@/components/Wallet'
import styles from '@/styles/modules/Index.module.scss'
import ProfileImage from '@/images/profile.svg';

export default function Index() {  
  return (
    <>
      <DefaultHead title={'NodeAir - Have more than just wallet address.'} />
        <Navbar/>
        <main className={styles.index_body}>
          <h1 className={styles.heading}>Customize your wallet, look how you want to be.</h1>
          <p className={styles.description}>Get more than a simple wallet address, customize and share your Solana identity with anyone in minutes.</p>
          <button className={styles.create_profile} onClick={registerWallet}>Create your profile</button>
          <div className={styles.profile_image} ><Image src={ProfileImage} height="600"/></div>
        </main>
    </>
  )
}