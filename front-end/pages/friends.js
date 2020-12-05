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
	}

	setCurrentProfile(isFriend, id) {
		if (isFriend === true) {
			// Update current profile for friends
			let profileObj = this.state.friendProfiles.filter(obj => obj.id == id);
			console.log(this.state.friendProfiles);
			console.log(id)
			var data = {
				showFriend: true,
				showRequest: false,
				showFoundUser: false,
				currentProfile: profileObj[0],	
			}
			this.setState({contentData: data})
		} else{
			// display profile for the request user
			let profileObj = this.state.requests.filter(obj => obj.request_id == id);
			console.log("found obj", profileObj);
			var data = {
				showFriend: false,
				showRequest: true,
				showFoundUser: false,
				currentProfile: profileObj[0],	
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


	acceptRequest() {
		const requestUrl="http://localhost:2333/api/friends/accept_friend"
		const id = this.state.contentData['currentProfile'].request_id;
		const data = {request_id: id}
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		};

		fetch(requestUrl, options)
        .then(response => {
            if (response.status === 200) {
				this.props.router.reload();
			} else if (response.status === 301) {
				this.setAlert("The friend request has already been accepted", "Try refreshing the page?");
			} else if (response.status === 300) {
				this.props.setAlert("Request Not Found!","");
			} else if (response.status === 302) {
				this.props.setAlert("Can not accept your own friend request", "");
			} else {
				throw Error(response.statusText);
			}
		})
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		});	
	}

	declineRequest() {
		const requestUrl="http://localhost:2333/api/friends/decline_friend_request"
		const id = this.state.contentData['currentProfile'].request_id;
		const data = {request_id: id}
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		};

		fetch(requestUrl, options)
        .then(response => {
            if (response.status === 200) {
				this.props.router.reload();
			} else if (response.status === 301) {
				this.setAlert("You are already friends", "Try refreshing the page?");
			} else if (response.status === 300) {
				this.props.setAlert("Request Not Found!","");
			} else {
				throw Error(response.statusText);
			}
		})
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		});	
	}

	removeFriend() {
		const requestUrl="http://localhost:2333/api/friends/remove_friend";
		const id = this.state.contentData['currentProfile'].id;
		const data = {friend_id: id};
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(data),
		};

		fetch(requestUrl, options)
        .then(response => {
            if (response.status === 200) {
				this.props.router.reload();
			} else if (response.status === 302) {
				this.setAlert("You were not friends", "");
			} else if (response.status === 300) {
				this.props.setAlert("User id invalid!","");
			} else {
				throw Error(response.statusText);
			}
		})
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		});	
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
							setResult={this.setSearchResult.bind(this)}
							setAlert={this.setAlert.bind(this)}
							
							enableLoading={this.props.enableLoading}
							disableLoading={this.props.disableLoading}
						/>
						<Content 
							data={this.state.contentData}
							setAlert={this.setAlert.bind(this)}
							acceptRequest={this.acceptRequest.bind(this)}
							declineRequest={this.declineRequest.bind(this)}
							removeFriend={this.removeFriend.bind(this)}
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