// React and Next.js
import Link from 'next/link'
import Head from 'next/head'

// Components
import { GaryNavbar } from '../components/commonUI'
import { Navbar } from 'react-bootstrap'

// Styles
import styles from '../styles/Index.module.css'

export default function Index() {
    return (
        <>
            <Head>
                <title>Developer Index</title>
            </Head>

            {/* Here is an example of using a custom components */}
            <GaryNavbar>
                <Navbar.Text>
                    Developer Index
                </Navbar.Text>
            </GaryNavbar>

            <div className={styles.mainContainer}>
                <h1>Developer Index Page</h1>
                <p>
                    <b>Hi</b> this is the developer index for Gary Planner. <br/> 
                    Feel free to use this page as an example for some of the technologies that we are going to use. <br />
                    You can found this page at <code>/pages/index.js</code>.
                </p>    
                <br />
                <h3>Links to pages</h3>                   
                <ul>
                    <li><Link href='/login'><a>Login Page</a></Link></li>
                    <li><Link href='/signup'><a>Signup page</a></Link></li>
                    <li><Link href='/intro'><a>Intro Page(before login)</a></Link></li>
                    <li><Link href='/home'><a>Home Page(after login)</a></Link></li>
                    <li><Link href='/fourYearPlan'><a>4-Year-Plan Page</a></Link></li>
                    <li><Link href='/userProfile'><a>User Profile Page</a></Link></li>
                    <li><Link href='/currQuarter'><a>Current Quarter Schedule</a></Link></li>
                    <li><Link href='/classInfo'><a>Class Information</a></Link></li>
                    <li><Link href='/setting'><a>Settings</a></Link></li>
                    <li><Link href='/changePass'><a>Change Password</a></Link></li>
                </ul>
                <p>Add the link to more pages here...</p>

                <br />
                <h3>Notes</h3>
                <h5>Styling</h5>
                <ul>
                    <li>
                        We are currently using three different ways to handle styles:
                        <ol>
                            <li><
                                b>Global CSS file</b>: the styles in <code>styles/global.css</code> is applied to the entire application.
                            </li>
                            <li>
                                <b>CSS module</b>: Examples can be found in <code>index.js</code>. 
                                Each of these pages have a corresponding <code>.module.css</code> file that is imported to the <code>.js</code> page file.
                            </li>
                            <li>
                                <b>React-bootstrap</b>: this is a great library that have a lot of existing components and 
                                layout presets. Documentation is listed below. 
                            </li>
                        </ol>
                    </li>
                    <li>
                        If a style would be used for the entire project (e.g. button styling), you may put it in <code>global.css</code>.
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

            </div>

        </>
    )
}