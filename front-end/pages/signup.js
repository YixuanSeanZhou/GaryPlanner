// React and Next
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { withRouter } from 'next/router'

// Components
import { Form, Button, Navbar, Alert, Col, Row } from 'react-bootstrap';
import { GaryNavbar, ParticleEffect } from '../components/commonUI';

// Styles
import styles from '../styles/Auth.module.css'

class Signup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			formData: {
				email: "",
				user_name: "",
				pwd: "",	
				pwdCfm: "",
				first_name: "",
				last_name: "",
				major: "",
				minor: "",
				grad_year: "",
				grad_quarter: "",
				indended_grad_quarter: "",
			},
			showingAlert: false,
			alarmText: "Error!",
			alarmSubText: "Just error",		
		};
	}

	handleClick = (e) => {
		if (!this.validate()) {
			return;
		}
		// First, enable loading animation
		this.props.enableLoading("Please wait");

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
				this.props.enableLoading("Success! Going to login page...")

				// Redirect the user to login page
				this.props.router.prefetch('/login');
				setTimeout(() => {
					this.props.disableLoading();
					this.props.router.push('/login'); 
				}, 2000);

			} else if (response.status == 300) {
				// User Already Existed!
				this.setState({
					showingAlert: true,
					alarmText: "The given email already exists!",
					alarmSubText: "Login if you have already registered"
				});

				setTimeout(() => this.props.disableLoading(), 300);
			} else {
				// Unhandled error code
				setTimeout(() => this.props.disableLoading(), 300);
				this.props.router.push('/util/error');	
			}
			
			console.log('Success:', data); // TODO: Remove for deployment
		})
		.catch((error) => {
			console.error('Error:', error);
			setTimeout(() => this.props.disableLoading(), 300);
			this.props.router.push('/util/error');
		});
	};

	handleChange = (e) => {
		var formData = this.state.formData;
		formData[e.target.id] = e.target.value;
		formData.indended_grad_quarter = formData.grad_year.substring(2, 4).concat(formData.grad_quarter);
		this.setState({formData});
	};


	// Validate the form values and show alert if necessary
	validate() {
		const {user_name, email, pwd, pwdCfm, } = this.state.formData;
		if (user_name === "") {
			this.setState({
				showingAlert: true,
				alarmText: "Username can't be blank!",
				alarmSubText: ""
			});
			return false;
		}
		if (email === "") {
			this.setState({
				showingAlert: true,
				alarmText: "Email can't be blank!",
				alarmSubText: ""
			});
			return false;
		}
		if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
			this.setState({
				showingAlert: true,
				alarmText: "Please enter a valid email address!" ,
				alarmSubText: "C'mon!",
			});
			return false;
	
		}

		if (pwd === "") {
			this.setState({
				showingAlert: true,
				alarmText: "Password can't be blank!",
				alarmSubText: ""
			});
			return false;
		}
		if (pwd !== pwdCfm) {
			this.setState({
				showingAlert: true,
				alarmText: "Passwords Doesn't match",
				alarmSubText: ""
			});
			return false;
		}


		return true;
	}

	render() {
		let alarmBody;
		let formData = this.state.formData;
		if (this.state.alarmSubText === "") {
			alarmBody = <Alert.Heading>{this.state.alarmText}</Alert.Heading>;
		} else {
			alarmBody = <>
				<Alert.Heading>{this.state.alarmText}</Alert.Heading>
				<div>{this.state.alarmSubText}</div>
			</>;
		}

		return (
			<>
				<Head>
					<title>Sign up</title>
				</Head>

				{/* <ParticleEffect className={styles.particles} /> */}



				<div className={styles.outer}>

					<GaryNavbar>
						<Navbar.Text>Sign Up</Navbar.Text>
					</GaryNavbar>

					{/* Start of the login component */}

					<div className={styles.loginWrapper} >
						<div className={styles.login} id={styles.signup}>
							<h3>Sign Up</h3>
							<Form>
								
								<Form.Row>
									<Form.Group as={Col} controlId="first_name">
										<Form.Label>First Name</Form.Label>
										<Form.Control value={formData.first_name} onChange={this.handleChange} />
									</Form.Group>
									<Form.Group as={Col}  controlId="last_name">
										<Form.Label>Last Name</Form.Label>
										<Form.Control value={formData.last_name} onChange={this.handleChange} />
									</Form.Group>
								</Form.Row>

								<Form.Group controlId="user_name">
									<Form.Label>Username*</Form.Label>
									<Form.Control 
										name="user_name"
										type="text"
										value={this.state.formData.user_name}
										onChange={this.handleChange}
									/>
								</Form.Group>
								
								<Form.Group controlId="email">
									<Form.Label>Email*</Form.Label>
									<Form.Control 
										name="email"
										type="email"
										value={this.state.formData.email}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="pwd">
									<Form.Label>Passowrd*</Form.Label>
									<Form.Control 
										name="pwd"
										type="password"
										value={this.state.formData.password}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group controlId="pwdCfm">
									<Form.Label>Confirm password*</Form.Label>
									<Form.Control 
										name="pwdCfm"
										type="password" 
										value={this.state.formData.pwdCfm}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Row>
									<Form.Group as={Col} controlId="major">
										<Form.Label>Major</Form.Label>
										<Form.Control 
											type="password" 
											value={this.state.formData.major}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Form.Group as={Col} controlId="minor">
										<Form.Label>Minor</Form.Label>
										<Form.Control 
											type="password" 
											value={this.state.formData.minor}
											onChange={this.handleChange}
											placeholder="If Any"
										/>
									</Form.Group>

								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} controlId="grad_year">
										<Form.Label>Indended Graduation Year</Form.Label>
										<Form.Control 
											as="select"
											value={formData.grad_year}
											onChange={this.handleChange}
										>
											<option>2020</option>
											<option>2021</option>
											<option>2022</option>
											<option>2023</option>
											<option>2024</option>
										</Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId="grad_quarter">
										<Form.Label>Quarter</Form.Label>
										<Form.Control 
											as="select"
											value={formData.grad_quarter}
											onChange={this.handleChange}
										>
											<option>FA</option>
											<option>WI</option>
											<option>SP</option>
										</Form.Control>
									</Form.Group>

								</Form.Row>


								{/* Ending  */}
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

					<Alert 
						show={this.state.showingAlert} 
						onClick={() => this.setState({showingAlert: false})} 
						variant='danger'
						className={styles.myAlert}
						dismissible
					>
						{alarmBody}
					</Alert>


				</div>

			</>
		)	
	}
}


export default withRouter(Signup);