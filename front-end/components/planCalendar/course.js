import React from 'react';
import Link from 'next/link'
import { Draggable } from 'react-beautiful-dnd';
import ToggleButton from 'react-bootstrap/ToggleButton'
import { Button } from 'react-bootstrap'
import { MdMenu, MdInfoOutline, MdLockOpen, MdLock } from 'react-icons/md'
import { GrApps } from 'react-icons/gr'


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
                    isDragDisabled={true}>
                    {provided => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={this.props.friendsPlan ? styles.courseContainer : styles.takenContainer} 
                        >
                            {this.props.course.content}
                            <div className={styles.info}>
                                <Link 
                                    href={{ 
                                        pathname: '/classInfo', 
                                        query: { class_name: this.props.course.content } 
                                    }}
                                >
                                        {/* <a>View Info</a> */}
                                        <MdInfoOutline />
                                </Link>

                            </div>
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
                            className={this.state.locked ? styles.courseLockedContainer : styles.courseContainer} 
                        >
                            {this.props.course.content}
                            
                            <div className={styles.icons}>
                                <div className={styles.info}>
                                    <Link 
                                        href={{ 
                                            pathname: '/classInfo', 
                                            query: { class_name: this.props.course.content } 
                                        }}
                                    >
                                            {/* <a>View Info</a> */}
                                            <MdInfoOutline />
                                    </Link>

                                </div>
                                <div onClick={this.handleClick} className={styles.lock}>
                                    {this.state.locked ? <MdLock /> : <MdLockOpen />} 
                                </div>
                                <div 
                                    onClick={(e) => e.preventDefault()}
                                    {...provided.dragHandleProps}
                                    className={styles.dragHandle}
                                >
                                    <MdMenu/>
                                </div>                            

                            </div>
                        </div>
                    )}
                </Draggable>
            );
        }
        
    }
}