import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useAuth0 } from "@auth0/auth0-react";

// Components
import { GaryNavbar } from '../components/commonUI'
import { Button, Form, Navbar } from 'react-bootstrap'

// Styles
import styles from "../styles/Login.module.css"

export default function Login() {

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <GaryNavbar>
                <Navbar.Text>
                    Authentication 
                </Navbar.Text>
            </GaryNavbar>

            <div className={styles.main}>
                <UserInfoDisplay />
                <GaryLoginButton />
                <GaryLogoutButton />
            </div>
        </>
    );
}

function UserInfoDisplay() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isAuthenticated) {
        return (
            <>
                <h2>
                    Logged in! Congrats!
                </h2>
                <h5>
                    User Name: {user.name}
                </h5>
                <h5>
                    User Email: {user.email}
                </h5>
            </>        
        );
    } else {
        return (
            <h2>User not logged in!</h2>
        );
    }
}


function GaryLoginButton(props) {
    const { loginWithRedirect } = useAuth0();

    return(
        <Button 
            variant="primary" 
            onClick={() => loginWithRedirect()} 
            className={styles.buttons}
        >
            Login
        </Button>    
    );

}


const GaryLogoutButton = () => {
    const { logout } = useAuth0();
  
    return (
      <Button onClick={() => logout({ returnTo: "http://localhost:3000/login"})} className={styles.buttons}>
        Log Out
      </Button>
    );
  };
  