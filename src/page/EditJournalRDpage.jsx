import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { useParams,useNavigate } from 'react-router-dom';
import {
    GetjournalByid, cantingsystemByCode, cansizeTypeByCode, cansizeTypeByProperty, CansizeTypeList,
    GetjourtDetialClassB_Byid, Update_tdatajournalClassB, journalUpdateStatusEdit, Statusflow, LinesendBydepartment
} from '../service/apicall'
import { CiSquareCheck, CiStop1 } from "react-icons/ci"
import { FaImage, FaEye } from "react-icons/fa"



const EditJournalRDpage = () => {

    var Uname = sessionStorage.getItem("Uname");
    var Udepcode = sessionStorage.getItem("Udepcode");
    var Ustate = sessionStorage.getItem("Ustate");
    const Upermiss = sessionStorage.getItem("Upermis");
   const navigate =useNavigate();

    const Params = useParams();
    const { Id } = Params;
    const [jourData, setJourData] = useState([]); // เรียกข้อมูล  journal หน้าหลัก
    const [cansize, setCansize] = useState([]) //เรียกข้อมูล cansizesheet  ตามรหัส 
    // const [coating, setCoating] = useState([]);
    const [cansizePro, setCansizePro] = useState([])  //เรียกข้อมูลรายาการ cansizesheet list
    const [jourDetail, setJourDetail] = useState([]) // เรียกข้อมูล  journal detail

    const [cansizeCode, setCansizeCode] = useState('') // นำไปอัพเดท journal 
    const [productfood, setProductfood] = useState('') // นำไปอัพเดท journal 
    const [cansizesheet, setCansizesheet] = useState('')

    // modal 
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    // end modal


    useEffect(() => {

        GetjourtDetialClassB_Byid(Id).then(cbdata => {

            setJourDetail(cbdata.listall[0])

        })

        GetjournalByid(Id).then(jdata => {
            //    console.log(data)
            setJourData(jdata.listall[0]);


            setProductfood(jdata.listall[0].productGroup) //นำไป อัพเดท journal 

            if (jdata) {
                readcansheet(jdata.listall[0].sheetSize);

                CansizeTypeList().then(data => {
                    console.log(data);
                    setCansizePro(data.listall);
                })

            }


        })


    }, [])

    const readcansheet = (codeid) => {

        cantingsystemByCode(codeid).then(data => {

            setCansize(data.listall[0]);
            setCansizesheet(data.listall[0].cansize)

            setCansizeCode(data.listall[0].cancode) // นำไป อัพเดท  journal 

        })
    }


    const changeCansize = (e) => {
        var dataCansize = e.target.value;
            cansizeTypeByCode(dataCansize).then(data => {
            setCansizesheet(data.listall[0].cansize) // นำมาแสดงหน้า B ให้เห็นการเปลี่ยนแปลงก่อนเอาไปอัพเดท
            setCansizeCode(data.listall[0].cancode) // นำไป อัพเดท  journal 
        })
    }

    const submit = (e) => {
        e.preventDefault();

        const resultdata = {
            journalId: Id,
            tdsRunning: jourData.tdsRunning,
            side_th1: '', colorshade_th1: '', fmcode_th1: '', dfw_th1: '', temp_th1: '', speed_th1: '',
            side_th2: jourDetail.side_2th, colorshade_th2: jourDetail.color_2th, fmcode_th2: jourDetail.fmCode_2th,
            dfw_th2: jourDetail.dfw_2th, lacq_th2: jourDetail.lacq_2th,
            temp_th2: jourDetail.temp_2th, speed_th2: jourDetail.Speed_2th,rubber_th2:jourDetail.rubber_3th,
            side_th3: jourDetail.side_3th, colorshade_th3: jourDetail.color_3th, fmcode_th3: jourDetail.fmCode_3th,
            dfw_th3: jourDetail.dfw_3th, lacq_th3: jourDetail.lacq_3th,
            temp_th3: jourDetail.temp_3th, speed_th3: jourDetail.Speed_3th,rubber_th3:jourDetail.rubber_3th,
            side_th4: jourDetail.side_4th, colorshade_th4: jourDetail.color_4th, fmcode_th4: jourDetail.fmCode_4th,
            dfw_th4: jourDetail.dfw_4th, lacq_th4: jourDetail.lacq_4th,
            temp_th4: jourDetail.temp_4th, speed_th4: jourDetail.Speed_4th,rubber_th4:cansizesheet,
            side_th5: jourDetail.side_5th, colorshade_th5: jourDetail.color_5th, fmcode_th5: jourDetail.fmCode_5th,
            dfw_th5: jourDetail.dfw_5th, lacq_th5: jourDetail.lacq_5th,
            temp_th5: jourDetail.temp_5th, speed_th5: jourDetail.Speed_5th,rubber_th5:cansizesheet,
            side_th6: jourDetail.side_6th, colorshade_th6: jourDetail.color_6th, fmcode_th6: '', dfw_th6: '', temp_th6: '', speed_th6: '',
            side_th7: 'W/D', colorshade_th7: jourDetail.color_7th, fmcode_th7: jourDetail.fmCode_7th,
            dfw_th7: jourDetail.dfw_2th, lacq_th7: jourDetail.lacq_7th,
            temp_th7: jourDetail.temp_7th, speed_th7: jourDetail.Speed_7th,rubber_th7:jourDetail.rubber_7th
        }

        Update_tdatajournalClassB(resultdata).then(data => {
            if (data.success == true) {

                var mess = "แจ้งเตือนมีเอกสารใหม่  รหัส " + jourData.refTDS + "\n" +
                    "ผู้ตรวจสอบข้อมูล โดย  " + Uname

                LinesendBydepartment(mess)
                updatejournal()
            }
            toast("คุณได้ตรวจสอบเอกสารเรียบร้อยแล้ว");
        }).catch(err => console.log(err))

    }
    // update change journal 
    const updatejournal = () => {
        journalUpdateStatusEdit(Id, 'send', Ustate, cansizeCode, productfood, '').then(edata => {
            if (edata.success == true) {
                Statusflow(jourData.tdsRunning, Uname, 'send', Udepcode,jourData.docVersion).then(sdata => {
                    if (sdata) {
                     //   window.location.href = "/Groupdepartment";
                        navigate("/Groupdepartment")
                    }
                })
            }
        })
    }

    // ทำการเปลี่ยน ประเภท สินค้า 
    const handle = (e) => {

        setProductfood(e)
        if (e == 'normal') {
            setJourDetail({ ...jourDetail, dfw_2th: '8.0-9.0' })
            // console.log(jourDetail);
        }
        else if (e == 'valueAdded') {
            setJourDetail({ ...jourDetail, dfw_2th: '9.0-10.0' })
        }
    }


    return (

        <div className='body-page-form-tds-warp'>
            {/* { JSON.stringify(resultdata)} */}
            <center>เอกสาร TDS </center>
            <span style={{ fontSize: 15 }}>TECHNICAL DATA SHEET Part  ( A ) </span>


            <div className='body-form-tds-warp'>

                <Card>
                    <Card.Body>
                        <div className='leyour-row-wrap' style={{ backgroundColor: '#6EAE9D', padding: 5, borderRadius: 5 }}>
                            <div>วันที่บันทึก : {jourData.datetime}</div>
                            <div>เลขเอกสาร : {jourData.tdsRunning}</div>
                        </div>
                        <div>TDS Ref : {jourData.refTDS} ( V. {jourData.docVersion} )</div>
                        <div>เอกสารตัวอย่าง : <button style={{ padding: 5, borderColor: '#fff', borderWidth: '#fff', borderRadius: 5 }}>
                            <FaEye size={20} color={"#F77541"} onClick={() => setShow(true)} /></button></div>
                        <p />
                        <div>Customer Name : {jourData.customerName}</div>
                        <div>Product Name: {jourData.productName}</div>
                        <div>Code :{jourData.filmCode}</div>
                        {/* <div>เอกสารตัวอย่าง : <FaImage size={25} color={"#F77541"} onClick={() => setShow(true)} /></div> */}
                        <div className='leyour-row-wrap'>
                            <div>Printing system <br />
                                <label style={{ fontSize: 12 }}>{jourData.printingCode == 'P001' && 'Conventional ink'}</label>
                            </div>
                            <div>Coating system <br />
                                <label style={{ fontSize: 12 }}>{jourData.coatingCode}</label>
                            </div>
                            <div>Note <br />
                                <label style={{ fontSize: 12 }}>{jourData.note == 1 ? 'Proof' : 'Not Proof'}</label>
                            </div>
                            <div>Remark <br />
                                <label style={{ fontSize: 12 }}>{jourData.remark}</label>
                            </div>
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <label>Sheet Size</label><br />
                            <select name='psheetsize' id='psheetsize' onChange={(e) => changeCansize(e)} >
                                <label style={{ fontSize: 12 }}>{cansize.sheetsize}</label>
                                <option value={cansize.cancode}>default {cansize.sheetsize} ({cansize.rubber} )</option>
                                {cansizePro.map((option) => (
                                    <option value={option.cancode}>{option.sheetsize} ({option.rubber} )</option>
                                ))}
                            </select>
                        </div>
                        <hr />
                        <div className='leyour-row-wrap'>
                            <div>
                                <span>กรุณาเลือก Detail of product</span>
                                {productfood == 'normal' ? <Form.Check
                                    type="radio"
                                    name='productfood'
                                    label={'Normal'}
                                    value={'normal'}
                                    onChange={e => {
                                        //  setData({ ...data, profood: e.target.value })
                                        handle(e.target.value)
                                    }}
                                    defaultChecked
                                /> : <Form.Check
                                    type="radio"
                                    name='productfood'
                                    label={'Normal'}
                                    value={'normal'}
                                    onChange={e => {
                                        //  setData({ ...data, profood: e.target.value })
                                        handle(e.target.value)
                                    }}
                                //defaultChecked
                                />
                                }

                                {productfood == 'valueAdded' ? <Form.Check
                                    type="radio"
                                    name='productfood'
                                    label={'Value Added'}
                                    value={'valueAdded'}
                                    onChange={e => {
                                        //  setData({ ...data, profood: e.target.value })
                                        handle(e.target.value)
                                    }}
                                    defaultChecked
                                /> : <Form.Check
                                    type="radio"
                                    name='productfood'
                                    label={'Value Added'}
                                    value={'valueAdded'}
                                    onChange={e => {
                                        //  setData({ ...data, profood: e.target.value })
                                        handle(e.target.value)
                                    }}
                                />
                                }
                                <label>ข้อมูลปัจจุบัน : </label> {productfood}
                            </div>
                            <div style={{ backgroundColor: '#F7F4EF', width: '50%', height: 150, padding: 10, borderRadius: 5 }}>
                                <label>กรณี ตีกลับแก้ไข</label><br />
                                <label style={{ fontSize: 12, marginLeft: 20 }}> {jourData.remark_reject}</label>

                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>


            <form onSubmit={(e) => submit(e)} >

                <span style={{ fontSize: 15 }}>TECHNICAL DATA SHEET Part  ( B ) </span>

                <div className='body-form-tds-warp'>
                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '30%' }}>Coating System</th>
                                <th style={{ width: '30%' }}>Body</th>
                                <th style={{ width: '30%' }}></th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>1 TH</center></th>
                                <td>SIDE</td>
                                <td>
                                    {jourDetail.side_1th}

                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>ฟรีเตา 230 oC อย่างน้อย 1 ชั่วโมง ก่อนอาบเคลือบด้านใน</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_1th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_1th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_1th}</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    {/* 2 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '30%' }}>Coating System</th>
                                <th style={{ width: '30%' }}>Body</th>
                                <th style={{ width: '30%' }}></th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>2 ND</center></th>
                                <td>SIDE</td>
                                <td>
                                    <input type='name' value={jourDetail.side_2th}
                                        onChange={(e) => setJourData({ ...jourDetail, side_2th: e.target.value })} />

                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>
                                    <input type='text' name='color_2th'
                                        value={jourDetail.color_2th}
                                        onChange={(e) => setJourData({ ...jourDetail, color_2th: e.target.value })}
                                    />

                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>
                                    <input type="text" name='fmCode_2th'
                                        value={jourDetail.fmCode_2th}
                                        onChange={(e) => setJourData({ ...jourDetail, fmCode_2th: e.target.value })}
                                    />

                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {/* {jourDetail.dfw_2th} */}
                                    <input type="text" name='dfw2' id="dfw2" value={jourDetail.dfw_2th}
                                        onChange={e => setJourDetail({ ...jourDetail, dfw_2th: e.target.value })} />
                                </td>
                                <td>
                                    {jourDetail.length !== 0 && <input type='number'
                                        value={jourDetail.lacq_2th} onChange={(e) => setJourDetail({ ...jourDetail, lacq_2th: e.target.value })} />}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>
                                    <input type='text' name='temp_2th'
                                        value={jourDetail.temp_2th}
                                        onChange={(e) => setJourDetail({ ...jourDetail, temp_2th: e.target.value })} />
                                    {/* {jourDetail.temp_2th} */}
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_2th}</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    {/* 3 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '30%' }}>Coating System</th>
                                <th style={{ width: '30%' }}>Body</th>
                                <th style={{ width: '30%' }}></th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>3 RD</center></th>
                                <td>SIDE</td>
                                <td>
                                    <input type='text' name='side_3th'
                                        value={jourDetail.side_3th}
                                        onChange={(e) => setJourDetail({ ...jourDetail, side_3th: e.target.value })} />
                                    {/* {jourDetail.side_3th} */}
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>
                                    <input type='text' name='color_3th' value={jourDetail.color_3th}
                                        onChange={(e) => setJourDetail({ ...jourDetail.color_3th })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>
                                    <input type='' name='' value={jourDetail.fmCode_3th}
                                        onChange={(e) => setJourDetail({ ...jourDetail, fmCode_3th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {/* {jourDetail.dfw_2th} */}
                                    <input type="text" name="dfw3" id="dfw3"
                                        value={jourDetail.dfw_2th} onChange={(e) => setJourDetail({ ...jourDetail, dfw_3th: e.target.value })} />
                                </td>
                                <td>
                                    {jourDetail.length !== 0 && <input type={'number'}
                                        value={jourDetail.lacq_3th} onChange={(e) => setJourDetail({ ...jourDetail, lacq_3th: e.target.value })} />}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>
                                    <input type='text' name='temp_3th'
                                        value={jourDetail.temp_3th} onChange={(e) => setJourDetail({ ...jourDetail.temp_3th })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_3th}</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    {/* 4 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '30%' }}>Coating System</th>
                                <th style={{ width: '30%' }}>Body</th>
                                <th style={{ width: '30%' }}></th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>4 TH</center></th>
                                <td>SIDE</td>
                                <td>
                                    <input type='text' name='side_4th'
                                        value={jourDetail.side_4th} onChange={(e) => setJourDetail({ ...jourDetail, side_4th: e.target.value })} />

                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>
                                    <input type='text' name='color_4th'
                                        value={jourDetail.color_4th} onChange={(e) => setJourDetail({ ...jourDetail, color_4th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>
                                    {/* {jourDetail.fmCode_4th}  */}
                                    <input name='fmcode4' id='fmcode4'
                                        value={jourDetail.fmCode_4th} onChange={e => setJourDetail({ ...jourDetail, fmCode_4th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {/* {jourDetail.dfw_4th} */}
                                    <input type="text" name='dfw4' id='dfw4'
                                        value={jourDetail.dfw_4th} onChange={e => setJourDetail({ ...jourDetail, dfw_4th: e.target.value })} />
                                </td>
                                <td>{<input type={'number'}
                                    value={jourDetail.lacq_4th} onChange={(e) => setJourDetail({ ...jourDetail, lacq_4th: e.target.value })} />}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>
                                    {/* {jourDetail.temp_4th} */}
                                    <input type='text' name='temp4' id='temp4'
                                        value={jourDetail.temp_4th}
                                        onChange={e => setJourDetail({ ...jourDetail, temp_4th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>
                                   
                                    {jourDetail.Speed_4th}
                                </td>
                                <td>
                                    {cansizesheet}
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    {/* 5 ht */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '30%' }}>Coating System</th>
                                <th style={{ width: '30%' }}>Body</th>
                                <th style={{ width: '30%' }}></th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>5 TH</center></th>
                                <td>SIDE</td>
                                <td>
                                    <input type='text' name='side_5th'
                                        value={jourDetail.side_5th} onChange={(e) => setJourDetail({ ...jourDetail, side_5th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>
                                    <input type='text' name='color_5th'
                                        value={jourDetail.color_5th} onChange={(e) => setJourDetail({ ...jourDetail, color_5th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>
                                    {/* {jourDetail.fmCode_5th}  */}
                                    <input type="text" name='fmcode5' id="fmcode5" value={jourDetail.fmCode_5th}
                                        onChange={e => setJourDetail({ ...jourDetail, fmCode_5th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {/* {jourDetail.dfw_5th} */}
                                    <input type='text' name="dfw_5th" id="dfw_5th" value={jourDetail.dfw_5th}
                                        onChange={e => { setJourDetail({ ...jourDetail, dfw_5th: e.target.value }) }} />
                                </td>
                                <td><input type={'number'} value={jourDetail.lacq_5th} onChange={(e) => setJourDetail({ ...jourDetail, lacq_5th: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>
                                    {/* {jourDetail.temp_5th} */}
                                    <input type="text" name='temp5' id="temp5"
                                        value={jourDetail.temp_5th} onChange={e => setJourDetail({ ...jourDetail, temp_5th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>
                                    {jourDetail.Speed_5th}
                                    
                                </td>
                                <td>
                                    {cansizesheet}
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    {/* 6 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '30%' }}>Coating System</th>
                                <th style={{ width: '30%' }}>Body</th>
                                <th style={{ width: '30%' }}></th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>6 TH</center></th>
                                <td>SIDE</td>
                                <td>{jourDetail.side_6th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_6th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmcode_th6}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_6th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_6th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_6th}</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    {/* 7 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '10%' }}></th>
                                <th style={{ width: '30%' }}>Coating System</th>
                                <th style={{ width: '30%' }}>Body</th>
                                <th style={{ width: '30%' }}></th>
                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>7 TH</center></th>
                                <td>Varnish top coat</td>
                                <td>{<CiStop1 size={25} />}W / W {<CiSquareCheck size={25} style={{ marginLeft: 20 }} />}W / D</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>
                                    <input type='text' name='color_7th'
                                        value={jourDetail.color_7th} onChange={(e) => setJourDetail({ ...jourDetail, color_7th: e.target.value })} />

                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td><input type='text' name='fmCode_7th'
                                    value={jourDetail.fmCode_7th} onChange={(e) => setJourDetail({ ...jourDetail, fmCode_7th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {/* {jourDetail.dfw_2th} */}
                                    <input type="text" name='dfw7' id="dfw7" value={jourDetail.dfw_2th}
                                        onChange={(e) => setJourDetail({ ...jourDetail, dfw_2th: e.target.value })} />
                                </td>
                                <td><input type={'number'} name='lacq_7th'
                                    value={jourDetail.lacq_7th} onChange={(e) => setJourDetail({ ...jourDetail, lacq_7th: e.target.value })} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>
                                    <input type='text' name='temp_7th'
                                        value={jourDetail.temp_7th} onChange={(e) => setJourDetail({ ...jourDetail, temp_7th: e.target.value })} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_7th}</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    <div className='leyour-row-wrap-footer-dts'>
                        <span style={{ marginRight: 20, color: '#848685', fontSize: 14 }}> อนุมัติการตัวสอบเอกสาร TDS (ขั้นตอน RD )   </span>
                        <Button type='submit' variant="success" >บันทึก</Button> &nbsp;
                        <Button type='reset' variant="warning" >ยกเลิก</Button>

                    </div>

                </div>
            </form>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>เอกสารประกอบ TDS {Upermiss == 1 && <a href={jourData.partFile} >ดาวโหลด</a>}</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src={jourData.partFile} style={{ width: '100%', height: 'auto' }} /></Modal.Body>
            </Modal>
        </div>
    )
}

export default EditJournalRDpage;