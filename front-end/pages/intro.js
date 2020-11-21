// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Navbar, Jumbotron, Button } from 'react-bootstrap'

export default class Intro extends React.Component {
	render() {
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar />

				<div className="intro">
					<div className="content">
						<div className="col-6">
							<h1>Plan in Gary Planner</h1>
							<h2>Easier Life in UCSD</h2>
							<p style={{ fontSize: '20px' }}>
								Gary Planner is a tool that help you make decisions when
								you choose classes. We want you to graduate taking classes
								that you like.
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

				<div className="content">
					<h1 className="text-center mt-5">Create your</h1>
					<div className="container mt-5">
						<div className="row">
							<div className="col-6">
								<h3>Four Year Plan</h3>
								<p>
									Generates your four year plan automatically <br />
									Allows you to graduate on time <br />
									Customizes your plan easily <br />
								</p>
								<Button variant="outline-primary" href="/login">
									Create
								</Button>
							</div>
							<div className="col-6">
								<img src="/images/plan.png" width="500" height="auto" />
							</div>
						</div>

						<div className="row" style={{ paddingTop: '85px' }}>
							<div className="col-6">
								<img
									src="/images/schedule.png"
									width="500"
									hehight="auto"
								/>
							</div>
							<div className="col-6">
								<h3>Quarter Schedule</h3>
								<p>
									Clear view of your weekly schedule <br />
									Comparsion between different classes <br />
									Select the best professor you want <br />
								</p>

								<Button variant="outline-primary" href="/login">
									Create
								</Button>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}