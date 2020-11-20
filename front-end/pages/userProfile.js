// React and Next
import Head from 'next/head'
import Link from 'next/link'
// Components
import { GaryNavbar } from '../components/commonUI'
import { Button, Form, Navbar, Row, Col } from 'react-bootstrap'
import styles from '../styles/UserProfile.module.css'

export default function UserProfile() {
	return (
		<>
			<Head>
				<title>User Profile</title>
			</Head>

			<GaryNavbar>
				<Navbar.Text>User Profile</Navbar.Text>
			</GaryNavbar>

			<div className={styles.main}>
				<section>
					<div>
						<h2>User Name</h2>
					</div>
					<Form>
						<Form.Label>Major</Form.Label>
						<Form.Group as={Row} controlId="Major">
							<Col>
								<Form.Control
									id="major"
									plaintext
									readOnly
									defaultValue="Computer science"
								/>
							</Col>
							<Col>
								<Button variant="light" id="Edit">
									{' '}
									Edit{' '}
								</Button>
							</Col>
						</Form.Group>
					</Form>
					<Form>
						<Form.Label>Minor</Form.Label>
						<Form.Group as={Row} controlId="Minor">
							<Col>
								<Form.Control id="minor" plaintext defaultValue="Math" />
							</Col>
							<Col>
								<Button variant="light" id="Edit">
									{' '}
									Edit{' '}
								</Button>
							</Col>
						</Form.Group>
					</Form>
					Email
					<p>xxx@xxx</p>
					<Form>
						<Form.Label>College</Form.Label>
						<Form.Group as={Row} controlId="College">
							<Col>
								<Form.Control
									id="college"
									plaintext
									defaultValue="Warren"
								/>
							</Col>
							<Col>
								<Button variant="light" id="Edit">
									{' '}
									Edit{' '}
								</Button>
							</Col>
						</Form.Group>
					</Form>
					PID
					<p>A******</p>
					<Form>
						<Form.Label>Intended Graduate Quarter</Form.Label>
						<Form.Group as={Row} controlId="IntGradYear">
							<Col>
								<Form.Control
									id="intgradyear"
									plaintext
									defaultValue="Spring2022"
								/>
							</Col>
							<Col>
								<Button variant="light" id="Edit">
									{' '}
									Edit{' '}
								</Button>
							</Col>
						</Form.Group>
					</Form>
				</section>
			</div>
		</>
	)
}
