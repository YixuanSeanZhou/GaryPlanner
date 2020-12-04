import React from 'react'
import Link from 'next/link'
import Search from './search'
import { Button } from 'react-bootstrap'
import { withRouter, useRouter } from 'next/router'

import styles from '../../styles/Sidebar.module.css'


class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			friends: [{}],
		   requests: [{}]
		}
	}

	//Api connections:

	// componentDidMount() {
    //     // Options for the fetch request
	// 	const friendListAndRequestUrl = "http://localhost:2333/api/friends/get_friends_for_user";		
	// 	const options = {
	// 		method: 'GET',
	// 	};
	// 	fetch(friendListAndRequestUrl, options)
    //     .then(response => {

    //         if (response.status == 200) {
	// 			return response.json()
	// 		}
	// 		throw Error(response.statusText);	
	// 		// return Promise.all(response.map(r => r.json()))
    //     })
	// 	.then(data => {
	// 		    console.log('Success:', data); // TODO: Remove for deployment
	// 			this.setState({friends: data.friends, requests: data.requests});
	// 	})
	// 	.catch((error) => {
	// 		console.error('Error:', error);
	// 		this.props.router.push('util/error');
	// 	});
	// }


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
								{this.state.requests.map((item, index) => {
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

							{this.state.friends.map((item, index) => {
								return (
									<li key={index} className={item.class}>
										{/* <Link href='/classInfo'>{item.user_name}</Link> */}
										{item.user_name}
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

export default withRouter(Sidebar);