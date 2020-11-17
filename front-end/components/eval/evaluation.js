import React from 'react';
// Styles
import styles from '../../styles/classInfo.module.css';
class Evaluation extends React.Component {
    render (){
        return (
                <div className={styles.item}>
                    {this.props.evaluation.quarter}
                    <li className={styles.noBullet}>{this.props.evaluation.name}</li>
                    <li className={styles.noBullet}>{this.props.evaluation.expGPA}</li>
                </div>
        )
    }
}

export default Evaluation;