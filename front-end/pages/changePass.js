// React and Next
import React from 'react'
import { withRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import Particles from 'react-particles-js';

// Components
import { GaryNavbar } from '../components/commonUI'
import { Form, Button, Navbar } from 'react-bootstrap'

import styles from '../styles/Auth.module.css'

class ChangePass extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			old_pwd:"",
			pwd:"",
			pwdconfirm:"",

		
		showingAlert: false,
		alarmText: "Error!",
		alarmSubText: "Just error",	
		}

	}
	handleClick = (e) => {
		if (!this.validate()) {
			return;
		}
		this.props.enableLoading("Please wait");
		console.log("Posting this data to server:", JSON.stringify(this.state));

		// Options for the fetch request
		const requestUrl = ' http://localhost:2333/api/users/change_pwd';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'},
			credentials: 'include',
			body: JSON.stringify(this.state)
			}
			

		fetch(requestUrl, options)
		.then(response => {
			const data = response.json();

			if (response.status == 200) {
				// User success
				this.props.enableLoading("Success! Going to Home page...")

				// Redirect the user to login page
				this.props.router.prefetch('/home');
				setTimeout(() => {
					this.props.disableLoading();
					this.props.router.push('/home'); 
				}, 2000);
			} else if (response.status == 400) {
				// Old passward wrong
				// TODO: Prompt
				return response.json()

			} else if (response.status == 403) {
			// Not Logged in
			// TODO: Prompt
			this.props.disableLoading();
			this.props.router.push('/login'); 
		}		
			
		}).then(data =>{
			console.log("JSON Data:", data);
			if (data === undefined){
				return;
			}
			if (data.reason === "old password wrong") {
				this.setState({
					showingAlert: true,
					alarmText: "Old password is wrong ",
					alarmSubText: "Please enter correct password."
				});

				setTimeout(() => this.props.disableLoading(), 300);
			} else if (data.reason === "Not logged in!") {
				this.setState({
					showingAlert: true,
					alarmText: "User does not log in ",
					alarmSubText: "Please log in your account."
				});

				setTimeout(() => this.props.disableLoading(), 300);
			} 
		})
		.catch((error) => {
			console.error('Error:', error);
			setTimeout(() => this.props.disableLoading(), 300);
			this.props.router.push('/util/error');
		});
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};
	validate() {
		if (this.state.old_pwd === "") {
			this.setState({
				showingAlert: true,
				alarmText: "Old password can't be blank!",
				alarmSubText: ""
			});
			return false;
		}
		if (this.state.pwd === "") {
			this.setState({
				showingAlert: true,
				alarmText: "New password can't be blank!",
				alarmSubText: ""
			});
			return false;
		}
		if (this.state.pwdconfirm=== "") {
			this.setState({
				showingAlert: true,
				alarmText: "Confirm password can't be blank!",
				alarmSubText: ""
			});
			return false;
		}
		if (this.state.pwd !== this.state.pwdconfirm) {
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
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar userProfile={this.props.userProfile} onLogout={this.props.clearUserProfile}>
					<Navbar.Text>Change Password</Navbar.Text>
				</GaryNavbar>

				<div className={styles.outer}>
					<Particles
						params={{
							particles: {
								number: {
									value: 90,
									density: {
										enable: true,
										value_area: 2000,
									},
								},
								color: {
									value: '#ffffff',
								},
								size: {
									value: 2.5,
								},
							},
							interactivity: {
								events: {
									onhover: {
										enable: true,
										mode: 'repulse',
									},
								},
							},
						}}
					/>
					<div
						className={styles.middle}
						style={{
							position: 'absolute',
							top: '20%',
							left: 0,
							width: '100%',
							height: 'absolute%',
						}}>
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

							<h3>Change Password</h3>
							<Form>
								<Form.Group>
									<Form.Label htmlFor="username">
										Old Password
									</Form.Label>
									<Form.Control
										type="password"
										id="old_pwd"
										value ={this.state.old_pwd}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="passowrd">
										New Passowrd
									</Form.Label>
									<Form.Control
										type="password"
										id="pwd"
										value ={this.state.pwd}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="passowrd">
										Confirm Passowrd
									</Form.Label>
									<Form.Control
										type="password"
										id="pwdconfirm"
										value ={this.state.pwdconfirm}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<div style={{ textAlign: 'right' }}>
									<Button
										type="submit"
										value="submit"
										className="bg-orange mt-3"
										onClick={this.handleClick}>
										Submit
									</Button>{' '}
								</div>
							</Form>
						</div>
					</div>
				</div>
			</>
		)
	}
}
export default withRouter(ChangePass);