// React and Next
import Image from 'next/image'
import Link from 'next/link'

// Components
import { Form, Button } from 'react-bootstrap'
import { GaryNavbar } from '../components/commonUI'

// Styles
import styles from '../styles/Register.module.css'

export default function Signup() {
	return (
		<>
			<GaryNavbar />

			<div className={styles.login}>
				<h3>Sign Up</h3>
				<Form>
					<Form.Group>
						<Form.Label htmlFor="username">Username</Form.Label>
						<Form.Control type="text" id="username" name="username" />
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor="username">Email</Form.Label>
						<Form.Control type="text" id="username" name="username" />
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="passowrd">Passowrd</Form.Label>
						<Form.Control type="password" id="password" name="password" />
					</Form.Group>

					<Form.Group>
						<Form.Label htmlFor="passowrd">Confirm password</Form.Label>
						<Form.Control type="password" id="password" name="password" />
					</Form.Group>

					<Form.Group className="mt-1">
						<Form.Text style={{ fontSize: '.85rem' }}>
							Already have an account?{' '}
							<Link href="/login">
								<a className={styles.redirect}>
									Login here
								</a>
							</Link>
						</Form.Text>
					</Form.Group>

					<div style={{ textAlign: 'right' }}>
						<Button
							type="submit"
							value="submit"
							className="bg-orange mt-3">
							Signup
						</Button>{' '}
					</div>
				</Form>
			</div>
		</>
	)	
}
