import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import PlanCalendar from '../components/planCalendar/planCalendar'
// Components

import { GaryNavbar } from '../components/commonUI'
import { Navbar } from 'react-bootstrap';

// Styles
import styles from '../styles/FourYearPlan.module.css'

export default class Plan extends React.Component {

    render() {
        return (
            <>
                <Head>
                    <title>Plan</title>
                </Head>

                <GaryNavbar userProfile={this.props.userProfile} onLogout={this.props.clearUserProfile}>
                    <Navbar.Text>
                    Four Year Plan 
                    </Navbar.Text>
                </GaryNavbar>

                <div id="planCalendar" className={styles.mainContainer}>
                    <PlanCalendar />
                </div>
            </>
        )
    }
}