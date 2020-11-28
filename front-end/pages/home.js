// React and Next
import React, {useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'

// Components
import HomeNav from '../components/homeNav'
import { ParticleEffect } from '../components/commonUI';
import { Navbar, Jumbotron, Button, Modal, Card } from 'react-bootstrap'
import Request from '../components/requestPlan'
import EvaluationsList from '../components/eval/evaluationsList';

import styles from '../styles/Auth.module.css'

export default class Home extends React.Component {

	constructor(props) {
        super(props);

        this.state = {
			modalShow: false,

            is_loading: true,
            user_name: "Loading...",
            email: "Loading...",
            first_name: "Loading...",
            last_name: "Loading...",
            college: "Loading...",
            intended_grad_quarter: "Loading...",
            major: "Loading...",
            minor: "Loading...",
		}
		
	}

	render() {
		
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
										<h3 className="mb-4">Yixuan Zhou</h3>
										<Card.Text>User Name: Pig</Card.Text>
										<Card.Text>Major: Computer Science</Card.Text>
										<Card.Text>Minor: None</Card.Text>
										<Card.Text>College: Sixth</Card.Text>
										<Card.Text>Email: xxxx007@ucsd.edu</Card.Text>
									</Card.Body>

								</Card>
							</div>
							<div className="offset-2 col-4 mt-5">
								
								<div >
									<Button size="lg" variant="info" style={{backgroundColor: "#88d8b0"}} block id="home-btn" onClick={() => this.setState({modalShow: true})}>
										<span>New Four Year Plan</span>
									</Button>										
								</div>
								
								<div style={{marginTop: "130px"}}>
									<Link href="/fourYearPlan">
										<Button size="lg" variant="warning" style={{backgroundColor: "#ffcc5c"}} block id="home-btn">
											<span>View Four Year Plan</span>
										</Button>										
									</Link>
								</div>
								
								<div style={{marginTop: "130px"}}>
									<Link href="/friends">
										<Button size="lg" variant="danger" style={{backgroundColor: "#ff6f69"}} block id="home-btn">
											<span>Checkout Friends' Schedules</span>
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Request show={this.state.modalShow} onHide={() => this.setState({modalShow: false})} />
			</>
		)
	}
	

}
