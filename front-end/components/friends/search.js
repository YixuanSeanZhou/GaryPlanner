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
			user_profile: undefined
		}

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
				this.setState({user_found : true});
				this.setState({user_profile: data.rseult});
			}
		})
		.catch((error) => {
			console.log('Error:', error);
			this.props.router.push('util/error');
		});
	}

	render() {
		// let libData = []
		//let name = ""
		// const searchKey = this.state.search.trim().toLowerCase()

		// if (this.state.search == this.state.user_profile.user_name){
		// 	//libData.push(this.state.libraries.user_name)
		// 	libData[0] = this.state.user_profile
		// }

		// const Result = () => (
		// )


		var Result = undefined;
		if (this.state.user_found) {
			Result = <ul className={styles.ul}>
						<li className={styles.item}>
							<div></div>
							<div className={styles.btn}>
								<Button size="sm" variant="warning">
									Add
								</Button>
							</div>
						</li>
					</ul>;

		} else {
			Result = <div>User Not Found!</div>;
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
