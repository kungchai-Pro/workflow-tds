import React,{useState} from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';


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
        grow: 1,
    },
    {
        name: 'Status',
        selector: row => row.statusFlow,
        sortable: true,
        grow: 1,
    },
    {
        name: 'Date',
        selector: row => row.datetime,
        sortable: true,
        grow: 1,
    },
    {
        name: 'View Detail',
        grow: 1.5,
        selector: row =><div>
            <Link to={'/journalTDS/'+row.journalId} >
                <button style={{margin:2,padding:2,borderRadius:3,backgroundColor:'#1BA734',color:'#fff',borderColor:'#1BA734'}}>ส่งข้อมูล</button>
                </Link>
            <Link to={'/EditJournal/'+row.journalId} ><button style={{margin:2,padding:2,borderRadius:3,backgroundColor:'#F2BE1A',color:'#fff',borderColor:'#F2BE1A'}}>แก้ไขข้อมูล</button></Link> 
        {/* <Link to={'/journalTDS/'+row.journalId} >View pre</Link>{" "}
        <Link to={'/editJournal/'+row.journalId} >Edit f1</Link> 
        <Link to={'/editJournalRd/'+row.journalId} >Edit pla</Link>  */}
       
     </div>,
        sortable: true,
    },


];



const TableListNewjournal=(data)=>{
   // console.log(data.data)
    var datalist=data.data;
    return (
        <DataTable title="รายการที่สร้างใหม่" 
        columns={columns} 
        data={datalist} 
        customStyles={customStyles}
        pagination 
        highlightOnHover
        />
    );
};
export default TableListNewjournal;