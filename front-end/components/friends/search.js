import React from 'react'

import { Form, Button, InputGroup } from 'react-bootstrap'

import styles from '../../styles/SearchFriends.module.css'

export default class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: '',
			showResult: false,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}

	handleChange(e) {
		this.setState({
			search: e.target.value,
			showResult: false,
		})
	}

	handleAdd() {}

	handleSearch() {
		this.setState({
			showResult: true,
		})
	}

	render() {
		const libraries = [
			{ name: 'QWE', email: 'zxc@123.com' },
			{ name: 'ASD' },
			{ name: 'ZXC' },
			{ name: 'minadsd da' },
			{ name: 'mind was' },
		]
		let libData = []
		const searchKey = this.state.search.trim().toLowerCase()

		if (searchKey && searchKey.length > 0) {
			libData = libraries.filter((i) => {
				return i.name.toLowerCase().match(searchKey)
			})
		}

		const Result = () => (
			<ul className={styles.ul}>
				{libData.map((i, index) => {
					return (
						<li key={index} className={styles.item}>
							<span>{i.name}</span>
							<div className={styles.btn}>
								<Button size="sm" variant="warning">
									Add
								</Button>
							</div>
						</li>
					)
				})}
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
						<Button value="submit" onClick={() => this.handleSearch()}>
							Search
						</Button>
					</InputGroup.Append>
					{this.state.showResult ? <Result /> : null}
				</InputGroup>
			</div>
		)
	}
}
