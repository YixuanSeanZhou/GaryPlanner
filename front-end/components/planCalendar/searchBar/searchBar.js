import React from 'react';

import { Form, Button, InputGroup } from 'react-bootstrap'


import styles from '../../../styles/SearchBar.module.css'

export class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: '',
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange = (e) =>  {
		this.setState({
			search: e.target.value,
		})
	}

	render() {
		return (
			<div className={styles.bar}>
				<h4 className={styles.searchTitle}>Search for a Class</h4>
				<InputGroup>
					<Form.Control
						type="text"
						placeholder="e.g. CSE 110"
						value={this.state.search}
						onChange={(e) => this.handleChange(e)}
					/>

					<InputGroup.Append>
						<Button onClick={(e) => this.props.handleSearch(this.state.search)}>
							Search
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</div>
		)
	}
}