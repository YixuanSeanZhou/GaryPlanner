// React and Next
import { withRouter } from 'next/router';
import React from 'react'

// Components
import {GaryNavbar} from '../../components/commonUI'
import { Spinner } from 'react-bootstrap'

// Styles
import styles from '../../styles/Index.module.css'

class ErrorPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: undefined,
        }
    }

    componentDidMount() {
        var timer = setTimeout(() => {
            this.props.router.push("/intro");
        }, 10000)
        this.setState({timer: timer});
    }

    componentWillUnmount() {
        if (this.state.timer != undefined) {
            clearTimeout(this.state.timer);
            this.setState({timer: undefined});
        }
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
                        You will be redirected in 10 seconds...
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(ErrorPage);