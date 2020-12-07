import Head from 'next/head'
import React from 'react'
// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import EvaluationsList from '../components/eval/evaluationsList';
import { withRouter, useRouter } from 'next/router'
import styles from '../styles/classInfo.module.css';


//export default function Class_info() {

class ClassInfo extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
			classDescriptions: {
                prerequisites: "",
				description: "",
				units: ""	
            },
            evaluations: [{}]
		}
	}

	// classDes's get request 
	componentDidMount() {
		// const params = {
		// 	class_code: "CSE 21"
		// };
        // Options for the fetch request
		const classDesUrl = `http://localhost:2333/api/all_classes/get_class_by_code?class_code=${encodeURIComponent(this.props.router.query.class_name)}`;
		const evalUrl = `http://localhost:2333/api/evaluations/get_evaluation?class_code=${encodeURIComponent(this.props.router.query.class_name)}`;
		
		const options = {
			method: 'GET',
		};

		// TODO: Remove after debugging
		console.log(classDesUrl);
		console.log(evalUrl);

		fetch(classDesUrl, options)
        .then(response => {

            if (response.status == 200) {
				return response.json()
			}
			throw Error(response.statusText);	
			// return Promise.all(response.map(r => r.json()))
        })
		.then(data => {
			    console.log('Success:', data); // TODO: Remove for deployment
				this.setState({classDescriptions: data.result});
		})
		.catch((error) => {
			console.error('Error:', error);
			this.props.router.push('util/error');
		});

		// This is for the eval request
		fetch(evalUrl, options)
        .then(response => {

            if (response.status == 200) {
				return response.json()
			}
			throw Error(response.statusText);	
		})
		.then(data => {
			    console.log('Success:', data); // TODO: Remove for deployment
				this.setState({evaluations: data.result});
		})
		.catch((error) => {
			console.error('Error:', error);
			this.props.router.push('util/error');
		});
	}
	

    
    render() {
        return (
			<>
				<Head>
					<title>ClassInfo</title>
				</Head>

				<GaryNavbar userProfile={this.props.userProfile} onLogout={this.props.clearUserProfile}>
					<Navbar.Text>Class Information</Navbar.Text>
				</GaryNavbar>
				<Container className={styles.container}>
					<h1 className="text-center">{this.props.router.query.class_name} ({this.state.classDescriptions.units} Units)</h1>
                    <h1 className={styles.description}> Description: {this.state.classDescriptions.description}</h1>
					<h1 className={styles.prereq}> Prerequisites: {this.state.classDescriptions.prerequisites}</h1>
					{/* <h1 className={styles.units}> Units: {this.state.classDescriptions.units}</h1> */}
					<EvaluationsList evaluations={this.state.evaluations} />
				</Container>
			</>
		)
    };
};

export default withRouter(ClassInfo);