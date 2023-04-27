import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';


function StatusTosend({ids}) {
     var idstate = sessionStorage.getItem("Ustate");
    let Urlmenuflow="";

    if(idstate==2){
        Urlmenuflow='/editJournalRd/';
       
    }
    else if(idstate==3){
        Urlmenuflow='/EditJournalPlnning/';
    }
    else if(idstate==4){
        Urlmenuflow='/ApproveJournalApage/';
        
    }
    else if(idstate==5){
        Urlmenuflow='/editConventionnalInkpage/';
    }
    else if(idstate==6){
        Urlmenuflow='/ApproveJournalBpage/';
      
    }
    else if(idstate==7){
        Urlmenuflow='/ApproveJournalBpage/';
    }
     
    return (
        <div>
            <Link to={Urlmenuflow+ids} >
                <button style={{margin:2,padding:2,borderRadius:3,
                backgroundColor:'#FBC53E',borderColor:'#FBC53E'}}>รออนุมัติ</button>
            </Link>
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
    //     selector: row => <img src={row.partFile} width="50" height="50" />,
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
        selector: row => <label>{row.note == '1' ? 'Proof' : 'Not proof'}</label>,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.statusFlow,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.datetime,
        sortable: true,
    },
    {
        name: 'View Detail',
        selector: row => 
        <div><StatusTosend  ids={row.journalId}/></div>,
        sortable: true,
    },


];



const TableListTosendJournal = (data) => {
    // console.log(data.data)
    var datalist = data.data;
    return (
        <DataTable title="รออนุมัติ เอกสาร TDS " 
        columns={columns} 
        data={datalist} 
        customStyles={customStyles}
        highlightOnHover
        pagination 
        />
    );
};
export default TableListTosendJournal;