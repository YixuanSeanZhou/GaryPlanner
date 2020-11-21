// React and Next
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'
import { withRouter } from 'next/router';

// Components
import { Form, Button } from 'react-bootstrap';
import { GaryNavbar } from '../components/commonUI';

// Styles
import styles from '../styles/Register.module.css'

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			pwd: "",
		}
	}


	// Invoked when the user hit click
	handleClick = (e) => {
		console.log("POSTing this data to server:", JSON.stringify(this.state));

		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/login';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include', // Everything account related
			body: JSON.stringify(this.state),
		};

		fetch(requestUrl, options)
		.then(response => {
			const data = response.json();

			if (response.status == 200) {
				// User successfully created
				// TODO: Prompt Success

				this.props.router.push('/temp/testProfile');
			} else if (response.status == 300) {
				// User Already Existed!
				// TODO: Prompt
			}	
			console.log('Success:', data); // TODO: Remove for deployment
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	
	// Invoked everytime the value in the two textboxes changes
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	render() {
		return (
			<>
				<Head>
					<title>Login Page</title>
				</Head>

				<GaryNavbar />
	
				<div className={styles.login}>
					<h3>Log in</h3>
					<Form>
						{/* Here are the two credentials */}
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control 
								type="text"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</Form.Group>
	
						<Form.Group controlId="pwd">
							<Form.Label >Passowrd</Form.Label>
							<Form.Control 
								type="password"
								value={this.state.pwd}
								onChange={this.handleChange}
							/>
						</Form.Group>
	
						<Form.Group>
							<Form.Label>
								<Form.Check
									type="checkbox"
									name="remember"
									label="Remember me"
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
			</>
		)
	}
}

export default withRouter(Login);