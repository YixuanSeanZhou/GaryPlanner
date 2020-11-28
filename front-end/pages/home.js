// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import HomeNav from '../components/homeNav'
import { Navbar, Jumbotron, Button, Modal } from 'react-bootstrap'
import Request from '../components/requestPlan'

import styles from '../styles/Intro.module.css'

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

			<div className="intro">
				<div className="content">
					<div className="col-6">
						<h1>Welcome Yixuan Zhou</h1>

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
					</div>
				</div>
			</div>

			<div className="content">
				<h1 className="text-center mt-5"></h1>
				<div className="container mt-5">
					<div className="row">
						<div className="col-6">
							<h3>Four Year Plan</h3>
							<p>
								Generates your four year plan automatically <br />
								Allows you to graduate on time <br />
								Customizes your plan easily <br />
							</p>
							<Button variant="warning" onClick={() => setModalShow(true)}>
								Create New
							</Button>
							<Button
								variant="outline-primary"
								href="/fourYearPlan"
								className="ml-4">
								View
							</Button>
						</div>
						<div className="col-6">
							<img src="/images/plan.png" width="500" height="auto" />
						</div>
					</div>

					<div className="row" style={{ paddingTop: '85px' }}>
						<div className="col-6">
							<img src="/images/schedule.png" width="500" hehight="auto" />
						</div>
						<div className="col-6">
							<h3>Quarter Schedule</h3>
							<p>
								Clear view of your weekly schedule <br />
								Comparsion between different classes <br />
								Select the best professor you want <br />
							</p>

							<Button variant="warning" href="/">
								Create New
							</Button>
							<Button
								variant="outline-primary"
								href="/currQuarter"
								className="ml-4">
								View
							</Button>
						</div>
					</div>
				</div>
			</div>

			<Request show={modalShow} onHide={() => setModalShow(false)} />
		</>
	)

}
