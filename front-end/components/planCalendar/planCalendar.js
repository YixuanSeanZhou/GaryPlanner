import React from 'react';
import placeholderData from './placeholderData';
import Quarter from './quarter';


export default class PlanCalendar extends React.Component {
    state = placeholderData;
    render() {
        return this.state.quarterOrder.map((quarterId) => {
            const quarter = this.state.quarters[quarterId];
            const courses = quarter.courseIds.map(courseId => this.state.courses[courseId]);

            return <Quarter key ={quarter.id} quarter={quarter} courses={courses} />;
        })
    }
}