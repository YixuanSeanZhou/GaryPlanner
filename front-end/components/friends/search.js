import React from 'react'

import { Form, Button, InputGroup } from 'react-bootstrap'

import styles from '../../styles/Friends.module.css'
import { withRouter } from 'next/router'

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: '',
			showResult: false,
			requestSent: false,
			user_profile: undefined
		}

	}

	// Search friends api


	handleChange(e) {
		this.setState({
			search: e.target.value,
			showResult: false,
			requestSent: false,
		})
	}


	handleSearch() {
		const searchFriendsUrl = "http://localhost:2333/api/friends/find_user?name=" + `${this.state.search}`;
	
		console.log(searchFriendsUrl)		
		const options = {
			method: 'GET',
			credentials: 'include',
		};

		fetch(searchFriendsUrl, options)
        .then(response => {
			console.log(response);
			console.log(response.status);
            if (response.status === 200) {
				return response.json();
			} else if (response.status === 300) {
				this.props.setAlert("User not found", "Plase check your username or email.")
			} else {
				throw Error(response.statusText);
			}
        })
		.then(data => {
			if (data !== undefined) {
				console.log('Success:', data); // TODO: Remove for deployment
				this.props.setResult(true, data.result);
			} else {
				this.props.setResult(false, undefined);
			}
		})
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		});
	}

	render() {


		// var Result = undefined;
		// if (this.state.user_found) {
		// 	const profile = this.state.user_profile;
		// 	var addButton = undefined;
		// 	if (this.state.requestSent === false) {
		// 		addButton = <Button size="sm" variant="warning" onClick={this.handleAdd.bind(this)}>
		// 				Add
		// 			</Button>;
		// 	} else {
		// 		addButton = <Button size="sm" variant="secondary">
		// 				Request Sent!
		// 			</Button>;
		// 	}
		// 	console.log(this.state);

		// 	Result = <ul className={styles.ul}>
		// 				<li className={styles.item}>
		// 					<div>{profile.user_name}</div>
		// 					<div className={styles.btn}>
		// 						{addButton}
		// 					</div>
		// 				</li>
		// 			</ul>;

		// } else {
		// 	Result = <ul className={styles.ul}>
		// 	<li className={styles.item}>
		// 		<div>User Not Found!</div>
		// 	</li>
		// </ul>;
		// }

		return (
			<div className={styles.bar}>
				<h4 className={styles.searchTitle}>Search New Friend</h4>
				<InputGroup>
					<Form.Control
						type="text"
						placeholder="User name/Email"
						value={this.state.search}
						onChange={(e) => this.handleChange(e)}
					/>

					<InputGroup.Append>
						<Button onClick={() => this.handleSearch()}>
							Search
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</div>
		)
	}
}



export default withRouter(Search);
