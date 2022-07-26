import React, { useState, useContext } from 'react';
import { Button, Form, Input, Card, Checkbox } from 'antd';
import { AuthContext } from '../../Contexts/auth'
import './login.css'

export default function Login() {


  const [email, setEmail] = useState()
  const [pass, setPass] = useState()

  const { singIn, loadingAuth } = useContext(AuthContext)

  function handleSubmit() {
    if (email !== '' && pass !== '') {
      singIn(email, pass)
    }
  }


  return (
    <div id='login-div'>
      <Card
        id='card-login'
        bordered={true}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <h1> Login </h1>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password value={pass} onChange={(e) => setPass(e.target.value)} />
          </Form.Item>

            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button onClick={handleSubmit} type="primary" htmlType="submit">
                {loadingAuth ? 'Carregando' : 'Acessar'}
              </Button>
            </Form.Item>
        </Form>

      </Card>
    </div>
  )
}   
