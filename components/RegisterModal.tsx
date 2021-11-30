import { useState, useEffect } from 'react'
import { registerWallet } from '@/components/Wallet'
import { PriceDropdown } from '@/components/PriceDropdown'
import styles from '@/styles/modules/RegisterModal.module.scss'
import Dollar from '@/images/Dollar.svg'
import Invoice from '@/images/Invoice.svg'
import Image from 'next/image'

export const RegisterModal = (props: any) => {
  const pricing: any = {
    "Basic - $2/year": 2,
    "Pro - $5/year": 5,
    "Basic - $5": 5,
    "Pro - $15": 15
  }

  const [name, setName] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  const [selectedPlan, setSelectedPlan] = useState<string>("Basic - $2/year");

  useEffect(() => { setAmount(pricing[selectedPlan]) })

  const handleclose = () => {
    props.setModalIsOpen(false)
  }

  return (
    <div className={styles.nameModal}>
      <div className={styles.main}>
        <span className={styles.close} onClick={handleclose}>&times;</span>
        <div className={styles.changePlan}>
          <Image src={(selectedPlan.endsWith("/year")) ? Dollar : Invoice} width="40" height="40" alt="pricing" />
          <h1>{selectedPlan}</h1>
          <PriceDropdown setSelectedPlan={setSelectedPlan} />
        </div>
        <hr />
        <form className={styles.form} onSubmit={(e) => registerWallet(e, name, amount)}>
          <p>Get started by entering your profile name and clicking that shiny button below. Feel free to change plan above.</p>
          <h1>Enter your profile name</h1>
          <input onChange={e => setName(e.target.value)} placeholder="Name" type="text"></input>
          <button type="submit" disabled={!name ? true : false}>Create profile</button>
        </form>
      </div>
    </div>
  )
}

