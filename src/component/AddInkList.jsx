
import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AddInkpart1,AddInkpart2,AddInkpart3,AddInkpart4,AddInkpart5,
    AddInkpart6,AddInkpart7 } from '../redux/features/conventionnalinkSlice';


const AddInkList = ({Sequence,IdTds}) => {

    const dispatch = useDispatch();      
  
      const [modalShow, setModalShow] = React.useState(false);
      const [addInk, setAddInk] = useState({
        color_unit1: "",
        color_unit2: "",
        color_pt: "",
        fmc_unit1: "",
        fmc_unit2: "",
        fmc_pt: "",
        thick_unit1: "",
        thick_unit2: "",
        thick_pt: "",
        temp_unit1: "",
        temp_unit2: "",
        temp_pt: "",
        speed_unit1: "",
        speed_unit2: "",
        speed_pt: "",
        sequence:Sequence,
        tdsRunning:IdTds
    })

    useEffect(()=>{
        if(Sequence=="1"){
            dispatch(AddInkpart1(addInk));
        }
        else if(Sequence=="2"){
            dispatch(AddInkpart2(addInk));
        }
        else if(Sequence=="3"){
            dispatch(AddInkpart3(addInk));
        }
        else if(Sequence=="4"){
            dispatch(AddInkpart4(addInk));
        }
        else if(Sequence=="5"){
            dispatch(AddInkpart5(addInk));
        }
        else if(Sequence=="6"){
            dispatch(AddInkpart6(addInk));
        }
        else if(Sequence=="7"){
            dispatch(AddInkpart7(addInk));
        }

    },[dispatch])

    // save parameter 
    const SaveinkToNo = (e) => {
        setModalShow(false);
        if(Sequence=="1"){
            dispatch(AddInkpart1(addInk));
        }
        else if(Sequence=="2"){
            dispatch(AddInkpart2(addInk));
        }
        else if(Sequence=="3"){
            dispatch(AddInkpart3(addInk));
        }
        else if(Sequence=="4"){
            dispatch(AddInkpart4(addInk));
        }
        else if(Sequence=="5"){
            dispatch(AddInkpart5(addInk));
        }
        else if(Sequence=="6"){
            dispatch(AddInkpart6(addInk));
        }
        else if(Sequence=="7"){
            dispatch(AddInkpart7(addInk));
        }
    }

    const AddInklistAll=(e)=>{
        setAddInk({...addInk,tdsRunning:e})
        setModalShow(true);
    }   


    return (
        <div>
            <button type='button' onClick={() =>AddInklistAll(IdTds)}
            style={{padding:2,borderRadius:3,borderWidth:0.5}}
            >เพิ่มข้อมูล</button>
            <Modal
                onHide={() => setModalShow(false)}
                size="xl"


                aria-labelledby="contained-modal-title-vcenter"
                //  centered แสดง Modal ตรงกลาง page
                show={modalShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        เพิ่มข้อมูล
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive="sm">
                        <thead style={{ backgroundColor: '#fff' }}>
                            <tr>
                                <th style={{ width: '5%' }}></th>

                                <th style={{ width: '10%' }}>Printing System </th>
                                <th style={{ width: '10%' }}>Unit1</th>
                                <th style={{ width: '10%' }}>Unit2</th>
                                <th style={{ width: '10%' }}>PT#</th>

                            </tr>
                        </thead>
                        <tbody className='td-fornt-size'>
                            <tr>
                                <th><center>ลำดับที่ {Sequence}</center></th>
                                <td>Color shade</td>
                                <td>
                                    <input type="text" name="color_unit1" value={addInk.color_unit1}
                                        onChange={(e) => { setAddInk({ ...addInk, color_unit1: e.target.value }) }} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="color_unit2" value={addInk.color_unit2}
                                        onChange={(e) => setAddInk({ ...addInk, color_unit2: e.target.value })} style={{ width: '90%' }} />
                                </td>
                                <td><input type="text" name="color_pt" value={addInk.color_pt}
                                    onChange={(e) => setAddInk({ ...addInk, color_pt: e.target.value })} style={{ width: '90%' }} /></td>

                            </tr>
                            <tr>
                                <td></td>
                                <td>FM.code</td>
                                <td>
                                    <input type="text" name="fmc_unit1" value={addInk.fmc_unit1}
                                        onChange={(e) => { setAddInk({ ...addInk, fmc_unit1: e.target.value }) }} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="fmc_unit2" value={addInk.fmc_unit2}
                                        onChange={(e) => setAddInk({ ...addInk, fmc_unit2: e.target.value })} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="fmc_pt" value={addInk.fmc_pt}
                                        onChange={(e) => setAddInk({ ...addInk, fmc_pt: e.target.value })} style={{ width: '90%' }} />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Thickness / Density</td>
                                <td>
                                    <input type="text" name="thick_unit1" value={addInk.thick_unit1}
                                        onChange={(e) => setAddInk({ ...addInk, thick_unit1: e.target.value })} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="thick_unit2" value={addInk.thick_unit2}
                                        onChange={(e) => setAddInk({ ...addInk, thick_unit2: e.target.value })} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="thick_pt" value={addInk.thick_pt}
                                        onChange={(e) => setAddInk({ ...addInk, thick_pt: e.target.value })} style={{ width: '90%' }} />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Temp. / UV lamp.</td>
                                <td>
                                    <input type="text" name="temp_unit1" value={addInk.temp_unit1}
                                        onChange={(e) => setAddInk({ ...addInk, temp_unit1: e.target.value })} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="temp_unit2" value={addInk.temp_unit2}
                                        onChange={(e) => setAddInk({ ...addInk, temp_unit2: e.target.value })} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="temp_pt" value={addInk.temp_pt}
                                        onChange={(e) => setAddInk({ ...addInk, temp_pt: e.target.value })} style={{ width: '90%' }} />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Speed (sph)</td>
                                <td>
                                    <input type="text" name="speed_unit1" value={addInk.speed_unit1}
                                        onChange={(e) => setAddInk({ ...addInk, speed_unit1: e.target.value })} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="speed_unit2" value={addInk.speed_unit2}
                                        onChange={(e) => setAddInk({ ...addInk, speed_unit2: e.target.value })} style={{ width: '90%' }} />
                                </td>
                                <td>
                                    <input type="text" name="speed_pt" value={addInk.speed_pt}
                                        onChange={(e) => setAddInk({ ...addInk, speed_pt: e.target.value })} style={{ width: '90%' }} />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>รหัสเอกสาร : {IdTds}</td>
                            </tr>

                        </tbody>
                    </Table>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Close
                    </Button>
                    <Button onClick={() => SaveinkToNo(IdTds)}>บันทึก</Button>
                </Modal.Footer>
            </Modal>

        </div>

    )
}

export default AddInkList