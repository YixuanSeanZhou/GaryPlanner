import React from 'react';
import ClassDescription from './classDescription';
// Styles
import styles from '../../styles/classInfo.module.css';
class ClassDescriptionsList extends React.Component {
    render (){
        return (
            <div>
                {this.props.classDescriptions.map((classDescription)=>{
                    return <ClassDescription classDescription={classDescription}/>
                })}
            </div>
        )
    }
}

export default ClassDescriptionsList;