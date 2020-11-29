// React and Next
import React, {useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'

// Components
import { ParticleEffect, GaryNavbar } from '../components/commonUI';
import { Navbar, Jumbotron, Button, Modal, Card } from 'react-bootstrap'
import Request from '../components/requestPlan'
import EvaluationsList from '../components/eval/evaluationsList';

import styles from '../styles/Auth.module.css'

export default class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			modalShow: false,

			is_loading: true,
			user_name: 'Not login',
			email: '',
			first_name: 'first',
			last_name: 'last',
			college: '',
			intended_grad_quarter: '',
			major: 'None',
			minor: 'None',
		}
	}

	componentDidMount() {
		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/get_user_profile'
		const options = {
			method: 'GET',
			credentials: 'include',
		}

		fetch(requestUrl, options)
			.then((response) => {
				if (response.status == 200) {
					// TODO: Prompt Success
					return response.json()
				} else if (response.status == 403) {
					this.setState({
						user_name: 'Not Logged in!',
					})
					throw Error(response.statusText)
				}
			})
			.then((data) => {
				console.log('Success:', data) // TODO: Remove for deployment

				this.setState(data.result)
				this.setState({
					is_loading: false,
				})
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	render() {
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar showUser={true} first_name={this.state.first_name}>
					<Navbar.Text>Home</Navbar.Text>
				</GaryNavbar>

				<ParticleEffect className={styles.particles} />

				<div className={styles.outer}>
					<div className={styles.rowContent}>
						<div className="row">
							<div className="offset-1 col-4 mt-5">
								<Card>
									<Card.Body>
										<h3 className="mb-4">
											{this.state.first_name} {this.state.last_name}
										</h3>
										<Card.Text>
											User Name: {this.state.user_name}
										</Card.Text>
										<Card.Text>Major: {this.state.major}</Card.Text>
										<Card.Text>Minor: {this.state.minor}</Card.Text>
										<Card.Text>
											College: {this.state.college}
										</Card.Text>
										<Card.Text>Email: {this.state.email}</Card.Text>
										<Card.Text>
											Graduation: {this.state.intended_grad_quarter}
										</Card.Text>
									</Card.Body>
								</Card>
							</div>
							<div className="offset-2 col-4 mt-5">
								<div>
									<Button
										size="lg"
										variant="info"
										style={{ backgroundColor: '#88d8b0' }}
										block
										id="home-btn"
										onClick={() =>
											this.setState({ modalShow: true })
										}>
										<span>New Four Year Plan</span>
									</Button>
								</div>

								<div style={{ marginTop: '130px' }}>
									<Link href="/fourYearPlan">
										<Button
											size="lg"
											variant="warning"
											style={{ backgroundColor: '#ffcc5c' }}
											block
											id="home-btn">
											<span>View Four Year Plan</span>
										</Button>
									</Link>
								</div>

								<div style={{ marginTop: '130px' }}>
									<Link href="/friends">
										<Button
											size="lg"
											variant="danger"
											style={{ backgroundColor: '#ff6f69' }}
											block
											id="home-btn">
											<span>Checkout Friends' Schedules</span>
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Request
					show={this.state.modalShow}
					onHide={() => this.setState({ modalShow: false })}
				/>
			</>
		)
	}
}
