import React from 'react';

import { Form } from 'react-bootstrap'


import styles from '../styles/SearchBar.module.css'

export class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            search: e.target.value
        })
    }

    render() {
        const libraries = [{name: 'CSE 8A'}, {name: 'CSE 8B'}, {name: 'CSE 11'}, {name: 'CSE 110'}, {name: 'CSE 118'}];
        let libData = []
        const searchKey = this.state.search.trim().toLowerCase();

        if(searchKey && searchKey.length > 0) {
            libData = libraries.filter(i => {
                return i.name.toLowerCase().match(searchKey);
            })
        }

        return (
            <div className={styles.bar}>
                <h3>Search Classes</h3>
                <Form>
                    <Form.Control type="text" placeholder="e.g. CSE 110" 
                    value={this.state.search} onChange={(e) => this.handleChange(e)} />
                    <ul className={styles.ul}>
                        {
                            libData.map((i, index) => {
                            return <li key={index}>{i.name}</li>
                            })
                        }
                    </ul>
                </Form>
            </div>
        )
    }
}

const SearchBar1 = ({keyword,setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search country"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}