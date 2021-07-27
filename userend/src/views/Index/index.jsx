import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import styles from './index.module.less'
import http from '../../http/http'
import API from '../../http/API'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 0,
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
  componentDidMount () {
    // console.log('挂载' ,http)
    this.setState({
      test: 1
    })
    this.setState({
      test: 2
    })
    
    setTimeout(() => {
      this.setState({
        test: 3
      })
      console.log(this.state.test)

      this.setState({
        test: 4
      })
      console.log(this.state.test)
    }, 100)

    http.get(API.GET_INDEX_LIST, {}).then(res => {
      if (res.code === 1000) {

      }
    }).catch(err => console.log(err))
  }
  handleMenuClick(val) {
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
        <div className={styles.header}>问题类型</div>
        <div className={styles.listWrapper} >
          <ul>
            {
              this.state.list.map(val => {
                return (
                  <li key={val.id}>
                    <Link to={{
                      pathname: '/SubList',
                      state: {
                        id: val.id
                      }
                    }}>
                      <img src={val.image} alt='' />
                      <span>{val.title}</span>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
        { this.state.isLoading ? <Loading /> : null}
      </div>
    );
  }
}

export default Index;