import React from 'react'
import Link from 'next/link'
import Search from './search'
import { Button } from 'react-bootstrap'
import { withRouter, useRouter } from 'next/router'

import styles from '../../styles/Friends.module.css'


class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			friends: [],
		   requests: []
		}
	}

	handleFriendClick(e) {
		this.props.setCurrentProfile(true, e.target.id);
	}

	handleRequestClick(e) {
		this.props.setCurrentProfile(false, e.target.id);
	}

	render() {
		let requestList = undefined;
		let friendList = undefined;

		if (this.props.requests === undefined || this.props.requests.length === 0) {
			requestList = <></>;
		} else {
			// List of Requests
			requestList = <>
				<h4>Friend Requests</h4>
				<div>
					{this.props.requests.map((item, index) => {
						return (
							<div 
								key={index} 
								className={styles.requestListItem}
								id={item.request_id}
								onClick={this.handleRequestClick.bind(this)}
							>
								From: {item.user_name}
							</div>
						)
					})}

					<hr className={styles.solid}></hr>
				</div>
			</>
		}

		if (this.props.friends === undefined || this.props.friends.length === 0) {
			friendList = <>
				<div>Use the search bar to add friends.</div>
			</>
		} else {
			// List of Friends
			friendList = <>{
				this.props.friends.map((item, index) => {
					return (
						<div 
							key={index} 
							className={styles.friendListItem}
							id={item.id}
							onClick={this.handleFriendClick.bind(this)}
						>
							{item.user_name}
						</div>
					)
				})
			}</>;

		}
		
		return (
			<>
				<div className={styles.sidebar}>

					{requestList}

					<h4 className="mt-3">Friends</h4>

					{friendList}
				</div>
			</>
		)
	}
}

export default withRouter(Sidebar);