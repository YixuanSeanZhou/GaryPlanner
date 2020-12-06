import React from 'react'
import { Navbar, Container, Row, Col, Nav, NavDropdown, Button } from 'react-bootstrap'
import Link from 'next/link'
import Particles from 'react-particles-js'
import { withRouter } from 'next/router';


class GaryNavbar extends React.Component {

    constructor(props) {
        super(props);
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
                this.props.onLogout();
                this.props.router.push("/intro");
                console.log("Logout success!");
			} else if (response.status == 403) {
                this.setState({
                    first_name: "Not Logged in!",
                })
                throw Error(response.statusText);
			}
        })
		.catch((error) => {
            console.error('Error:', error);
            this.props.router.push("/util/error");
        });
    }

    render() {
        let navBarChild = undefined;
        let homeAddress = "/intro";

        if (this.props.userProfile !== undefined) {
            homeAddress = "/home"
            let profile = this.props.userProfile
            navBarChild = (
				<>
					{this.props.children}
					<Nav className="ml-auto">
						<Navbar.Text>Welcome,</Navbar.Text>
						<NavDropdown
							className="ml-auto"
							title={profile.first_name}
							alignRight>
							<NavDropdown.Item href="/userProfile">
								Edit Profile
							</NavDropdown.Item>
							<NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
							<NavDropdown.Item href="/changePass">
								Change Passoword
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link>
                            <div onClick={this.handleLogout}><span style={{ textDecoration: 'underline' }}>Log out</span></div>
						</Nav.Link>
					</Nav>
				</>
			)
        } else {
            navBarChild = this.props.children;
        }

        return (
            <Navbar bg="#061d3d" variant='dark' sticky="top" className="navbar" style={{backgroundColor: "#061d3d"}}>
                <Link href={homeAddress} >
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
let thisComponent = withRouter(GaryNavbar);

export { thisComponent as GaryNavbar };


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