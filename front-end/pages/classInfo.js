import Head from 'next/head'
import React from 'react'
// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EvaluationsList from '../components/eval/evaluationsList';

//export default function Class_info() {

var classDec = {id:1, name: 'CSE110', descriptions: 'Introduction to software development and engineering methods, including specification, design, implementation, testing, and process. An emphasis on team development, agile methods, and use of tools such as IDE’s, version control, and test harnesses. Prerequisites: CSE 100; restricted to students with junior or senior standing within the CS25, CS26, CS27, CS28, and EC26 majors. All other students will be allowed as space permits.'}
var evaluations = [{id:1, quarter: 'Winter 2020', name: 'Gary Gillespie', expGPA: 'B+'}, 
    {id:2, quarter: 'Spring 2019', name: 'Yixuan Zhou', expGPA: 'B+'},
    {id:3, quarter: 'Spring 2019', name: 'Yixuan Zhou', expGPA: 'B+'},
    {id:4, quarter: 'Spring 2019', name: 'Yixuan Zhou', expGPA: 'B+'},
    {id:5, quarter: 'Spring 2019', name: 'Yixuan Zhou', expGPA: 'B+'},
    {id:6, quarter: 'Spring 2019', name: 'Yixuan Zhou', expGPA: 'B+'}]

export default class ClassInfo extends React.Component {
    render() {
        return (
            <>
                <Head>
                    <title>ClassInfo</title>
                </Head>

                <GaryNavbar>
                    <Navbar.Text>
                    Class Information
                    </Navbar.Text>
                </GaryNavbar>
                <Container>
                    <h1 className="text-center">{classDec.name}</h1>
                    <p className="text-center">{classDec.descriptions}</p>

                <EvaluationsList evaluations={evaluations} />
                </Container>   
            </>
        );
    };
};