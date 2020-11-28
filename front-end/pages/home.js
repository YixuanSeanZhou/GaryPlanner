// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import HomeNav from '../components/homeNav'
import {SearchBar} from '../components/planCalendar/searchBar/searchBar'
import { Navbar, Jumbotron, Button, Modal } from 'react-bootstrap'
import Request from '../components/requestPlan'
import EvaluationsList from '../components/eval/evaluationsList';

import styles from '../styles/Intro.module.css'

export default function Home() {
	const evaluations = [{id:1, quarter: 'Winter 2020', name: 'Gary Gillespie', unit: '4', expGPA: 'B+', actGPA: 'A', hours: "10hr/week"}, 
    {id:2, quarter: 'Fall 2019', name: 'Niema Moshiri', unit: '4', expGPA: 'A', actGPA: 'A', hours: "10hr/week"},
    {id:3, quarter: 'Spring 2019', name: 'Gary Gillespie', unit: '4', expGPA: 'B+', actGPA: 'A', hours: "10hr/week"},
    {id:4, quarter: 'Winter 2019', name: 'Niema Moshiri',  unit: '4',expGPA: 'A-', actGPA: 'A', hours: "10hr/week"},
    {id:5, quarter: 'Fall 2018', name: 'Niema Moshiri', unit: '4', expGPA: 'A', actGPA: 'A', hours: "10hr/week"},
    {id:6, quarter: 'Spring 2018', name: 'Gary Gillespie', unit: '4', expGPA: 'A-', actGPA: 'A', hours: "10hr/week"}]

	const [modalShow, setModalShow] = React.useState(false);
	
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>

			<HomeNav>
				<Navbar.Text>Home</Navbar.Text>
			</HomeNav>

			<div className="intro">
				<div className="content">
					<div className="col-6">
						<h3>Yixuan Zhou</h3>
						<div className="container">
							<div className="row">
								<h6>Major: Computer Science</h6>
							</div>
							<div className="row">
								<h6>Minor: P.I.G.</h6>
							</div>
							<div className="row">
								<h6>College: Sixth</h6>
							</div>
						</div>
						<div className="mt-4">
							<h4>Four Year Plan</h4>
							<Button
								variant="warning"
								href="/fourYearPlan"
								className="mr-4">
								View
							</Button>
							<Button variant="outline-warning" onClick={() => setModalShow(true)}>
								Request
							</Button>
						</div>
					</div>

				</div>
			</div>

			<div className="content">
				<h1 className="text-center mt-5">Checkout classes you want to take</h1>
				<div className="container">
					<SearchBar /> 
					<EvaluationsList evaluations={evaluations} />

				</div>
			</div>

			<Request show={modalShow} onHide={() => setModalShow(false)} />
		</>
	)

}
