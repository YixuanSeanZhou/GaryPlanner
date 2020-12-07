import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Course from './course';

// Styles
import styles from '../../styles/FourYearPlan.module.css'

export default class Quarter extends React.Component {
    constructor(props) {
		super(props);
    }

    render() {
        var divStyle;
        if ( this.props.taken && !(this.props.friendsPlan) ) {
            divStyle = styles.takenQuarterContainer;
        } else {
            divStyle = styles.quarterContainer;
        }

        return (
            <div className={divStyle}>
                <h3>{this.props.quarter.title}</h3>
                <Droppable 
                    droppableId={this.props.quarter.id}
                    isDropDisabled={this.props.taken}
                >
                    {// For droppable to work, its contents must be a function that returns a component
                    provided => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles.courseList}
                        >
                            {this.props.courses.map((course, index) => (
                                <Course 
                                    key={course.id} 
                                    course={course} 
                                    index={index} 
                                    locked={course.locked} 
                                    updateLocked={this.props.updateLocked} 
                                    taken={this.props.taken}
                                    friendsPlan={this.props.friendsPlan}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}