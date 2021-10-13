import './comissao.css'
import React, { useState } from 'react';
import {Modal , Button, Form, Input, DatePicker } from 'antd';
import firebase from '../../firebaseConnection';
import GraficComissao from '../../Components/Grafics/Comissao'
import NumberFormat from 'react-number-format';
import moment from 'moment'
import 'moment/locale/pt-br';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Comissao(){

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [dataForm, setDataForm] = useState()
  

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    const validateMessages = {
        // eslint-disable-next-line
        required: '${label} is required!',
        types: {
          // eslint-disable-next-line
          preco: '${label} is not a valid number!',
          // eslint-disable-next-line
          date: {
            // eslint-disable-next-line
            format: "'${name}' is invalid for format date",
            // eslint-disable-next-line
            parse: "'${name}' could not be parsed as date",
            // eslint-disable-next-line
            invalid: "'${name}' is invalid date"
          }
        }
      }


      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const onFinish = (fieldsValue) => {
        let submitPagamento = {
          pagamento: fieldsValue.pagamento,
          comissao: fieldsValue.comissao,
          data: moment(fieldsValue.datePicker).format('DD/MM/YYYY'),
          comentario: fieldsValue.comentario
        }
        setDataForm(submitPagamento)
        
        async function handleAdd(){
    
          await firebase.firestore().collection('honorarios')
          .add({
            dataForm
          })
          .then(()=>{
            toast.success('DADOS CADASTRADO COM SUCESSO!');
          })
          .catch((error)=>{
            toast.success('GEROU ALGUM ERRO: ' + error);
          })
      
        }
        handleAdd()
        form.resetFields();
      };

       const findRegister = () =>{
        handleCancel()
        alert('aqui um outro modal com uma tabela')

       }

    return(
      <div id="content-form-grfic">
        {console.log(dataForm)}
         <Form {...layout} name="nest-messages"  validateMessages={validateMessages} form={form} onFinish={onFinish}>  

                <Form.Item
                  name={'pagamento'}
                  label="R$ Pagamento"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <NumberFormat thousandSeparator={true} className='input-moeda'/>
                
                </Form.Item>

                <Form.Item
                  name={'comissao'}
                  label="R$ Comissão"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>                

                  <NumberFormat thousandSeparator={true} className='input-moeda'/>
                 
                </Form.Item>
                
                <Form.Item
                    name={'datePicker'}
                    label="Data"
                    //{...config}
                    rules={[
                      {
                        required: true,
                        type: 'date',
                      },
                    ]}>       
                
                  <DatePicker format='DD/MM/YYYY'/>

                </Form.Item>
                
                
                
                <Form.Item name={'comentario'} label="Comentário">
                  <Input.TextArea />
                </Form.Item>

                <Form.Item>

                <div className='btns'>
                  <Button id='gravar' type="primary" htmlType="submit" >
                    Gravar
                  </Button>
                  <Button id='find-btn' type="primary" onClick={showModal}>
                    Pesquisar
                  </Button>
                </div>                  
                </Form.Item>
              </Form>
            
              <Modal title="pesquisar" visible={isModalVisible} footer={null} maskClosable={true} destroyOnClose={true}>
                <Form>
                  <Form.Item
                    name={'datePicker'}
                    label="Data"
                    rules={[
                      {
                        required: false,
                        type: 'date',
                      },
                    ]}>       
                
                  <DatePicker name={'date-picker'} format='DD/MM/YYYY'/>

                </Form.Item>
                
                <Form.Item
                  name={'pagamento'}
                  label="R$ Pagamento"
                  rules={[
                    {
                      required: false,
                    },
                  ]}>                
                  
                  <NumberFormat thousandSeparator={true} className='input-moeda'/>
                 
                </Form.Item>
                
                <Form.Item name={'comentario'} label="Comentário">
                  <Input.TextArea />
                </Form.Item>

                <Form.Item>

                <div className='btns'>
                  <Button classNamea='find-btn' type="primary" onClick={findRegister}>
                    Pesquisar
                  </Button>
                  <Button id='find-btn' type="primary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>                  
                </Form.Item>
              </Form>
              </Modal>
    
                <GraficComissao className='grafic-comissao'/>

              </div>

              
            );
    
}
