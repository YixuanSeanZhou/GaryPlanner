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
			user_profile: {}
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}

	// Search friends api


	handleChange(e) {
		this.setState({
			search: e.target.value,
			showResult: false,
		})
	}

	handleAdd() {}

	handleSearch() {
		const searchFriendsUrl = "http://localhost:2333/api/friends/find_user?name=" + `${this.state.search}`;
	
		console.log(searchFriendsUrl)		
		const options = {
			method: 'GET',
			credentials: 'include',
		};
		fetch(searchFriendsUrl, options)
        .then(response => {

            if (response.status == 200) {
				// this.setState({user_found : true})
				return response.json();
			}
			throw Error(response.statusText);
        })
		.then(data => {
				console.log('Success:', data); // TODO: Remove for deployment
				this.setState({user_profile: data.result});
		})
		.catch((error) => {
			console.error('Error:', error);
			this.props.router.push('util/error');
		});

		this.setState({
			showResult: true,
		})

		
	}

	render() {
		let libData = []
		//let name = ""
		// const searchKey = this.state.search.trim().toLowerCase()

		if (this.state.search == this.state.user_profile.user_name){
			//libData.push(this.state.libraries.user_name)
			libData[0] = this.state.user_profile
		}

		const Result = () => (
			<ul className={styles.ul}>
						<li className={styles.item}>
							<div>{libData[0]}</div>
							<div className={styles.btn}>
								<Button size="sm" variant="warning">
									Add
								</Button>
							</div>
						</li>
			</ul>
		)

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
					{this.state.showResult ? <Result /> : null}
				</InputGroup>
			</div>
		)
	}
}

export default withRouter(Search);
