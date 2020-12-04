import React from 'react'
import Link from 'next/link'
import Search from './search'
import { Button } from 'react-bootstrap'

import styles from '../../styles/Sidebar.module.css'


export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			request: [
				{
					user_name: 'Howie God',
					class: 'side-item',
				},
				{
					user_name: 'xuezheng wang',
					class: 'side-item',
				},
				{
					user_name: 'EE',
					class: 'side-item',
				},
			],
		   FriendList: [
				{
					user_name: 'AB',
					path: '',
					class: 'side-item',
				},
				{
					user_name: 'BB',
					path: '',
					class: 'side-item',
				},
				{
					user_name: 'CC',
					path: '',
					class: 'side-item',
				},
			]
		}
	}

	handleAccept() {}

	handleDelete() {}

	handleUnfriend() {}

	render() {
		const getFriends = (e) => {}

		return (
			<>
				<div className={styles.all}>
					<div className={styles.sidebar}>
						<ul className={styles.sideMenu}>
							<h4 className="mt-3">Friend Requests</h4>
							<div>
								{this.state.request.map((item, index) => {
									return (
										<li key={index} className={item.class}>
											<h6 className={styles.item}>{item.user_name}</h6>{' '}
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

							{this.state.FriendList.map((item, index) => {
								return (
									<li key={index} className={item.class}>
										<Link href={item.path}>{item.user_name}</Link>
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
