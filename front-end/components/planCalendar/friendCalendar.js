// React and Next
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';

// Components
import { DragDropContext } from 'react-beautiful-dnd';
import placeholderData from './placeholderData';
import Quarter from './quarter';

// Styles
import styles from '../../styles/FourYearPlan.module.css'


class FriendCalendar extends React.Component {
    constructor(props) {
		super(props);
        
		this.state = {
            ...placeholderData,
            currentId: undefined,
        }
	}

    componentDidUpdate() {
		// First, enable loading animation
		// this.props.enableLoading("Please wait");   fix later

        // Options for the fetch request
        const user_id = this.props.user_id;
        if (user_id == this.state.currentId) {
            return;
        }
		const requestUrl = 'http://localhost:2333/api/four_year_plan/get_formatted_plan_by_user?user_id=' + user_id;
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		};

		fetch(requestUrl, options)
		.then(response => {
            this.setState({currentId: this.props.user_id});
            console.log(response);
            return response.json();
		}).then(data => {
            console.log("JSON Data: ", data);
            
            const newState = {
                ...data
            };

            const newStateAndSearch = {
                ...newState,
                quarters: {
                    ...newState.quarters,
                }
            }
            // setTimeout(() => this.props.disableLoading(), 300);   fix later
            this.setState(newStateAndSearch);
            console.log("New State: " + this.state);
		})
		.catch((error) => {
			console.error('Error:', error);
			// setTimeout(() => this.props.disableLoading(), 300);   fix later
            //this.props.router.push('/util/error');
            
            const newState = {
                ...this.state,
                ...placeholderData,
                currentId: this.props.user_id
            };

            this.setState(newState);
        });

	}

    onDragEnd = result => {
        //Required for drag-drop, but shouldn't do anything
        return;
    }


    render() {
        var quarterArray = [];
        var taken = true;
        Object.keys(this.state.quarters).forEach((quarter, index) => {
            if(quarter !== "SearchColumn") {
                quarterArray.push(quarter);
            } 
        });

        // Sort array into chronological order
        const qOrder = ['WI','SP','FA'];
        quarterArray.sort(function(a, b){
            if (a.substr(2) === b.substr(2)) {
                return qOrder.indexOf(a.substr(0,2)) - qOrder.indexOf(b.substr(0,2));
            } else {
                return parseInt(a.substr(2), 10) - parseInt(b.substr(2), 10);
            }
        });

        var yearList = {};

        while (quarterArray.length >= 3) {
            var quarterList = quarterArray.slice(0,3); // Get next 3 quarters
            quarterArray.splice(0,3); // Remove from quarterArray
            var yearId = quarterList[0].substr(-2) + "-" + quarterList[2].substr(-2); // Create the title for the year

            yearList = {
                ...yearList,
                [yearId]: quarterList
            }
        }

        // Capture any remaining
        if (quarterArray.length > 0) {
            var quarterList = quarterArray.slice(0,quarterArray.length); // Get next 3 quarters
            var yearId = quarterList[0].substr(-2) + "-" + quarterList[quarterList.length-1].substr(-2); // Create the title for the year

            yearList = {
                ...yearList,
                [yearId]: quarterList
            }
        }

        var yearArray = [];
        Object.keys(yearList).forEach((yearId, index) => {
            yearArray.push(yearId);
        });


        return ( 
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={styles.friendCalendarContainer}>
                {yearArray.map((yearId) => {
                    const year = yearList[yearId];
                    return (
                        <div className={styles.yearContainer}>
                            <h2>{yearId}</h2>
                            <div className={styles.multQuarterContainer}>
                                {year.map((quarterId) => {
                                    const quarter = this.state.quarters[quarterId];
                                    const courses = quarter.courseIds.map(courseId => this.state.courses[courseId]);
                                    return <Quarter 
                                                key ={quarter.id} 
                                                quarter={quarter} 
                                                courses={courses} 
                                                updateLocked={null} 
                                                taken={taken} 
                                                friendsPlan={true}    
                                            />;
                                })}
                            </div>
                        </div>
                    )
                })}
                </div>
            </DragDropContext>
        );
    }
}

export default withRouter(FriendCalendar);