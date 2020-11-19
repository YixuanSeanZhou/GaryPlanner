// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Navbar, Jumbotron, Button } from 'react-bootstrap'

import styles from '../styles/Intro.module.css'

export default class Home extends React.Component {
	render() {
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar>
					<Navbar.Text>Home</Navbar.Text>
				</GaryNavbar>

				<div className="intro">
					<div className="content">
						<div className="col-6">
							<h1>Welcome Yixuan Zhou</h1>
							<Button
								variant="warning"
								href="/login"
								className="mr-4">
								Log In
							</Button>
							<Button
								variant="outline-warning"
								href="/signup">
								Sign Up
							</Button>
						</div>
						
					</div>
				</div>

			</>
		)
	}
}
