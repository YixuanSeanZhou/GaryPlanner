import Head from 'next/head'
import HomeNav from '../components/homeNav'
import { Navbar } from 'react-bootstrap';

export default function Friends() {
	return (
        <>
            <Head>
                <title>Friends</title>
            </Head>

            <HomeNav>
                <Navbar.Text>Friends</Navbar.Text>
            </HomeNav>

            <div>
                <h1></h1>
            </div>
        </>
	)
}