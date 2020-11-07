// React and Next
import React from 'react'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI';
import { Nabvar, Navbar } from 'react-bootstrap';


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
                </GaryNavbar>

                <div>
                    Empty Page right now.
                </div>
            </>
        )
    }
}