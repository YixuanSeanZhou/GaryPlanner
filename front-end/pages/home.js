// React and Next
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar } from 'react-bootstrap';
import styles from '../styles/Home.module.css';


export default class Home extends React.Component {

    render() {
        return (
            <>
                <Head>
                    <title>Home</title>
                </Head>

                <GaryNavbar>
                    <Navbar.Text>
                        Home
                    </Navbar.Text>
                        <li><Link href='/login'><a>Login Page</a></Link></li>
                        <li><Link href='/login'><a>Login Page</a></Link></li>
                </GaryNavbar>

                <div>
                    Empty Page right now.
                </div>
            </>
        )
    }
}