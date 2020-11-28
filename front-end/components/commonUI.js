import React from 'react'
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import Particles from 'react-particles-js'


export class GaryNavbar extends React.Component {

    render() {
        return (
            <Navbar bg="#061d3d" variant='dark' sticky="top" className="navbar" style={{backgroundColor: "#061d3d"}}>
                <Link href='/' >
                    <Navbar.Brand className='link'>
                        <img src="/logo/PCLogo-Color.svg" alt="Logo of gary planner" className="navbarLogo" />
                        Gary Planner
                    </Navbar.Brand>
                </Link>
                {this.props.children}
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