import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Link from 'next/link'

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
                            <Link href={{ pathname: '/classInfo', query: { class_name: this.props.course.content } }}>
							    <a>View Info</a>
						    </Link>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}