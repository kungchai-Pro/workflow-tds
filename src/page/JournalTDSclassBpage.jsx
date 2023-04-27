import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useParams,useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {
    GetjournalByid, cantingsystemByCode, coatingtypeByCode,
    insertdatajournalClassB, journalUpdateStatusByid, Statusflow,lacquerslistall,LinesendBydepartment
} from '../service/apicall'
import { CiSquareCheck, CiStop1 } from "react-icons/ci";
import { FaImage,FaEye } from "react-icons/fa";



const JournalTDSclassB = () => {
    var Uname = sessionStorage.getItem("Uname");
    var Udepcode = sessionStorage.getItem("Udepcode");
    var Ustate = sessionStorage.getItem("Ustate");
    const Upermiss=sessionStorage.getItem("Upermis");

    const navigate=useNavigate()
    

    const Params = useParams();
    const { Id } = Params;
    const [jourData, setJourData] = useState([]);
    const [cansize, setCansize] = useState([])
    const [coating, setCoating] = useState([]);
    const[lacqlist,setLacqlist]=useState([])
    const [data, setData] = useState({
        profood: 'normal',
        side_th1: '', colorshade_th1: '', fmcode_th1: '', dfw_th1: '', temp_th1: '', speed_th1: '',
        side_th2: 'Internal', colorshade_th2: 'Aluminize', fmcode_th2: '29S88WS', dfw_th2: '8.0-9.0',lacq_2th:'', temp_th2: '175/190/190', speed_th2: '6000',rubber_th2:'',
        side_th3: 'Internal', colorshade_th3: 'Aluminize', fmcode_th3: '29S88WS', dfw_th3: '8.0-9.0',lacq_3th:'', temp_th3: '185/200/200', speed_th3: '6000',rubber_th3:'',
        side_th4: 'External', colorshade_th4: 'Whilte', fmcode_th4: '', dfw_th4: '',lacq_4th:'', temp_th4: '', speed_th4: '',rubber_th4:'',
        side_th5: 'External', colorshade_th5: 'Whilte', fmcode_th5: '', dfw_th5: '',lacq_5th:'', temp_th5: '', speed_th5: '',rubber_th5:'',
        side_th6: 'External', colorshade_th6: 'Conventional Printed', fmcode_th6: '', dfw_th6: '', temp_th6: '', speed_th6: '',
        side_th7: '', colorshade_th7: 'Clear Varnish', fmcode_th7: 'GS28033CCV', dfw_th7: '',lacq_7th:'', temp_th7: '', speed_th7: '6000',rubber_th7:''
    })

    // modal 
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    // end modal



    useEffect(() => {

        GetjournalByid(Id).then(data => {
            //    console.log(data)
            setJourData(data.listall[0]);

            if (data) {
                readcansheet(data.listall[0].sheetSize);
                readCoatingtype(data.listall[0].coatingCode)
            }

        })

        lacquerslistall().then(datal=>{
            setLacqlist(datal.listall);
        })

    }, [])

    const readcansheet = (codeid) => {

        cantingsystemByCode(codeid).then(data => {
            setCansize(data.listall[0]);
             //console.log(data);
        })
    }

    const readCoatingtype = (codeid) => {
        coatingtypeByCode(codeid).then(cdata => {
            setCoating(cdata.listall[0]);
        })
    }

    const submit = (e) => {
        e.preventDefault();
        var dfws = '';
        if (data.profood == 'valueAdded') {
            dfws = '9.0-10.0';
        }
        else if (data.profood == 'normal') {
            dfws = '8.0-9.0';
        }

        const resultdata = {
            tdsRunning: jourData.tdsRunning,
            journalId: Id,
            side_th1: '', colorshade_th1: '', fmcode_th1: '', dfw_th1: '', temp_th1: '', speed_th1: '',
            side_th2: 'Internal', colorshade_th2: 'Aluminize', fmcode_th2: '29S88WS', 
                dfw_th2: dfws,lacq_th2:CalculatorLacq(data.fmcode_th2), temp_th2: '175/190/190', speed_th2: '6000',rubber_th2:'',
            side_th3: 'Internal', colorshade_th3: 'Aluminize', fmcode_th3: '29S88WS',
                 dfw_th3: dfws,lacq_th3:CalculatorLacq(data.fmcode_th3), temp_th3: '185/200/200', speed_th3: '6000',rubber_th3:'',
            side_th4: 'External', colorshade_th4: 'Whilte', fmcode_th4: coating.property, 
                dfw_th4: coating.dfw,lacq_th4:CalculatorLacq(coating.property), temp_th4: coating.temp, speed_th4: coating.speed,rubber_th4:cansize.cansize,
            side_th5: 'External', colorshade_th5: 'Whilte', fmcode_th5: coating.property, 
                dfw_th5: coating.dfw,lacq_th5:CalculatorLacq(coating.property), temp_th5: coating.temp, speed_th5: coating.speed,rubber_th5:cansize.cansize,
            side_th6: 'External', colorshade_th6: 'Conventional Printed', fmcode_th6: '', 
                dfw_th6: '', temp_th6: '', speed_th6: '',
            side_th7: 'W/D', colorshade_th7: 'Clear Varnish', fmcode_th7: 'GS28033CCV', 
                dfw_th7: dfws,lacq_th7:CalculatorLacq(data.fmcode_th7), temp_th7: coating.temp, speed_th7: '6000',rubber_th7:''
        }
       

        var mess="แจ้งเตือนมีเอกสารใหม่  รหัส "+jourData.refTDS+"\n"+
        "ผู้สร้างเอกสาร "+Uname
        LinesendBydepartment(mess);
     
        insertdatajournalClassB(resultdata).then(data => {  
            if (data.success == true) {
                updateJournalStatus();
            }
        })
            .catch(err => {
                console.log(err);
            })
    }

    const updateJournalStatus = () => {
        //    ส่วนนี้เอาจาก  account มากำหนด สถานะ
        journalUpdateStatusByid(Id, 'send', Ustate,).then(data => {
            Statusflow(jourData.tdsRunning, Uname, 'send', Udepcode,jourData.docVersion).then(sdata => {
                if (sdata) {
                    toast('คุณได้สร้างเอกสาร หน้า B เรียบร้อยแล้ว')
                    navigate("/Groupdepartment");
                   // window.location.href = "/Groupdepartment"
                }
            })
        })
    }


    function CalculatorLacq(dfms){
        var lacq=lacqlist.find((item)=>item.lacqName==dfms)
       // console.log(lacq)
        if(lacq){

        var datasum=(lacq.dfw*100/lacq.solid*(cansize.widths/1000)*(cansize.lengths/1000)*lacq.qtyOrder/1000)*lacq.sequernce
        var conversdata=datasum.toFixed(4);
          return conversdata;
        }
    }


    return (

        <div className='body-page-form-tds-warp'>
            
            <center>สร้างเอกสาร TSD </center>
            <span style={{ fontSize: 15 }}>TECHNICAL DATA SHEET Part  ( A ) </span>
            <div className='body-form-tds-warp'>

                <Card>
                    <Card.Body>
                        <div className='leyour-row-wrap' style={{ backgroundColor: '#6EAE9D', padding: 5, borderRadius: 5 }}>
                            <div>วันที่บันทึก : {jourData.datetime}</div>
                            <div>เลขเอกสาร : {jourData.tdsRunning}</div>
                        </div>
                        <div>TDS Ref : {jourData.refTDS} ( V. {jourData.docVersion} )</div>
                        <div>เอกสารตัวอย่าง : <button style={{padding:5,borderColor:'#fff',borderWidth:'#fff',borderRadius:5}}><FaEye size={20} color={"#F77541"} onClick={() => setShow(true)} /></button></div>
                        <p />
                        <div>Customer Name : {jourData.customerName}</div>
                        <div>Product Name: {jourData.productName}</div>
                        <div>Code : {jourData.filmCode}</div>
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
                                <td>SID</td>
                                <td></td>
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
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td></td>
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
                                <td>SID</td>
                                <td>{data.side_th2}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{data.colorshade_th2}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{data.fmcode_th2}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{data.profood == 'normal' ? '8.0-9.0' : '9.0-10.0'}</td>
                                <td>{CalculatorLacq(data.fmcode_th2)}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{data.temp_th2}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{data.speed_th2}</td>
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
                                <td>SID</td>
                                <td>{data.side_th3}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{data.colorshade_th3}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{data.fmcode_th3}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{data.profood == 'normal' ? '8.0-9.0' : '9.0-10.0'}</td>
                                <td>{CalculatorLacq(data.fmcode_th3)}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{data.temp_th3}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{data.speed_th3}</td>
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
                                <td>SID</td>
                                <td>{data.side_th4}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{data.colorshade_th4}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{coating.property}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{coating.dfw}</td>
                                <td>{CalculatorLacq(coating.property)}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{coating.temp}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{coating.speed}</td>
                                <td>
                                    {/* {cansize.cansize} */}
                                    <input type='text' name='rubber_th4' value={cansize.cansize} disabled/>
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
                                <td>SID</td>
                                <td>{data.side_th5}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{data.colorshade_th5}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{coating.property}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{coating.dfw}</td>
                                <td>{CalculatorLacq(coating.property)}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{coating.temp}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{coating.speed}</td>
                                <td>
                                    <input type='text' name='rubber_th5' value={cansize.cansize} disabled/>
                                    {/* {cansize.cansize} */}
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
                                <td>SID</td>
                                <td>{data.side_th6}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Color shade</td>
                                <td>{data.colorshade_th6}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{data.fmcode_th6}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{data.dfw_th6}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{data.temp_th6}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td></td>
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
                                <td>{data.colorshade_th7}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>FM Code</td>
                                <td>{data.fmcode_th7}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{data.profood == 'normal' ? '8.0-9.0' : '9.0-10.0'}</td>
                                <td>{CalculatorLacq(data.fmcode_th7)}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{coating.temp}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{data.speed_th7}</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>

                    <div className='leyour-row-wrap-footer-dts'>
                        <span style={{ marginRight: 20, color: '#848685', fontSize: 14 }}> สร้างเอกสาร TDS  </span>
                        <Button type='submit' variant="success" >ส่งข้อมูล</Button>

                    </div>

                </div>
            </form>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>เอกสารประกอบ TDS {Upermiss==1&&<a href={jourData.partFile} >ดาวโหลด</a>}</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src={jourData.partFile} style={{ width: '100%', height: 'auto' }} /></Modal.Body>
            </Modal>

        </div>
    )
}

export default JournalTDSclassB;