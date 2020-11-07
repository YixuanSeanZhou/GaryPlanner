import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Register.module.css'

export default function Login() {
	return (
		<div className={styles.outer}>
			<div className={styles.middle}>
				<div className={styles.login}>
					<FormGroup style={{ display: 'flex', alignItems: 'center' }}>
						<a href="/">
							<Image
								id="loginlogo"
								src="/images/logo2.png"
								height="70"
								width="49"
								alt="logo"
								className="mt-2"
							/>
						</a>
						<h3 className="mt-3 ml-1" style={{ paddingLeft: '10px' }}>
							Gary <br /> Planner
						</h3>
					</FormGroup>

					<h3>Log in</h3>
					<Form>
						<FormGroup>
							<Label htmlFor="username">Username</Label>
							<Input type="text" id="username" name="username" />
						</FormGroup>

						<FormGroup>
							<Label htmlFor="passowrd">Passowrd</Label>
							<Input type="password" id="password" name="password" />
						</FormGroup>

						<FormGroup check>
							<Label check>
								<Input type="checkbox" name="remeber" />
								Remember me
							</Label>
						</FormGroup>

						<FormGroup className="mt-2">
							<FormText style={{ fontSize: '.85rem' }}>
								New to GaryPlanner?{' '}
								<a href="/Signup" style={{ color: '#0067b8' }}>
									Create an account
								</a>
							</FormText>
						</FormGroup>
						<div style={{ textAlign: 'right' }}>
							<Button
								type="submit"
								value="submit"
								className="bg-orange mt-3">
								Login
							</Button>{' '}
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}
