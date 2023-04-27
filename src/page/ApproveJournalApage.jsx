import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useParams,useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {
    GetjournalByid, cantingsystemByCode, cansizeTypeByProperty,
    GetjourtDetialClassB_Byid, statusworkflowByrunning,journalUpdateStatusEdit,Statusflow,LinesendBydepartment
} from '../service/apicall'
import { CiSquareCheck, CiStop1,CiImport,CiImageOn } from "react-icons/ci"
import {FaImage,FaEye} from "react-icons/fa"


const ApproveJournalApage = () => {

    var Uname = sessionStorage.getItem("Uname");
    var Udepcode = sessionStorage.getItem("Udepcode");
    var Ustate = sessionStorage.getItem("Ustate");
    const Upermiss = sessionStorage.getItem("Upermis");
    const navigate=useNavigate();


    const Params = useParams();
    const { Id } = Params;
    const [jourData, setJourData] = useState([]); // เรียกข้อมูล  journal หน้าหลัก
    const [cansize, setCansize] = useState([]) //เรียกข้อมูล cansizesheet  ตามรหัส 
    const [coating, setCoating] = useState([]);
    const [cansizePro, setCansizePro] = useState([])  //เรียกข้อมูลรายาการ cansizesheet list
    const [jourDetail, setJourDetail] = useState([]) // เรียกข้อมูล  journal detail

    const [cansizeCode, setCansizeCode] = useState('') // นำไปอัพเดท journal 
    const [productfood, setProductfood] = useState('') // นำไปอัพเดท journal 

    const [cansizesheet, setCansizesheet] = useState('')
    const [workflowList, setWorkflowList] = useState([])



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
         
        })

        GetjournalByid(Id).then(data => {
            //    console.log(data)
            setJourData(data.listall[0]);
            setCansizeCode(data.listall[0].sheetSize); // cancode   //นำไป อัพเดท journal 
            setProductfood(data.listall[0].productGroup) //นำไป อัพเดท journal 
            StastusWorkflowNow(data.listall[0].tdsRunning)

            if (data) {
                readcansheet(data.listall[0].sheetSize);
                // readCoatingtype(data.listall[0].coatingCode)

                cansizeTypeByProperty(data.listall[0].coatingCode).then(data => {
                    //console.log(data)
                    setCansizePro(data.listall)
                })


            }

        })


    }, [])


    //แสดงข้อมูล Sheet size
    const readcansheet = (codeid) => {

        cantingsystemByCode(codeid).then(data => {

            setCansize(data.listall[0]);
            setCansizesheet(data.listall[0].cansize)
            // console.log(data);

        })
    }

    //แสดงข้อมูล สถานนะการทำงาน
    const StastusWorkflowNow = (idcode) => {
        statusworkflowByrunning(idcode).then(data => {
            console.log(data)
            setWorkflowList(data.listall)
        })
    }

    // update status approveflow
        const UpdateStatusFlow = () => {

            var mess = "แจ้งเตือนมีเอกสารใหม่  รหัส " + jourData.refTDS + "\n" +
            "ผู้ตรวจสอบข้อมูล โดย  " + Uname

            LinesendBydepartment(mess)
            toast("คุณได้อนุมัติเอกสารเรียบร้อยแล้ว", {
                type:"success"
              });

              if(Ustate=="7"){
                journalUpdateStatusEdit(Id, 'approve', Ustate, cansizeCode, productfood, '').then(edata => {
                    if (edata.success == true) {
                        Statusflow(jourData.tdsRunning, Uname, 'approve', Udepcode,jourData.docVersion).then(sdata => {
                            if (sdata) {
                               // window.location.href = "/Groupdepartment";
                               navigate("/Groupdepartment")
                            }
                        })
                    }
                })
              }
              else{
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
                        <div>เอกสารตัวอย่าง : <button style={{padding:5,borderColor:'#fff',borderWidth:'#fff',borderRadius:5}}><FaEye size={20} color={"#F77541"} onClick={() => setShow(true)} /></button></div>
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
                                <td>{jourDetail.dfw_2th}</td>
                                <td>{jourDetail.length!==0&&jourDetail.lacq_2th}</td>
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
                                <td>{jourDetail.Speed_2th}</td>
                                <td>{jourDetail.rubber_2th}</td>
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
                                <td>{jourDetail.dfw_3th}</td>
                                <td>{jourDetail.length!==0&&jourDetail.lacq_3th}</td>
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
                                <td>{jourDetail.Speed_3th}</td>
                                <td>{jourDetail.rubber_3th}</td>
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
                                <td>{jourDetail.fmCode_4th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_4th}</td>
                                <td>{jourDetail.length!==0&&jourDetail.lacq_4th}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_4th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_4th}</td>
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
                                <td>{jourDetail.fmCode_5th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DFW(GSM)/Wfw(Kg/1,000 Sht.)</td>
                                <td>{jourDetail.dfw_5th}</td>
                                <td>{jourDetail.length!==0&&jourDetail.lacq_5th}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp.(C)</td>
                                <td>{jourDetail.temp_5th}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph) / No.Rubber</td>
                                <td>{jourDetail.Speed_5th}</td>
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
                                <td>{jourDetail.dfw_2th}</td>
                                <td>{jourDetail.length!=0&&jourDetail.lacq_7th}</td>
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
                                <td>{jourDetail.Speed_7th}</td>
                                <td>{jourDetail.rubber_7th}</td>
                            </tr>

                        </tbody>
                    </Table>

                    <div className='leyour-row-wrap-footer-dts'>
                        <span style={{ marginRight: 20, color: '#848685', fontSize: 14 }}> ทำการบันทึก เอกสาร TDS เพื่อจบการทำงาน  </span>
                        <Button  variant="success" style={{ marginLeft: 5, marginRight: 5 }} onClick={()=>UpdateStatusFlow()}>อนุมัติเสร็จ</Button>

                    </div>
                </div>
            </form>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>เอกสารประกอบ TDS {Upermiss==1&&<a href={jourData.partFile} >ดาวโหลด</a>}</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={jourData.partFile} style={{width:'100%',height:'auto'}}/></Modal.Body>
      </Modal>



        </div>
    )
}

export default ApproveJournalApage;