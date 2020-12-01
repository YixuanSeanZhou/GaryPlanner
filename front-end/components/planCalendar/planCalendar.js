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
		const requestUrl = 'http://localhost:2333/api/four_year_plan/get_formatted_plan_by_user';
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		};

		fetch(requestUrl, options)
		.then(response => {
			console.log(response);
		}).then(data => {
            console.log("JSON Data: ", data);
            
            // Add a blank search column
            const SearchColumn = {
                id: 'SearchColumn',
                title: 'Search',
                courseIds: []
            };

            const newState = {
                ...this.state,
                ...data.result
            };

            const newStateAndSearch = {
                ...newState,
                quarters: {
                    ...newState.quarters,
                    ['SearchColumn']: SearchColumn
                }
            }

            this.setState(newStateAndSearch);
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

            // If started from search column, add, otherwise, update
            if (start.id != 'SearchColumn') {
                // Update
            } else {
                // Add
            }

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
            // Remove

            const newState = {
                ...this.state,
                quarters: {
                    ...this.state.quarters,
                    [newStart.id]: newStart
                }
            };

            this.setState(newState);
        }
    }

    updateLocked(courseId) {
        const courseToUpdate = this.state.courses[courseId];
        const updatedCourse = {
            ...courseToUpdate,
            locked: !courseToUpdate.locked
        }
        const newState = {
            ...this.state,
            courses: {
                ...this.state.courses,
                [updatedCourse.id]: updatedCourse
            }
        };

        this.setState(newState);
        return;
    }

    handleSearch(searchStr) {
        this.props.enableLoading("Please wait");

		// Options for the fetch request
		const requestUrl = 'http://localhost:2333/api/all_classes/get_class_by_search?search=' + searchStr;
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		};

		fetch(requestUrl, options)
		.then(response => {
			console.log(response);
		}).then(data => {
            console.log("JSON Data: ", data);

            // Add search courses to courseList
            var newSearchArray = []
            Object.keys(data).forEach((course, index) => {
                newSearchArray.push(course.id);
            });
            
            // Make new search column
            const SearchColumn = {
                id: 'SearchColumn',
                title: 'Search',
                courseIds: newSearchArray
            };

            const newState = {
                ...this.state,
                courses: {
                    ...this.state.courses,
                    data
                },
                quarters: {
                    ...this.state.quarters,
                    ['SearchColumn']: SearchColumn
                }
            }

            this.setState(newState);
		})
		.catch((error) => {
			console.error('Error:', error);
            setTimeout(() => this.props.disableLoading(), 300);
		});
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
                <CourseSearchBar key ={this.state.quarters['SearchColumn'].id} quarter={this.state.quarters['SearchColumn']} courses={this.state.quarters['SearchColumn'].courseIds.map(courseId => this.state.courses[courseId])} updateLocked={this.updateLocked.bind(this)} handleSearch={this.handleSearch.bind(this)} />
                <div className={styles.fourYearCalendarContainer}>
                {yearArray.map((yearId) => {
                    const year = yearList[yearId];
                    return (
                        <div className={styles.yearContainer}>
                            <h2>{yearId}</h2>
                            <div className={styles.multQuarterContainer}>
                                {year.map((quarterId) => {
                                    const quarter = this.state.quarters[quarterId];
                                    const courses = quarter.courseIds.map(courseId => this.state.courses[courseId]);
                                    // Once we get to the current quarter, allow editing
                                    if(quarterId === this.state.current_quarter){
                                        taken = false;
                                    }

                                    return <Quarter key ={quarter.id} quarter={quarter} courses={courses} updateLocked={this.updateLocked.bind(this)} taken={taken} />;
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