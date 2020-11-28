import React from 'react'
import { Navbar, Container, Row, Col, NavDropdown, Nav } from 'react-bootstrap'
import Link from 'next/link'


export default class HomeNav extends React.Component {
	render() {
		return (
			<>
				<Navbar
					variant="dark"
					sticky="top"
					className="navbar"
					style={{ backgroundColor: '#061d3d' }}>
					<Link href="/">
						<Navbar.Brand className="link">
							<img
								src="/logo/PCLogo-Color.svg"
								alt="Logo of gary planner"
								className="navbarLogo"
							/>
							Gary Planner
						</Navbar.Brand>
					</Link>

					<Nav className="mr-auto">


						{/*
						<NavDropdown className="ml-auto mr-5" title="Yixuan" alignRight>
							<NavDropdown.Item href="/userProfile">
								View Profile
							</NavDropdown.Item>
							<NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
							<NavDropdown.Item href="changePass">
								Change Passoword
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/intro">Logout</NavDropdown.Item>
						</NavDropdown>
						*/}
					</Nav>
					<Nav className="ml-auto">
						<Navbar.Text>
							Welcome, Yixuan |
						</Navbar.Text>
						<Nav.Link href="intro">
							<span style={{textDecoration:"underline"}}>Log out</span>
						</Nav.Link>
					</Nav>
				</Navbar>
				
				
					<Nav className="background-light" varient="tabs">
						<Nav.Link href="home">
							Home
						</Nav.Link>
						<Nav.Link href="/fourYearPlan" >
							Four Year Plan
						</Nav.Link>
						<Nav.Link href="userProfile">
							Profile
						</Nav.Link>
						<Nav.Link href="friends">
							Friend
						</Nav.Link>
						<Nav.Link href="changePass">
							Change Password
						</Nav.Link>
					</Nav>					
				

					
			</>
		)
	}
}