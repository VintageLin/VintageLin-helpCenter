import React, { Component } from 'react';
import SubHeader from '../../components/SubHeader'
import SubBottom from '../../components/SubBottom'
import styles from './index.module.less'

class Article extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    render() { 
        return (
            <div className={ styles.wrapper }>
                <SubHeader />
                <SubBottom />
            </div>
        );
    }
}
 
export default Article;