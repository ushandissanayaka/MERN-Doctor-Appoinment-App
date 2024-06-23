import React from 'react'
import '../styles/RegisterStyles.css'
import { Form, Input} from 'antd'
import { Link} from 'react-router-dom'

const Login = () => {

//form handler

const onFinishHandler = (values) =>{
  console.log(values)

}

  return (
    <>
    
    <div className='form-container '>
        <Form layout='vertical' onFinish={onFinishHandler} className="register-form">
            <h3 className='text-center'>Login Form</h3>

           

            <Form.Item  label="Email" name="Email">
                <Input type="Email" required/>
            </Form.Item>

            <Form.Item  label="Password" name="Password">
                <Input type="password" required/>
            </Form.Item>

            <Link to="/register" className='m-2 '>Not a user register here</Link>

            <button className='btn btn-primary ' type='submit'>Login</button>

        </Form>

     </div>
    </>
  )
}

export default Login
