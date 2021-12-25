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
    setTimeout(() => fetchData(), 500)
  }, []);

  const getProfiles = async (e: any) => {
    e.preventDefault();

    if (e.target.search.value != "") {
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
  }

  return (
    <div className={styles.discoverProfiles}>
      <form className={styles.search} onSubmit={(e) => getProfiles(e)}>
        <div className={styles.gap}></div>
        <input type="text" placeholder="Search profiles by username or public key" name="search" />
        <button type="submit">
          <Image src={Search} width="30" height="30" alt="search" />
        </button>
      </form>
      <p>Discover other profiles</p>
      {data ? (data.map((a: any) => (
        <Link key={a['username']} href={a['username']} ><a className={styles.profileBox}>
          <div className={styles.upper}>
            <Image src={a['avatar']} height="50" width="50" alt="avatar" />
            <div className={styles.nameGroup}>
              <span className={styles.name}>{a['name']}</span>
              <span className={styles.username}>@{a['username']} </span>
            </div>
            <div></div>
            <p>{a['public_key']}</p>
          </div>

          <div className={styles.lower}>
            <p>{a['bio'].replace("[name_here]", a['name'])}</p>
          </div>
        </a></Link>
      ))
      ) : null
      }
    </div>

  )
}

