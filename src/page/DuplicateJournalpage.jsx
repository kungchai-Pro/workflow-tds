import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import swal from 'sweetalert';
import { useNavigate, useParams, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

import {
    CansizeTypeList, PringtingsystemList, CoatingsystemList,
    CreateNewJournal, uplodfile, RunningnumberByyear, RunningUpdate, Statusflow, getjournalDetailByid, getRevisionLast
} from '../service/apicall';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const DuplicateJournalpage = () => {

    var Uname = sessionStorage.getItem("Uname");
    var Udepcode = sessionStorage.getItem("Udepcode");
    var Ustate = sessionStorage.getItem("Ustate");
    const Params = useParams();
    const { Id } = Params;
    const navigate = useNavigate();

    const d = new Date();

    const [coantinglist, setCoantinglist] = useState([]);
    const [printinglist, setPrintinglist] = useState([]);
    const [continglist, setContinglist] = useState([]);
    const [runningid, setRunningid] = useState('');
    const [newRunning, setNewRunning] = useState('');

    const [data, setData] = useState([])
    const [duplicates, setDuplicates] = useState([])

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
        getjournalDetailByid(Id).then((data) => {

            if (data.success == true) {

                setData(data.listall[0]);
                setDuplicates(data.listall[0]);
            }

        })

    }, [])

    // เอาไว้กรณี save add
    const runningnumberTDS = async () => {
        var result = ''
        await RunningnumberByyear(d.getFullYear()).then(rdata => {

            var numrun = rdata.listall[0].TdsRunning.toLocaleString();

            setRunningid(rdata.listall[0]);
            if (numrun.length == 1) {
                var runs = rdata.listall[0].formate + "-0000" + rdata.listall[0].TdsRunning.toLocaleString();
                setNewRunning(runs);
            }
            else if (numrun.length == 2) {
                var runs = rdata.listall[0].formate + "-000" + rdata.listall[0].TdsRunning.toLocaleString();
                setNewRunning(runs);
            }
            else if (numrun.length == 3) {
                var runs = rdata.listall[0].formate + "-00" + rdata.listall[0].TdsRunning.toLocaleString();
                setNewRunning(runs);
            }
            else if (numrun.length == 4) {
                var runs = rdata.listall[0].formate + "-0" + rdata.listall[0].TdsRunning.toLocaleString();
                setNewRunning(runs);
            }
            else if (numrun.length == 5) {
                var runs = rdata.listall[0].formate + "-" + rdata.listall[0].TdsRunning.toLocaleString();
                setNewRunning(runs);
            }

            result = true;

        })

        return result;
    }

    // save data
    async function submit(e) {
        e.preventDefault();

        if (data.refTDS == duplicates.refTDS) {

            getRevisionLast(data.refTDS).then((res) => {
                if (res.success == true) {
                    const dataopject = {
                        tdsRun: data.tdsRunning,
                        TDSref: data.refTDS,
                        docVersion: parseInt(res.listall[0].RevisionLast)+1,
                        customerName: data.customerName,
                        productName: data.productName,
                        filmCode: data.filmCode,
                        partFile: data.partFile,
                        ItemId: data.itemId,
                        SheetSize: data.cancode,
                        Printing: data.printingCode,
                        Coating: data.coatingCode,
                        Note: data.note,
                        TdsRemark: data.remark
                    }
                    AddNewVersionJournal(dataopject);
                }
            })
        } else {
            //   console.log('2')
            runningnumberTDS().then(result => {
                if (result == true) {
                    const dataopject = {
                        tdsRun: newRunning,
                        TDSref: data.refTDS,
                        docVersion: data.docVersion,
                        customerName: data.customerName,
                        productName: data.productName,
                        filmCode: data.filmCode,
                        partFile: data.partFile,
                        ItemId: data.itemId,
                        SheetSize: data.cancode,
                        Printing: data.printingCode,
                        Coating: data.coatingCode,
                        Note: data.note,
                        TdsRemark: data.remark
                    }
                    AddNewJournal(dataopject);
                }

            })


        }


    }

    const AddNewJournal = async (Todata) => {

        // console.log(Todata);
        const input = document.getElementById('partFile')

        await CreateNewJournal(Todata, Uname).then(credata => {

            RunningUpdate(runningid.runid, runningid.TdsRunning + 1);

            Statusflow(Todata.tdsRunning, Uname, 'draft', Udepcode, Todata.docVersion).then(sdata => {
                if (sdata) {
                    runningnumberTDS();
                    //เลือกตาม id  text input 
                    uplodfile(input.files[0]);
                    swal("Good job!", "You clicked the button!", "success");
                    setTimeout(() => {
                        window.location.href = '/JournalListnew'
                        //  navigate("/JournalListnew");
                    }, 1200)

                }
            })

        })
    }
    const AddNewVersionJournal = async (tdo) => {
        const input = document.getElementById('partFile')

        await CreateNewJournal(tdo, Uname).then(credata => {
            //  toast("บันทุกเรียบร้อยแล้ว")
            RunningUpdate(runningid.runid, runningid.TdsRunning + 1);

            Statusflow(tdo.tdsRun, Uname, 'draft', Udepcode, tdo.docVersion).then(sdata => {
                if (sdata) {
                    runningnumberTDS();
                    //เลือกตาม id  text input 
                    uplodfile(input.files[0]);
                    swal("Good job!", "You clicked the button!", "success");
                    setTimeout(() => {
                        window.location.href = '/JournalListnew'
                        //   navigate("/JournalListnew");
                    }, 1200)

                }
            })

        })
    }
    // check type file  
    function getExtension(filename) {
        return filename.split('.').pop()
    }

    // function ดึงข้อมูลตาม name  input textbox
    function handle(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    //function search optionselect เพื่อค้นหา item
    const optionselect = (e) => {

        setData({ ...data, SheetSize: e.value })
    }

    //function ตัดอักษร
    const subStringdata = () => {

    }

    //Search select sheetsize  
    const opjCansize = (datacoant) => {
        const sheetdata = datacoant.map((item) => ({ value: item.cancode, label: item.cansize + " " + item.sheetsize }));

        setCoantinglist(sheetdata)
    }

    if (duplicates.length == 0) {
        return <div>
            <label>กำลังโหลดข้อมูล</label>
        </div>
    } else {


        return (
            <div className='body-page-form-warp'>
                <div>
                    <center><h4>ดัดลอกเอกสาร TDS</h4><br /></center>

                </div>
                <Card>
                    <Card.Body>
                        <Form style={{ width: '100%' }} onSubmit={(e) => submit(e)} encType="multipart/form-data">
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>วันที่ : {d.toLocaleString()}</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>รหัสเอกสาร : {data.tdsRunning}</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>ผู้บันทึก : คุณ {Uname}</Form.Label>

                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="refTDS" as={Col}>
                                    <Form.Label>TDS Ref. ( MK.NO. )</Form.Label>
                                    <Form.Control
                                        name='refTDS'
                                        id="refTDS"
                                        value={data.refTDS}
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
                                        value={data.docVersion}
                                        onChange={(e) => handle(e)}
                                        //defaultValue={1}
                                        disabled
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="customerName" as={Col} >
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control
                                        name='customerName'
                                        id="customerName"
                                        value={data.customerName}
                                        onChange={(e) => handle(e)}
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


                                <Form.Group className="mb-3" controlId="ItemId">
                                    <Form.Label>Item ID </Form.Label>
                                    <Form.Control type='text'
                                        style={{ width: "50%" }}
                                        name='ItemId'
                                        id="ItemId"
                                        value={data.itemId}
                                        onChange={(e) => handle(e)}
                                        required />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="filmCode">
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
                                        defaultValue={{ value: duplicates.cancode, label: duplicates.cansize + " " + duplicates.sheetSize }}

                                        onChange={(e) => optionselect(e)}
                                        options={coantinglist}
                                    />

                                </Form.Group>
                            </Row>

                            <Form.Group controlId="fildpart" className="mb-3" >
                                <Form.Label>Up load เอกสาร TDS </Form.Label>
                                <Form.Control type="file" name="partFile" id="partFile" accept="image/*"
                                    //value={data.partFile}
                                    onChange={(e) => handle(e)} required />
                            </Form.Group>


                            <Row className="mb-3" >
                                <Form.Group as={Col} className="mb-3" controlId="formGridPRINTING">
                                    <Form.Label>PRINTING SYSTEM</Form.Label>
                                    {printinglist.map((itemp) =>
                                        <Form.Check type="checkbox" name="printingCode" id="printingCode" label={itemp.printingsystem}
                                            value={itemp.printingCode}
                                            onChange={(e) => handle(e)} required checked />
                                    )}
                                </Form.Group>


                                <Form.Group as={Col} controlId="Coating">
                                    <Form.Label>COATING SYSTEM</Form.Label>
                                    {continglist.map((itemc) =>
                                        <Form.Check type="radio" aria-label="radio 1" name="coatingCode" id="coatingCode" label={itemc.coatingsystem}
                                            value={itemc.coatingCode}
                                            onChange={(e) => handle(e)} required />
                                    )}

                                </Form.Group>

                                <Form.Group as={Col} controlId="Note">
                                    <Form.Label>NOTE</Form.Label>

                                    <Form.Check type="radio" aria-label="radio 1" name="note" id="note1" label="Proof"
                                        value={'1'} onChange={(e) => handle(e)} required />

                                    <Form.Check type="radio" aria-label="radio 1" name="note" id="note3" label="Not Proof"
                                        value={'0'} onChange={(e) => handle(e)} />

                                </Form.Group>

                                <Form.Group as={Col} controlId="TdsRemark">
                                    <Form.Group className="mb-3" >
                                        <Form.Label>REMARK </Form.Label>
                                        <Form.Control as="textarea" rows={3} //value={data.TdsRemark} 
                                            name='remark' id="remark"
                                            value={data.remark}
                                            onChange={(e) => handle(e)} maxLength={250} />
                                    </Form.Group>
                                </Form.Group>
                            </Row>
                            <center>
                                <Button variant="primary" type="submit">
                                    บันทึก
                                </Button>
                                {" "}
                                <Button variant="warning" type="reset">
                                    ยกเลิก
                                </Button>
                            </center>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default DuplicateJournalpage;