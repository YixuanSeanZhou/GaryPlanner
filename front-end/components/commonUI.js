import React from 'react'
import { Navbar, Container, Row, Col, Nav, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'
import Particles from 'react-particles-js'


export class GaryNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showUser: this.props.showUser,
            first_name: this.props.first_name,
        }

    }

    render() {
        let navBarChild = undefined;
        if (this.state.showUser === true) {
            navBarChild = <>
                {this.props.children}
                <Nav className="ml-auto">
                    <Navbar.Text>Welcome,</Navbar.Text>
                    <NavDropdown className="ml-auto" title="Yixuan" alignRight>
                        <NavDropdown.Item href="/userProfile">
                            Edit Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
                        <NavDropdown.Item href="changePass">
                            Change Passoword
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/intro">
                        <span style={{ textDecoration: 'underline' }}>Log out</span>
                    </Nav.Link>
                </Nav>
            </>;
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