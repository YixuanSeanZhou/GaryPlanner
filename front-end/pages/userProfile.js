// React and Next
import Head from 'next/head'
import Link from 'next/link'
// Components
import { GaryNavbar } from '../components/commonUI'
import { Button, Form, Navbar } from 'react-bootstrap';
import styles from "../styles/UserProfile.module.css"
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
            
            <div className={styles.main}>
                <img src="public/logo/PCLogo-Color.svg"  width="256" height="256" />
                <section >
                    <div >
                        <h2>user_name</h2>
                    </div>
                    Major
                    <p>xxx</p>
                    Minor
                    <p>xxx</p>
                    Email
                    <p>xxx@xxx</p>
                    College
                    <p>Warren</p>
                    PID
                    <p>A******</p>
                    Intended Graduate Quarter
                    <p>Spring2021</p>
                    <br />
                    <div >
                    <Link href="/setting">
                        <Button variant="primary">Edit Profile</Button>
                    </Link>
                    <Link href="/ChangePass">
                        <Button variant="primary">Change Password</Button>
                    </Link>
                    </div>
                   
                    
                
            </section>
            </div>
        </>
    );
};