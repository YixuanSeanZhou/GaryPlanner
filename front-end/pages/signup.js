// React and Next
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { withRouter } from 'next/router'

// Components
import { GaryNavbar, ParticleEffect } from '../components/commonUI'
import { Form, Button, Navbar } from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay'

// Styles
import styles from '../styles/Register.module.css'

class Signup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			formData: {
				email: "",
				user_name: "",
				pwd: "",	
			},
			isLoading: false,
		};
	}

	handleClick = (e) => {
		console.log("POSTing this data to server:", JSON.stringify(this.state));

		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/create_user';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state.formData)
		};

		fetch(requestUrl, options)
		.then(response => {
			const data = response.json();

			if (response.status == 200) {
				// User successfully created
				// TODO: Prompt Success

				this.props.router.push('/login'); // Redirect the user to login page
			} else if (response.status == 300) {
				// User Already Existed!
				// TODO: Prompt
			}	
			console.log('Success:', data); // TODO: Remove for deployment
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	};

	handleChange = (e) => {
		this.setState({
			formData: {
				[e.target.name]: e.target.value
			}
		});
	};

	render() {
		return (
			<LoadingOverlay
				active={this.state.isLoading}
				spinner
				text="Please wait"
			>
				<div className={styles.outer}>

					<GaryNavbar>
						<Navbar.Text>Sign Up</Navbar.Text>
					</GaryNavbar>

					<ParticleEffect className={styles.particles} />

					{/* Start of the login component */}
					<div className={styles.loginWrapper} >
						<div className={styles.login}>
							<Form.Group style={{ display: 'flex', alignItems: 'center', height: "absolute" }}>
								<a href="/intro">
									<Image
										id="loginlogo"
										src="/logo/PCLogo-Color.svg"
										height="70"
										width="49"
										alt="logo"
										className=""
									/>
								</a>
								<h3 className="mt-3 ml-1" style={{ paddingLeft: '10px' }}>
									Gary <br /> Planner
								</h3>
							</Form.Group>

							<h3>Sign Up</h3>
							<Form>
								<Form.Group controlId="user_name">
									<Form.Label>Username</Form.Label>
									<Form.Control 
										name="user_name"
										type="text"
										value={this.state.formData.user_name}
										onChange={this.handleChange}
									/>
								</Form.Group>
								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control 
										name="email"
										type="text"
										value={this.state.formData.email}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="pwd">
									<Form.Label>Passowrd</Form.Label>
									<Form.Control 
										name="pwd"
										type="password"
										value={this.state.formData.password}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="passwordCfm">
									<Form.Label>Confirm password</Form.Label>
									<Form.Control type="password" />
								</Form.Group>

								<Form.Group>
									<Form.Text style={{ fontSize: '.85rem' }}>
										Already have an account?{' '}
										<Link href="/login">
											<a className={styles.redirect}>
												Login here
											</a>
										</Link>
									</Form.Text>
								</Form.Group>

								<div style={{ textAlign: 'right' }}>
									<Button
										type="button"
										value="submit"
										onClick={this.handleClick}
									>
										Signup
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</LoadingOverlay>
		)	
	}
}


export default withRouter(Signup);