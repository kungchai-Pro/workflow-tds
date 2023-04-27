import React, { useState, useEffect } from 'react';
import {useDispatch}from'react-redux'
import { Link } from 'react-router-dom';
import TableLisjournal from '../component/TableLisjournal';
import { GetjournalList,GetjournalStateResualtAll,AccountFlow } from '../service/apicall';
import{UserList}from'../redux/features/loginSlice'
import { Form } from 'react-bootstrap';


const Homepage = () => {


  const [datalist, setDatalist] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const[stateAll,setStateAll]=useState([])
  const dispatch=useDispatch();

  useEffect(() => {
    listalldata()
    GetjournalStateResualtAll().then(data=>{
    //console.log(data)
      setStateAll(data.listall[0])
    })

    AccountFlow().then((data)=>{
      if(data.success==true){
        dispatch(UserList(data.listall));
      }
  
    });

  }, [dispatch])


  const listalldata = () => {
    GetjournalList().then(data => {
      setDatalist(data.listall);
      setFilteredList(data.listall);
    })
  }

  const onFilterChange = (event) => {
    const selectedSize = Number(event.target.value);
    var filterList;
    if (selectedSize == 0) {
      var filterList = datalist.filter((item) => {
        return Number(item.stateFlow) > selectedSize;
      });
    }
    else {
      var filterList = datalist.filter((item) => {
        return Number(item.stateFlow) == selectedSize;
      });
    }



    setFilteredList(filterList);
  };



  return (
    <div className='body-page-table-warp'>

<div className='row-flex-start-wrap'>
<label>ขั้นตอนอนุมัติ</label>
<div style={{marginLeft:20,backgroundColor:'#E5C304',padding:2,borderRadius:2,color:'#fff',fontSize:14}}>Prepress : {stateAll.stateOne}</div>
<div style={{marginLeft:20,backgroundColor:'#E5C304',padding:2,borderRadius:2,color:'#fff',fontSize:14}}>R&D : {stateAll.stateTwo}</div>
<div style={{marginLeft:20,backgroundColor:'#E5C304',padding:2,borderRadius:2,color:'#fff',fontSize:14}}>Planning : {stateAll.stateThreeReceive}</div>
<div style={{marginLeft:20,marginRight:20,backgroundColor:'#07A10E',padding:2,borderRadius:2,color:'#fff',fontSize:14}}>เสร็จแล้ว : {stateAll.StateApprove}</div>
<div style={{fontSize:14}}>เอกสารทั้งหมด : {stateAll.DocAlls}</div>
</div>
      <div className='row-flex-end-wrap'>
        <Form.Check
          type={'radio'}
          id={`Statust-all`}
          name={'Statust-all'}
          label={`All `}
          value={'0'}

          onChange={(e) => onFilterChange(e)}
          style={{ marginLeft: 5 }}
          defaultChecked
        />
        <Form.Check
          type={'radio'}
          id={`Statust-all`}
          name={'Statust-all'}
          label={`Prepress `}
          value={'1'}
          onChange={(e) => onFilterChange(e)}

          style={{ marginLeft: 5 }}

        />
        <Form.Check
          type={'radio'}
          id={`Statust-all`}
          name={'Statust-all'}
          label={`R&D `}
          value={'2'}
          onChange={(e) => onFilterChange(e)}

          style={{ marginLeft: 5 }}
        />
        <Form.Check
          type={'radio'}
          id={`Statust-all`}
          name={'Statust-all'}
          label={`Planning`}
          value={'3'}
          onChange={(e) => onFilterChange(e)}

          style={{ marginLeft: 5 }}
        />
      </div>
    
      <TableLisjournal data={filteredList} />

      <div className='row-flex-start-wrap'>
        <div><label  style={{width:15,height:15,backgroundColor:'#F61710'}}></label><label style={{fontSize:12,marginRight:5}}>ยังไม่เสร็จ</label> </div>
        <div><label  style={{width:15,height:15,backgroundColor:'#F0B814'}}></label><label style={{fontSize:12,marginRight:5}}>กำลังดำเนินการ</label> </div>
        <div><label  style={{width:15,height:15,backgroundColor:'#10A717'}}></label><label style={{fontSize:12}}>เสร็จแล้ว</label> </div>
      </div>
    </div>
  );
};

export default Homepage;