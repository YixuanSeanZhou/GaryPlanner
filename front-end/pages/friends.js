import { useState } from 'react'
import Head from 'next/head'
import HomeNav from '../components/homeNav'
import SideBar from '../components/friends/SideBar'
import FriendInfo from '../components/friends/FriendInfo'
import { Navbar } from 'react-bootstrap'

export default function Friends() {
	const [rtl, setRtl] = useState(false)
	const [collapsed, setCollapsed] = useState(false)
	const [image, setImage] = useState(true)
	const [toggled, setToggled] = useState(false)

	const handleToggleSidebar = (value) => {
		setToggled(value)
	}

	return (
		<>
			<Head>
				<title>Friends</title>
			</Head>

			<HomeNav>
				<Navbar.Text>Friends</Navbar.Text>
			</HomeNav>

			<div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
				<SideBar />
				<FriendInfo />
			</div>
		</>
	)
}
