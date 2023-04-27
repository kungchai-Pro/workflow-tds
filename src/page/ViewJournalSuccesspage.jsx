import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
    AddInkpart1, AddInkpart2, AddInkpart3,
    AddInkpart4, AddInkpart5, AddInkpart6, AddInkpart7
} from '../redux/features/conventionnalinkSlice';

import { toast } from 'react-toastify';
import {
    GetjournalByid, cantingsystemByCode, getconventionalInk, GetjourtDetialClassB_Byid, statusworkflowByrunning, get_CodecolorH, get_CodecolorD
} from '../service/apicall'
import { CiSquareCheck, CiStop1 } from "react-icons/ci"

import { FaEye } from "react-icons/fa"


const ViewJournalSuccesspage = () => {

    const datalist1 = useSelector((state) => state.conventionnalink.list1)
    const datalist2 = useSelector((state) => state.conventionnalink.list2)
    const datalist3 = useSelector((state) => state.conventionnalink.list3)
    const datalist4 = useSelector((state) => state.conventionnalink.list4)
    const datalist5 = useSelector((state) => state.conventionnalink.list5)
    const datalist6 = useSelector((state) => state.conventionnalink.list6)
    const datalist7 = useSelector((state) => state.conventionnalink.list7)

    var Uname = sessionStorage.getItem("Uname");
    var Udepcode = sessionStorage.getItem("Udepcode");
    var Ustate = sessionStorage.getItem("Ustate");
    const Upermiss = sessionStorage.getItem("Upermis");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Params = useParams();
    const { Id } = Params;
    const [jourData, setJourData] = useState([]); // เรียกข้อมูล  journal หน้าหลัก
    const [cansize, setCansize] = useState([]) //เรียกข้อมูล cansizesheet  ตามรหัส 
    const [jourDetail, setJourDetail] = useState([]) // เรียกข้อมูล  journal detail
    const [cansizeCode, setCansizeCode] = useState('') // นำไปอัพเดท journal 
    const [productfood, setProductfood] = useState('') // นำไปอัพเดท journal 
    const [cansizesheet, setCansizesheet] = useState('')
    const [workflowList, setWorkflowList] = useState([])
    const [heardcolor, setHeadcolor] = useState([]);
    const [detailcolor, setDetailcolor] = useState([]);


    // modal 
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    // end modal


    useEffect(() => {

        GetjourtDetialClassB_Byid(Id).then(data => {
            setJourDetail(data.listall[0])


            if (data.success == true) {
                getconventionalInk(data.listall[0].tdsRunning).then((result) => {
                    //  setDatalist(result)
                    if (result.success == true) {
                        ConvertData(result.listall);
                    }

                })
            }

        })

        GetjournalByid(Id).then(data => {

            setJourData(data.listall[0]);
            setCansizeCode(data.listall[0].sheetSize); // cancode   //นำไป อัพเดท journal 
            setProductfood(data.listall[0].productGroup) //นำไป อัพเดท journal 
            StastusWorkflowNow(data.listall[0].tdsRunning, data.listall[0].docVersion)

            if (data) {
                readcansheet(data.listall[0].sheetSize);

                get_CodecolorH(data.listall[0].tdsRunning, data.listall[0].docVersion).then(colors => {
                    // console.log(colors.listall[0])
                    setHeadcolor(colors.listall);
                })
                get_CodecolorD(data.listall[0].tdsRunning, data.listall[0].docVersion).then(colord => {
                    setDetailcolor(colord.listall)
                })

            }

        })

    }, [dispatch])

    //แสดงข้อมูล Sheet size
    const readcansheet = (codeid) => {

        cantingsystemByCode(codeid).then(data => {

            setCansize(data.listall[0]);
            setCansizesheet(data.listall[0].cansize)
        })
    }

    //แสดงข้อมูล สถานนะการทำงาน
    const StastusWorkflowNow = (idcode, idversion) => {
        statusworkflowByrunning(idcode, idversion).then(data => {
            setWorkflowList(data.listall)
        })
    }


    function ConvertData(data) {


        for (let index = 0; index < data.length; index++) {

            if (data[index].sequence == "1") {
                dispatch(AddInkpart1(data[index]));
            }
            else if (data[index].sequence == "2") {
                dispatch(AddInkpart2(data[index]));
            }
            else if (data[index].sequence == "3") {
                dispatch(AddInkpart3(data[index]));
            }
            else if (data[index].sequence == "4") {
                dispatch(AddInkpart4(data[index]));
            }
            else if (data[index].sequence == "5") {
                dispatch(AddInkpart5(data[index]));
            }
            else if (data[index].sequence == "6") {
                dispatch(AddInkpart6(data[index]));
            }
            else if (data[index].sequence == "7") {
                dispatch(AddInkpart7(data[index]));
            }
        }
    }

    function DetailColor(dt,remarks) {
        detailcolor.find((item) => item.coatingCode == dt)
        return (<div>
            <table className='table-create-color'>
                <tr style={{ background: '#C1C6C3' }}>
                    <th>Ink name</th>
                    <th>Formulate</th>
                    <th>0.5 kg / 1,000 sht</th>
                </tr>
                {detailcolor.map((itemlist, index) => {
                    return (<tr style={{ borderWidth: 0.5, fontSize: 12 }}>
                        <td>{itemlist.inkName}</td>
                        <td>{itemlist.formulates.toFixed(2)}</td>
                        <td>{itemlist.Kgs.toFixed(4)}</td>
                    </tr>)
                })}
                <tr>
                    <td>
                        <div style={{ fontSize: 12 }}><label><b>Remark :</b></label> {remarks}</div>

                    </td>
                </tr>
            </table>
        </div>)
    }


    return (

        <div className='body-page-form-tds-warp'>
            <div style={{ width: '95%' }}>
                {Ustate == "1" &&
                    <Link to={`/DuplicateJournal/${Id}`}>
                        <button style={{ marginLeft: '95%', padding: 2, fontSize: 10, borderRadius: 3 }}
                        >Duplicate</button></Link>
                }

            </div>
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
                        <div>เอกสารตัวอย่าง : <button style={{ padding: 5, borderColor: '#fff', borderWidth: '#fff', borderRadius: 5 }}><FaEye size={20} color={"#F77541"} onClick={() => setShow(true)} /></button></div>
                        <p />
                        <div>Customer Name : {jourData.customerName}</div>
                        <div>Product Name: {jourData.productName}</div>
                        <div>Code :{jourData.filmCode}</div>
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
                        </div>
                        <hr />
                        <div>
                            <span> Detial of product :  {productfood} </span>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <form >

                <span style={{ fontSize: 15 }}>TECHNICAL DATA SHEET Part  ( B ) </span>
                {/* {1 th} */}
                <div className='body-form-tds-warp'>
                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '10%' }}>Coating System</th>
                                <th style={{ width: '20%' }}>Body</th>
                                <th style={{ width: '10%' }}>Printing System </th>
                                <th style={{ width: '10%' }}>Unit1</th>
                                <th style={{ width: '10%' }}>Unit2</th>
                                <th style={{ width: '10%' }}>PT#</th>
                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>1 TH</center></th>
                                <td>SIDE</td>
                                <td>
                                    {jourDetail.side_1th}

                                </td>
                                <td>Color shade</td>
                                <td>{datalist1.color_unit1}</td>
                                <td>{datalist1.color_unit2}</td>
                                <td>{datalist1.color_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td></td>
                                <td>FM.code</td>
                                <td>{datalist1.fmc_unit1}</td>
                                <td>{datalist1.fmc_unit2}</td>
                                <td>{datalist1.fmc_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>ฟรีเตา 230 oC อย่างน้อย 1 ชั่วโมง ก่อนอาบเคลือบด้านใน</td>
                                <td>Thickness / Density</td>
                                <td>{datalist1.thick_unit1}</td>
                                <td>{datalist1.thick_unit2}</td>
                                <td>{datalist1.thick_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_1th}</td>
                                <td>Temp. / UV lamp.</td>
                                <td>{datalist1.temp_unit1}</td>
                                <td>{datalist1.temp_unit2}</td>
                                <td>{datalist1.temp_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_1th}</td>
                                <td>Speed (sph)</td>
                                <td>{datalist1.speed_unit1}</td>
                                <td>{datalist1.speed_unit2}</td>
                                <td>{datalist1.speed_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_1th}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    {/* 2 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '10%' }}>Coating System</th>
                                <th style={{ width: '20%' }}>Body</th>
                                <th style={{ width: '10%' }}>Printing System </th>
                                <th style={{ width: '10%' }}>Unit1</th>
                                <th style={{ width: '10%' }}>Unit2</th>
                                <th style={{ width: '10%' }}>PT#</th>
                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>2 ND</center></th>
                                <td>SIDE</td>
                                <td>{jourDetail.side_2th}</td>
                                <td>Color shade</td>
                                <td>{datalist2.color_unit1}</td>
                                <td>{datalist2.color_unit2}</td>
                                <td>{datalist2.color_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_2th}</td>
                                <td>FM.code</td>
                                <td>{datalist2.fmc_unit1}</td>
                                <td>{datalist2.fmc_unit2}</td>
                                <td>{datalist2.fmc_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmCode_2th}</td>
                                <td>Thickness / Density</td>
                                <td>{datalist2.thick_unit1}</td>
                                <td>{datalist2.thick_unit2}</td>
                                <td>{datalist2.thick_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_2th} / {jourDetail.length !== 0 && jourDetail.lacq_2th}</td>
                                <td>Temp. / UV lamp.</td>
                                <td>{datalist2.temp_unit1}</td>
                                <td>{datalist2.temp_unit2}</td>
                                <td>{datalist2.temp_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_2th}</td>
                                <td>Speed (sph)</td>
                                <td>{datalist2.speed_unit1}</td>
                                <td>{datalist2.speed_unit2}</td>
                                <td>{datalist2.speed_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_2th} / {jourDetail.rubber_2th}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    {/* 3 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '10%' }}>Coating System</th>
                                <th style={{ width: '20%' }}>Body</th>
                                <th style={{ width: '10%' }}>Printing System </th>
                                <th style={{ width: '10%' }}>Unit1</th>
                                <th style={{ width: '10%' }}>Unit2</th>
                                <th style={{ width: '10%' }}>PT#</th>
                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>3 RD</center></th>
                                <td>SIDE</td>
                                <td>{jourDetail.side_3th}</td>
                                <td>Color shade</td>
                                <td>{datalist3.color_unit1}</td>
                                <td>{datalist3.color_unit2}</td>
                                <td>{datalist3.color_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_3th}</td>
                                <td>FM.code</td>
                                <td>{datalist3.fmc_unit1}</td>
                                <td>{datalist3.fmc_unit2}</td>
                                <td>{datalist3.fmc_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmCode_3th}</td>
                                <td>Thickness / Density</td>
                                <td>{datalist3.thick_unit1}</td>
                                <td>{datalist3.thick_unit2}</td>
                                <td>{datalist3.thick_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_3th} / {jourDetail.length !== 0 && jourDetail.lacq_3th}</td>
                                <td>Temp. / UV lamp.</td>
                                <td>{datalist3.temp_unit1}</td>
                                <td>{datalist3.temp_unit2}</td>
                                <td>{datalist3.temp_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_3th}</td>
                                <td>Speed (sph)</td>
                                <td>{datalist3.speed_unit1}</td>
                                <td>{datalist3.speed_unit2}</td>
                                <td>{datalist3.speed_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_3th} / {jourDetail.rubber_3th}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    {/* 4 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '10%' }}>Coating System</th>
                                <th style={{ width: '20%' }}>Body</th>
                                <th style={{ width: '10%' }}>Printing System </th>
                                <th style={{ width: '10%' }}>Unit1</th>
                                <th style={{ width: '10%' }}>Unit2</th>
                                <th style={{ width: '10%' }}>PT#</th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>4 TH</center></th>
                                <td>SIDE</td>
                                <td>{jourDetail.side_4th}</td>
                                <td>Color shade</td>
                                <td>{datalist4.color_unit1}</td>
                                <td>{datalist4.color_unit2}</td>
                                <td>{datalist4.color_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_4th}</td>
                                <td>FM.code</td>
                                <td>{datalist4.fmc_unit1}</td>
                                <td>{datalist4.fmc_unit2}</td>
                                <td>{datalist4.fmc_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmCode_4th}</td>
                                <td>Thickness / Density</td>
                                <td>{datalist4.thick_unit1}</td>
                                <td>{datalist4.thick_unit2}</td>
                                <td>{datalist4.thick_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_4th} / {jourDetail.length !== 0 && jourDetail.lacq_4th}</td>
                                <td>Temp. / UV lamp.</td>
                                <td>{datalist4.temp_unit1}</td>
                                <td>{datalist4.temp_unit2}</td>
                                <td>{datalist4.temp_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_4th}</td>
                                <td>Speed (sph)</td>
                                <td>{datalist4.speed_unit1}</td>
                                <td>{datalist4.speed_unit2}</td>
                                <td>{datalist4.speed_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_4th} / {cansizesheet}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>

                    {/* 5 ht */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '10%' }}>Coating System</th>
                                <th style={{ width: '20%' }}>Body</th>
                                <th style={{ width: '10%' }}>Printing System </th>
                                <th style={{ width: '10%' }}>Unit1</th>
                                <th style={{ width: '10%' }}>Unit2</th>
                                <th style={{ width: '10%' }}>PT#</th>
                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>5 TH</center></th>
                                <td>SIDE</td>
                                <td>{jourDetail.side_5th}</td>
                                <td>Color shade</td>
                                <td>{datalist5.color_unit1}</td>
                                <td>{datalist5.color_unit2}</td>
                                <td>{datalist5.color_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_5th}</td>
                                <td>FM.code</td>
                                <td>{datalist5.fmc_unit1}</td>
                                <td>{datalist5.fmc_unit2}</td>
                                <td>{datalist5.fmc_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmCode_5th}</td>
                                <td>Thickness / Density</td>
                                <td>{datalist5.thick_unit1}</td>
                                <td>{datalist5.thick_unit2}</td>
                                <td>{datalist5.thick_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_5th} / {jourDetail.length !== 0 && jourDetail.lacq_5th}</td>
                                <td>Temp. / UV lamp.</td>
                                <td>{datalist5.temp_unit1}</td>
                                <td>{datalist5.temp_unit2}</td>
                                <td>{datalist5.temp_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_5th}</td>
                                <td>Speed (sph)</td>
                                <td>{datalist5.speed_unit1}</td>
                                <td>{datalist5.speed_unit2}</td>
                                <td>{datalist5.speed_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_5th} / {cansizesheet}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>

                    {/* 6 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '10%' }}>Coating System</th>
                                <th style={{ width: '20%' }}>Body</th>
                                <th style={{ width: '10%' }}>Printing System </th>
                                <th style={{ width: '10%' }}>Unit1</th>
                                <th style={{ width: '10%' }}>Unit2</th>
                                <th style={{ width: '10%' }}>PT#</th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>6 TH</center></th>
                                <td>SIDE</td>
                                <td>{jourDetail.side_6th}</td>
                                <td>Color shade</td>
                                <td>{datalist6.color_unit1}</td>
                                <td>{datalist6.color_unit2}</td>
                                <td>{datalist6.color_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_6th}</td>
                                <td>FM.code</td>
                                <td>{datalist6.fmc_unit1}</td>
                                <td>{datalist6.fmc_unit2}</td>
                                <td>{datalist6.fmc_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmcode_th6}</td>
                                <td>Thickness / Density</td>
                                <td>{datalist6.thick_unit1}</td>
                                <td>{datalist6.thick_unit2}</td>
                                <td>{datalist6.thick_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_6th}</td>
                                <td>Temp. / UV lamp.</td>
                                <td>{datalist6.temp_unit1}</td>
                                <td>{datalist6.temp_unit2}</td>
                                <td>{datalist6.temp_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_6th}</td>
                                <td>Speed (sph)</td>
                                <td>{datalist6.speed_unit1}</td>
                                <td>{datalist6.speed_unit2}</td>
                                <td>{datalist6.speed_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_6th}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    {/* 7 th */}

                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '10%' }}>Coating System</th>
                                <th style={{ width: '20%' }}>Body</th>
                                <th style={{ width: '10%' }}>Printing System </th>
                                <th style={{ width: '10%' }}>Unit1</th>
                                <th style={{ width: '10%' }}>Unit2</th>
                                <th style={{ width: '10%' }}>PT#</th>
                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>7 TH</center></th>
                                <td>Varnish top coat</td>
                                <td>{<CiStop1 size={25} />}W / W {<CiSquareCheck size={25} style={{ marginLeft: 20 }} />}W / D</td>
                                <td>Color shade</td>
                                <td>{datalist7.color_unit1}</td>
                                <td>{datalist7.color_unit2}</td>
                                <td>{datalist7.color_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{jourDetail.color_7th}</td>
                                <td>FM.code</td>
                                <td>{datalist7.fmc_unit1}</td>
                                <td>{datalist7.fmc_unit2}</td>
                                <td>{datalist7.fmc_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{jourDetail.fmCode_7th}</td>
                                <td>Thickness / Density</td>
                                <td>{datalist7.thick_unit1}</td>
                                <td>{datalist7.thick_unit2}</td>
                                <td>{datalist7.thick_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_2th} / {jourDetail.length != 0 && jourDetail.lacq_7th}</td>
                                <td>Temp. / UV lamp.</td>
                                <td>{datalist7.temp_unit1}</td>
                                <td>{datalist7.temp_unit2}</td>
                                <td>{datalist7.temp_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_7th}</td>
                                <td>Speed (sph)</td>
                                <td>{datalist7.speed_unit1}</td>
                                <td>{datalist7.speed_unit2}</td>
                                <td>{datalist7.speed_pt}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_7th} / {jourDetail.rubber_7th}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>
                    <div >
                        <label style={{ marginRight: 20, color: '#848685', fontSize: 14, marginLeft: 10 }}>สถานะ </label>
                        {workflowList.map((item) =>
                            <div style={{ marginRight: 12, color: '#848685', fontSize: 11, marginLeft: 10 }}><label >{item.byUser} / อนุมัติ  / ({item.datetime})</label></div>
                        )}

                    </div>
                </div>
                <div>
                    {heardcolor.map((item, index) => {
                        return (<div style={{marginLeft:20}}>
                            <div className='row-between-wrap'>
                                    <div>
                                        <label>COLOR : </label> {item.codeColors}
                                        </div>
                                    <div>
                                    </div>
                                </div>
                            <div>{DetailColor(item.codeColors,item.remarks)}</div>
                        </div>)
                    })}
                    {/* {JSON.stringify(detailcolor)} */}
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

export default ViewJournalSuccesspage; 