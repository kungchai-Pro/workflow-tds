import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import swal from 'sweetalert';
import { useParams,useNavigate } from 'react-router-dom';



import {
    CansizeTypeList, PringtingsystemList, CoatingsystemList,
    UpdateNewJournal, uplodfile, GetjournalListByid
} from '../service/apicall';


const EditJournalpage = () => {

    const Params = useParams();
    const { Id } = Params;

    var Uname = sessionStorage.getItem("Uname");
    const navigate=useNavigate();


    const d = new Date();
    const [coantinglist, setCoantinglist] = useState([]);
    const [printinglist, setPrintinglist] = useState([])
    const [continglist, setContinglist] = useState([])
    const [datajour, setDatjour] = useState([])

    const [datafile, setDatafile] = useState('')

    useEffect(() => {
        GetjournalListByid(Id).then(data => {
            if (data) {
                setDatjour(data.listall[0])
            }
        })

        CansizeTypeList().then(data => {
           // console.log(data);
            setCoantinglist(data.listall);
        })
        PringtingsystemList().then(data => {
            setPrintinglist(data.listall)
        })
        CoatingsystemList().then(data => {
            setContinglist(data.listall)
        })

    }, [])




    // save data
    async function submit(e) {
        e.preventDefault();

        const input = document.getElementById('partFile')



        await UpdateNewJournal(datajour, Uname, datafile).then(credata => {
            
            //เลือกตาม id  text input 
            uplodfile(input.files[0]);

            swal("Good job!", "You clicked the button!", "success");
            setTimeout(() => {
                // window.location.href = '/JournalListnew'
                navigate("/JournalListnew");
            }, 1200)
        })

    }

    return (
        <div className='body-page-form-warp'>
            <div>
                <center><h4>แก้ไขเอกสาร TDS</h4><br /></center>
            </div>
            <Card>
                <Card.Body>
                    <Form style={{ width: '100%' }} onSubmit={(e) => submit(e)} encType="multipart/form-data">
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>วันที่ : {d.toLocaleString()}</Form.Label>
                                {/* <Form.Control type="email" placeholder="Enter email" /> */}
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>รหัสเอกสาร : {datajour.tdsRunning}</Form.Label>
                                {/* <input type='text' value={running} name='tdsrunning' id='tdsrunning' hidden/> */}
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>ผู้บันทึก : คุณ {Uname}</Form.Label>

                            </Form.Group>
                        </Row>
                        <Row className="mb-3" >
                            <Form.Group className="mb-3" controlId="TDSref"  as={Col} >
                                <Form.Label>TDS Ref. </Form.Label>
                                <Form.Control placeholder="1234 Main St" name='TDSref' id="TDSref"
                                    value={datajour.refTDS}
                                    onChange={(e) => setDatjour({ ...datajour, refTDS: e.target.value })}
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="DocVersion" as={Col} style={{ width: 50 }}>
                                <Form.Label>Doument Version</Form.Label>
                                <Form.Control
                                    name='docVersion'
                                    type='number'
                                    id="docVersion"
                                    max={5}
                                    min={1}
                                    style={{ width: 100 }}
                                    value={datajour.docVersion} 
                                    onChange={(e) => setDatjour({ ...datajour, docVersion: e.target.value })}
                                    //defaultValue={1}
                                    disabled
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="customerName" as={Col} >
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                    name='customerName'
                                    id="customerName"
                                    value={datajour.customerName} onChange={(e) => setDatjour({...datajour,customerName:e.target.value})}
                                    placeholder="Input Customer Name"
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="productName">
                                <Form.Label>Product Name </Form.Label>
                                <Form.Control
                                    style={{ width: "50%" }}
                                    name='productName'
                                    id="productName"
                                    value={datajour.productName}
                                    onChange={(e) => setDatjour({...datajour,productName:e.target.value})}
                                    placeholder="Input Product Name"
                                    required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="filmCode">
                                <Form.Label>Code </Form.Label>
                                <Form.Control
                                    style={{ width: "50%" }}
                                    name='filmCode'
                                    id="filmCode"
                                    value={datajour.filmCode}
                                    onChange={(e) => setDatjour({...datajour,filmCode:e.target.value})}
                                    placeholder="Input Code"
                                    required />
                            </Form.Group>
                        </Row>


                        <Form.Group controlId="fildpart" className="mb-3" >
                            <Form.Label>Up load เอกสาร TDS </Form.Label>
                            <Form.Control type="file" name="partFile" id="partFile" accept="image/*" 
                                value={datafile}
                                onChange={(e) => setDatafile(e.target.value)} required />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="ItemId">
                                <Form.Label>Item ID </Form.Label>
                                <Form.Control type='text' name='ItemId' id="ItemId" value={datajour.itemId} 
                                onChange={(e) => setDatjour({ ...datajour, itemId: e.target.value })} required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="SheetSize">
                                <Form.Label>Sheet Size</Form.Label>
                                <Form.Select defaultValue="เลือก Sheet size" name='SheetSize' id="SheetSize" 
                                onChange={(e) => setDatjour({ ...datajour, sheetSize: e.target.value })} required >
                                    <option value={datajour.cansize}>{datajour.cansize} {datajour.sheetsize}</option>
                                    {coantinglist.map((item) =>
                                        item.cancode != datajour.cancode && <option value={item.cancode}>{item.cansize} {item.sheetsize} </option>
                                    )}
                                </Form.Select>

                            </Form.Group>
                        </Row>

                        <Row className="mb-3" >
                            <Form.Group as={Col} className="mb-3" controlId="formGridPRINTING">
                                <Form.Label>PRINTING SYSTEM</Form.Label>
                                {printinglist.map((itemp) =>
                                    datajour.printingCode == itemp.printingCode && <Form.Check type="checkbox" name="Printing" id="Printing" label={itemp.printingsystem} value={itemp.printingCode} onChange={(e) => setDatjour({ ...datajour, printingCode: e.target.value })} defaultChecked required />
                                )}
                            </Form.Group>


                            <Form.Group as={Col} controlId="Coating">
                                <Form.Label>COATING SYSTEM</Form.Label>
                                {continglist.map((itemc) =>
                                    datajour.coatingCode == itemc.coatingCode ?
                                        <Form.Check type="radio" aria-label="radio 1" name="Coating" id="Coating" label={itemc.coatingsystem} value={itemc.coatingCode} onChange={(e) => setDatjour({ ...datajour, coatingCode: e.target.value })} defaultChecked required /> :
                                        <Form.Check type="radio" aria-label="radio 1" name="Coating" id="Coating" label={itemc.coatingsystem} value={itemc.coatingCode} onChange={(e) => setDatjour({ ...datajour, coatingCode: e.target.value })} required />
                                )}


                            </Form.Group>

                            <Form.Group as={Col} controlId="Note">
                                <Form.Label>NOTE</Form.Label>
                                {datajour.note == 1 ? <Form.Check type="radio" aria-label="radio 1" name="Note" id="Note" label="Proof" value={'1'} onChange={(e) => setDatjour({ ...datajour, note: e.target.value })} defaultChecked required /> :
                                    <Form.Check type="radio" aria-label="radio 1" name="Note" id="Note" label="Proof" value={'1'} onChange={(e) => setDatjour({ ...datajour, note: e.target.value })} required />
                                }

                                {datajour.note == 0 ? <Form.Check type="radio" aria-label="radio 1" name="Note" id="Note" label="Not Proof" value={'0'} onChange={(e) => setDatjour({ ...datajour, note: e.target.value })} defaultChecked /> :
                                    <Form.Check type="radio" aria-label="radio 1" name="Note" id="Note" label="Not Proof" value={'0'} onChange={(e) => setDatjour({ ...datajour, note: e.target.value })} />
                                }
                            </Form.Group>

                            <Form.Group as={Col} controlId="TdsRemark">
                                <Form.Group className="mb-3" >
                                    <Form.Label>REMARK</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={datajour.remark} name='TdsRemark' id="TdsRemark" onChange={(e) => setDatjour({ ...datajour, remark: e.target.value })} />
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

export default EditJournalpage;