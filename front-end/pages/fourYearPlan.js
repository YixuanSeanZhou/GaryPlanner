import Link from 'next/link'
import Head from 'next/head'
import PlanCalendar from '../components/planCalendar/planCalendar'
// Components
import { SearchBar } from '../components/searchBar';
import HomeNav from '../components/homeNav'
import { Navbar } from 'react-bootstrap';


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

            <div id="planCalendar">
                <PlanCalendar />
            </div>
        </>
    )
}