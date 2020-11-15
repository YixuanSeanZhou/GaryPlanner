// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Navbar, Jumbotron } from 'react-bootstrap'
import { Button } from '@material-ui/core'

import styles from '../styles/Home.module.css'

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

				<Jumbotron></Jumbotron>
				<div className={styles.content}>
					<div clasName={styles.top}>
						<div className={styles.warp}>
							<div className={styles.center}>
								<h1>Welcome to GaryPlanner</h1>
								<h2>Easier Life in UCSD</h2>
							</div>

							<p>
								GaryPlanner is a tool that helps you organize your class
								schedule while you are in UCSD. We will help you build
								your class schedule in UCSD. Let's get started!
							</p>
						</div>

						<div className="container">
							<div className="row">
								<div className="col-6">
									<Button
										variant="contained"
										color="primary"
										href="/login"
										className="mr-4">
										Log In
									</Button>
									<Button
										variant="outlined"
										color="primary"
										href="/signup">
										Sign Up
									</Button>
								</div>
							</div>
						</div>

						<div className={styles.subContent}>
							<h1 className="text-center">Build your</h1>
							<div className={styles.columns}>
								<div className="col-5">
									<h3>Four Year Plan</h3>
									<p>
										Generate a table with classes you have taken in
										UCSD 
										<br /> Allow you to customize the plan
										<br />....
									</p>
									<Button
										variant="contained"
										color="primary"
										href="/fourYearPlan">
										build
									</Button>
								</div>

								<div className="offset-2 col-5">
									<h3>Quarter Schedule</h3>
									<p>Plan your next quarter at first place
									   <br />Select the best Professor
									   <br /> ... 
									</p>

									<Button
										variant="contained"
										color="primary"
										href="/">
										build
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
