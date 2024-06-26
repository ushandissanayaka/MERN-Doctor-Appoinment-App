import React from 'react'
import Layout from './../components/Layout';
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import {showLoading, hideLoading} from "../redux/features/alertSlice"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const NotificationPage = () => {

    const {user} = useSelector(state => state.user)
    const  dispatch = useDispatch()
    const navigate = useNavigate()
    //handle read notification
    const handleMarkAllRead = async () => {
          try {
           
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification', {userId:user._id},

                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
          } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error("something went wrong")
          }
    }



    //delete notifications
    const handleDeleteAllRead = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error)
            message.error('something went wrong in notification')
        }
    };
  return (
    <Layout>
         <h1 className='p-3 text-center'>Notification page</h1>
         <Tabs>
            <Tabs.TabPane tab="unRead" key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className="P-2" onClick={handleMarkAllRead}>Mark all read</h4>
                </div>
                {
                    user?.notification.map(notificationMsg => (
                        <div className="card" style={{cursor:"pointer"}}>
                         <div className="card-text" onClick={ () => navigate(notificationMsg.onClickPath)} >
                        {notificationMsg.message}
                         </div>
                        </div>
                        
                    ))
                }
            </Tabs.TabPane>

            
            <Tabs.TabPane tab="Read" key={1}>
                <div className="d-flex justify-content-end">
                    <h4 className="P-2 text-primary"style={{cursor: "pointer"}} onClick={handleDeleteAllRead}>Delete all read</h4>
                </div>


                {
                    user?.seennotification.map(notificationMsg => (
                        <div className="card" style={{cursor:"pointer"}}>
                         <div className="card-text" onClick={ () => navigate(notificationMsg.onClickPath)} >
                        {notificationMsg.message}
                         </div>
                        </div>
                        
                    ))
                }
            </Tabs.TabPane>
         </Tabs>
    </Layout>
  )
}

export default NotificationPage
