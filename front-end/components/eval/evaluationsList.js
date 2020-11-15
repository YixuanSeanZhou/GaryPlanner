import React from 'react';
import Evaluation from './evaluation';
// Styles
import styles from '../../styles/classInfo.module.css';
class EvaluationsList extends React.Component {
    render (){
        return (
            <div className={styles.wrapper}>
                {this.props.evaluations.map((evaluation)=>{
                    return <Evaluation evaluation={evaluation} key={evaluation.id}/>
                })}
            </div>
        )
    }
}

export default EvaluationsList;