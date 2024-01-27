import React from 'react'
import styles from './role.module.css'
import RoleCard from '../../components/RoleCard/RoleCard'

const Role = () => {
  return (
    <div className={styles.cont}>
        <span className={styles.title}>Your role</span>
        <RoleCard/>
    </div>
  )
}

export default Role