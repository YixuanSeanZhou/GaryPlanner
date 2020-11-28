import Head from 'next/head'
import HomeNav from '../components/homeNav'
import SideBar from '../components/friends/SideBar'
import FriendInfo from '../components/friends/FriendInfo'
import { Navbar } from 'react-bootstrap'

export default function Friends() {
	return (
		<>
			<Head>
				<title>Friends</title>
			</Head>

			<HomeNav>
				<Navbar.Text>Friends</Navbar.Text>
			</HomeNav>

			<div>
				<SideBar />
				<FriendInfo />
			</div>
		</>
	)
}
