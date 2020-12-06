// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Navbar, Jumbotron, Button } from 'react-bootstrap'

import styles from '../styles/Intro.module.css'
export default class Intro extends React.Component {
	render() {
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar />

				<div className={styles.intro}>
					<div className={styles.content}>
						<div className="container">
							<div className="col-md-6">
								<h1>Plan in Gary Planner</h1>
								<h2>Easier Life in UCSD</h2>
								<p style={{ fontSize: '20px' }}>
									Gary Planner is a tool that helps you make decisions
									when you choose classes. We want you to graduate
									taking classes that you like.
								</p>
								<Button variant="warning" href="/login" className="mr-4">
									Log In
								</Button>
								<Button variant="outline-warning" href="/signup">
									Sign Up
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.content}>
					<h1 className="text-center mt-5">We are here for your...</h1>
					<div className="container mt-5">
						<div className="row">
							<div className="col-md-6">
								<h3>Four Year Plan</h3>
								<div className={styles.description}>
									Gary Planner provide you an interactive way to build your four year plan.
								</div>
							</div>
							<div className="col-md-6">
								<img
									src="/images/plan.png"
									width="auto"
									height="250"
									className={styles.introImg}
								/>
							</div>
						</div>

						<div className="row mb-5" style={{ marginTop: '85px' }}>
							<div className="col-md-6">
								<img
									src="/images/schedule.png"
									width="auto"
									height="250"
									className={styles.introImg}
								/>
							</div>
							<div className="col-md-6">
								<h3>Quarter Schedule (Coming Soon)</h3>
								<p>
									Clear view of your weekly schedule <br />
									Comparsion between different classes <br />
									Select the best professor you want <br />
								</p>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
