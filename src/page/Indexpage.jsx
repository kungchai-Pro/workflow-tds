import React,{useState,useEffect} from 'react'
import { AiFillEnvironment, AiFillMail } from "react-icons/ai";
import { FaFacebookF, FaPinterest, FaTwitter, FaInstagram ,FaAngleRight} from "react-icons/fa";
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {LoginAccount}from'../service/apicall';
import swal from 'sweetalert';
import { isLogin } from '../redux/features/loginSlice';
import { compose } from '@reduxjs/toolkit';
//import iconheader from'../img/android-chrome-192x192.png';

const Indexpage = () => {
  

  const [isPass,setIsPass]=useState('');

  sessionStorage.setItem("Uname","");



    function handleChange(event) {
     // console.log(event.target.value);
      setIsPass(event.target.value);
    }

  
    const onFormSubmit = e => {
      e.preventDefault();

    LoginAccount(isPass).then(data=>{
    if(data.success==true){
    sessionStorage.setItem("Uname", data.listall[0].nameUser);
    sessionStorage.setItem("Udepcode", data.listall[0].depCode);
    sessionStorage.setItem("Ustate", data.listall[0].stateflows);
    sessionStorage.setItem("Upermis", data.listall[0].permission);
    //navigate("/home");
    window.location.href='/home'
    }
    else if(data.success==false){
      swal({
        title: "แจ้งเตือน รหัสไม่ถูกต้อง ! ",
        text: "กรุณากดปุ่มตกลง!",
        icon: "warning",
        button: "ตกลง ! ",
      });
    }
    }).catch(err=>alert(err))
   
    }

  return (  
    <div >
      <div className='body-page-warp'>
        
          <div className='leyour-row-wrap'>

            <div style={{ width: '100%', height: 'auto' }}>
              <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"   onChange={handleChange}  style={{ width: '50%' }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="เข้าสู่ระบบ" />
                </Form.Group>
                <Button variant="primary"
                 type="submit">
                  Sign Up
                </Button>
              </Form>
              <div style={{ marginTop: '10%' }}>
                <h5>Web application </h5>
                <h2>SYSTEM DOCUMENT TDS </h2>
                <h2>save papers</h2>
              </div>
            </div>
            <div>
              <div style={{ width: '100%' }}>
              <img src={require('../img/hero-header.png')} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>

          </div>
        
      </div>

      {/* footer system */}

      <div className='footer'>
          <Container >
            <div className='leyour-row-wrap'>

              <div style={{ width: '70%' }}>
                <img src={require('../img/funfacts.png')} style={{ width: 120, height: 120 }} />
                <span style={{ marginLeft: 20, color: '#fff', fontSize: 25 }}>If you work towards goals, everything is achievable. !</span>
              </div>

              <div>
                <label style={{ color: '#fff' }}> swan application <img src={require('../img/30516.jpg')} style={{ width: 100, height: 50 }} /></label>
              </div>

            </div>
          </Container>
          </div>

    </div>
  )
}
export default Indexpage;
