import Image from 'next/image'
import Search from '@/images/icons/Search.svg'
import styles from '@/styles/modules/DiscoverProfiles.module.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

export const DiscoverProfiles = () => {
  const [data, setData] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const fetchData = async () => {
      const result = await fetch(API_URL + "/profile/ext/getrandom")
      const data = await result.json()
      setData(data)
    }
    fetchData()
  }, []);

  const getProfile = async (e: any) => {
    e.preventDefault();
    const res = await fetch(API_URL + "/profile/ext/find", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ username_or_public_key: e.target.search.value })
    })
    const json = await res.json()
    if (res.ok) {
      //@ts-ignore
      setData([json])
    } else {
      toast.error(json.error)
    }
  }

  return (
    <div className={styles.discoverProfiles}>
      <form className={styles.search} onSubmit={(e) => getProfile(e)}>
        <input type="text" placeholder="Search profiles by username or public key" name="search" />
        <button type="submit">
          <Image src={Search} width="20" height="20" alt="search" />
        </button>
      </form>

      {data ? (data.map((a: any) => (
        <Link key={a['username']} href={a['username']} ><a className={styles.profileBox}>
          <div className={styles.upper}>
            <div className={styles.left}>
              <Image src={a['avatar']} height="50" width="50" />
              <div className={styles.name}>
                <h3>{a['name']}</h3>
                <h4>@{a['username']} </h4>
              </div>
            </div>
            <p>{a['public_key']}</p>
          </div>
          
          <div className={styles.lower}>
          <p>{a['bio']}</p>
          </div>
        </a></Link>
      ))
      ) : null
      }
    </div>

  )
}

