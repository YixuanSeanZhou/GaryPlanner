import React from 'react'
import { Navbar, Container, Row, Col, NavDropdown, Nav } from 'react-bootstrap'
import Link from 'next/link'


export class HomeNav extends React.Component {

    render() {
        return (
            <Navbar variant='dark' sticky="top" className="navbar" style={{backgroundColor: "#061d3d"}}>
                <Link href='/' >
                    <Navbar.Brand className='link'>
                        <img src="/logo/PCLogo-Color.svg" alt="Logo of gary planner" className="navbarLogo" />
                        Gary Planner
                    </Navbar.Brand>
                </Link>
                {this.props.children}
                <Nav className="ml-auto">
                    <NavDropdown className="ml-auto mr-5" title="Yixuan"  alignRight flip >
                        <NavDropdown.Item href="/userProfile">View Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/">Friends</NavDropdown.Item>
                        <NavDropdown.Item href="setting">Change Passoword</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/intro">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}