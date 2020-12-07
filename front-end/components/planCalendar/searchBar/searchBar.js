import React from 'react';

import { Form } from 'react-bootstrap'


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
		if (this.state.search.length < 2) {
			return;
		}
		this.props.handleSearch(e.target.value);
	}

	render() {
		return (
			<div className={styles.bar}>
				<h3>Search Classes</h3>
				<Form onSubmit={e => e.preventDefault()}>
					<Form.Control
						type="text"
						placeholder="e.g. CSE 110"
						value={this.state.search}
						onChange={this.handleChange}
					/>
				</Form>
			</div>
		)
	}
}