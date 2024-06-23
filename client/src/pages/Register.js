import React from 'react'
import '../styles/RegisterStyles.css'
import {Button, Form, Input} from 'antd'

const Register = () => {

//form handler

const onFinishHandler = (values) =>{
    console.log(values)

}

  return (
    <>
     <div className='form-container '>
        <Form layout='vertical' onFinish={onFinishHandler} className='card p-4'>
            <h1>Register Form</h1>
            <Form.Item  label="Name" name="name">
                <Input type="text" required/>
            </Form.Item>

            <Form.Item  label="Email" name="Email">
                <Input type="Email" required/>
            </Form.Item>

            <Form.Item  label="Password" name="Password">
                <Input type="password" required/>
            </Form.Item>

            <button className='btn btn-primary ' type='submit'>Register</button>

        </Form>

     </div>
    </>
  )
}

export default Register
