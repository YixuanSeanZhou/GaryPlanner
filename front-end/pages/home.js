// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI'
import {HomeNav} from '../components/homeNav'
import { Navbar, Jumbotron, Button } from 'react-bootstrap'

import styles from '../styles/Intro.module.css'

export default class Home extends React.Component {
	render() {
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<HomeNav>
					<Navbar.Text>Home</Navbar.Text>
				</HomeNav>

				<div className="intro">
					<div className="content">
						<div className="col-6">
							<h1>Welcome Yixuan Zhou</h1>
							<h3>View your</h3>
							<Button
								variant="outline-warning"
								href="/fourYearPlan"
								className="mr-4">
								Four Year Plan
							</Button>
							<Button
								variant="outline-warning"
								href="/currQuarter">
								Next Quarter's Schedule
							</Button>
						</div>
						
					</div>
				</div>

			</>
		)
	}
}
