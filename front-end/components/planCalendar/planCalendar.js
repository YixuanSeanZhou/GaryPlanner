// React and Next
import React from 'react';
import Link from 'next/link';
import  Head from 'next/head';
import { withRouter } from 'next/router';

// Components
import { DragDropContext } from 'react-beautiful-dnd';
import placeholderData from './placeholderData';
import Quarter from './quarter';
import CourseSearchBar from './searchBar/courseSearchColumn'

// Styles
import styles from '../../styles/FourYearPlan.module.css'


class PlanCalendar extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
            ...placeholderData,
			showingAlert: false,
			alarmText: "Error!",
			alarmSubText: "Just error",
		}
	}

    componentDidMount () {
		// First, enable loading animation
		this.props.enableLoading("Please wait");

		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/users/create_user';
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state.formData)
		};

		fetch(requestUrl, options)
		.then(response => {
			console.log(response);
            
            /*
			if (response.status == 200) {
				// User successfully created
				this.props.enableLoading("Success!")

				// Redirect the user to login page
				this.props.router.prefetch('/login');
				setTimeout(() => {
					this.props.disableLoading();
					this.props.router.push('/login'); 
				}, 2000);

			} else if (response.status == 300) {
				// User Already Existed!
				return response.json()

			} else {
				// Unhandled error code
				setTimeout(() => this.props.disableLoading(), 300);
				this.props.router.push('/util/error');	
            }
            */
		}).then(data => {
			console.log("JSON Data: ", data);
            const newState = {
                ...this.state,
                ...data.result
            };

            this.setState(newState);
		})
		.catch((error) => {
			console.error('Error:', error);
			setTimeout(() => this.props.disableLoading(), 300);
            //this.props.router.push('/util/error');
            
            const newState = {
                ...this.state,
                ...placeholderData
            };

            this.setState(newState);
		});
		
	}

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        // Null Check
        if (!destination) {
            return;
        }

        // If we didn't move the object from it's original spot, return
        if ( destination.droppableId === source.droppableId &&
            destination.index === source.index ) {
                return;
        }

        // Optomistic update (not checking with backend)
        const start = this.state.quarters[source.droppableId];
        const finish = this.state.quarters[destination.droppableId];

        // Moving within one quarter
        if (start === finish) {
            const newCourseIds = Array.from(start.courseIds);
            newCourseIds.splice(source.index, 1);
            newCourseIds.splice(destination.index, 0, draggableId);

            const newQuarter = {
                ...start,
                courseIds: newCourseIds
            };

            const newState = {
                ...this.state,
                quarters: {
                    ...this.state.quarters,
                    [newQuarter.id]: newQuarter
                }
            };

            this.setState(newState);
            console.log(this.state);
            return;
        }
        
        // Moving between quarters
        const startCourseIds = Array.from(start.courseIds);
        startCourseIds.splice(source.index, 1);
        const newStart = {
            ...start,
            courseIds: startCourseIds
        };

        // If we move from the quarters to the search column, delete it
        if (finish.id != 'SearchColumn') {
            const finishCourseIds = Array.from(finish.courseIds);
            finishCourseIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                courseIds: finishCourseIds
            };

            const newState = {
                ...this.state,
                quarters: {
                    ...this.state.quarters,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish
                }
            };

            this.setState(newState);
        } else {
            const newState = {
                ...this.state,
                quarters: {
                    ...this.state.quarters,
                    [newStart.id]: newStart
                }
            };

            this.setState(newState);
        }
        
        // TODO: Tell backend that a reorder has occured
    }

    updateLocked(courseId) {
        console.log("Yeet " + courseId);
        /*
        courseToUpdate = this.state.courses[courseId];
        updatedCourse = {
            ...courseToUpdate,
            locked: !courseToUpdate.locked
        }

        const newState = {
            ...this.state,
            courses: {
                ...this.state.courses,
                updatedCourse
            }
        };

        this.setState(newState);
        console.log(this.state);
        return;
        */
    }


    render() {
        return ( 
            <DragDropContext onDragEnd={this.onDragEnd}>
                <CourseSearchBar key ={this.state.quarters['SearchColumn'].id} quarter={this.state.quarters['SearchColumn']} courses={this.state.quarters['SearchColumn'].courseIds.map(courseId => this.state.courses[courseId])} />
                <div className={styles.fourYearCalendarContainer}>
                {this.state.yearOrder.map((yearId) => {
                    const year = this.state.years[yearId];
                    return (
                        <div className={styles.yearContainer}>
                            <h2>{year.title}</h2>
                            <div className={styles.multQuarterContainer}>
                                {year.quarterIds.map((quarterId) => {
                                    const quarter = this.state.quarters[quarterId];
                                    const courses = quarter.courseIds.map(courseId => this.state.courses[courseId]);

                                    return <Quarter key ={quarter.id} quarter={quarter} courses={courses} updateLocked={this.updateLocked.bind(this)} />;
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

export default withRouter(PlanCalendar);