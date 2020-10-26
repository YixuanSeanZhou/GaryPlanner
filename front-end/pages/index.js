import Link from 'next/link'
import Head from 'next/head'

export default function Hello() {
    return (
        <>
            <Head>
                <title>Starter Code</title>
            </Head>

            <h1>Hi this is the starter code for Gary Planner.</h1>
            <h2>Please click <Link href='/start'><a>Link</a></Link> to see the generated example page.</h2>

        </>
    )
}