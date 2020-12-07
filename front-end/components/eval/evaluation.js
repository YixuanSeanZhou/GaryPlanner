import React from 'react';
import Image from 'next/image'

import {Row, Col} from 'react-bootstrap';

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
                        <div className={styles.floatUnit}>{this.props.evaluation.section}</div>
                    </div>
                    <div className={styles.item}>
                        <RowItem
                            name="Instructor"
                            value={this.props.evaluation.instructor}
                        />
                        <RowItem name="Average Expected Grade" value={this.props.evaluation.avg_expected_grade} />
                        <RowItem name="Average Received Grade" value={this.props.evaluation.avg_grade_received} />
                        <RowItem name="Hours/Week" value={this.props.evaluation.study_hours_per_week + " Hr"} />
                        <RowItem name="Recommend Class" value={this.props.evaluation.recommend_class + "%" }/>
                        <RowItem name="Recommend Instructor" value={this.props.evaluation.recommend_instructor + "%"} />
                    </div>
                </div>
        )
    }
}

class RowItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={styles.itemRow}>
                    <div className={styles.itemName}>
                        {this.props.name}
                    </div>
                    <div className={styles.itemValue}>
                        {this.props.value}
                    </div>                
            </div>
        );
    }
}

export default Evaluation;