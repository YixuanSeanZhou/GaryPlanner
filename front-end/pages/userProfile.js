// React and Next
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Navbar } from 'react-bootstrap';

export default function UserProfile() {
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
        </>
    )
}