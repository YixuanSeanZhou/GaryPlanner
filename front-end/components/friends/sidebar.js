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

	render() {
		let requestList = undefined;
		let friendList = undefined;

		console.log(this.state.requests);

		if (this.state.requests === undefined || this.state.requests.length === 0) {
			requestList = <></>;
		} else {
			requestList = <>
				<h4>Friend Requests</h4>
				<div>
					{this.state.requests.map((item, index) => {
						return (
							<div key={index} className={item.class}>
								<h6 className={styles.item}>{item.user_name}</h6>{' '}
							</div>
						)
					})}

					<hr className={styles.solid}></hr>
				</div>
			</>
		}

		if (this.state.friends === undefined || this.state.friends.length === 0) {
			friendList = <>
				<div>Use the search bar to add friends.</div>
			</>
		} else {
			friendList = <>{
				this.state.friends.map((item, index) => {
					return (
						<div key={index} className={item.class}>
							{/* <Link href='/classInfo'>{item.user_name}</Link> */}
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