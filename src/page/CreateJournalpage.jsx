import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

import {
    CansizeTypeList, PringtingsystemList, CoatingsystemList,
    CreateNewJournal, uplodfile, RunningnumberByyear, RunningUpdate, Statusflow,getRevisionLast
} from '../service/apicall';

const initialState = {
    tdsRun: "",
    TDSref: "",
    docVersion: 1,
    customerName: "",
    productName: "",
    filmCode: "",
    partFile: "",
    ItemId: "",
    SheetSize: "",
    Printing: "",
    Coating: "",
    Note: "",
    isremarknow: "",
    statusFlow: "draft",
    stateFlow: "1",
    createBy: "",
    datetime: "",
    productGroup: 'normal'
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const CreateJournalpage = () => {

    var Uname = sessionStorage.getItem("Uname");
    var Udepcode = sessionStorage.getItem("Udepcode");
    var Ustate = sessionStorage.getItem("Ustate");

    const navigate = useNavigate();

    const d = new Date();
    // var datetimes = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
    const [coantinglist, setCoantinglist] = useState([]);
    const [printinglist, setPrintinglist] = useState([])
    const [continglist, setContinglist] = useState([])
    const [runningid, setRunningid] = useState('')

    const [selectedOption, setSelectedOption] = useState(null);

    const [data, setData] = useState({ ...initialState })

    useEffect(() => {

        CansizeTypeList().then(data => {
            opjCansize(data.listall)
        })
        PringtingsystemList().then(data => {
            setPrintinglist(data.listall)
        })
        CoatingsystemList().then(data => {
            setContinglist(data.listall)
        })
        runningnumberTDS()

    }, [])


    const runningnumberTDS = () => {

        RunningnumberByyear(d.getFullYear()).then(rdata => {



            var numrun = rdata.listall[0].TdsRunning.toLocaleString();
            //  console.log(numrun.length);
            setRunningid(rdata.listall[0]);
            if (numrun.length == 1) {
                var runs = rdata.listall[0].formate + "-0000" + rdata.listall[0].TdsRunning.toLocaleString();
                //console.log(runs);

                setData({ ...data, tdsRun: runs });


            }
            else if (numrun.length == 2) {
                var runs = rdata.listall[0].formate + "-000" + rdata.listall[0].TdsRunning.toLocaleString();
                //console.log(runs);

                setData({ ...data, tdsRun: runs });
            }
            else if (numrun.length == 3) {
                var runs = rdata.listall[0].formate + "-00" + rdata.listall[0].TdsRunning.toLocaleString();
                //console.log(runs);

                setData({ ...data, tdsRun: runs });
            }
            else if (numrun.length == 4) {
                var runs = rdata.listall[0].formate + "-0" + rdata.listall[0].TdsRunning.toLocaleString();
                // console.log(runs);

                setData({ ...data, tdsRun: runs });
            }
            else if (numrun.length == 5) {
                var runs = rdata.listall[0].formate + "-" + rdata.listall[0].TdsRunning.toLocaleString();
                // console.log(runs);

                setData({ ...data, tdsRun: runs });
            }

        })
    }

    // save data
    async function submit(e) {
        e.preventDefault();

        const { name, value } = e.target;
        setData({ ...data, [name]: value });

       // console.log(data)

       getRevisionLast(data.TDSref).then((res)=>{
        // alert(JSON.stringify(res))
        if(res.success==true){
            //มี revision เอกสารแล้ว

            // setData({...data,docVersion:res.listall[0].RevisionLast})
            var dataopject={
                Coating: data.Coating,
                ItemId:data.ItemId,
                Note: data.Note,
                Printing:data.Printing,
                SheetSize:data.SheetSize,
                TDSref:data.TDSref,
                TdsRemark:data.TdsRemark,
                createBy:data.createBy,
                customerName:data.customerName,
                datetime:data.datetime,
                docVersion: parseInt(res.listall[0].RevisionLast)+1,
                filmCode:data.filmCode,
                isremarknow:data.isremarknow,//ตรวจสอบข้อมูล
                partFile:data.partFile,
                productGroup:data.productGroup,
                productName:data.productName,
                stateFlow:data.stateFlow,
                statusFlow:data.statusFlow,
                tdsRun:res.listall[0].tdsRunning
            }

            saveNewjournal(dataopject)

        }
        else if(res.success==false){
            //ยังไม่มี revision เอกสาร
            saveNewjournal(data)
        }

       })

        // const input = document.getElementById('partFile')
        // await CreateNewJournal(data, Uname).then(credata => {
        //     //  toast("บันทุกเรียบร้อยแล้ว")
        //     RunningUpdate(runningid.runid, runningid.TdsRunning + 1);

        //     Statusflow(data.tdsRun, Uname, 'draft', Udepcode,data.docVersion).then(sdata => {
        //         if (sdata) {
        //             runningnumberTDS();
        //             //เลือกตาม id  text input 
        //             uplodfile(input.files[0]);
        //             swal("Good job!", "You clicked the button!", "success");
        //             setTimeout(() => {
        //               //  window.location.href = '/JournalListnew'
        //               navigate("/JournalListnew");
        //             }, 1200)

        //         }
        //     })

        // })
    }

    const saveNewjournal=async(data)=>{
        console.log(data)
        const input = document.getElementById('partFile')
        await CreateNewJournal(data, Uname).then(credata => {
            //  toast("บันทุกเรียบร้อยแล้ว")
            RunningUpdate(runningid.runid, runningid.TdsRunning + 1);

            Statusflow(data.tdsRun, Uname, 'draft', Udepcode,data.docVersion).then(sdata => {
                if (sdata) {
                    runningnumberTDS();
                    //เลือกตาม id  text input 
                    uplodfile(input.files[0]);
                    swal("Good job!", "You clicked the button!", "success");
                    setTimeout(() => {
                      //  window.location.href = '/JournalListnew'
                      navigate("/JournalListnew");
                    }, 1200)

                }
            })

        })
    }

    // 
    function handle(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const optionselect = (e) => {

        setData({ ...data, SheetSize: e.value })
    }

    //Search select sheetsize  
    const opjCansize = (datacoant) => {
        const sheetdata = datacoant.map((item) => ({ value: item.cancode, label: item.cansize + " " + item.sheetsize }));
        setCoantinglist(sheetdata)
    }

    return (
        <div className='body-page-form-warp'>
            <div>
                <center><h4>สร้างเอกสาร TDS</h4><br /></center>
            </div>
            <Card>
                <Card.Body>
                    <Form style={{ width: '100%' }} onSubmit={(e) => submit(e)} encType="multipart/form-data">
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>วันที่ : {d.toLocaleString()}</Form.Label>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>รหัสเอกสาร : {data.tdsRun}</Form.Label>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>ผู้บันทึก : คุณ {Uname}</Form.Label>

                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="TDSref" as={Col}>
                                <Form.Label>TDS Ref. ( MK.NO. )</Form.Label>
                                <Form.Control
                                    name='TDSref'
                                    id="TDSref"
                                    value={data.TDSref}
                                    onChange={(e) => handle(e)}
                                    placeholder="Input TDS Ref MK.NO."
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="DocVersion" as={Col} style={{ width: 50 }}>
                                <Form.Label>Document Version</Form.Label>
                                <Form.Control
                                    name='docVersion'
                                    type='number'
                                    id="docVersion"
                                    max={5}
                                    min={1}
                                    style={{ width: 100 }}
                                    value={data.docVersion} onChange={(e) => handle(e)}
                                    //defaultValue={1}
                                    disabled
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="customerName" as={Col} >
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                    name='customerName'
                                    id="customerName"
                                    value={data.customerName} onChange={(e) => handle(e)}
                                    placeholder="Input Customer Name"
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productName">
                                <Form.Label>Product Name </Form.Label>
                                <Form.Control
                                    style={{ width: "50%" }}
                                    name='productName'
                                    id="productName"
                                    value={data.productName}
                                    onChange={(e) => handle(e)}
                                    placeholder="Input Product Name"
                                    required />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="filmCode">
                                <Form.Label>Code </Form.Label>
                                <Form.Control
                                    style={{ width: "50%" }}
                                    name='filmCode'
                                    id="filmCode"
                                    value={data.filmCode}
                                    onChange={(e) => handle(e)}
                                    placeholder="Input Code"
                                    required />
                            </Form.Group> */}

                            <Form.Group className="mb-3" controlId="ItemId">
                                <Form.Label>Item ID </Form.Label>
                                <Form.Control type='text'
                                 style={{ width: "50%" }}
                                    name='ItemId'
                                    id="ItemId"
                                    value={data.ItemId}
                                    onChange={(e) => handle(e)}
                                    required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            {/* <Form.Group as={Col} controlId="ItemId">
                                <Form.Label>Item ID </Form.Label>
                                <Form.Control type='text'
                                    name='ItemId'
                                    id="ItemId"
                                    value={data.ItemId}
                                    onChange={(e) => handle(e)}
                                    required />
                            </Form.Group> */}
                            <Form.Group  as={Col} controlId="filmCode">
                                <Form.Label>Code </Form.Label>
                                <Form.Control
                                    style={{ width: "100%" }}
                                    name='filmCode'
                                    id="filmCode"
                                    value={data.filmCode}
                                    onChange={(e) => handle(e)}
                                    placeholder="Input Code"
                                    required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="SheetSize">
                                <Form.Label>Sheet Size</Form.Label>

                                <Select
                                    name='SheetSize'
                                    id='SheetSize'
                                    defaultValue={selectedOption}
                                    onChange={(e) => optionselect(e)}
                                    options={coantinglist}
                                />

                            </Form.Group>
                        </Row>

                        <Form.Group controlId="fildpart" className="mb-3" >
                            <Form.Label>Up load เอกสาร TDS </Form.Label>
                            <Form.Control type="file" name="partFile" id="partFile" accept="image/*"  value={data.partFile} onChange={(e) => handle(e)} required />
                        </Form.Group>



                        <Row className="mb-3" >
                            <Form.Group as={Col} className="mb-3" controlId="formGridPRINTING">
                                <Form.Label>PRINTING SYSTEM</Form.Label>
                                {printinglist.map((itemp) =>
                                    <Form.Check type="checkbox" name="Printing" id="Printing" label={itemp.printingsystem} value={itemp.printingCode} onChange={(e) => handle(e)} required />
                                )}
                            </Form.Group>


                            <Form.Group as={Col} controlId="Coating">
                                <Form.Label>COATING SYSTEM</Form.Label>
                                {continglist.map((itemc) =>
                                    <Form.Check type="radio" aria-label="radio 1" name="Coating" id="Coating" label={itemc.coatingsystem} value={itemc.coatingCode} onChange={(e) => handle(e)} required />
                                )}

                            </Form.Group>

                            <Form.Group as={Col} controlId="Note">
                                <Form.Label>NOTE</Form.Label>
                                <Form.Check type="radio" aria-label="radio 1" name="Note" id="Note" label="Proof" value={'1'} onChange={(e) => handle(e)} required />
                                <Form.Check type="radio" aria-label="radio 1" name="Note" id="Note" label="Not Proof" value={'0'} onChange={(e) => handle(e)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="TdsRemark">
                                <Form.Group className="mb-3" >
                                    <Form.Label>REMARK </Form.Label>
                                    <Form.Control as="textarea" rows={3} value={data.TdsRemark} name='TdsRemark' id="TdsRemark" onChange={(e) => handle(e)} maxLength={250} />
                                </Form.Group>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            บันทึก
                        </Button>
                        {" "}
                        <Button variant="warning" type="reset">
                            ยกเลิก
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CreateJournalpage;