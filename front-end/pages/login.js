// React and Next
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Image from 'next/image';

// Components
import { Form, Button, Navbar, Alert } from 'react-bootstrap';
import { GaryNavbar, ParticleEffect } from '../components/commonUI';

// Styles
import styles from '../styles/Auth.module.css'

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {
				email: "",
				pwd: "",
				remember: false,	
			},
			showingAlert: false,
			alarmText: "Error!",
			alarmSubText: "Just error",
		}
	}

	componentDidMount () {
		if(localStorage.checkbox === "true" && localStorage.email !== "") {
			var formData = {
				email: localStorage.email,
				pwd: localStorage.password,
				remember: localStorage.checkbox === "true",
			}
			this.setState({formData: formData});
		}
	}

	componentWillUnmount() {
		localStorage.checkbox = this.state.formData.remember;
	}


	// Invoked when the user hit click
	handleClick = (e) => {
		// First, enable loading animation
		this.props.enableLoading("Please wait");

		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/login';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include', // Everything account related
			body: JSON.stringify(this.state.formData),
		};

		fetch(requestUrl, options)
		.then(response => {
			const data = response.json();

			setTimeout(() => this.props.disableLoading(), 300);

			if (response.status == 200) {
				// Remember me
				const {email, pwd, remember} = this.state.formData;
				if (remember && email !== "") {
					localStorage.email = email;
					localStorage.password = pwd;
					localStorage.checkbox = remember;
				}

				this.props.router.push('/home')
			} else if (response.status == 400) {
				// Wrong email/password
				this.setState({
					showingAlert: true,
					alarmText: "Wrong Email/Password",
					alarmSubText: "Have you registered?"
				})
			} else {
				// Server issue
				this.setState({
					showingAlert: true,
					alarmText: "Unknown Error",
					alarmSubText: "Please contact the developer!"
				})
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			setTimeout(() => this.props.disableLoading(), 300);
			this.props.router.push('/util/error');
		});
	}

	
	// Invoked everytime the value in the two textboxes changes
	handleChange = (e) => {
		var formData = this.state.formData;
		formData[e.target.id] = e.target.value;
		this.setState({formData});
	}

	// Handles the checkbox
	handleCheck = (e) => {
		var formData = this.state.formData
		if (e.target.checked) {
			console.log(e);
			formData.remember = true;
		} else {
			formData.remember = false;
		}
		this.setState({formData});
	}

	render() {
		return (
			<>
				<Head>
					<title>Log in</title>
				</Head>

				<ParticleEffect className={styles.particles} />



				<div className={styles.outer}>

					<GaryNavbar>
						<Navbar.Text>Log in</Navbar.Text>
					</GaryNavbar>
	
					{/* Start of the login component */}

					<div className={styles.loginWrapper} >
						<div className={styles.login}>
							<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
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

							<h3>Log in</h3>
							<Form>
								{/* Here are the two credentials */}
								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control 
										type="email"
										value={this.state.formData.email}
										onChange={this.handleChange}
									/>
								</Form.Group>
			
								<Form.Group controlId="pwd">
									<Form.Label >Password</Form.Label>
									<Form.Control 
										type="password"
										value={this.state.formData.pwd}
										onChange={this.handleChange}
									/>
								</Form.Group>
			
								<Form.Group controlId="remember">
									<Form.Label>
										<Form.Check
											type="checkbox"
											name="remember"
											label="Remember me"
											checked={this.state.formData.remember}
											onChange={this.handleCheck}
										/>
									</Form.Label>
								</Form.Group>
			
								<Form.Group>
									<Form.Text style={{ fontSize: '.85rem' }}>
										New to GaryPlanner?{' '}
										<Link href="/signup" >
											<a style={{ color: '#0067b8' }}>
												Create an account
											</a>
										</Link>
									</Form.Text>
								</Form.Group>
								<div style={{ textAlign: 'right' }}>
									<Button
										value="submit"
										onClick={this.handleClick}
									>
										Login
									</Button>
								</div>
							</Form>
						</div>

					</div>

					<Alert 
						show={this.state.showingAlert} 
						onClick={() => this.setState({showingAlert: false})} 
						variant='danger'
						className={styles.myAlert}
						dismissible
					>
						<Alert.Heading>{this.state.alarmText}</Alert.Heading>
						<div>{this.state.alarmSubText}</div>
					</Alert>


				</div>

			</>
		)
	}
}

export default withRouter(Login);