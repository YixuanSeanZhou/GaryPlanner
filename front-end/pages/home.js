// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import HomeNav from '../components/homeNav'
import { ParticleEffect } from '../components/commonUI';
import { Navbar, Jumbotron, Button, Modal, Card } from 'react-bootstrap'
import Request from '../components/requestPlan'
import Link from 'next/link'
import EvaluationsList from '../components/eval/evaluationsList';

import styles from '../styles/Auth.module.css'

export default function Home() {

	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<HomeNav>
				<Navbar.Text>Home</Navbar.Text>
			</HomeNav>

			<ParticleEffect className={styles.particles} />

			<div className={styles.outer}>
				<div className={styles.rowContent}>
					<div className="row">
						<div className="offset-1 col-4 mt-5">
							<Card>
								<Card.Body>
									<h4 className="mb-4">Yixuan Zhou</h4>
									<Card.Text>User Name: Pig</Card.Text>
									<Card.Text>Major: Computer Science</Card.Text>
									<Card.Text>Minor: None</Card.Text>
									<Card.Text>College: Sixth</Card.Text>
									<Card.Text>Email: xxxx007@ucsd.edu</Card.Text>
								</Card.Body>

							</Card>
						</div>
						<div className="offset-2 col-4 mt-5">
							<div>
								<Link href="/friends">
									<Button  size="lg" variant="warning" style={{backgroundColor: "#ffcc5c"}} block id="home-btn">
										<span>Checkout Friends' Schedules</span>
									</Button>
								</Link>
							</div>
							
							<div style={{marginTop: "180px"}}>
								<Link href="fourYearPlan">
									<Button size="lg" variant="info" style={{backgroundColor: "#ff6f69"}} block id="home-btn">
										<span>View Four Year Plan</span>
									</Button>										
								</Link>
							</div>

						</div>
					</div>

				</div>
			</div>
{/* 
			<div className="intro">
				<div className="content">
					<div className="col-6">
						<h3>Yixuan Zhou</h3>
						<div className="container">
							<div className="row">
								<h6>Major: Computer Science</h6>
							</div>
							<div className="row">
								<h6>Minor: P.I.G.</h6>
							</div>
							<div className="row">
								<h6>College: Sixth</h6>
							</div>
						</div>
						<div className="mt-4">
							<h4>Four Year Plan</h4>
							<Button
								variant="warning"
								href="/fourYearPlan"
								className="mr-4">
								View
							</Button>
							<Button variant="outline-warning" onClick={() => setModalShow(true)}>
								Request
							</Button>
						</div>
					</div>

				</div>
			</div>

			<div className="content">
				<h1 className="text-center mt-5">Checkout classes you want to take</h1>
				<div className="container">
					<SearchBar /> 
					<EvaluationsList evaluations={evaluations} />

				</div>
			</div>

			
*/}
			<Request show={modalShow} onHide={() => setModalShow(false)} />
		</>
	)

}
