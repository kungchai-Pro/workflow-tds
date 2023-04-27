import React, { useState } from 'react';
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

function StatusVeiw({ sta, ids }) {

    let Urlmenuflow = "";

    if (sta <= 4) {
        Urlmenuflow = `/ViewDetailJournal/${ids}`;

    }
    else if (sta > 4) {
        Urlmenuflow = `/ViewJournalSuccess/${ids}`;
    }
   

    return (
        <div>
            {/* <Link to={Urlmenuflow+ids} >
               <button style={{margin:2,padding:2,borderRadius:3,
               backgroundColor:'#FBC53E',borderColor:'#FBC53E'}}>รออนุมัติ</button>
           </Link> */}
       
            <Link to={Urlmenuflow} >
                <button style={{
                    margin: 2, padding: 2, borderRadius: 3,
                    backgroundColor: '#1BA734', color: '#fff', borderColor: '#1BA734'
                }}>
                    View</button>
            </Link>
        </div>
    )
}




const columns = [
    // {
    //     name: 'Image',
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
        name: 'Item Id',
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
        name: 'Status ',
        selector: row => <div>{row.statusFlow == 'approve' ? <label style={{ color: '#13B808' }}>{row.statusFlow}</label> : <label>{row.statusFlow}</label>}</div>,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.datetime,
        sortable: true,
    },
    {
        name: 'View Detail',
        selector: row => <div>{row.statusFlow!='draft'&&<StatusVeiw sta={row.stateFlow} ids={row.journalId} />}</div>,
        sortable: true,
    },


];


const TableListDepartjournal = (data) => {
    // console.log(data.data)
    var datalist = data.data;
    return (
        <DataTable
            title="รายการที่ทำแล้ว"
            columns={columns}
            data={datalist}
            customStyles={customStyles}
            highlightOnHover
            pagination />
    );
};
export default TableListDepartjournal;