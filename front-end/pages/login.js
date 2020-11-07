import Link from 'next/link'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Button, Form, Navbar } from 'react-bootstrap'

// Styles
import styles from "../styles/Login.module.css"

export default function Login() {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <GaryNavbar>
                <Navbar.Text>
                   Login 
                </Navbar.Text>
            </GaryNavbar>

            <div className={styles.main}>
                <Form>
                    <Form.Group controlId='loginName' >
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter User Name" />
                    </Form.Group>
                    <Form.Group controlId='loginPassword' >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type='submit'>Submit</Button>
                </Form>
            </div>
        </>
    )
}