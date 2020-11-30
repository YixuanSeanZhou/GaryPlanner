import React from 'react';
// Styles
import styles from '../../styles/classInfo.module.css';
class ClassDescription extends React.Component {
    render (){
        return (
                <div className={styles.des}>
                    <li>{this.props.classDescription.prerequisites}</li>
                    <li>{this.props.classDescription.description}</li>
                </div>
        )
    }
}

export default ClassDescription;