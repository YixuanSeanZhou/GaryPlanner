// React and next
import React from 'react'

// Compoents
import { Modal, Button, Form } from 'react-bootstrap';

// Styles
import styles from '../styles/HomePage.module.css';

export default class Request extends React.Component {
	constructor(props) {
		super(props);

		this.state={
			user_name: "",
			pwd: "",
			num_ge: undefined,
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value});
	};

	validate() {

	}

	handleClick(e) {

		// First, enable loading animation
		this.props.enableLoading("Please wait");

		// Format the form data
		var formData = this.state.formData;
		formData.start_quarter = formData.s_quarter.concat(formData.s_year);
		formData.indended_grad_quarter= formData.g_quarter.concat(formData.g_year);
		console.log("Posting data: ", formData);

		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/create_user';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData)
		};

		fetch(requestUrl, options)
		.then(response => {
			console.log(response);

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
				return response.json()

			} else {
				// Unhandled error code
				setTimeout(() => this.props.disableLoading(), 300);
				this.props.router.push('/util/error');	
			}
		}).then(data => {
		})
		.catch((error) => {
			console.error('Error:', error);
			setTimeout(() => this.props.disableLoading(), 300);
			this.props.router.push('/util/error');
		});
	}

	render() {
		
		return (
			<Modal
				{...this.props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Request Four-Year-Plan Recommendation
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className={styles.important}>Important Information</div>
					<div className={styles.helpText}>Please read before proceeding.</div>
					<div>
						<h5>This feature does not support everyone.</h5>
						<ul>
							<li> <b>If you have taken summer courses</b>, you can not use this feature.</li>
							<li> <b>If you did not start UCSD in Fall 2018</b>, you can not use this feature.</li>
							<li> <b>If you are not a CSE Major student</b>, you can not use this feature.</li>
							<li>We plan to support more people in the future.</li>
						</ul>
						<h5>A few other things you need to know.</h5>
						<ul>
							<li>
								Make sure you have ran the{" "} 
								<a target="_blank" href="https://students.ucsd.edu/academics/advising/degrees-diplomas/degree-audits.html">degree audit</a> 
								{" "}in your MyTritonlink.
							</li>
							<li>If you have a four-year-plan saved in our system, <b>this will discard the four-year-plan you created</b>.</li>
							<li>This result may not be perfectly correct. Some classes you have taken may not be listed. Do not rely on the result.</li>
						</ul>
					</div>
					<h3>UCSD Credentials</h3>
					<Form>
						<Form.Group controlId="user_name">
							<Form.Label>
								UCSD SSO user name (or student PID)
							</Form.Label>
							<Form.Control 
								type="text"
								value={this.state.user_name}
								onChange={this.handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="pwd">
							<Form.Label>Passowrd</Form.Label>
							<Form.Control 
								type="password"
								value={this.state.pwd}
								onChange={this.handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="num_ge">
							<Form.Label>Number of GEs still needed</Form.Label>
							<Form.Control 
								as='select' 
								value={this.state.num_ge}
								onChange={this.handleChange}
							>
								<option>0</option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
								<option>6</option>
								<option>7</option>
								<option>8</option>
								<option>9</option>
								<option>10</option>
								<option>11</option>
								<option>12</option>
								<option>13</option>
								<option>14</option>
								<option>15</option>
								<option>16</option>
							</Form.Control>
						</Form.Group>

						<div style={{ textAlign: 'right' }}>
							<Button className="mt-2" onClick={this.handleClick.bind(this)}>
								Sumbit
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		)
	};
}
