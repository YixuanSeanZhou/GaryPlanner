import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default class Course extends React.Component{
    render() {
        return (
            <Draggable draggableId={this.props.course.id} index={this.props.index}>
                {provided => (
                    <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps} 
                    >
                        {this.props.course.content}
                        <p{...provided.dragHandleProps}>(drag here)</p>
                    </div>
                )}
            </Draggable>
        );
    }
}