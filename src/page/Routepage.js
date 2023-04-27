import React,{useState,useEffect} from 'react'
import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import { Link, useNavigate } from 'react-router-dom';
import { AiFillEnvironment, AiFillMail } from "react-icons/ai";
import { FaFacebookF, FaPinterest, FaTwitter, FaInstagram,FaUserCircle,FaBell,FaExclamationTriangle } from "react-icons/fa";
//import { useSelector, useDispatch } from 'react-redux'
import { ContainerButton,Button,Container} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from'../component/Sidebar';


import Homepage from './Homepage';
import Indexpage from './Indexpage';
import JournalTosendpage from './JournalTosendpage';
import Groupdepartment from'./Groupdepartmentpage';
import StatusflowReceive from'./StatusflowReceivepage';
import CreateJournal from'./CreateJournalpage';
import JournalTDSclassB from'./JournalTDSclassBpage';
import EditJournalPlnning from './EditJournalPlnningpage';
import JournalListnewpage from './JournalListnewpage';
import EditJournalRDpage from'./EditJournalRDpage';
import ViewDetailJournalpage from'./ViewDetailJournalpage';
import{GetjournalstateReceive,GetjournalstatToReject}from'../service/apicall';
import EditJournalpage from './EditJournalpage';
import StatusflowRejectpage from './StatusflowRejectpage';
import ListjournalPrepress from './ListjournalPrepress';
import ApproveJournalApage from'./ApproveJournalApage';
import ApproveJournalBpage from'./ApproveJournalBpage';
import EditConventionnalInkpage from'./EditConventionnalInkpage';
import ViewJournalSuccesspage from './ViewJournalSuccesspage';
import DuplicateJournalpage from './DuplicateJournalpage';
import CreateCansizeType from './CreateCansizeType';

export const Routepages = () => {


  var Uname = sessionStorage.getItem("Uname");

  const[isUname,setIsUname]=useState("")
  const[dataNew,setDataNew]=useState([])
  const[datareject,setDatareject]=useState([])

  useEffect(()=>{
 
    setIsUname(Uname);
    var  idstate= sessionStorage.getItem("Ustate");
    var idpreReceive=idstate-1;

    GetjournalstateReceive(idpreReceive).then(data=>{
      console.log(data.listall);
      setDataNew(data.listall);
    })

    GetjournalstatToReject(idstate).then(datar=>{
      setDatareject(datar.listall)
    })


  },[isUname])
 
  
  const islogout=()=>{
    sessionStorage.setItem("Uname","");
    setIsUname("")
    window.location.href='/'
  }

  const warningStatus=()=>{
    window.location.href='/StatusflowReceive'
  }


  return (
      <BrowserRouter>
       
        <div className='header-index'>
          
          <Container>
            <div className='leyour-row-wrap'>
            <ToastContainer />
              <div>
                <AiFillEnvironment /><label style={{ marginLeft: 15, fontSize: 12 }}>Swan Industries (Thailand) Co., Ltd. </label>
                <AiFillMail style={{ marginLeft: 20 }} /><label style={{ marginLeft: 15, fontSize: 12 }}>	sales_mkt@swan.co.th</label>
              </div>
              <div>
                { isUname!=""?<div> 
                  {datareject.length>=1&&<a href='/StatusflowReject'><label style={{color:'#F77541',marginRight:20,backgroundColor:'#fff',padding:3,borderRadius:100}}><FaExclamationTriangle size={15} />{datareject.length}</label></a>}
                  {dataNew.length >=1&&<a href='/StatusflowReceive'><label  style={{color:'#F77541',marginRight:20,backgroundColor:'#fff',padding:3,borderRadius:100}} 
                 ><FaBell color='#F77541' size={15}/>{dataNew.length}</label></a>}   ผู้ใช้งาน :  <FaUserCircle /> คุณ  {Uname}</div>:<div><FaFacebookF /> <FaPinterest /> <FaTwitter /> <FaInstagram /> </div>}
              </div>
            </div>
          </Container>
        </div>

        {/* menu header */}
        <div className='header-menu-top'>
          <Container>
            <div className='leyour-row-wrap'>
              <div>
              <a href="/"><img src={require('../img/favicon.ico')} /></a> DOCUMENT E-TDS
              </div>
              <div>
                <label>SYSTEM DOCUMMENT TDS BY SWAN</label> <Button  onClick={()=>islogout()} variant="warning">SIGN OUT</Button>
              </div>
            </div>
          </Container>
        </div>
    {isUname==""?<div>
    
      <Routes>
          <Route path="/" element={<Indexpage />} />
          </Routes>
      </div>:
        <Sidebar>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/JournalTosend" element={<JournalTosendpage />} />
          <Route path="/CreateJournal" element={<CreateJournal />} />
          <Route path="/Groupdepartment" element={<Groupdepartment />} />
          <Route path="/StatusflowReceive" element={<StatusflowReceive />} /> 
          <Route path="/journalTDS/:Id" element={<JournalTDSclassB />} />
          <Route path="/EditJournalPlnning/:Id" element={<EditJournalPlnning />} />
          <Route path="/JournalListnew" element={<JournalListnewpage />} />  
          <Route path="/editJournalRd/:Id" element={<EditJournalRDpage />} />  
          <Route path="/ViewDetailJournal/:Id" element={<ViewDetailJournalpage />} />
          <Route path="/EditJournal/:Id" element={<EditJournalpage />} />
          <Route path="/StatusflowReject" element={<StatusflowRejectpage />} />
          <Route path="/ListjournalPrepress" element={<ListjournalPrepress />} />
          <Route path='/editConventionnalInkpage/:Id' element={<EditConventionnalInkpage/>}/>
          <Route path='/ApproveJournalApage/:Id' element={<ApproveJournalApage/>}/>
          <Route path='/ApproveJournalBpage/:Id' element={<ApproveJournalBpage/>}/>
          <Route path='/ViewJournalSuccess/:Id' element={<ViewJournalSuccesspage/>}/>
          <Route path='/DuplicateJournal/:Id' element={<DuplicateJournalpage/>}/>
          <Route path='/createCansizeType' element={<CreateCansizeType/>}/>
        </Routes>
        </Sidebar>  
}

      </BrowserRouter>
  )
}