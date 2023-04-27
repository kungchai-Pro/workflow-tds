import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import DataTableExtensions from 'react-data-table-component-extensions';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteCansize, get_CanSheetByid,put_Cansheet} from '../service/apicall';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

function ActionEvent({ idjour }) {

    const [modalShow, setModalShow] = React.useState(false);
    const [inputName, setInputName] = useState([]);

    const ConfirmRemove = () => {

        confirmAlert({
            title: 'แจ้งเตือน',
            message: 'คุณต้องการที่จะ ( ลบ )  ข้อมูลใช่หรือไม่',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => isRemove()
                },
                {
                    label: 'No',
                    onClick: () => ''
                }
            ]
        });
    }

    const isUpdateCansize = () => {

        get_CanSheetByid(idjour).then((res) => {
            setInputName(res.listall[0])
        })
        setModalShow(true);

    }


    // delete cansize by id 
    const isRemove = () => {

        deleteCansize(idjour).then((res) => {
            if (res.success = true) {
                window.location.reload();
            }
        })
    }


    // handle event input text
    function handle(e) {
        const { name, value } = e.target;
        setInputName({ ...inputName, [name]: value });
    }

    // submit  update  data by id 
    // const onsubmitConfirm = () => {
    //     //   e.preventDefault();
    //   //  console.log(inputName);
    //     put_Cansheet(inputName).then((res)=>{

    //         if(res.success==true){
    //           //  toast('คุณได้ทำการแก้ไขเรียบร้อยแล้ว')
    //            // window.location.reload();
    //            WainingUpdate();
    //         }
    //     })
    // }

    const onsubmitConfirm=()=>{
        
        setModalShow(false);
        confirmAlert({
            title: 'แจ้งเตือน',
            message: 'คุณต้องการแก้ไขข้อมูล ใช่หรือไม่',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => updateDatacanSize()
                },
                {
                    label: 'No',
                    onClick: () => ''
                }
            ]
        });
        
    }

    const updateDatacanSize=()=>{

        put_Cansheet(inputName).then((res)=>{

            if(res.success==true){
              //  toast('คุณได้ทำการแก้ไขเรียบร้อยแล้ว')
             window.location.reload();
            //   WainingUpdate();
            }
        })
    }
    




    return (<div>
        <div>
            <button style={{
                margin: 2, borderRadius: 5, padding: 5,
                borderWidth: 0.5, background: '#087AC4', color: '#ffff'
            }} onClick={() => isUpdateCansize()}>
                Edit
            </button>

            <button style={{
                margin: 2, borderRadius: 5, padding: 5,
                borderWidth: 0.5, background: '#D99C43', color: '#ffff'
            }}
                onClick={() => ConfirmRemove()}
            >
                Delete
            </button>
        </div>

        <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => setModalShow(false)}
        // centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal {idjour}</h4>
                <div style={{ marginTop: 20, background: '#EEECE9', borderRadius: 10, padding: 10 }}>

                    <div>
                        <label className='label-margid'>Cansize : </label>
                        <input type='text' name='cansize' placeholder='cansize'
                            id='cansize' value={inputName.cansize}
                            onChange={(e) => handle(e)}
                            style={{ width: 200 }}
                            required
                            className='form-text'
                        /> <label style={{ color: 'red' }}>*</label>
                    </div>
                    <div>
                        <label className='label-margid'>Sheetsize : </label>
                        <input type='text' name='sheetsize' placeholder='Sheetsize'
                            id='sheetsize' value={inputName.sheetsize}
                            onChange={(e) => handle(e)}
                            className='form-text'
                            required
                        /> <label style={{ color: 'red' }}>*</label>
                    </div>
                    <div>
                        <label className='label-margid'>Rubber : </label>
                        <input type='text' name='rubber' placeholder='Rubber'
                            id='rubber' value={inputName.rubber}
                            onChange={(e) => handle(e)}
                            className='form-text'
                            required
                        /> <label style={{ color: 'red' }}>*</label>
                    </div>
                    <div>
                        <label className='label-margid'>Property : </label>
                        <input type='text' name='property' placeholder='property'
                            id='property' value={inputName.property}
                            onChange={(e) => handle(e)}
                            className='form-text'
                            required
                        /><label style={{ color: 'red' }}>*</label>
                    </div>
                    <div>
                        <label className='label-margid'>Cancode : </label>
                        <input type='text' name='cancode' placeholder='Cancode'
                            id='cancode' value={inputName.cancode}
                            onChange={(e) => handle(e)}
                            style={{ width: 200 }}
                            className='form-text'
                            required
                        /> <label style={{ color: 'red' }}>*</label>
                    </div>
                    <div>
                        <label className='label-margid'>Width : </label>
                        <input type='text' name='widths' placeholder='Width'
                            id='widths' value={inputName.widths}
                            onChange={(e) => handle(e)}
                            style={{ width: 150 }}
                            className='form-text'
                            required
                        /> <label style={{ color: 'red' }}>*</label>
                    </div>
                    <div>
                        <label className='label-margid'>Height : </label>
                        <input type='text' name='lengths' placeholder='Height'
                            id='lengths' value={inputName.lengths}
                            onChange={(e) => handle(e)}
                            style={{ width: 150 }}
                            className='form-text'
                            required
                        /> <label style={{ color: 'red' }}>*</label>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button type='button' onClick={() => onsubmitConfirm()}>บันทึก</Button>
                <Button variant="warning" onClick={() => setModalShow(false)}>ยกเลิก</Button>
            </Modal.Footer>
        </Modal>

    </div>)
}



// end ---


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
    {
        name: 'Cansize',
        selector: row => row.cansize,
        sortable: true,
    },
    {
        name: 'Sheet Size',
        selector: row => row.sheetsize,
        sortable: true,
        grow: 2,
    },
    {
        name: 'Runbber',
        selector: row => row.rubber,
        sortable: true,
        grow: 1,
    },
    {
        name: 'Property',
        selector: row => row.property,
        sortable: true,
        grow: 1,
    },
    {
        name: 'Code Number',
        selector: row => row.cancode,
        sortable: true,
        grow: 1,
    },
    {
        name: 'Width',
        selector: row => row.widths.toFixed(1),
        sortable: true,
    },
    {
        name: 'Height',
        selector: row => row.lengths.toFixed(1),
        sortable: true,
        grow: 1,
    },
    {
        name: 'Action',
        selector: row => <ActionEvent idjour={row.cansizeId} />,
        sortable: true,
        grow: 2,
    },
];



const TableCansizeSheet = (data) => {
    var data = data.data;

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

            <DataTable

                columns={columns}
                //  data={datas} 
                customStyles={customStyles}
                highlightOnHover
                pagination
            />
        </DataTableExtensions>
    );
};
export default TableCansizeSheet;