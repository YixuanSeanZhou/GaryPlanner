// React and Next
import { withRouter } from 'next/router';
import React from 'react'

// Components
import { Button } from 'react-bootstrap'

// Styles
import styles from '../../styles/Friends.module.css'
import friendCalendar from '../planCalendar/friendCalendar';
import FriendCalendar from '../planCalendar/friendCalendar'

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
				this.props.setAlert("Don't send a request to yourself!", "");
			} else if (response.status === 302) {
				this.props.setAlert("This user has sent you a request!", "Check your request or friend list");
			} else if (response.status === 303) {
				this.props.setAlert("Request already sent to this user!", "Be patient!");
			} else if (response.status === 305 ) {
				this.props.setAlert("This user is already your friend")
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
				<div className={styles.cardTitle}>
					<h2 className="mt-3 ml-3">Friend's Profile</h2>
					<Button
						size="sm"
						variant="danger"
						className={styles.requestButtons}
						onClick={this.handleUnfriend.bind(this)}
					>
						Unfriend
					</Button>

				</div>
				<div className={styles.profileCardContent}>
					<div className={styles.verticalDisplay}>
						<div className={styles.propertyContainer}>
							<div className={styles.propertyPair}>
								<div className={styles.propertyName}>Name</div>
								<div className={styles.propertyValue}>{profile.first_name} {profile.last_name}</div>
							</div>
							<div className={styles.propertyPair}>
								<div className={styles.propertyName}>User Name</div>
								<div className={styles.propertyValue}>{profile.user_name}</div>
							</div>
							<div className={styles.propertyPair}>
								<div className={styles.propertyName}>Email</div>
								<div className={styles.propertyValue}>{profile.email}</div>
							</div>
							
							<div className={styles.propertyPair}>
								<div className={styles.propertyName}>Major</div>
								<div className={styles.propertyValue}>{profile.major}</div>
							</div>
							
							<div className={styles.propertyPair}>
								<div className={styles.propertyName}>Minor</div>
								<div className={styles.propertyValue}>{profile.minor}</div>
							</div>

						</div>
						{/* enableLoading ={this.props.enableLoading} disableLoading ={this.props.disableLoading}  */}
						<FriendCalendar 
							{...this.props.pageProps} 
							user_id={this.props.data['currentProfile'].id} 
						/>
					</div>

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
					<div className={styles.propertyContainer}>
						<div className={styles.propertyPair}>
							<div className={styles.propertyName}>Name</div>
							<div className={styles.propertyValue}>{profile.first_name} {profile.last_name}</div>
						</div>
						<div className={styles.propertyPair}>
							<div className={styles.propertyName}>User Name</div>
							<div className={styles.propertyValue}>{profile.user_name}</div>
						</div>
						<div className={styles.propertyPair}>
							<div className={styles.propertyName}>Email</div>
							<div className={styles.propertyValue}>{profile.email}</div>
						</div>
					</div>
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
					<div className={styles.propertyContainer}>
						<div className={styles.propertyPair}>
							<div className={styles.propertyName}>Name</div>
							<div className={styles.propertyValue}>{profile.first_name} {profile.last_name}</div>
						</div>
						<div className={styles.propertyPair}>
							<div className={styles.propertyName}>User Name</div>
							<div className={styles.propertyValue}>{profile.user_name}</div>
						</div>
						<div className={styles.propertyPair}>
							<div className={styles.propertyName}>Email</div>
							<div className={styles.propertyValue}>{profile.email}</div>
						</div>
					</div>
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