import Link from 'next/link'
import Image from 'next/image'
import Bargraph from '@/images/icons/Bargraph.svg'
import Edit from '@/images/icons/Edit.svg'
import Piechart from '@/images/icons/Piechart.svg'
import History from '@/images/icons/History.svg'
import Settings from '@/images/icons/Settings.svg'
import styles from '@/styles/modules/Sidebar.module.scss'
import { useRouter } from "next/router"

export const Sidebar = () => {
    const router = useRouter()
    
    const SidebarIcon = ({icon, link}: {icon: any, link: String}) => {
        const url = link.toLowerCase().replace(" ", '')
        return (
            <div className={router.pathname == "/" + url ? styles.icon_active : styles.icon}>
                <Image src={icon}></Image>
                <Link href={"/"+ url}>{link}</Link>
            </div>
        )
    }

    console.log(router.pathname)
    return (
        <nav className={styles.sidebar}>
          <ul className={styles.links}>
            <SidebarIcon icon={Bargraph} link="Dashboard"/>
            <SidebarIcon icon={Edit} link="Edit Profile"/>
            <SidebarIcon icon={Piechart} link="Insights"/>
            <SidebarIcon icon={History} link="History"/>
            <SidebarIcon icon={Settings} link="Settings"/>
          </ul>
        </nav>
    )
}

