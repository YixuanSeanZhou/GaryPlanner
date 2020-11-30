import Head from 'next/head'
import React from 'react'
// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EvaluationsList from '../components/eval/evaluationsList';
import { withRouter, useRouter } from 'next/router'

//export default function Class_info() {

class ClassInfo extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
			classDec: {
                prerequisites: " CSE12, CSE100.",
                description: "This is the class description"	
            },
            evaluations: [{id:1, quarter: 'Winter 2020', instructor: 'Gary Gillespie', unit: '4', average_exp_grade: 'B+', average_rec_grade: 'A', hour_per_week: "10hr/week"}, 
            {id:2, quarter: 'Fall 2019', instructor: 'Niema Moshiri', unit: '4', average_exp_grade: 'A', average_rec_grade: 'A', hour_per_week: "10hr/week"},
            {id:3, quarter: 'Spring 2019', instructor: 'Gary Gillespie', unit: '4', average_exp_grade: 'B+', average_rec_grade: 'A', hour_per_week: "10hr/week"}]
		}
    }
    
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
					<h1 className="text-center">{this.props.router.query.class_name}</h1>
					<p className="text-center">{this.state.classDec.description}</p>
                    <p className="text-center">prerequisites: {this.state.classDec.prerequisites}</p>

					<EvaluationsList evaluations={this.state.evaluations} />
				</Container>
			</>
		)
    };
};

export default withRouter(ClassInfo);