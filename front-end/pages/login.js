// React and Next
import Image from 'next/image'
import Link from 'next/link'

// Components
import { Form, Button } from 'react-bootstrap'
import { GaryNavbar } from '../components/commonUI'

// Styles
import styles from '../styles/Register.module.css'

export default function Login() {
	return (
		<>
			<GaryNavbar />

			<div className={styles.login}>
				<h3>Log in</h3>
				<Form>
					<Form.Group>
						<Form.Label htmlFor="username">Username</Form.Label>

						<Form.Control type="text" id="username" name="username" />
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="passowrd">Passowrd</Form.Label>
						<Form.Control type="password" id="password" name="password" />
					</Form.Group>

					<Form.Group>
						<Form.Label>
							<Form.Check
								type="checkbox"
								name="remember"
								label="Remember me"
							/>
						</Form.Label>
					</Form.Group>

					<Form.Group className="mt-1">
						<Form.Text style={{ fontSize: '.85rem' }}>
							New to GaryPlanner?{' '}
							<Link href="/signup" >
								<a style={{ color: '#0067b8' }}>
									Create an account
								</a>
							</Link>
						</Form.Text>
					</Form.Group>
					<div style={{ textAlign: 'right' }}>
						<Button
							type="submit"
							value="submit"
							className="bg-orange mt-3">
							Login
						</Button>
					</div>
				</Form>
			</div>
		</>
	)
}
