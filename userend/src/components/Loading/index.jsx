import React from 'react'
import styles from './index.module.less'

function Loading () {
    return (
        <div className={ styles.loadingModal }>
            <div className={ styles.loading }>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
        </div>
    )
}

export default Loading