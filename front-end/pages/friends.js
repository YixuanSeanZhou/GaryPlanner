// React and Next
import Head from 'next/head'
import React from 'react'

// Components
import Sidebar from '../components/friends/sidebar'
import Content from '../components/friends/content'
import Search from '../components/friends/search'

import { GaryNavbar } from '../components/commonUI'
import { Navbar } from 'react-bootstrap'

import styles from '../styles/Friends.module.css'

export default class Friends extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			// Flags for content
			showProfile: false,
			displayFriend: false,
			userFound: false,

			currentProfile: undefined,
			friendProfiles: [],
			requests: [],
		}
	}

	componentDidMount() {
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
		if (isFriend) {
			// Update current profile for friends
			profileObj = this.state.friendProfiles.filter((obj) => obj.id === id);
			this.setState({
				showProfile: true,
				displayFriend: true,
				currentProfile: profileObj
			})
		} else {
			// display profile for the request user
			profileObj = this.state.requests.filter((obj) => obj.request_id === id);
			this.setState({
				showProfile: true,
				displayFriend: false,
				currentProfile: profileObj
			})
		}
	}


	acceptRequest(id) {

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
						/>
					</div>

					<div className={styles.right}>
						<Search />
						<Content 
							showProfile={this.state.showProfile}
							isFriend={this.state.displayFriend}
							userFound={this.state.userFound}
							profile={this.state.currentProfile}
						/>
					</div>
				</div>
			</>
		)
	}
}
