import React from 'react'

import { Form, Button, InputGroup } from 'react-bootstrap'

import styles from '../../styles/SearchFriends.module.css'
import { withRouter, useRouter } from 'next/router'

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

	handleAdd() {
		const profile = this.state.user_profile;
		const requestUrl = "http://localhost:2333/api/friends/request_friend?user_id=" + `${profile.id}`;
	
		console.log(requestUrl)		
		const options = {
			method: 'POST',
			credentials: 'include',
		};

		fetch(requestUrl, options)
        .then(response => {

            if (response.status === 200) {
				this.setState({requestSent: true});
			} else if (response.status === 300) {
			} else {
				throw Error(response.statusText);
			}
        })
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		});

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
				console.log("We are here");
				this.setState({user_found: false});
			} else {
				throw Error(response.statusText);
			}
        })
		.then(data => {
			this.setState({showResult: true});
			if (data !== undefined) {
				console.log('Success:', data); // TODO: Remove for deployment
				this.setState({user_profile: data.result});
				this.setState({user_found : true});
			}
		})
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		});
	}

	render() {


		var Result = undefined;
		if (this.state.user_found) {
			const profile = this.state.user_profile;
			var addButton = undefined;
			if (this.state.requestSent === false) {
				addButton = <Button size="sm" variant="warning" onClick={this.handleAdd.bind(this)}>
						Add
					</Button>;
			} else {
				addButton = <Button size="sm" variant="secondary">
						Request Sent!
					</Button>;
			}
			console.log(this.state);

			Result = <ul className={styles.ul}>
						<li className={styles.item}>
							<div>{profile.user_name}</div>
							<div className={styles.btn}>
								{addButton}
							</div>
						</li>
					</ul>;

		} else {
			Result = <ul className={styles.ul}>
			<li className={styles.item}>
				<div>User Not Found!</div>
			</li>
		</ul>;
		}

		return (
			<div className={styles.bar}>
				<InputGroup>
					<Form.Control
						type="text"
						placeholder="Add Friend"
						value={this.state.search}
						onChange={(e) => this.handleChange(e)}
						className={styles.input}
					/>

					<InputGroup.Append>
						<Button onClick={() => this.handleSearch()}>
							Search
						</Button>
					</InputGroup.Append>
					{this.state.showResult ? Result : <></>}
				</InputGroup>
			</div>
		)
	}
}

export default withRouter(Search);
