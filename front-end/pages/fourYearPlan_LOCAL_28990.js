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
                Welcome to your four year plan page.  From here, you can update your suggested four year plan to further personalize it and figure out what classes you want to take.  
                
                Moving Classes
                To move a class, simply drag it from the area labeled “drag here” and drop it into the quarter that you want to move it to.  Courses you have locked and courses you have taken (shown in gray) cannot be moved.

                Adding and Removing Classes
                To add a class to your plan, search for it in the searchbar on the left.  Then drag the class you want to add into the quarter you want to take to add it. Gary Planner automatically updates and keeps track of your changes, so you don’t have to worry about saving. To remove a class, simply drag it into the search column on the left.

                Locking Classes
                You can manually lock classes by clicking the checkbox next to the course name.  Locking classes can be used to lock in classes that you know you want to take in a certain quarter so you don’t accidentally move it.

                Taken Classes
                Courses you have already taken are also displayed on the four year plan in gray.  They are updated based on your degree audit and cannot be moved.

                Getting Course Info
                To get more info about a course, click the course info button for the given course.
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