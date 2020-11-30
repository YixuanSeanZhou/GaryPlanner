// React and Next
import Head from 'next/head'
import React from 'react'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Navbar } from 'react-bootstrap'

export default class Friends extends React.Component{

	render() {
		return (
			<>
				<Head>
					<title>Friends</title>
				</Head>
	
				<GaryNavbar userProfile={this.props.userProfile} onLogout={this.props.clearUserProfile}>
					<Navbar.Text>Friends</Navbar.Text>
				</GaryNavbar>
	
			</>
		)
	}
}
