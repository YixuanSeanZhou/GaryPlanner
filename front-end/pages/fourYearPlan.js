import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';

// Components
import { GaryNavbar } from '../components/commonUI';
import { Navbar, Alert, Modal, Button } from 'react-bootstrap';
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
            showModal: true,
        }
    }

    render() {
        return (
            <>
                <Head>
                    <title>Plan</title>
                </Head>
    
				<GaryNavbar userProfile={this.props.userProfile} onLogout={this.props.clearUserProfile} toHome>
                    <Navbar.Text>
                       Four Year Plan 
                    </Navbar.Text>
                </GaryNavbar>

                <div className={styles.titleBar}>
                    <div className={styles.title}>
                        Four Year Plan Builder
                    </div>
                    <Button 
                        variant="outline-light" 
                        className={styles.helpButton}
                        onClick={() => this.setState({showModal: true})}
                    >
                        Help
                    </Button>
                </div>

                <div id="planCalendar" className={styles.mainContainer}>
                    <PlanCalendar 
                        enableLoading={this.props.enableLoading} 
                        disableLoading ={this.props.disableLoading}
                        {...this.props.pageProps} 
                    />
                </div>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Welcome to your four year plan!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            From here, you can update your suggested four year 
                            plan to further personalize it and figure out what classes you want to take.
                        </div>
                        <br />
                        <h5>Moving Classes</h5>
                        <div>
                            To move a class, simply drag it from the area labeled “drag here” and drop it into the quarter that you want to move it to.  Courses you have locked and courses you have taken (shown in gray) cannot be moved.
                        </div>
                        <br/>
                        <h5>Adding and Removing Classes</h5>
                        <div>
                            To add a class to your plan, search for it in the searchbar on the left.  Then drag the class you want to add into the quarter you want to take to add it. Gary Planner automatically updates and keeps track of your changes, so you don’t have to worry about saving. To remove a class, simply drag it into the search column on the left.
                        </div>
                        <br />
                        <h5>Locking Classes</h5>
                        <div>
                            You can manually lock classes by clicking the checkbox next to the course name.  Locking classes can be used to lock in classes that you know you want to take in a certain quarter so you don’t accidentally move it.
                        </div>
                        <br />
                        <h5>Taken Classes</h5>
                        <div>
                            Courses you have already taken are also displayed on the four year plan in gray.  They are updated based on your degree audit and cannot be moved.
                        </div>
                        <br />
                        <h5>Getting Course Info</h5>
                        <div>To get more info about a course, click the course info button for the given course.</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>You can always revisit this page by clicking "Help"</div>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default withRouter(Plan);