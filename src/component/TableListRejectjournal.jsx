import React,{useState} from 'react';
import DataTable from 'react-data-table-component';
import { Link,useNavigate } from 'react-router-dom';
import{toast}from'react-toastify';

import{journalUpdateStatusByid,Statusflow}from'../service/apicall';

 function Receivelow({jnId,runis}){
  var Uname= sessionStorage.getItem("Uname");
  var Udepcode=  sessionStorage.getItem("Udepcode");
  var  Ustate= sessionStorage.getItem("Ustate");
  const navigate=useNavigate()

   
    const  updatejournal=()=>{
       // alert(jnId)
        journalUpdateStatusByid(jnId,'receive',Ustate,).then(data=>{
            Statusflow(runis,Uname,'receive',Udepcode).then(sdata=>{
                if(sdata){
                  //  window.location.href='/JournalTosend'
                  toast("คุณได้รับเอกสารเรียบแล้ว")
                  navigate("/JournalTosend")
                }
            })
        })

         }
    
    return(
        <div>
            <label>
                {Ustate==2?<button onClick={()=>updatejournal()} style={{padding:2,borderRadius:5,
                backgroundColor:'#F4BD1D',borderColor:'#F4BD1D'}}>รับข้อมูลตีกลับ</button>:<label style={{color:'#F4A819'}}>รอตอบข้อมูล</label>}
               </label>
        </div>
    )
 }

const columns = [
    // {
    //     name: 'file',
    //     selector: row =><img src={row.partFile} width="50" height="50" /> ,
    //     sortable: true,
    // },
    {
        name: 'TDS Running',
        selector: row => row.tdsRunning,
        sortable: true,
    },
    {
        name: 'Ref TDS',
        selector: row => row.refTDS,
        sortable: true,
    },
    // {
    //     name: 'PartFile',
    //     selector: row => row.partFile,
    //     sortable: true,
    // },
    {
        name: 'ItemId',
        selector: row => row.itemId,
        sortable: true,
    },
    // {
    //     name: 'SheetSize',
    //     selector: row => row.sheetSize,
    //     sortable: true,
    // },
    // {
    //     name: 'PrintingCode',
    //     selector: row => row.printingCode,
    //     sortable: true,
    // },
    // {
    //     name: 'CoatingCode',
    //     selector: row => row.coatingCode,
    //     sortable: true,
    // },
    {
        name: 'Note',
        selector: row =><label>{row.note=='1'?'Proof':'Not proof'}</label>,
        sortable: true,
    },
    // {
    //     name: 'Remark',
    //     selector: row => row.remark,
    //     sortable: true,
    // },
    {
        name: 'Date',
        selector: row => row.datetime,
        sortable: true,
    },
    {
        name: 'View Detail',
        selector: row =><div><Receivelow jnId={row.journalId} runis={row.tdsRunning}/>
         {/*<Link to={'/journalTDS/'+row.journalId} >ส่งข้อมูล</Link> 
        <Link to={'/journalTDS/'+row.journalId} >View pre</Link>{" "}
        <Link to={'/editJournal/'+row.journalId} >Edit f1</Link> 
        <Link to={'/editJournalRd/'+row.journalId} >Edit pla</Link>  */}
       
     </div>,
        sortable: true,
    },


];



const TableListRejectjournal=(data)=>{
   // console.log(data.data)
    var datalist=data.data;
    return (
        <DataTable title="รายการ แจ้งแก้ไขข้อมูล" columns={columns} data={datalist} pagination />
    );
};
export default TableListRejectjournal;