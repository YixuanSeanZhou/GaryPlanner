// React and Next
import { withRouter } from 'next/router';
import React from 'react'

// Components
import {GaryNavbar} from '../../components/commonUI'
import { Spinner } from 'react-bootstrap'

// Styles
import styles from '../../styles/Index.module.css'

class ErrorPage extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.router.push("/intro");
        }, 5000)
    }


    render() {
        return (
            <>
                <GaryNavbar />
                
                <div className={styles.mainContainer}>
                    <h1>We are sorry!</h1>
                    <h5>There was an error occurred when contacting the server. </h5>
                    <br />
                    <p>
                        Please try again later. If the issue persists, please contact the developers. Thank you!
                    </p>
                    <div id={styles.loadContainer}>
                        <Spinner animation="grow" size="sm" id={styles.errorSpinner} /> 
                        You are being redirected...
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(ErrorPage);