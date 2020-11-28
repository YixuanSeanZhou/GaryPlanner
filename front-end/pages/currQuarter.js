import Link from 'next/link'
import Head from 'next/head'
// Components
import HomeNav from '../components/homeNav'
import { Navbar } from 'react-bootstrap';
//import Week from '../components/weekCalendar/Week'

export default function Schedule() {
    return (
		<>
			<Head>
				<title>Plan</title>
			</Head>

			<HomeNav>
				<Navbar.Text>Current Quarter Schedule</Navbar.Text>
			</HomeNav>

			<div className="container">
				<h1>Coming Soon...</h1>
			</div>
		</>
	)
}