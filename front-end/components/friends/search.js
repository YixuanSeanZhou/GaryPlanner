import React from 'react'

import { Form, Button, InputGroup } from 'react-bootstrap'

import styles from '../../styles/SearchBar.module.css'

export default class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: '',
		}

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e) {
		this.setState({
			search: e.target.value,
		})
	}

	handleAdd() {
		
	}

	render() {

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
						<Button
							value="submit"
							onClick={this.handleAdd}
						>
							Search
						</Button>
					</InputGroup.Append>

				</InputGroup>
			</div>
		)
	}
}
