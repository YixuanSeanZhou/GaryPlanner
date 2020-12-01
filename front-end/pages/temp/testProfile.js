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
        this.setState(this.props.userProfile);
    }

    render() {
        return (
            <>
                <Head>
                    <title>User Profile</title>
                </Head>
    
                <GaryNavbar userProfile={this.props.userProfile} onLogout={this.props.clearUserProfile}>
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
                    </section>
                </div>
            </>
        );    
    }
};



export default withRouter(UserProfile);