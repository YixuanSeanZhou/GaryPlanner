import Link from 'next/link'
import Head from 'next/head'
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import styles from '../styles/devIndex.module.css'

export default function Hello() {
    return (
        <>
            <Head>
                <title>Developer Index</title>
            </Head>

            <Navbar bg="dark" variant='dark' fixed="top">
                <Navbar.Brand >
                    <img src="/logo/PCLogo-Color.svg" alt="Logo of gary planner" className="navbarLogo" />
                    Gary Planner: Developer Index
                </Navbar.Brand>
            </Navbar>

            

            <Container className={styles.mainContainer}>
                <p>Hi this is the developer index for Gary Planner. </p>    
                <h3>Links to pages</h3>                   
                <ul>
                    <li>Please click <Link href='/start'><a>Link</a></Link> to see the example page created by Next.js.</li>
                    <li>Link to <Link href='/login'><a>Login Page</a></Link></li>
                    <li>Link to <Link href='/home'><a>Home Page</a></Link></li>
                    <li>Link to <Link href='/plan'><a>4-Year-Plan Page</a></Link></li>
                </ul>

                <br />
                <h3>Notes</h3>
                <h5>Styling</h5>
                <ul>
                    <li>
                        We are currently using three different ways to handle styles:
                        <ol>
                            <li><b>Global CSS file</b>: the styles in styles/global.css is applied to the entire application.</li>
                            <li><b>CSS module</b>: Examples can be found in index.js as well as start.js. Each of these pages have a corresponding .module.css file that is imported to the .js page file.</li>
                            <li><b>React-bootstrap</b>: this is a great library that have a lot of existing components and layout presets. Documentation is listed below. </li>
                        </ol>
                    </li>
                    <li>
                        If a style would be used for the entire project (e.g. button styling), you may put it in global.css.
                    </li>
                    <li>
                        If a style is page-specific, I would recommend you to put in inside a .module.css file and only import it to the specific page.
                    </li>
                </ul>
                <h5>File directories</h5>
                <ul>
                    <li><b>/pages</b> is where each individual pages are saved.</li>
                    <li><b>/components</b> is where the custome components go.</li>
                    <li><b>/styles</b> is where the stylesheets go.</li>
                    <li><b>/public</b> is where the assets go.</li>
                </ul>

                <br />
                <h3>Link to references and tutorials.</h3>
                <ul>
                    <li><a href="https://react-bootstrap.github.io" target="_blank"> React Bootstrap </a></li>
                </ul>
                <footer className={styles.footer}>Maintained by X</footer>

            </Container>



        </>
    )
}