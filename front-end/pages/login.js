import Link from 'next/link'
import Head from 'next/head'
import { GaryNavbar } from '../components/commonUI'

export default function Login() {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <GaryNavbar>
                Login
            </GaryNavbar>

            <p>This is just an empty page right now</p>
        </>
    )
}