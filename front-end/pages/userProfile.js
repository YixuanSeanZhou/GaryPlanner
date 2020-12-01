// React and Next
import Head from 'next/head'
import React from 'react'
import { withRouter } from 'next/router'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Button, Form, Navbar, Row, Col } from 'react-bootstrap'
import styles from '../styles/UserProfile.module.css'

class UserProfile extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			is_loading: true,
			majorEditable: true,
			minorEditable: true,
			FNEditable: true,
            LNEditable: true,
            CEditable: true,
            IGQEditable:true,
            SQEditable:true,
			user_name: "Loading...",
			email: "Loading...",
			first_name:"Loading...",
			last_name:"Loading...",
            intended_grad_quarter: "Loading...",
            major: "Loading...",
            minor: "Loading...",
            college:"Loading...",
			start_quarter:"Loading...",
			
            showingAlert: false,
			alarmText: "Error!",
			alarmSubText: "Just error",	
		}
	}
	componentDidMount() {
        // Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/get_user_profile';
		const options = {
            method: 'GET',
            credentials: 'include',
		};

		fetch(requestUrl, options)
        .then(response => {

            if (response.status == 200) {
				// TODO: Prompt Success
                return response.json()
			} else if (response.status == 403) {
                this.props.router.push('/login'); 
            }
            else{
                setTimeout(() => this.props.disableLoading(), 300);
				this.props.router.push('/util/error');	
            }

        })
        .then(data => {
            console.log('Success:', data); // TODO: Remove for deployment

            this.setState(data.result);
            this.setState({
                is_loading: false,
            })

        })
		.catch((error) => {
			console.error('Error:', error);
        });
	}
	
 	handleClick = (e) => {
		if (!this.validate()) {
			return;
		}
		console.log("POSTing this data to server:", JSON.stringify(this.state));
        // Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/update_profile';
		const options = {
            method: 'POST',
            headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'},
			credentials: 'include',
			body: JSON.stringify(this.state)
		};
		fetch(requestUrl, options)
        .then(response => {
			const data = response.json();

            if (response.status == 200) {
				//success 
				this.props.enableLoading("Success")

			} else if (response.status == 403) {
				//not login
                this.props.disableLoading();
				this.props.router.push('/login'); 
            }
            else {
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

	}
 
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	validate(){
		if (this.state.first_name === "") {
			this.setState({
				showingAlert: true,
				alarmText: "First name can't be blank!",
				alarmSubText: ""
			});
			return false;
		}
		if (this.state.last_name === "") {
			this.setState({
				showingAlert: true,
				alarmText: "Last name can't be blank!",
				alarmSubText: ""
			});
			return false;
		}
		return true;
	}

	render(){
		return (
			<>
				<Head>
					<title>User Profile</title>
				</Head>

				<GaryNavbar>
					<Navbar.Text>User Profile</Navbar.Text>
				</GaryNavbar>

				<div className={styles.main}>
					<br />
					<section>
					<img src="/images/profile_picture.png"  width="256" height="256" />
						<div>
							<h2>Hello! {this.state.user_name}</h2>
						</div>
						<br />
						<Form>
							<Form.Label>First Name</Form.Label>
							<Form.Group as={Row} controlId="Name">
								<Col>
									<Form.Control
										id="first_name"
										readOnly = {this.state.FNEditable}
										plaintext
										value={this.state.first_name}
										onChange={this.handleChange}
									/>
								</Col>
								<Col>
								<div class="btn-group mr-2" role="group" aria-label="First group">
									<img id = "edit" style={{cursor: 'pointer'}} src="/images/edit.png"  width="15" height="15" onClick={() => this.setState({FNEditable: false })} />
									
								</div>
									<img src="/images/save.png" style={{cursor: 'pointer'}} width="15" height="15" onClick={() =>{ this.setState({FNEditable: true }),this.handleClick()}} />

								</Col>
							</Form.Group>
						</Form>
						<Form>
							<Form.Label>Last Name</Form.Label>
							<Form.Group as={Row} controlId="Name">
								<Col>
									<Form.Control
										id="last_name"
										readOnly = {this.state.LNEditable}
										plaintext
										value={this.state.last_name}
										onChange={this.handleChange}
									/>
								</Col>
								<Col>
									<div class="btn-group mr-2" role="group" aria-label="First group">
										<img id = "edit" style={{cursor: 'pointer'}} src="/images/edit.png"  width="15" height="15" onClick={() => this.setState({LNEditable: false })} />
									
									</div>
									<img src="/images/save.png" style={{cursor: 'pointer'}}  width="15" height="15" onClick={() =>{ this.setState({LNEditable: true }),this.handleClick()}} />

								</Col>
							</Form.Group>
						</Form>
						<Form>
							<Form.Label>Major</Form.Label>
							<Form.Group as={Row} controlId="Major">
								<Col>
									<Form.Control
										id="major"
										plaintext
										readOnly={this.state.majorEditable}
										value={this.state.major}
										onChange={this.handleChange}
									/>
								</Col>
								<Col>
								<div class="btn-group mr-2" role="group" aria-label="First group">
										<img id = "edit" style={{cursor: 'pointer'}} src="/images/edit.png"  width="15" height="15" onClick={() => this.setState({majorEditable: false })} />
									
									</div>
									<img src="/images/save.png"  style={{cursor: 'pointer'}} width="15" height="15" onClick={() =>{ this.setState({majorEditable: true }),this.handleClick()}} />

								</Col>
							</Form.Group>
						</Form>
						<Form>
							<Form.Label>Minor</Form.Label>
							<Form.Group as={Row} controlId="Minor">
								<Col>
									<Form.Control id="minor" 
									readOnly = {this.state.minorEditable}
									plaintext 
									value={this.state.minor} 
									onChange={this.handleChange}
									/>
								</Col>
								<Col>
								<div class="btn-group mr-2" role="group" aria-label="First group">
										<img id = "edit" style={{cursor: 'pointer'}} src="/images/edit.png"  width="15" height="15" onClick={() => this.setState({minorditable: false })} />
									
									</div>
									<img src="/images/save.png" style={{cursor: 'pointer'}}  width="15" height="15" onClick={() =>{ this.setState({minorEditable: true }),this.handleClick()}} />
								</Col>
							</Form.Group>
						</Form>
						Email
						<p>{this.state.email}</p>

                        <Form>
							<Form.Label>College</Form.Label>
							<Form.Group as={Row} controlId="College">
								<Col>
									<Form.Control
										id="college"
										readOnly = {this.state.CEditable}
										plaintext
										value={this.state.college}
										onChange={this.handleChange}
									/>
								</Col>
								<Col>
								<div class="btn-group mr-2" role="group" aria-label="First group">
									<img id = "edit" style={{cursor: 'pointer'}} src="/images/edit.png"  width="15" height="15" onClick={() => this.setState({CEditable: false })} />
									
								</div>
									<img src="/images/save.png" style={{cursor: 'pointer'}} width="15" height="15" onClick={() =>{ this.setState({CEditable: true }),this.handleClick()}} />

								</Col>
							</Form.Group>
						</Form>
						
						Intended Graduate Quarter
						<p>{this.state.intended_grad_quarter}</p>
						
					</section>
						
					
				</div>
			</>
		)
	}
}

export default withRouter(UserProfile);