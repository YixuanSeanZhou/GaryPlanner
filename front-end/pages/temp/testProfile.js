// React and Next
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

// Components
import { GaryNavbar } from '../../components/commonUI'
import { Button, Form, Navbar } from 'react-bootstrap';
import styles from "../../styles/UserProfile.module.css"

import Cookies from 'js-cookie';

export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user_name: "Loading...",
            email: "Loading...",
            first_name: "Loading...",
            last_name: "Loading...",
        }
    }

    componentDidMount() {
        // Options for the fetch request
        console.log(Cookies.get('session'))
		const requestUrl = 'http://localhost:2333/api/users/get_user_profile';
		const options = {
            method: 'GET',
            credentials: 'include',
		};

		fetch(requestUrl, options)
        .then(response => {

            if (response.status == 200) {
				// User successfully created
				// TODO: Prompt Success
                return response.json()
			} else if (response.status == 403) {
                this.setState({
                    user_name: "Not Logged in!",
                })
                throw Error(response.statusText);
			}	

        })
        .then(data => {
            console.log('Success:', data); // TODO: Remove for deployment

            this.setState(data.result);

        })
		.catch((error) => {
			console.error('Error:', error);
        });
    }

    render() {
        return (
            <>
                <Head>
                    <title>User Profile</title>
                </Head>
    
                <GaryNavbar>
                    <Navbar.Text>
                        User Profile
                    </Navbar.Text>
                </GaryNavbar>
                
                <div className={styles.main}>
                    <section >
                        <h2 > {this.state.user_name}</h2>
                        Major
                        <p>xxx</p>
                        Minor
                        <p>xxx</p>
                        Email
                        <p>{this.state.email}</p>
                        College
                        <p>Warren</p>
                        PID
                        <p>A******</p>
                        Intended Graduate Quarter
                        <p>xxx</p>
                        <br />                       
                        
                    
                </section>
                </div>
            </>
        );    
    }
};