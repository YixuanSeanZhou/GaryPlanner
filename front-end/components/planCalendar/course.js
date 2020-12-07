import React from 'react';
import Link from 'next/link'
import { Draggable } from 'react-beautiful-dnd';
import ToggleButton from 'react-bootstrap/ToggleButton'
import { Button } from 'react-bootstrap'


// Styles
import styles from '../../styles/FourYearPlan.module.css'

export default class Course extends React.Component{
    constructor(props) {
		super(props);

		this.state = {
			locked: this.props.locked
        }
    }
    
    
    handleClick = (e) => {
        const newState = {
            ...this.state,
            locked: !this.state.locked
        };

        this.setState(newState);
        this.props.updateLocked(this.props.course.id);
        return;
    }

    render() {
        if (this.props.taken) {
            return (
                <Draggable 
                    draggableId={this.props.course.id} index={this.props.index}
                    isDragDisabled={this.state.locked}>
                    {provided => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={this.props.friendsPlan ? styles.courseContainer : styles.takenContainer} 
                        >
                            {this.props.course.content}
                        </div>
                    )}
                </Draggable>
            );
        } else {
            return (
                <Draggable 
                    draggableId={this.props.course.id} index={this.props.index}
                    isDragDisabled={this.state.locked}>
                    {provided => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={styles.courseContainer} 
                        >
                            {this.props.course.content}
                            <Button 
                            variant="dark"
                            onClick={this.handleClick}
                            > 
                                {this.state.locked ? "Unlock" : "Lock"} 
                            </Button>
                            <div
                                {...provided.dragHandleProps}
                                className={styles.dragHandle}
                            >
                                (drag here)
                            </div>
                            <Link href={{ pathname: '/classInfo', query: { class_name: this.props.course.content } }}>
                                <a>View Info</a>
                            </Link>
                        </div>
                    )}
                </Draggable>
            );
        }
        
    }
}