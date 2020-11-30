import Head from 'next/head'
import { GaryNavbar } from '../components/commonUI'
import { Navbar } from 'react-bootstrap'

export default function Friends() {
	return (
		<>
			<Head>
				<title>Friends</title>
			</Head>

			<GaryNavbar showUser={true}>
				<Navbar.Text>Friends</Navbar.Text>
			</GaryNavbar>

		</>
	)
}
