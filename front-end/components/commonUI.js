import React from 'react'
import { Navbar, Container, Row, Col } from 'react-bootstrap'


export class GaryNavbar extends React.Component {

    render() {
        return (
            <Navbar bg="dark" variant='dark' fixed="top">
                <Navbar.Brand >
                    <img src="/logo/PCLogo-Color.svg" alt="Logo of gary planner" className="navbarLogo" />
                    Gary Planner
                </Navbar.Brand>
                <div className='navbarItem'>
                    {this.props.children}
                </div>
            </Navbar>
        )
    }
}