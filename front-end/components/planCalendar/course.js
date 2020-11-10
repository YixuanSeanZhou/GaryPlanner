import React from 'react';

export default class Course extends React.Component{
    render() {
        return (
            <div>{this.props.course.content}</div>
        );
    }
}