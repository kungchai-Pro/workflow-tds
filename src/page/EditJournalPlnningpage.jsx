import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { useParams,useNavigate } from 'react-router-dom';
import {
    GetjournalByid, cantingsystemByCode, cansizeTypeByCode, cansizeTypeByProperty,
    GetjourtDetialClassB_Byid, Update_tdatajournalClassB, journalUpdateStatusEdit, Statusflow, LinesendBydepartment, CansizeTypeList
} from '../service/apicall'
import { CiSquareCheck, CiStop1 } from "react-icons/ci"
import { FaImage, FaEye } from "react-icons/fa"



const EditJournalPlnningpage = () => {

    var Uname = sessionStorage.getItem("Uname");
    var Udepcode = sessionStorage.getItem("Udepcode");
    var Ustate = sessionStorage.getItem("Ustate");
    const Upermiss = sessionStorage.getItem("Upermis");
    const navigate=useNavigate();

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
    const [remarkreject, setRemarkreject] = useState('')

    // modal 
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    // end modal

    // modal reject
    const [modalShow, setModalShow] = React.useState(false);






    useEffect(() => {

        GetjourtDetialClassB_Byid(Id).then(data => {
            setJourDetail(data.listall[0])
            //console.log(data)
            //setCansizechange(data.listall[0])
        })

        GetjournalByid(Id).then(data => {
            //    console.log(data)
            setJourData(data.listall[0]);

            setProductfood(data.listall[0].productGroup) //นำไป อัพเดท journal 

            if (data) {
                readcansheet(data.listall[0].sheetSize);
                // readCoatingtype(data.listall[0].coatingCode)

                cansizeTypeByProperty(data.listall[0].coatingCode).then(data => {
                    console.log(data)
                    //  setCansizePro(data.listall)
                })
                CansizeTypeList().then((data) => {
                    setCansizePro(data.listall)
                })
            }

        })


    }, [])

    const readcansheet = (codeid) => {

        cantingsystemByCode(codeid).then(data => {

            setCansize(data.listall[0]);
            setCansizesheet(data.listall[0].cansize)

            setCansizeCode(data.listall[0].cancode) // นำไป อัพเดท  journal 
            // console.log(data);

        })
    }


    const changeCansize = (e) => {
        var dataCansize = e.target.value;
        // console.log(dataCansize);
        cansizeTypeByCode(dataCansize).then(data => {
            setCansizesheet(data.listall[0].rubber) // นำมาแสดงหน้า B ให้เห็นการเปลี่ยนแปลงก่อนเอาไปอัพเดท
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
                dfw_th2: jourDetail.dfw_2th, lacq_th2: jourDetail.lacq_2th,temp_th2: jourDetail.temp_2th,
                speed_th2: jourDetail.Speed_2th,rubber_th2:jourDetail.rubber_2th,

            side_th3: jourDetail.side_2th, colorshade_th3: jourDetail.color_3th, fmcode_th3: jourDetail.fmCode_3th, 
                dfw_th3: jourDetail.dfw_3th, lacq_th3: jourDetail.lacq_3th,temp_th3:jourDetail.temp_3th, 
                speed_th3:jourDetail.Speed_3th,rubber_th3:jourDetail.rubber_3th,

            side_th4: jourDetail.side_4th, colorshade_th4:jourDetail.color_4th, fmcode_th4: jourDetail.fmCode_4th,
                dfw_th4: jourDetail.dfw_4th, lacq_th4: jourDetail.lacq_4th, temp_th4: jourDetail.temp_4th,speed_th4: jourDetail.Speed_4th,
                rubber_th4:cansizesheet,

            side_th5: jourDetail.side_5th, colorshade_th5: jourDetail.color_5th, fmcode_th5: jourDetail.fmCode_5th,
                 dfw_th5: jourDetail.dfw_5th,lacq_th5: jourDetail.lacq_5th,temp_th5: jourDetail.temp_5th, speed_th5: jourDetail.Speed_5th,
                 rubber_th5:cansizesheet,

            side_th6: jourDetail.side_6th, colorshade_th6:jourDetail.color_6th, fmcode_th6:jourDetail.fmCode_6th, 
                dfw_th6:jourDetail.dfw_6th, temp_th6: jourDetail.temp_6th, speed_th6:jourDetail.Speed_6th,rubber_th6:jourDetail.rubber_6th,

            side_th7: jourDetail.side_7th, colorshade_th7: jourDetail.color_7th, fmcode_th7:jourDetail.fmCode_7th, dfw_th7: jourDetail.dfw_7th, 
                lacq_th7: jourDetail.lacq_7th,temp_th7: jourDetail.temp_7th, speed_th7:jourDetail.Speed_7th,rubber_th7:jourDetail.rubber_7th
        }

        Update_tdatajournalClassB(resultdata).then(data => {
            if (data.success == true) {
                var mess = "@All แจ้งเตือน เอกสาร รหัส " + jourData.refTDS + " ได้อนุมัติเสร็จเรียบร้อยแล้ว \n" +
                    "ผู้อนุมัติ โดย  " + Uname

                LinesendBydepartment(mess)
                updatejournal()
              //  toast.success('คุณได้ทำการตรวบสอบเรียบร้อบแล้ว')
                toast("คุณได้ตรวจสอบเอกสารเรียบร้อยแล้ว", {
                    type:"success"
                  });
            }
        }).catch(err => console.log(err))

    }
    // update change journal 
    const updatejournal = () => {
        journalUpdateStatusEdit(Id, 'send', Ustate, cansizeCode, productfood, '').then(edata => {
            if (edata.success == true) {
                Statusflow(jourData.tdsRunning, Uname, 'send', Udepcode,jourData.docVersion).then(sdata => {
                    if (sdata) {
                       // window.location.href = "/Groupdepartment";
                       navigate("/Groupdepartment")
                    }
                })
            }
        })
    }

    // กรณี reject หาข้อมูลไม่ครบ
    const updatereject = async () => {

        var mess = "@All แจ้งเตือน เอกสาร รหัส " + jourData.refTDS + "แจ้งให้แก้ไขข้อมูล  \n" +
            "ผู้แจ้งแก้ไข โดย  " + Uname

        LinesendBydepartment(mess)

        // alert('update ')
        var statereject = Ustate - 1;
        journalUpdateStatusEdit(Id, 'reject', statereject, cansizeCode, productfood, remarkreject).then(edata => {
            if (edata.success == true) {
                Statusflow(jourData.tdsRunning, Uname, 'reject', Udepcode).then(sdata => {
                    setModalShow(false)
                    if (sdata) {
                        window.location.href = "/StatusflowReject";
                    }
                })
            }

        })

    }


    return (
        <div className='body-page-form-tds-warp'>
           
            <center>เอกสาร TSD </center>
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
                        {/* <div>TDS Ref : {jourData.refTDS}</div>
                        <div>เอกสารตัวอย่าง : <FaImage size={25} color={"#F77541"} onClick={() => setShow(true)} /></div>
                         */}
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
                            <label style={{ fontSize: 12 }}>{cansize.sheetsize}</label>

                            <select name='psheetsize' id='psheetsize' onChange={(e) => changeCansize(e)} >
                                <label style={{ fontSize: 12 }}>{cansize.sheetsize}</label>
                                <option value={cansize.cancode}>default {cansize.sheetsize} ({cansize.rubber} )</option>
                                {cansizePro.map((option) => (
                                    <option value={option.cancode}>{option.sheetsize} ({option.rubber} )</option>
                                ))}
                            </select>
                        </div>
                        <hr />
                        <div>
                           
                            <label>ข้อมูลปัจจุบัน : </label> {productfood}
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
                                <td>{jourDetail.side_2th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_2th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmCode_2th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {jourDetail.dfw_2th}
                                    {/* <input type="dfw2" name='dfw2' id="dfw2" 
                                     value={jourDetail.dfw_2th} onChange={e => setJourDetail({ ...jourDetail, dfw_2th: e.target.value })} disabled /> */}
                                </td>
                                <td>{jourDetail.lacq_2th}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_2th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>
                                    <input type='text' name='Speed_2th'
                                        value={jourDetail.Speed_2th} onChange={(e) => setJourDetail({ ...jourDetail, Speed_2th: e.target.value })} />
                                </td>
                                <td><input type='text' name='rubber_2th'
                                        value={jourDetail.rubber_2th} onChange={(e) => setJourDetail({ ...jourDetail, rubber_2th: e.target.value })} /></td>
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
                                <td>{jourDetail.side_3th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_3th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmCode_3th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {jourDetail.dfw_2th}
                                    {/* <input type="text" name="dfw3" id="dfw3" 
                                    value={jourDetail.dfw_2th} onChange={(e) => setJourDetail({ ...jourDetail, dfw_2th: e.target.value })} disabled /> */}
                                </td>
                                <td>{jourDetail.lacq_3th}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_3th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>
                                    <input type='text' name='Speed_3th'
                                        value={jourDetail.Speed_3th} onChange={(e) => setJourDetail({ ...jourDetail, Speed_3th: e.target.value })} />
                                    {/* {jourDetail.Speed_3th} */}
                                </td>
                                <td><input type='text' name='rubber_3th'
                                        value={jourDetail.rubber_3th} onChange={(e) => setJourDetail({ ...jourDetail, rubber_3th: e.target.value })} /></td>
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
                                <td>{jourDetail.side_4th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_4th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>
                                    {jourDetail.fmCode_4th}
                                    {/* <input name='fmcode4' id='fmcode4' 
                                    value={jourDetail.fmCode_4th} onChange={e => setJourDetail({ ...jourDetail, fmCode_4th: e.target.value })}  /> */}
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {jourDetail.dfw_4th}
                                    {/* <input type="text" name='dfw4' id='dfw4' 
                                    value={jourDetail.dfw_4th} onChange={e => setJourDetail({ ...jourDetail, dfw_4th: e.target.value })} disabled /> */}
                                </td>
                                <td>{jourDetail.lacq_4th}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>
                                    {jourDetail.temp_4th}
                                    {/* <input type='text' name='temp4' id='temp4' 
                                    value={jourDetail.temp_4th} onChange={e => setJourDetail({ ...jourDetail, temp_4th: e.target.value })} disabled /> */}
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>
                                    {/* {jourDetail.Speed_4th}  */}
                                    <input type="text" name='Speed_4th' id='Speed_4th'
                                        value={jourDetail.Speed_4th} onChange={e => { setJourDetail({ ...jourDetail, Speed_4th: e.target.value }) }} /></td>
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
                                <td>{jourDetail.side_5th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_5th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>
                                    {jourDetail.fmCode_5th}
                                    {/* <input type="text" name='fmcode5' id="fmcode5" value={jourDetail.fmCode_5th}
                                        onChange={e => setJourDetail({ ...jourDetail, fmCode_5th: e.target.value })} disabled /> */}
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {jourDetail.dfw_5th}
                                    {/* <input type='text' name="dfw5" id="dfw5" value={jourDetail.dfw_5th}
                                        onChange={e => { setJourDetail({ ...jourDetail, dfw_5th: e.target.value }) }} disabled /> */}
                                </td>
                                <td>{jourDetail.lacq_5th}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>
                                    {jourDetail.temp_5th}
                                    {/* <input type="text" name='temp5' id="temp5"
                                        value={jourDetail.temp_5th} onChange={e => setJourDetail({ ...jourDetail, temp_5th: e.target.value })} disabled /> */}
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>
                                    {/* {jourDetail.Speed_5th} */}
                                    <input type="text" name="Speed_5th" id="Speed_5th"
                                        value={jourDetail.Speed_5th} onChange={(e) => setJourDetail({ ...jourDetail, Speed_5th: e.target.value })} />
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
                                <td>{jourDetail.color_7th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmCode_7th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>
                                    {/* {jourDetail.dfw_2th} */}
                                    <input type="text" name='dfw7' id="dfw7" value={jourDetail.dfw_2th}
                                        onChange={(e) => setJourDetail({ ...jourDetail, dfw_2th: e.target.value })} disabled />
                                </td>
                                <td>{jourDetail.lacq_7th}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_7th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>
                                    <input type='text' name='Speed_7th' value={jourDetail.Speed_7th}
                                        onChange={(e) => setJourDetail({ ...jourDetail, Speed_7th: e.target.value })} />
                                    {/* {jourDetail.Speed_7th} */}
                                </td>
                                <td><input type='text' name='rubber_7th'
                                        value={jourDetail.rubber_7th} onChange={(e) => setJourDetail({ ...jourDetail, rubber_7th: e.target.value })} /></td>
                            </tr>

                        </tbody>
                    </Table>

                    <div className='leyour-row-wrap-footer-dts'>
                        <span style={{ marginRight: 20, color: '#848685', fontSize: 14 }}> ทำการบันทึก เอกสาร TDS เพื่อจบการทำงาน  </span>
                        <Button type='submit' variant="success" style={{ marginLeft: 5, marginRight: 5 }}>อนุมัติเสร็จ</Button>
                        <Button variant="warning" onClick={() => setModalShow(true)}>ตีกลับแก้ไข</Button>

                    </div>

                </div>
            </form>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>เอกสารประกอบ TDS {Upermiss == 1 && <a href={jourData.partFile} >ดาวโหลด</a>}</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src={jourData.partFile} style={{ width: '100%', height: 'auto' }} /></Modal.Body>
            </Modal>



            <Modal
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        หมายเหตุ
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>แจ้งข้อมูล กรณี ตีกลับแก้ไข</h5>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        {/* <Form.Label>Example textarea</Form.Label> */}
                        <Form.Control as="textarea" rows={3} value={remarkreject} onChange={(e) => setRemarkreject(e.target.value)} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => updatereject()}>บันทึก</Button>
                </Modal.Footer>
            </Modal>


        </div>

    )
}





export default EditJournalPlnningpage;