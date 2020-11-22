import Link from 'next/link'
import Head from 'next/head'
import PlanCalendar from '../components/planCalendar/planCalendar'
// Components
import { SearchBar } from '../components/searchBar';
import HomeNav from '../components/homeNav'
import { Navbar } from 'react-bootstrap';

// Styles
import styles from '../styles/FourYearPlan.module.css'

export default function Plan() {
    return (
        <>
            <Head>
                <title>Plan</title>
            </Head>

            <HomeNav>
                <Navbar.Text>
                   Four Year Plan 
                </Navbar.Text>
            </HomeNav>

            <SearchBar />

            <div id="planCalendar" className={styles.mainContainer}>
                <PlanCalendar />
            </div>
        </>
    )
}