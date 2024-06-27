import Layout from './../../components/Layout'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Users = () => {
const [users , setUsers] = useState([])

//get users
const getUsers = async() => {
    try{
      const res = await axios.get('/api/v1/admin/getAllUsers',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setUsers(res.data.data);
      }
    }catch (error){
      console.log(error)
    }
}

useEffect(() => {
  getUsers()
},[])

//antD table col
const columns = [
  {
    title:'Name',
    dataIndex:'name',

  },
]
  return (
    <Layout>
        <h1>Users List</h1>
    </Layout>
  )
}

export default Users