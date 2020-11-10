import React from 'react';
import Course from './course';

export default class Quarter extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.quarter.title}</h3>
                <div>
                    {this.props.courses.map(course => <Course key={course.id} course={course} />)}
                </div>
            </div>
        );
    }
}