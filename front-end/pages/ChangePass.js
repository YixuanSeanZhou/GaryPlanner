// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI';
import { Form,Button, Navbar } from 'react-bootstrap';

import styles from "../styles/ChangePass.module.css"
export default class ChangePass extends React.Component {

    render() {
        return (
            <>
                <Head>
                    <title>Home</title>
                </Head>

                <GaryNavbar>
                    <Navbar.Text>
                        Change Password
                    </Navbar.Text>
                </GaryNavbar>
                
                <div className={styles.main}>
                    <Form>
                        <Form.Group controlId='OldPass' >
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your old passward" />
                        </Form.Group>
                        <Form.Group controlId='NewPass' >
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your new passward" />
                        </Form.Group>
                        <Form.Group controlId='ConfirmPass' >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your new passward again" />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type='ChangePass'>Change Password</Button>
                    </Form>
                </div>
            </>
        )
    }
}