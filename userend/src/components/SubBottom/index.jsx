import React, { Component } from 'react';
import styles from './index.module.less'

class SubBottom extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isLoading: false,
            feeling: ''
        }
    }

    handleLikeClick (val) {
        console.log(val)
        this.setState({
            feeling: 'like'
        })
    }
    handleHateClick (val) {
        console.log(val)
        this.setState({
            feeling: 'hate'
        })
    }

    render() { 
        return (
            <div className={ styles.SubBottom }>
                <span className={ styles.help }>是否有帮助：</span>
                <div className={ styles.right }>
                    <span onClick={ () => this.handleLikeClick() } className={ [styles.like, this.state.feeling === 'like' ? 'active' : null].join(' ') }>
                        <i></i>
                        <span>有用</span>
                    </span>
                    <span onClick={ () => this.handleHateClick() } className={ [styles.hate, this.state.feeling === 'hate' ? 'active' : null].join(' ') }>
                        <i></i>
                        <span>没用</span>
                    </span>
                </div>
            </div>
        );
    }
}
 
export default SubBottom