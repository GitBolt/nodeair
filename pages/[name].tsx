import { useRouter } from "next/router"
import { PageHead } from '@/components/Head'
import { ProfileBox, ProfileBoxNotFound } from '@/components/ProfileBox'
import { Sidebar } from '@/components/Sidebar'
import { DiscoverProfiles } from '@/components/DiscoverProfiles'
import styles from '@/styles/modules/Profile.module.scss'
import { useEffect, useState } from "react"
import { CircleSpinner } from "react-spinners-kit";

export default function Profile({ name }: any) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<object>();

  useEffect(() => {   
    const fetchData = async () => {
      setLoading(true)
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      console.log("Start")
      const res = await fetch(API_URL + "/profile/" + name)
      console.log("Done fetching")
      let data
      if (res.ok) {
        data = await res.json()
      } else {
        data = "Not found"
      }
      setUserData(data)
      console.log(data)
      setLoading(false)
    }
    fetchData()
  }, [name]);

    return (
      <>
        <PageHead title={'NodeAir |@'+  name}/>
        <Sidebar />
        <h1 className={styles.note}>Profile/Discovery is not available on this screen size at the moment.</h1>
  
        <div className={styles.profile}>
          <h1 className={styles.heading}>Discover</h1>
          <div className={loading? styles.loading : styles.profileBox}>
            {loading ?  <CircleSpinner size={60} color="#869ACE"/> : <ProfileBox user={userData.user} activity={userData.recent_activity} />}
          </div>
          <div className={styles.discover}>
            <DiscoverProfiles />
          </div>

        </div>
  
      </>
    )
  }


export async function getServerSideProps(context: any) {

  const { name } = context.params
  return { props: { name } }

}
