import React, { useState, useEffect } from 'react'
import { PageHead } from '@/components/Head'
import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { connectWallet } from '@/components/Wallet'
import { ViewChart } from '@/components/Charts'

import styles from '@/styles/modules/Dashboard.module.scss'

export default function Dashboard() {
    const [views, setViews] = useState('')
    const API_URL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const fetchData = async() => {
            let public_key = window.solana._publicKey
            if (window.solana._publicKey == null){
                public_key = await connectWallet(false)
            }
            const result = await fetch(API_URL + "/fetch/views/" + public_key.toString())
            const data = await result.json()
            console.log(data)
            setViews(data)
        }
        fetchData()
        }, []);

  return (
    <>
    <PageHead title={'NodeAir - Easier, faster & insightful Solana wallet experience.'} />
    <Navbar/>
    <Sidebar/>
    <div className={styles.dashboard}>
        <div className={styles.chart}>
            <ViewChart chartData={views} />
        </div>
    </div>

    </>
  )
}

