import { Button, Jumbotron, NavLink } from 'reactstrap'
import Link from 'next/link'
import Header from '../components/Header'
import Image from 'next/image'

export default function Home() {
	return (
		<div>
			<Header />
			<Jumbotron bg-dark fluid maxWidth="sm">
				<div clasName="container">
					<div className="row row-header">
						<div className="col-12 col-sm-6">
							<h1>GaryPlanner</h1>
							<p>
								GaryPlanner is a tool that helps you organize your class
								schedule while you are in UCSD. We will help you build
								your class schedule in UCSD. Let's get started!
							</p>
						</div>
					</div>
				</div>
			</Jumbotron>

			<div className="">
				<h1 className="text-center">Build your</h1>
				<div className="row">
					<div className="col-6 text-center">
						<NavLink className="nav-link" href="/Plan">
							<Button className="">Four Year Plan</Button>
						</NavLink>
					</div>
					<div className="col-6 text-center">
						<NavLink className="nav-link" href="/Schedule">
							<Button className="">Quarter Schedule</Button>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}
