// React and Next
import Head from 'next/head'
import React from 'react'

// Components
import Sidebar from '../components/friends/sidebar'
import Content from '../components/friends/content'
import Search from '../components/friends/search'

import { GaryNavbar } from '../components/commonUI'
import { Navbar, Alert } from 'react-bootstrap'

import styles from '../styles/Friends.module.css'
import authStyle from '../styles/Auth.module.css'
import { withRouter } from 'next/router'

class Friends extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			// Flags for content
			contentData: {
				showFriend: false,
				showRequest: false,
				showFoundUser: false,
				currentProfile: undefined,	
			},

			friendProfiles: [],
			requests: [],

			showingAlert: false,
			alarmText: "Error: This is the default",
			alarmSubtext: "Just error"
		}
	}

	componentDidMount() {
		// Fetch the friends' list
		const requestUrl="http://localhost:2333/api/friends/get_friends_for_user"
		const options = {
			method: 'GET',
			credentials: 'include',
		};

		fetch(requestUrl, options)
		.then(response => response.json())
		.then(data => {
			console.log("Success", data);
			this.setState({
				friendProfiles: data.friends,
				requests: data.requests
			})
		})
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		})

		// Testing data
		var data = {
			showFriend: false,
			showRequest: false,
			showFoundUser: true,
			currentProfile: {
				"college": "Warren",
				"email": "j3li@ucsd.edu",
				"first_name": "Jing",
				"id": 2, 
				"intended_grad_quarter": "FA20",
				"last_name": "Li",
				"major": "CS",
				"minor": "undeclared",
				"start_quarter": "FA18",
				"user_name": "test2"
			}
		}
		this.setState({contentData: data})
	}

	setCurrentProfile(isFriend, id) {
		if (isFriend === true) {
			// Update current profile for friends
			profileObj = this.state.friendProfiles.filter((obj) => obj.id === id);
			var data = {
				showFriend: true,
				showRequest: false,
				showFoundUser: false,
				currentProfile: profileObj,	
			}
			this.setState({contentData: data})
		} else{
			// display profile for the request user
			profileObj = this.state.requests.filter((obj) => obj.request_id === id);
			var data = {
				showFriend: false,
				showRequest: true,
				showFoundUser: false,
				currentProfile: profileObj,	
			}
			this.setState({contentData: data})
		}
	}

	setSearchResult(userFound, profile) {
		if (userFound) {
			// Show found user
			var data = {
				showFriend: false,
				showRequest: false,
				showFoundUser: true,
				currentProfile: profile,	
			}
			this.setState({contentData: data})
		} else {
			// Show found user
			var data = {
				showFriend: false,
				showRequest: false,
				showFoundUser: false,
				currentProfile: undefined,	
			}
			this.setState({contentData: data})
			
		}
		
	}

	setAlert(Text, subText) {
		this.setState({
			showingAlert: true,
			alarmText: Text,
			alarmSubtext: subText,
		})
	}


	acceptRequest(id) {
	}

	declineRequest(id) {
	}

	removeFriend(id) {
	}

	render() {
		return (
			<>
				<Head>
					<title>Friends</title>
				</Head>

				<GaryNavbar
					userProfile={this.props.userProfile}
					onLogout={this.props.clearUserProfile}>
					<Navbar.Text>Friends</Navbar.Text>
				</GaryNavbar>

				<div className={styles.container}> 
					<div className={styles.left}>
						<Sidebar
							requests={this.state.requests}
							friends={this.state.friendProfiles} 
							setCurrentProfile={this.setCurrentProfile.bind(this)}
						/>
					</div>

					<div className={styles.right}>
						<Search 
							setCurrentProfile={this.setCurrentProfile.bind(this)}
							setAlert={this.setAlert.bind(this)}
						/>
						<Content 
							data={this.state.contentData}
							setAlert={this.setAlert.bind(this)}
						/>
					</div>
				</div>
				<Alert 
						show={this.state.showingAlert} 
						onClick={() => this.setState({showingAlert: false})} 
						variant='danger'
						className={authStyle.myAlert}
						dismissible
					>
						<Alert.Heading>{this.state.alarmText}</Alert.Heading>
						<div>{this.state.alarmSubtext}</div>
				</Alert>
			</>
		)
	}
}

export default withRouter(Friends);