import React from 'react'
import Link from 'next/link'

import FriendList from './friendList'
import Request from './request'
import Search from './search'
import { Button } from 'react-bootstrap'

import styles from '../../styles/Sidebar.module.css'

export default class Sidebar extends React.Component {
	handleAccept() {}

	handleDelete() {}

	handleUnfriend() {}

	render() {
		const getFriends = (e) => {
			const requestUrl = 'http://localhost:2333/api/friends/get_friends_for_user'
			const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include', // Everything account related
				body: JSON.stringify(this.state.formData),
			}
		}

		return (
			<>
				<div className={styles.all}>
					<div className={styles.sidebar}>
						<ul className={styles.sideMenu}>
							<h4 className="mt-3">Friend Requests</h4>
							<div>
								{Request.map((item, index) => {
									return (
										<li key={index} className={item.class}>
											<h6 className={styles.item}>{item.name}</h6>{' '}
											<div className={styles.btn}>
												<Button
													size="sm"
													variant="info"
													className="mr-3">
													Accept
												</Button>

												<Button
													size="sm"
													variant="secondary"
													className="">
													Decline
												</Button>
											</div>
										</li>
									)
								})}

								<hr className={styles.solid}></hr>
							</div>

							<h4 className="mt-3">Friends</h4>

							{FriendList.map((item, index) => {
								return (
									<li key={index} className={item.class}>
										<Link href={item.path}>{item.name}</Link>
										<div>
											<Button
												size="sm"
												variant="danger"
												className="mr-3">
												Unfriend
											</Button>
										</div>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</>
		)
	}
}
