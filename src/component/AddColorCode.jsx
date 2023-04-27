import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import {
    selectColor, addcolorAll, selectGroupcolor, addgroupColor, removeall,
    removeColorByid, removeGroupColorByid
} from '../redux/features/codeColorSlice';

import { post_Codecolor,post_CodecolorDetail } from '../service/apicall';

const AddColorCode = ({ docId,docVersion }) => {

    const listColor = useSelector(selectColor);
    const groupcolor = useSelector(selectGroupcolor);

    const dispatch = useDispatch();

    const [modalShow, setModalShow] = React.useState(false);
    const [inputName, setInputName] = useState("");
    const [dataInput, setDataInput] = useState("");
    useEffect(() => {

    }, [dispatch])

    // add เข้า redux เอาไวเพื่อสร้างรายการ code color
    const addcolor = () => {
        var dataOpject = {
            formulate: inputName.formulate,
            inkName: inputName.inkName,
            kg: inputName.kg,
            docId: docId
        }
        dispatch(addcolorAll(dataOpject));
    }

    // add เข้า redux เพื่อสร้าง group color
    const saveconfirm = () => {
        var CodeName = inputName.NameCode;
        var remarks = ""
        if (inputName.remarks !== ""||inputName.remarks !== undefined) {
            remarks = inputName.remarks
        }

        const opjecrAll = {
            codeName: CodeName,
            docId: docId,
            remarks: remarks,
            docVersion:docVersion,
            alllist: listColor
        }
        if (listColor.length > 0) {
            dispatch(addgroupColor(opjecrAll));
            dispatch(removeall())
        }
        else {
            alert('ไม่มีข้อมูลในการบันทึก')
        }
    }



    // handle event input text
    function handle(e) {
        const { name, value } = e.target;
        setInputName({ ...inputName, [name]: value });
    }

    const removeIdcolor = (e) => {
        dispatch(removeColorByid(e))
    }

    const removeIdcolorGroup = (e) => {
        dispatch(removeGroupColorByid(e))
    }

    const insertToDB = () => {
        setModalShow(false)
        // groupcolor.map((item, index) => {

        //    post_Codecolor(item).then((datacolor) => {
        //         if (datacolor.success == true) {
                    
        //             item.alllist.map((itemDetail, index) => {
        //               post_CodecolorDetail(itemDetail,item.codeName);
        //             })
        //         }
        //     })
        
        // })
    }

    return (
        <div>
            <button type='button' onClick={() => setModalShow(true)}
                style={{ background: '#E3A71C', borderWidth: 0.5, padding: 5, borderRadius: 5, fontSize: 12, color: '#fff' }}>เพิ่มโค้ด สี</button>
            <Modal
                onHide={() => setModalShow(false)}
                fullscreen={true}
                aria-labelledby="contained-modal-title-vcenter"
                //  centered แสดง Modal ตรงกลาง page
                show={modalShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Color
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ padding: 10, background: '#E1E8E4' }}>

                        <div>
                            <label>Color : </label><br />
                            <input type='text' name='NameCode' id='NameCode' value={inputName.NameCode}
                                onChange={(e) => handle(e)} />
                        </div>
                        <div className='row-between-wrap'>
                            <div>
                                <label>Ink Name : </label><br />
                                <input type='text' name='inkName' id='inkName' value={inputName.inkName}
                                    onChange={(e) => handle(e)} />
                            </div>
                            <div>
                                <label>Formulate (%) : </label><br />
                                <input type='text' name='formulate' id='formulate' value={inputName.formulate}
                                    onChange={(e) => handle(e)} />
                            </div>
                            <div>
                                <label>0.5 kg / 1,000 sht : </label><br />
                                <input type='text' name='kg' id='kg' value={inputName.kg}
                                    onChange={(e) => handle(e)} />
                            </div>
                            <div>
                                <button style={{ fontSize: 12, padding: 2, width: 150, height: 50, margin: 2 }} onClick={() => addcolor()}>เพิ่มข้อมูล</button>
                                <button style={{ fontSize: 12, padding: 2, width: 150, height: 50 }} onClick={() => saveconfirm()}>บันทึก</button>
                            </div>

                        </div>

                        <div>
                            <label> Remarks  : </label><br />
                            <textarea type="text" id="remarks" name="remarks" rows="3" cols="50"
                                onChange={(e) => handle(e)}>

                            </textarea>
                        </div>
                    </div>
                    <div>
                        <div style={{ padding: 10, fontSize: 13 }}>
                            {listColor.length > 0 && <label>แสดงรายการที่เพิ่ม</label>}<br />
                            {listColor.length > 0 && <label>{inputName.NameCode}</label>}
                            {listColor.map((item, index) => {
                                return (<div className='row-between-wrap' style={{ width: '50%', background: '#F7D477' }}>
                                    <div>Ink Name : {item.inkName}</div>
                                    <div>Formulate : {item.formulate}</div>
                                    <div>kg : {item.kg}</div>
                                    <div><label onClick={(e) => removeIdcolor(index)}>( ลบ )</label></div>
                                </div>)
                            })}
                        </div>


                        {groupcolor.map((item, index) => {
                            return (<div>
                                <div className='row-between-wrap'>
                                    <div>
                                        <label>COLOR : </label> {item.codeName}
                                        </div>
                                    <div>
                                        <label onClick={(e) => removeIdcolorGroup(index)} style={{
                                            background: '#F87B05',
                                            padding: 2, borderRadius: 5, color: '#fff', fontSize: 12
                                        }}>( ลบข้อมูล )</label>
                                    </div>
                                </div>
                                <table className='table-create-color'>
                                    <tr style={{ background: '#C1C6C3' }}>
                                        <th>Ink name</th>
                                        <th>Formulate</th>
                                        <th>0.5 kg / 1,000 sht</th>
                                    </tr>
                                    {item.alllist.map((itemlist, index) => {
                                        return (<tr style={{ borderWidth: 0.5, fontSize: 12 }}>
                                            <td>{itemlist.inkName}</td>
                                            <td>{itemlist.formulate}</td>
                                            <td>{itemlist.kg}</td>
                                        </tr>)
                                    })}
                                    <tr>
                                        <td>
                                            <div style={{ fontSize: 12 }}><label><b>Remark :</b></label> {item.remarks}</div>

                                        </td>
                                    </tr>
                                </table>
                            </div>)
                        })}

                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Close
                    </Button>
                    <Button onClick={() => insertToDB()}>บันทึก</Button>
                </Modal.Footer>
            </Modal></div>
    )
}

export default AddColorCode