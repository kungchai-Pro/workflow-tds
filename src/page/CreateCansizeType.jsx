import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import TableCansizeSheet from'../component/TableCansizeSheet';
import {get_CanSheetAll,post_Cansheet} from'../service/apicall';
import swal from 'sweetalert';
const CreateCansizeType = () => {

    const[inputName,setInputName]=useState("")
    const[dataCanSheet,setDataCanSheet]=useState([])

    useEffect(()=>{
        getdataList()
    },[])


    // handle event input text
    function handle(e) {
        const { name, value } = e.target;
        setInputName({ ...inputName, [name]: value });
    }
    
    // submit  Save 
    const onsubmitConfirm=(e)=>{
        e.preventDefault();
       post_Cansheet(inputName).then((data)=>{
        if(data.success==true){
            swal("Good job!", "คุณได้ทำการบันทึกเรียบร้อยแล้ว", "success");
            getdataList()
        }
        
       })

    }

    const getdataList=()=>{
        get_CanSheetAll().then((result)=>{
            if(result.success==true){
            //    console.log(result)
                setDataCanSheet(result.listall)
            }
            
        })
    }

    return (
        <div className='body-page-form-cansheet-warp'>
            <div><center>สร้างข้อมูล Cansize </center></div>
            <div style={{marginLeft:'5%',marginTop:20,marginRight:'5%',background:'#EEECE9',borderRadius:10,padding:10}}>
                <form onSubmit={onsubmitConfirm}>
                    <div>
                        <label className='label-margid'>Cansize : </label>
                        <input type='text' name='cansize' placeholder='cansize'
                         id='cansize' value={inputName.cansize}  
                         onChange={(e)=>handle(e)}
                         style={{width:200}}
                         required
                        className='form-text'
                        /> <label style={{color:'red'}}>*</label> 
                    </div>
                    <div>
                        <label className='label-margid'>Sheetsize : </label>
                        <input type='text' name='sheetsize' placeholder='Sheetsize' 
                        id='sheetsize' value={inputName.sheetsize} 
                        onChange={(e)=>handle(e)}
                        className='form-text'
                        required
                        /> <label style={{color:'red'}}>*</label> 
                    </div>
                    <div>
                        <label className='label-margid'>Rubber : </label>
                        <input type='text' name='rubber' placeholder='Rubber' 
                        id='rubber' value={inputName.rubber}
                        onChange={(e)=>handle(e)}
                        className='form-text' 
                        required
                        /> <label style={{color:'red'}}>*</label> 
                    </div>
                    <div>
                        <label className='label-margid'>Property : </label>
                        <input type='text' name='property' placeholder='property' 
                        id='property' value={inputName.property}
                        onChange={(e)=>handle(e)} 
                        className='form-text'
                         required
                        /><label style={{color:'red'}}>*</label> 
                    </div>
                    <div>
                        <label className='label-margid'>Cancode : </label>
                        <input type='text' name='cancode' placeholder='Cancode' 
                        id='cancode' value={inputName.cancode} 
                        onChange={(e)=>handle(e)}
                        style={{width:200}}
                        className='form-text' 
                        required
                        /> <label style={{color:'red'}}>*</label> 
                    </div>
                    <div>
                        <label className='label-margid'>Width : </label>
                        <input type='text' name='widths' placeholder='Width' 
                        id='widths' value={inputName.widths} 
                        onChange={(e)=>handle(e)}
                        style={{width:150}}
                        className='form-text'
                        required
                        /> <label style={{color:'red'}}>*</label> 
                    </div>
                    <div>
                        <label className='label-margid'>Height : </label>
                        <input type='text' name='Height' placeholder='Height'
                        id='Height' value={inputName.Height} 
                        onChange={(e)=>handle(e)}
                        style={{width:150}}
                        className='form-text'
                        required
                        /> <label style={{color:'red'}}>*</label> 
                    </div>
                    <div>
                        <center>
                            <Button variant="primary" type="submit" style={{margin:2}}>บันทึก</Button>
                            <Button variant="warning" type="reset" >ยกเลิก</Button>
                        </center>
                    </div>
                </form>
            </div>
            <div style={{marginTop:5}}>
                <label style={{width:200,background:'#9AD3F9',padding:10}}>รายการ CanSheet </label>
                <TableCansizeSheet  data={dataCanSheet}/>
            </div>
        </div>
    )
}

export default CreateCansizeType