// React and Next
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Particles from 'react-particles-js';

// Components
import { GaryNavbar } from '../components/commonUI'
import { Form, Button, Navbar } from 'react-bootstrap'

import styles from '../styles/Register.module.css'

export default class ChangePass extends React.Component {
	render() {
		return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar>
					<Navbar.Text>Change Password</Navbar.Text>
				</GaryNavbar>

				<div className={styles.outer}>
				<Particles
                    params={{
                        "particles": {
                        "number": {
                        "value": 90,
                        "density": {
                          "enable": true,
                          "value_area": 2000
                        }
                        },
                        "color": {
                          "value": "#ffffff"
                        },
                        "size": {
                        "value": 2.5
                        }
                    },
                        "interactivity": {
                        "events": {
                        "onhover": {
                        "enable": true,
                        "mode": "repulse"
                        }
                        }
                        }
                    }}/>
					<div className={styles.middle} style={{
                    position: "absolute",
                    top: "20%",
                    left: 0,
                    width: "100%",
                    height: "absolute%"
                }}>
						<div className={styles.login}>
							<Form.Group style={{ display: 'flex', alignItems: 'center' }}>
								<a href="/intro">
									<Image
										id="loginlogo"
										src="/logo/PCLogo-Color.svg"
										height="70"
										width="49"
										alt="logo"
										className=""
									/>
								</a>
								<h3 className="mt-3 ml-1" style={{ paddingLeft: '10px' }}>
									Gary <br /> Planner
								</h3>
							</Form.Group>

							<h3>Change Password</h3>
							<Form>
								<Form.Group>
									<Form.Label htmlFor="username">
										Old Password
									</Form.Label>
									<Form.Control
										type="password"
										id="username"
										name="username"
									/>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="passowrd">
										New Passowrd
									</Form.Label>
									<Form.Control
										type="password"
										id="password"
										name="password"
									/>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="passowrd">
										Confirm Passowrd
									</Form.Label>
									<Form.Control
										type="password"
										id="password"
										name="password"
									/>
								</Form.Group>

								<div style={{ textAlign: 'right' }}>
									<Button
										type="submit"
										value="submit"
										className="bg-orange mt-3">
										Submit
									</Button>{' '}
								</div>
							</Form>
						</div>
					</div>
				</div>
			</>
		)
	}
}
