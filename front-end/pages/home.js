// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Jumbotron } from 'react-bootstrap';


export default class Home extends React.Component {

    render() {
        return (
			<>
				<Head>
					<title>Home</title>
				</Head>

				<GaryNavbar>
					<Navbar.Text>Home</Navbar.Text>
				</GaryNavbar>

				<div>
					
             <Jumbotron >
                        <h1>Have a more efficient class schedule in UCSD!</h1>
                    </Jumbotron>
                       <div className="container-fluid">  
                    </div>
				</div>
			</>
		)
    }
}