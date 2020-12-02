// React and Next
import Head from 'next/head'
import React from 'react'

// Components
import Sidebar from '../components/friends/sidebar'
import Content from '../components/friends/content'
import { GaryNavbar } from '../components/commonUI'
import { Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import styles from '../styles/Friends.module.css'

export default class Friends extends React.Component{

	render() {
		return (
			<>
				<Head>
					<title>Friends</title>
				</Head>

				<GaryNavbar
					userProfile={this.props.userProfile}
					onLogout={this.props.clearUserProfile}>
					<Navbar.Text>Friends</Navbar.Text>
				</GaryNavbar>

				<div className='row'>

					<div className={styles.left}>
						<Sidebar />
					</div>

					<div className={styles.right}>
						<Content />
					</div>						

				</div>
			</>
		)
	}
}
