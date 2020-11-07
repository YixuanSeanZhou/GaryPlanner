import React from 'react'
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavbarToggler,
	Collapse,
	NavItem,
	NavLink,
	Jumbotron,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormGroup,
	Form,
	Input,
	Label,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'
import Image from 'next/image'

export default function Header() {
	return (
		<div>
			<Navbar dark expand="md">
				<NavbarBrand className="mr-1 ml-2" href="/">
					<Image
						src="/images/logo2.png"
						width="42"
						height="60"
						alt="logo"
						className="ml-4 mt-1"
					/>
					<h6 className="mt-1 " style={{ paddingTop: '10px' }}>
						Gary Planner
					</h6>
				</NavbarBrand>

				<Collapse navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink className="nav-link" href="/">
								Home
							</NavLink>
						</NavItem>

						<NavItem>
							<NavLink className="nav-link" href="/About">
								About
							</NavLink>
						</NavItem>

						<NavItem>
							<NavLink className="nav-link" href="/Contact">
								Contact
							</NavLink>
						</NavItem>

						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Build
							</DropdownToggle>
							<DropdownMenu left>
								<NavLink className="nav-link" href="/Plan">
									<DropdownItem>Four Year Plan</DropdownItem>
								</NavLink>

								<DropdownItem divider />
								<NavLink className="nav-link" href="/Schedule">
									<DropdownItem>Quarter Schedule</DropdownItem>
								</NavLink>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>

				<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink className="nav-link" href="/Login">
							<Button className="bg-orange">
								<span className="fa fa-sign-in fa-lg">Login</span>
							</Button>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="nav-link" href="/Signup">
							<Button className="bg-tiffany">
								<span className="fa fa-sign-up fa-lg">Signup</span>
							</Button>
						</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	)
}
