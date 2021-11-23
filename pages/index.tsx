import Image from 'next/image'
import { useState } from 'react'
import { PageHead } from '@/components/Head'
import { Navbar } from '@/components/Navbar'
import { ToastContainer } from 'react-toastify'
import Dashboard from '@/images/Dashboard.svg'
import Ladder from '@/images/Ladder.svg'
import Curves from '@/images/Curves.svg'
import styles from '@/styles/modules/Index.module.scss'
import { RegisterModal } from '@/components/RegisterModal'


export default function Index() { 
  const [plan, setPlan] = useState(true)
  const [starter, setStarter] = useState(true)
  const [pro, setPro] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const togglePlans = () => {
    setStarter(!starter)
    setPlan(!plan)
    setPro(!pro)
  }
    
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen)
  }

  return (
    <>
      <PageHead title={'NodeAir - Easier, faster & insightful Solana wallet experience.'} />
        <Navbar/>
        <ToastContainer theme="dark" position= "top-center" autoClose={5000} closeOnClick={true} pauseOnHover={false}/>

        <main className={styles.index}>
        <div className={styles.ladderImage}>
              <Image src={Ladder}/>
            </div>
          <div className={styles.left}>
            <h1>Get more out of your Solana wallet.</h1>
            <p>NodeAir let's you create your public wallet profile to find each other easily and get statistics with graphs about your transactions and activity in seconds. </p>
            <button className={styles.button} onClick={toggleModal}>Create your profile</button>
          </div>
          <div className={styles.curves}>
            <Image src={Curves}/>
          </div>
          <hr className={styles.centerSeperator}/>
          
          <div className={styles.right}>
            <div className={styles.one}>
              <h2> <p>1</p> Quick and easy</h2>
              <p>Easily get detailed insights about your transactions and profile in minutes.</p>              
            </div>
            <div className={styles.two}>
              <h2><p>2</p>Affordable and flexible</h2>
              <p>Enjoy your favourite features with affordable and flexible pricing.</p>              
            </div>
            <div className={styles.two}>
              <h2> <p>3</p>Clean and simple UI</h2>
              <p>Get the best experience with beautiful charts and clean dashboard UI.</p>              
            </div>
            <div className={styles.dashboardImage}>
              <Image src={Dashboard} height="400" width="700"/>
            </div>

          </div>
          {modalIsOpen ? <RegisterModal setModalIsOpen={toggleModal} /> : null}
        </main>
    </>
  )
}

