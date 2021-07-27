import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import styles from './index.module.less'

class SubList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          id: '3243242',
          title: 'dsadas',
          image: require('../../assets/images/normal/icon_kh@2x.png')
        }
      ],
      isLoading: false
    }
    console.log(this.props.history.location.state)
  }
  handleListItemClick(val) {
    console.log(val)
  }
  render() {
    return (
      <div>
        <div className={styles.header}>开户</div>
        <div className={styles.secondaryList}>
          <ul>
            {
              this.state.list.map((val, index) => {
                return (
                  <li key={val.id}>
                    <img src={val.image} alt='' />
                    { val.isArticle ?
                      null
                      :
                      <Link to='/SubList' >{`${index + 1}、${val.title}`}</Link>
                    }

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

export default SubList;