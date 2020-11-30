import Head from 'next/head'
import React from 'react'
// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EvaluationsList from '../components/eval/evaluationsList';

//export default function Class_info() {

var classDec = {id:1, name: 'CSE110', descriptions: 'Introduction to software development and engineering methods, including specification, design, implementation, testing, and process. An emphasis on team development, agile methods, and use of tools such as IDE’s, version control, and test harnesses. Prerequisites: CSE 100; restricted to students with junior or senior standing within the CS25, CS26, CS27, CS28, and EC26 majors. All other students will be allowed as space permits.'}
var evaluations = [{id:1, quarter: 'Winter 2020', name: 'Gary Gillespie', unit: '4', expGPA: 'B+', actGPA: 'A', hours: "10hr/week"}, 
    {id:2, quarter: 'Fall 2019', name: 'Niema Moshiri', unit: '4', expGPA: 'A', actGPA: 'A', hours: "10hr/week"},
    {id:3, quarter: 'Spring 2019', name: 'Gary Gillespie', unit: '4', expGPA: 'B+', actGPA: 'A', hours: "10hr/week"},
    {id:4, quarter: 'Winter 2019', name: 'Niema Moshiri',  unit: '4',expGPA: 'A-', actGPA: 'A', hours: "10hr/week"},
    {id:5, quarter: 'Fall 2018', name: 'Niema Moshiri', unit: '4', expGPA: 'A', actGPA: 'A', hours: "10hr/week"},
    {id:6, quarter: 'Spring 2018', name: 'Gary Gillespie', unit: '4', expGPA: 'A-', actGPA: 'A', hours: "10hr/week"}]

export default class ClassInfo extends React.Component {
    render() {
        return (
			<>
				<Head>
					<title>ClassInfo</title>
				</Head>

				<GaryNavbar showUser={true}>
					<Navbar.Text>Class Information</Navbar.Text>
				</GaryNavbar>
				<Container>
					<h1 className="text-center">{classDec.name}</h1>
					<p className="text-center">{classDec.descriptions}</p>

					<EvaluationsList evaluations={evaluations} />
				</Container>
			</>
		)
    };
};