import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Styles
import styles from '../../styles/FourYearPlan.module.css'

export default class Course extends React.Component{
    render() {
        return (
            <Draggable draggableId={this.props.course.id} index={this.props.index}>
                {provided => (
                    <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={styles.courseContainer} 
                    >
                        {this.props.course.content}
                        <div
                            {...provided.dragHandleProps}
                            className={styles.dragHandle}
                        >
                            (drag here)
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}