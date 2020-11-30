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
		this.props.updateUserProfile();
		this.setState(this.props.userProfile);
	}

	render() {
		const userProfile = this.state;
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar userProfile={this.props.userProfile} onLogout={this.props.clearUserProfile}>
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
											{userProfile.first_name} {userProfile.last_name}
										</h3>
										<Card.Text>
											User Name: {userProfile.user_name}
										</Card.Text>
										<Card.Text>Major: {userProfile.major}</Card.Text>
										<Card.Text>Minor: {userProfile.minor}</Card.Text>
										<Card.Text>
											College: {userProfile.college}
										</Card.Text>
										<Card.Text>Email: {userProfile.email}</Card.Text>
										<Card.Text>
											Graduation: {userProfile.intended_grad_quarter}
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
