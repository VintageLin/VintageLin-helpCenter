import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import styles from './index.module.less'

class Index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            list: [
                {
                    id: '3243242',
                    title: '开户',
                    image: require('../../assets/images/normal/icon_kh@2x.png')
                }
            ],
            isLoading: false
        }
    }
    handleMenuClick (val) {
        console.log(val)
        this.props.history.push({
            pathname: 'SubList',
            state: {
                id: val
            }
        })
    }
    render() {
        return (
            <div>
                <div className={ styles.header }>问题类型</div>
                <div className={ styles.listWrapper } >
                    <ul>
                        {
                            this.state.list.map(val => {
                                return (
                                    <li key={ val.id }>
                                        <Link to={{ 
                                            pathname: '/SubList',
                                            state: {
                                                id: val.id
                                            }
                                        }}>
                                            <img src={ val.image } alt=''/>
                                            <span>{ val.title }</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                { this.state.isLoading ? <Loading /> : null }
            </div>
        );
    }
}
 
export default Index;