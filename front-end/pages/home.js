// React and Next
import React, {useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'

// Components
import { ParticleEffect, GaryNavbar } from '../components/commonUI';
import { Navbar, Jumbotron, Button, Modal, Card, Container, Row, Col } from 'react-bootstrap'
import Request from '../components/requestPlan'

// Style sheets
import styles from '../styles/HomePage.module.css'
import authStyles from '../styles/Auth.module.css'
import friendStyles from '../styles/Friends.module.css'

export default class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			modalShow: false,
		}
	}

	componentDidMount() {
	}

	enableLoading(message) {
		this.props.enableLoading(message);
		this.setState({modalShow: false});
	}

	disableLoading(showRequestAgain) {
		this.props.disableLoading();
		if (showRequestAgain !== false) {
			this.setState({modalShow: true});
		}
	}

	render() {
		var { userProfile } = this.props;
		if (userProfile === undefined) {
			userProfile = {
				first_name: 'Not Logged In!',
				last_name: "",
				major: "",
				minor: "",
				college: "",
				email: "",
				intended_grad_quarter: "",
			}
		}
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar userProfile={this.props.userProfile} onLogout={this.props.clearUserProfile} toHome>
					<Navbar.Text>Home</Navbar.Text>
				</GaryNavbar>

				<ParticleEffect className={authStyles.particles} />

				<div className={styles.outer}>
					<Container className={styles.content} fluid>
						<Row>
							<Col className={styles.columns}>
								<div className={styles.profile}>
									<div className={styles.propertyContainerCol}>
										<h3 className={styles.propertyPair}>
											{userProfile.first_name} {userProfile.last_name}
										</h3>

										<div className={styles.propertyPair}>
											<div className={styles.propertyName}>User Name</div>
											<div className={styles.propertyValue}>{userProfile.user_name}</div>
										</div>

										<div className={styles.propertyPair}>
											<div className={styles.propertyName}>Email</div>
											<div className={styles.propertyValue}>{userProfile.email}</div>
										</div>

										<div className={styles.propertyPair}>
											<div className={styles.propertyName}>College</div>
											<div className={styles.propertyValue}>{userProfile.college}</div>
										</div>

										<div className={styles.propertyPair}>
											<div className={styles.propertyName}>Major</div>
											<div className={styles.propertyValue}>{userProfile.major}</div>
										</div>

										<div className={styles.propertyPair}>
											<div className={styles.propertyName}>Minor</div>
											<div className={styles.propertyValue}>{userProfile.minor}</div>
										</div>

										<div className={styles.propertyPair}>
											<div className={styles.propertyName}>Graduation</div>
											<div className={styles.propertyValue}>{userProfile.intended_grad_quarter}</div>
										</div>
									</div>
								</div>
							</Col>

							<Col className={styles.columns}>
								<Row>
									{/* Button one */}
									<Button
										style={{ backgroundColor: '#88d8b0' }}
										block
										className={`${styles.button} ${styles.firstButton}`}
										onClick={() =>
											this.setState({ modalShow: true })
										}
									>
										<span>New Four Year Plan</span>
									</Button>
								</Row>

								<Row>
									<Link href="/fourYearPlan">
										<Button
											style={{ backgroundColor: '#ffcc5c' }}
											className={styles.button}
											block
										>
											<span>View Four Year Plan</span>
										</Button>
									</Link>
								</Row>

								<Row>
									<Link href="/friends">
										<Button
											style={{ backgroundColor: '#ff6f69' }}
											className={styles.button}
											block
										>
											<span>Checkout Friends' Schedules</span>
										</Button>
									</Link>
								</Row>
							</Col>
						</Row>
					</Container>
				</div>

				<Request
					show={this.state.modalShow}
					onHide={() => this.setState({ modalShow: false })}
					enableLoading={this.enableLoading.bind(this)}
					disableLoading={this.disableLoading.bind(this)}
				/>
			</>
		)
	}
}
