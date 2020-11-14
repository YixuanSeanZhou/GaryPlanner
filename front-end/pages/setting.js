import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI';
import { Form,Button, Navbar } from 'react-bootstrap';
import styles from "../styles/Login.module.css"

export default class setting extends React.Component {

    render() {
        return (
            <>
                <Head>
                    <title>Settings</title>
                </Head>

                <GaryNavbar>
                    <Navbar.Text>
                        Settings
                    </Navbar.Text>
                </GaryNavbar>

                <div className={styles.main}>
                <Form>
                    <Form.Group controlId='FirstName' >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="load from data" />
                    </Form.Group>
                    <Form.Group controlId='LastName' >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="load from data" />
                    </Form.Group>
                    <Form.Group controlId='Major' >
                        <Form.Label>Major</Form.Label>
                        <Form.Control type="text" placeholder="load from data" />
                    </Form.Group>
                    <Form.Group controlId='Minor' >
                        <Form.Label>Minor</Form.Label>
                        <Form.Control type="text" placeholder="load from data" />
                    </Form.Group>
                    <Form.Group controlId='IntendedGradQuarter' >
                        <Form.Label>Intended Graduate Quarter</Form.Label>
                        <Form.Control type="text" placeholder="load from data" />
                    </Form.Group>
                    <Form.Group controlId='Profile picture' >
                        <Form.File id="exampleFormControlFile1" label="Profile Picture" />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type='save'>Save</Button>
                </Form>
            </div>
            </>
        )
    }
}