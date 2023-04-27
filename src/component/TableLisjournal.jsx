import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import LIstUserFlow from './LIstUserFlow';
import { FaCheckCircle ,FaAngleDoubleRight,FaExclamationCircle} from "react-icons/fa";
// update link url View data list
function StatusVeiw({ staf, ids }) {

    let Urlmenuflow = "";

    if (staf <= 4) {
        Urlmenuflow = `/ViewDetailJournal/${ids}`;

    }
    else if (staf > 4) {
        Urlmenuflow = `/ViewJournalSuccess/${ids}`;
    }


    return (
        <div>
    

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


function ShowStatuscolor({ sta, stu }) {
    var staTo=parseInt(sta)+1;
    var staTo_next=staTo.toString()
    if (stu == 'approve') {
        return (
            <div className='leyour-row-wrap'>
                <div className='color-green-state'> <FaCheckCircle size={15}/> Approve</div>
             
            </div>
        )
    }
    else if (sta > 3) {
        return (
            <div className='leyour-row-wrap'>
                <div>{stu=='receive'?<div style={{color:'#F69510'}}> รอนุมัติ <LIstUserFlow statFlow={sta}/></div>:<div style={{color:'#F69510'}}>  รอนุมัติ <LIstUserFlow statFlow={staTo_next}/></div>}</div>
            </div>)
    }
    else if ( stu == 'send'&&sta ==3 ){
        return (
            <div className='leyour-row-wrap'>
            {/* <div className='color-green-state'>PR</div>
            <div className='color-green-state'>RD</div> */}
            <div className='color-green-state'>PL <FaAngleDoubleRight size={13}/> </div>
            <div className='color-g-state'> 
            <div style={{color:'#F69510'}}> <LIstUserFlow statFlow={staTo_next}/></div>
             </div>
        </div>)
    }
    else if (stu == 'receive' && sta == 3) {
        return (
            <div className='leyour-row-wrap'>
                <div className='color-green-state'>PR</div>
                <div className='color-green-state'>RD</div>
                <div className='color-yellow-state'>PL</div>
            </div>
        )
    }
    else if (stu == 'send' && sta == 2) {
        return (
            <div className='leyour-row-wrap'>
                <div className='color-green-state'>PR</div>
                <div className='color-green-state'>RD</div>
                <div className='color-red-state'>PL</div>
            </div>
        )

    }
    else if (stu == 'receive' && sta == 2) {
        return (
            <div className='leyour-row-wrap'>
                <div className='color-green-state'>PR</div>
                <div className='color-yellow-state'>RD</div>
                <div className='color-red-state'>PL</div>
            </div>
        )

    }
    else if (stu == 'send' && sta == 1) {
        return (
            <div className='leyour-row-wrap'>
                <div className='color-green-state'>PR</div>
                <div className='color-red-state'>RD</div>
                <div className='color-red-state'>PL</div>
            </div>
        )

    }
    else if (stu == 'draft' && sta == 1) {
        return (
            <div className='leyour-row-wrap'>
                <div className='color-yellow-state'>PR</div>
                <div className='color-red-state'>RD</div>
                <div className='color-red-state'>PL</div>
            </div>
        )

    }
    else if (stu == 'reject' && sta == 2) {
        return (
            <div className='leyour-row-wrap'>
                <div className='color-green-state'>PR</div>
                <div className='color-red-state'>RD</div>
                <div className='color-red-state'>PL</div>
            </div>
        )

    }
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
    //     name: 'Image',
    //     selector: row =><img src={row.partFile} width="50" height="50" /> ,
    //     sortable: true,
    // },
    {
        name: 'Number',
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
     //   grow: 1,
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

    {
        name: 'Note',
        selector: row => <label>{row.note == '1' ? 'Proof' : 'Not proof'}</label>,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.datetime,
        sortable: true,
    },
    // {
    //     name: 'Status',
    //     selector: row => row.statusFlow,
    //     sortable: true,
    // },
    {
        name: 'Status',
        selector: row => <ShowStatuscolor sta={row.stateFlow} stu={row.statusFlow} />,
        sortable: true,
        grow:1,
    },
    {
        name: 'View Detail',
        selector: row => <div>
            {row.statusFlow == 'approve' ? <StatusVeiw staf={row.stateFlow} ids={row.journalId} /> : ""}

        </div>,
        sortable: true,
    },


];

// const tableData = {
//     columns,
//     data,
//   };

const TableLisjournal = (alldata) => {
    var data = alldata.data;

    const tableData = {
        columns,
        data,
        exportHeaders: true,
        print: false,
        export: false
    };

    return (
        <DataTableExtensions
            {...tableData}
        >

            <DataTable title="รายการทั้งหมด"
                columns={columns}
                //  data={datas} 
                customStyles={customStyles}
                highlightOnHover
                pagination
            />
        </DataTableExtensions>
    );
};
export default TableLisjournal;