import Link from 'next/link'
import Head from 'next/head'
// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar } from 'react-bootstrap';

export default function Schedule() {
    return (
        <>
            <Head>
                <title>Plan</title>
            </Head>

            <GaryNavbar>
                <Navbar.Text>
                   Current Quarter Schedule
                </Navbar.Text>
            </GaryNavbar>
        </>
    )
}