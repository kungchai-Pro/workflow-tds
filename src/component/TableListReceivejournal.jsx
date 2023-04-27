import React,{useState} from 'react';
import DataTable from 'react-data-table-component';
import { Link ,useNavigate} from 'react-router-dom';
import{toast}from"react-toastify";

import{journalUpdateStatusByid,Statusflow}from'../service/apicall';

 function Receivelow({jnId,runis,vocVersion}){
  var Uname= sessionStorage.getItem("Uname");
  var Udepcode=  sessionStorage.getItem("Udepcode");
  var  Ustate= sessionStorage.getItem("Ustate");
  const navigate=useNavigate()

   
    const  updatejournal=()=>{
       // alert(jnId)
        journalUpdateStatusByid(jnId,'receive',Ustate,).then(data=>{
            Statusflow(runis,Uname,'receive',Udepcode,vocVersion).then(sdata=>{
                if(sdata){
                   // window.location.href='/JournalTosend'
                   toast("คุณได้รับเอกสารเรียบร้อยแล้ว")
                   navigate("/JournalTosend");
                }
            })
        })

         }
    
    return(
        <div>
            <label><button onClick={()=>updatejournal()} style={{padding:2,borderRadius:5,
                backgroundColor:'#F4BD1D',borderColor:'#F4BD1D'}}>รับข้อมูล</button></label>
        </div>
    )
 }



 const customStyles = {
    headRow: {
        style: {
            border: 'none',
            backgroundColor: '#28B463'
        },
    },
    headCells: {
        style: {
            color: '#ffff',
            fontSize: '14px',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            borderRadius: '25px',
            outline: '1px solid #FFFFFF',
        },
    },
    pagination: {
        style: {
            border: 'none',
        },
    },
};


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
    {
        name: 'Revision',
        selector: row => row.docVersion,
        sortable: true,
        grow: 1,
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
    {
        name: 'Product Name',
        selector: row => row.productName,
        sortable: true,
        grow: 2,
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
        selector: row =><div><Receivelow jnId={row.journalId} runis={row.tdsRunning} vocVersion={row.docVersion}/>       
     </div>,
        sortable: true,
    },


];



const TableListReceivejournal=(data)=>{
   // console.log(data.data)
    var datalist=data.data;
    return (
        <DataTable title="รายการใหม่ล่าสุด" 
        columns={columns} 
        data={datalist} 
        customStyles={customStyles}
        highlightOnHover
        pagination />
    );
};
export default TableListReceivejournal;