import Head from 'next/head'
import React from 'react'
import { withRouter } from 'next/router'

// Components
import { GaryNavbar, ParticleEffect } from '../components/commonUI'
import { Alert, Form, Navbar, Row, Col } from 'react-bootstrap'

import styles from '../styles/UserProfile.module.css'
import authStyles from '../styles/Auth.module.css'

class UserProfile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			is_loading: true,
			majorEditable: true,
			minorEditable: true,
			FNEditable: true,
			LNEditable: true,
			CEditable: true,
			IGQEditable: true,
			SQEditable: true,
			formData: {
				user_name: '',
				email: '',
				first_name: '',
				last_name: '',
				intended_grad_quarter: '',
				major: '',
				minor: '',
				college: '',
				start_quarter: '',
			},
			showingAlert: false,
			alarmText: 'Error!',
			alarmSubText: 'Just error',
		}
	}
	componentDidMount() {
		// Options for the fetch request
		var formData = this.state.formData
		const requestUrl = 'http://localhost:2333/api/users/get_user_profile'
		const options = {
			method: 'GET',
			credentials: 'include',
		}

		fetch(requestUrl, options)
			.then((response) => {
				if (response.status == 200) {
					// Success
					return response.json()
				} else if (response.status == 403) {
					//Not log in
					this.setState({
						showingAlert: true,
						alarmText: 'Not login ',
						alarmSubText: 'Please login your account.',
					})
					this.props.router.push('/login')
				} else {
					setTimeout(() => this.props.disableLoading(), 300)
					this.props.router.push('/util/error')
				}
			})
			.then((data) => {
				console.log('Success:', data) // TODO: Remove for deployment

				this.setState({ formData: data.result })
				this.setState({
					is_loading: false,
				})
			})
			.catch((error) => {
				console.error('Error:', error)
				setTimeout(() => this.props.disableLoading(), 300)
				this.props.router.push('/util/error')
			})
	}

	handleClick = (e) => {
		if (!this.validate()) {
			return;
		}

		var formData = this.state.formData
		console.log('POSTing this data to server:', formData)
		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/update_profile'
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(formData),
		}
		fetch(requestUrl, options)
			.then((response) => {
				console.log(response)
				if (response.status == 200) {
					//success
					window.location.reload(false)
				} else if (response.status == 403) {
					//not login
					this.setState({
						showingAlert: true,
						alarmText: 'Not login ',
						alarmSubText: 'Please login your account.',
					})
					this.props.router.push('/login')
				}
			})
			.catch((error) => {
				console.error('Error:', error)
				setTimeout(() => this.props.disableLoading(), 300)
				this.props.router.push('/util/error')
			})
	}

	handleChange = (e) => {
		var formData = this.state.formData
		formData[e.target.id] = e.target.value
		this.setState({ formData })
	}

	validate() {
		const {
			first_name,
			last_name,
			college,
		} = this.state.formData;

		if (first_name === "") {
			this.setState({
				showingAlert: true,
				alarmText: "First name can't be blank!",
				alarmSubText: "Changes not saved."
			});
			return false;
		}
		if (last_name === "") {
			this.setState({
				showingAlert: true,
				alarmText: "Last name can't be blank!",
				alarmSubText: "Changes not saved."
			});
			return false;
		}
		if (college === "") {
			this.setState({
				showingAlert: true,
				alarmText: "College can't be blank!",
				alarmSubText: "Changes not saved."
			});
			return false;
		}
		return true;

	}

	render() {
		let alarmBody
		let formData = this.state.formData
		if (this.state.alarmSubText === '') {
			alarmBody = <Alert.Heading>{this.state.alarmText}</Alert.Heading>
		} else {
			alarmBody = (
				<>
					<Alert.Heading>{this.state.alarmText}</Alert.Heading>
					<div>{this.state.alarmSubText}</div>
				</>
			)
		}

		return (
			<>
				<Head>
					<title>User Profile</title>
				</Head>

				<GaryNavbar
						userProfile={this.props.userProfile}
						onLogout={this.props.clearUserProfile}>
						<Navbar.Text>User Profile</Navbar.Text>
				</GaryNavbar>

				<div className={styles.bg}>

					<div className={styles.main}>
						<div>
							<h2>{formData.user_name}</h2>
						</div>
						<br />
						<Form.Group>
							<div className="form-row">
								<div className="col">
									<Form.Label className={styles.label}>
										First Name
									</Form.Label>
								</div>
							</div>

							{this.state.FNEditable === false ? (
								<div className="row">
									<div className="col-6">
										<Form.Control
											id="first_name"
											value={formData.first_name}
											onChange={this.handleChange}
										/>
									</div>
									<div className={styles.save}>
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="auto"
											onClick={() => {
												this.setState({ FNEditable: true }),
													this.handleClick()
											}}
										/>
									</div>
								</div>
							) : (
								<div className="container row">
									<div>{formData.first_name}</div>

									<div className={styles.edit}>
										<img
											id="edit"
											style={{ cursor: 'pointer' }}
											src="/images/edit.png"
											width="15"
											height="auto"
											onClick={() =>
												this.setState({ FNEditable: false })
											}
											className={styles.edit}
										/>
									</div>
								</div>
							)}
						</Form.Group>
						<hr className="solid" />
						<Form>
							<div className="form-row">
								<div className="col">
									<Form.Label className={styles.label}>
										Last Name
									</Form.Label>
								</div>
							</div>

							{this.state.LNEditable === false ? (
								<div className="row">
									<div className="col-6">
										<Form.Control
											id="last_name"
											value={formData.last_name}
											onChange={this.handleChange}
										/>
									</div>
									<div className={styles.save}>
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.handleClick()
												this.setState({ LNEditable: true })
											}}
										/>
									</div>
								</div>
							) : (
								<div className="container row">
									<div>{formData.last_name}</div>

									<div className={styles.edit}>
										<img
											id="edit"
											style={{ cursor: 'pointer' }}
											src="/images/edit.png"
											width="15"
											height="15"
											onClick={() =>
												this.setState({ LNEditable: false })
											}
										/>
									</div>
								</div>
							)}
						</Form>
						<hr className="solid" />
						<Form>
							<div className="form-row">
								<div className="col">
									<Form.Label className={styles.label}>
										Major
									</Form.Label>
								</div>
							</div>

							{this.state.majorEditable === false ? (
								<div className="row">
									<div className="col-6">
										<Form.Control
											id="major"
											value={formData.major}
											onChange={this.handleChange}
										/>
									</div>
									<div className={styles.save}>
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.setState({
													majorEditable: true,
												}),
													this.handleClick()
											}}
										/>
									</div>
								</div>
							) : (
								<div className="container row">
									<div>{formData.major}</div>
									<div className={styles.edit}>
										<img
											id="edit"
											style={{ cursor: 'pointer' }}
											src="/images/edit.png"
											width="15"
											height="15"
											onClick={() =>
												this.setState({
													majorEditable: false,
												})
											}
										/>
									</div>
								</div>
							)}
						</Form>
						<hr className="solid" />
						<Form>
							<div className="form-row">
								<div className="col">
									<Form.Label className={styles.label}>
										Minor
									</Form.Label>
								</div>
							</div>

							{this.state.minorEditable === false ? (
								<div className="row">
									<div className="col-6">
										<Form.Control
											id="minor"
											value={formData.minor}
											onChange={this.handleChange}
										/>
									</div>
									<div className={styles.save}>
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.setState({
													minorEditable: true,
												}),
													this.handleClick()
											}}
										/>
									</div>
								</div>
							) : (
								<div className="container row">
									<div>{formData.minor}</div>
									<div className={styles.edit}>
										<img
											id="edit"
											style={{ cursor: 'pointer' }}
											src="/images/edit.png"
											width="15"
											height="15"
											onClick={() =>
												this.setState({
													minorEditable: false,
												})
											}
										/>
									</div>
								</div>
							)}
						</Form>
						<hr className="solid" />
						<span className={styles.label}>Email</span>
						<p className="mt-2">{formData.email}</p>
						<hr className="solid" />
						<Form>
							<div className="form-row">
								<div className="col">
									<Form.Label className={styles.label}>
										College
									</Form.Label>
								</div>
							</div>

							{this.state.CEditable === false ? (
								<div className="row">
									<div className="col-6">
										<Form.Control
											id="college"
											value={formData.college}
											onChange={this.handleChange}
										/>
									</div>
									<div className={styles.save}>
										<img
											src="/images/save.png"
											style={{ cursor: 'pointer' }}
											width="15"
											height="15"
											onClick={() => {
												this.setState({ CEditable: true });
												this.handleClick();
											}}
										/>
									</div>
								</div>
							) : (
								<div className="container row">
									<div>{formData.college}</div>
									<div className={styles.edit}>
										<img
											id="edit"
											style={{ cursor: 'pointer' }}
											src="/images/edit.png"
											width="15"
											height="15"
											onClick={() =>
												this.setState({ CEditable: false })
											}
										/>
									</div>
								</div>
							)}
						</Form>
						<hr className="solid" />
						<span className={styles.label}>Intended Graduate Quarter</span>
						<p className="mt-2">{formData.intended_grad_quarter}</p>

						<Alert
							show={this.state.showingAlert}
							onClick={() => this.setState({ showingAlert: false })}
							variant="danger"
							className={authStyles.myAlert}
							dismissible>
							{alarmBody}
						</Alert>


					</div>
				</div>
			</>
		)
	}
}

export default withRouter(UserProfile)
