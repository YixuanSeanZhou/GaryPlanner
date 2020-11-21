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
                        <li className={styles.instructor}> Instructor: {this.props.evaluation.name}</li>
                        <li className={styles.grade}> Average Expected Grade: {this.props.evaluation.expGPA}</li>
                        <li className={styles.grade}> Average Received Grade: {this.props.evaluation.actGPA}</li>
                        <li className={styles.hour}> Hours/Week: {this.props.evaluation.hours}</li>
                    </div>
                </div>
        )
    }
}

export default Evaluation;