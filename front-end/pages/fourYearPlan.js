import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';

// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Alert } from 'react-bootstrap';
import PlanCalendar from '../components/planCalendar/planCalendar'

// Styles
import styles from '../styles/FourYearPlan.module.css'

class Plan extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
			showingAlert: false,
			alarmText: "Error!",
			alarmSubText: "Just error",
        }
    }
    render() {
        return (
            <>
                <Head>
                    <title>Plan</title>
                </Head>
    
                <GaryNavbar>
                    <Navbar.Text>
                       Four Year Plan 
                    </Navbar.Text>
                </GaryNavbar>
                <p>
                    Here is where you can update your Four Year Plan.  Search classes on the left column and drag them
                    into the main area to add them to your plan.  To remove a class, drag it into the search column.
                </p>
                <div id="planCalendar" className={styles.mainContainer}>
                    <PlanCalendar 
                        enableLoading={this.props.enableLoading} 
                        disableLoading ={this.props.disableLoading}
                        {...this.props.pageProps} 
                    />
                </div>
            </>
        )
    }
}

export default withRouter(Plan);