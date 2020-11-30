import Link from 'next/link'
import Head from 'next/head'
import PlanCalendar from '../components/planCalendar/planCalendar'
// Components

import { GaryNavbar } from '../components/commonUI'
import { Navbar } from 'react-bootstrap';

// Styles
import styles from '../styles/FourYearPlan.module.css'

export default function Plan() {
    return (
        <>
            <Head>
                <title>Plan</title>
            </Head>

            <GaryNavbar showUser={true}>
                <Navbar.Text>
                   Four Year Plan 
                </Navbar.Text>
            </GaryNavbar>

            <div id="planCalendar" className={styles.mainContainer}>
                <PlanCalendar />
            </div>
        </>
    )
}