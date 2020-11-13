// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Jumbotron, Button } from 'react-bootstrap'

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

				
					
				
				<div clasName={styles.top, styles.center}>
					<div className={styles.warp}>
						<div className={styles.center}>
							<h1>GaryPlanner</h1>
						</div>
						
						<p>
							GaryPlanner is a tool that helps you organize your class
							schedule while you are in UCSD. We will help you build
							your class schedule in UCSD. Let's get started!
						</p>
					</div>

						
					

					<div className={styles.content}>
						<h1 className="text-center">Build your</h1>
						<div className={styles.columns}>
							
							<div className={styles.column}>
								<Button className="">Four Year Plan</Button>
							</div>
							<div className={styles.column}>
								<Button className="">Quarter Schedule</Button>
							</div>
						</div>
						
					<div className="row">
						<div className="col-6 text-center">
							
								
							
						</div>
						<div className="col-6 text-center">
							
								
							
						</div>
					</div>
					</div>
				</div>
			

			</>
		)
    }
}