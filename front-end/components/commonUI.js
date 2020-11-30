import React from 'react'
import { Navbar, Container, Row, Col, Nav, NavDropdown, Button } from 'react-bootstrap'
import Link from 'next/link'
import Particles from 'react-particles-js'


export class GaryNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showUser: this.props.showUser,
            first_name: 'Loading...',
        }

    }

    handleLogout = () => {
		const requestUrl = 'http://localhost:2333/api/users/logout';
		const options = {
            method: 'POST',
            credentials: 'include',
		};

		fetch(requestUrl, options)
        .then(response => {

            if (response.status == 200) {
				// Logged out
                this.props.router.push("/intro");
			} else if (response.status == 403) {
                this.setState({
                    first_name: "Not Logged in!",
                })
                throw Error(response.statusText);
			}
        })
		.catch((error) => {
			console.error('Error:', error);
        });
    }

    componentDidMount() {
		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/get_user_profile'
		const options = {
			method: 'GET',
			credentials: 'include',
		}

		fetch(requestUrl, options)
			.then((response) => {
				if (response.status == 200) {
					// TODO: Prompt Success
					return response.json()
				} else if (response.status == 403) {
					this.setState({
						user_name: 'Not Logged in!',
					})
					throw Error(response.statusText)
				}
			})
			.then((data) => {
				console.log('Success:', data) // TODO: Remove for deployment

				this.setState(data.result)
				this.setState({
					is_loading: false,
				})
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

    render() {
        let navBarChild = undefined;

        if (this.state.showUser === true) {
            navBarChild = (
				<>
					{this.props.children}
					<Nav className="ml-auto">
						<Navbar.Text>Welcome,</Navbar.Text>
						<NavDropdown
							className="ml-auto"
							title={this.state.first_name}
							alignRight>
							<NavDropdown.Item href="/userProfile">
								Edit Profile
							</NavDropdown.Item>
							<NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
							<NavDropdown.Item href="changePass">
								Change Passoword
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link href="/intro"  >
                            <a onClick={this.handleLogout}><span style={{ textDecoration: 'underline' }}>Log out</span></a>
						</Nav.Link>
					</Nav>
				</>
			)
        } else {
            navBarChild = this.props.children;
        }

        return (
            <Navbar bg="#061d3d" variant='dark' sticky="top" className="navbar" style={{backgroundColor: "#061d3d"}}>
                <Link href='/' >
                    <Navbar.Brand className='link'>
                        <img src="/logo/PCLogo-Color.svg" alt="Logo of gary planner" className="navbarLogo" />
                        Gary Planner
                    </Navbar.Brand>
                </Link>
                {navBarChild}
            </Navbar>
        )
    }
}


export function ParticleEffect(props) {
    return (
        <Particles
            params={
                {
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
                }
            }
            {...props}
        />

    )
}