import React from 'react';
// Styles
import styles from '../../styles/classInfo.module.css';
class Evaluation extends React.Component {
    render (){
        return (
                <div className={styles.item}>
                {this.props.evaluation.quarter}
                <ul>
                    <li>{this.props.evaluation.name}</li>
                    <li>{this.props.evaluation.expGPA}</li>
                </ul>
                </div>
        )
    }
}

export default Evaluation;