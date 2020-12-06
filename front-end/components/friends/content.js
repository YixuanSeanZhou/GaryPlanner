// React and Next
import { withRouter } from 'next/router';
import React from 'react'

// Components
import { Button } from 'react-bootstrap'

// Styles
import styles from '../../styles/Friends.module.css'

class Content extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			added: false,
		}
	}

	handleAdd() {
		const profile = this.props.data['currentProfile'];
		const data = {
			user_id: profile.id,
		}
		const requestUrl = "http://localhost:2333/api/friends/request_friend";
	
		console.log(requestUrl)		
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
				this.setState({
					added: true,
				});
				setTimeout(() => {
					this.setState({added: false});
				}, 3000)
			} else if (response.status === 301) {
				this.props.setAlert("Don't send request to yourself!", "");
			} else if (response.status === 302) {
				this.props.setAlert("They have sent you a request!", "Check your request list");
			} else if (response.status === 303) {
				this.props.setAlert("Request already sent to this User!", "Be patient!");
			} else {
				throw Error(response.statusText);
			}
        })
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		});

	}

	handleUnfriend() {
		this.props.removeFriend();
	}

	handleAccept() {
		this.props.acceptRequest();
	}

	handleDecline() {
		this.props.declineRequest();
	}


	render() {

		const data = this.props.data;
		var child = undefined
		if (data.showFriend) {
			// Display the profile of the current selected friend
			const profile = data.currentProfile;
			child = <div className={styles.profileCard}>
				<h2 className="mt-3 ml-3">{profile.user_name}</h2>
				<div className={styles.profileCardContent}>
					<h4>Name</h4>
					<div>{profile.first_name} {profile.last_name}</div>
					<br/>
					<h4>Email</h4>
					<div>{profile.email}</div>
					<br/>
					<h4>Major</h4>
					<div>{profile.major}</div>
					<br/>
					<h4>Minor</h4>
					<div>{profile.minor}</div>
					<br/>

					<Button
						size="sm"
						variant="danger"
						className="mt-2"
						onClick={this.handleUnfriend.bind(this)}
					>
						Unfriend
					</Button>
				</div>

			</div>
		} else if (data.showRequest) {
			// Display the profile of an incoming request
			const profile = data.currentProfile;
			child = <div className={styles.profileCard}>
				<div className={styles.cardTitle}>
					<h2 className={styles.cardName}>Friend Request</h2>
					<div className={styles.requestButtons}>
						<Button
							size="sm"
							variant="info"
							className="mr-3"
							onClick={this.handleAccept.bind(this)}
						>
							Accept
						</Button>

						<Button
							size="sm"
							variant="secondary"
							className=""
							onClick={this.handleDecline.bind(this)}
						>
							Decline
						</Button>
					</div>
				</div>
				<div className={styles.profileCardContent}>
					<h4>Username</h4>
					<div>{profile.user_name}</div>
					<br/>
					<h4>Name</h4>
					<div>{profile.first_name} {profile.last_name}</div>
					<br/>
					<h4>Email</h4>
					<div>{profile.email}</div>
				</div>
			</div>
		} else if (data.showFoundUser) {
			// Conditionally renders the button
			var addButton = undefined;
			if (this.state.added === false) {
				addButton = <Button size="sm" variant="warning" onClick={this.handleAdd.bind(this)}>
						Add
					</Button>;
			} else {
				addButton = <Button size="sm" variant="secondary">
						Request Sent!

					</Button>;
			}

			// Display the profile of the found user
			const profile = data.currentProfile;
			child = <div className={styles.profileCard}>
				<div className={styles.cardTitle}>
					<h2 className={styles.cardName}>Found User</h2>
					<div className={styles.requestButtons}>
						{addButton}
					</div>
				</div>
				<div className={styles.profileCardContent}>
					<h4>Username</h4>
					<div>{profile.user_name}</div>
					<br/>
					<h4>Name</h4>
					<div>{profile.first_name} {profile.last_name}</div>
					<br/>
					<h4>Email</h4>
					<div>{profile.email}</div>
				</div>
			</div>
		} else {
			// Not displaying anything
			child = <></>;
		}


		return (
			<div className={styles.contentContainer}>
				{child}
			</div>
		)
	}
}


export default withRouter(Content);