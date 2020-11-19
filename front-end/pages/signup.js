// React and Next
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { withRouter } from 'next/router'

// Components
import { Form, Button } from 'react-bootstrap'
import { GaryNavbar } from '../components/commonUI'

// Styles
import styles from '../styles/Register.module.css'

class Signup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			email: "",
			user_name: "",
			pwd: "",
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
			body: JSON.stringify(this.state)
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
			[e.target.name]: e.target.value
		});
	};

	render() {
		return (
			<>
				<Head>
					<title>Signup Page</title>
				</Head>


				<GaryNavbar />

				<div className={styles.login}>
					<h3>Sign Up</h3>
					<Form>
						<Form.Group controlId="user_name">
							<Form.Label>Username</Form.Label>
							<Form.Control 
								name="user_name"
								type="text"
								value={this.state.user_name}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control 
								name="email"
								type="text"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="pwd">
							<Form.Label>Passowrd</Form.Label>
							<Form.Control 
								name="pwd"
								type="password"
								value={this.state.password}
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
								className="bg-orange mt-3"
								onClick={this.handleClick}
							>
								Signup
							</Button>{' '}
						</div>
					</Form>
				</div>
			</>
		)	
	}
}

export default withRouter(Signup);