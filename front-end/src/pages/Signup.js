import { Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Register.module.css'
export default function Signup() {
	return (
		<div className={styles.outer}>
			<div className={styles.middle}>
				<div className={styles.login}>
					<FormGroup style={{ display: 'flex', alignItems: 'center' }}>
						<a href="/">
							<Image
								id="loginlogo"
								src="/images/logo2.png"
								height="80"
								width="56"
								alt="logo"
								className="mt-2"
							/>
						</a>
						<h3 className="mt-3 ml-1" style={{ paddingLeft: '10px' }}>
							Gary <br /> Planner
						</h3>
					</FormGroup>
					<h3>Sign up</h3>
				</div>
			</div>
		</div>
	)
}
