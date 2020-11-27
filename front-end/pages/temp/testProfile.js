// React and Next
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'

// Components
import { GaryNavbar } from '../../components/commonUI'
import { Button, Form, Navbar, Spinner } from 'react-bootstrap';
import styles from "../../styles/UserProfile.module.css"

function loadingPage() {
    return (
        <h1>Loading</h1>
    );
}


class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            is_loading: true,
            user_name: "Loading...",
            email: "Loading...",
            first_name: "Loading...",
            last_name: "Loading...",
            college: "Loading...",
            intended_grad_quarter: "Loading...",
            major: "Loading...",
            minor: "Loading...",
        }
    }

    componentDidMount() {
        // Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/get_user_profile';
		const options = {
            method: 'GET',
            credentials: 'include',
		};

		fetch(requestUrl, options)
        .then(response => {

            if (response.status == 200) {
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
            this.setState({
                is_loading: false,
            })

        })
		.catch((error) => {
			console.error('Error:', error);
        });
    }

    handleClick = (e) => {
        // Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/logout';
		const options = {
            method: 'POST',
            credentials: 'include',
		};

		fetch(requestUrl, options)
        .then(response => {

            if (response.status == 200) {
				// User successfully created
				// TODO: Prompt Success
                this.props.router.push("/login");
			} else if (response.status == 403) {
                this.setState({
                    user_name: "Not Logged in!",
                })
                throw Error(response.statusText);
			}	

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
                        <h2 >Hello, {this.state.user_name}</h2>
                        Major
                        <p>{this.state.major}</p>
                        Minor
                        <p>{this.state.minor}</p>
                        Email
                        <p>{this.state.email}</p>
                        College
                        <p>{this.state.college}</p>
                        Intended Graduate Quarter
                        <p>{this.state.intended_grad_quarter}</p>
                        <br />     
                        <Button onClick={this.handleClick}>Logout</Button>               
                    </section>
                </div>
                <loadingPage />
            </>
        );    
    }
};



export default withRouter(UserProfile);