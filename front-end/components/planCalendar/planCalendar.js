import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import placeholderData from './placeholderData';
import Quarter from './quarter';
import CourseSearchBar from './searchBar/courseSearchBar'

// Styles
import styles from '../../styles/FourYearPlan.module.css'


export default class PlanCalendar extends React.Component {
    state = placeholderData;

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
    };


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

                                    return <Quarter key ={quarter.id} quarter={quarter} courses={courses} />;
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