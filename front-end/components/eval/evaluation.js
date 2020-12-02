import React from 'react';
// Styles
import styles from '../../styles/classInfo.module.css';
class Evaluation extends React.Component {
    render (){
        return (
                <div className={styles.table}>
                    <div className = {styles.floatContainer}>
                        <div className={styles.floatQuarter}>
                            {this.props.evaluation.quarter}
                        </div>
                        <div className={styles.floatUnit}>{this.props.evaluation.unit}</div>
                    </div>
                    <div className={styles.item}>
                        <li className={styles.instructor}> Instructor: {this.props.evaluation.instructor}</li>
                        <li className={styles.grade1}> Average Expected Grade: {this.props.evaluation.avg_expected_grade}</li>
                        <li className={styles.grade2}> Average Received Grade: {this.props.evaluation.avg_grade_received}</li>
                        <li className={styles.hour}> Hours/Week: {this.props.evaluation.study_hours_per_week}</li>
                        <li className={styles.rec1}> Recommend Class: {this.props.evaluation.recommend_class}%</li>
                        <li className={styles.rec2}> Recommend Instructor: {this.props.evaluation.recommend_instructor}%</li>
                    </div>
                </div>
        )
    }
}

export default Evaluation;