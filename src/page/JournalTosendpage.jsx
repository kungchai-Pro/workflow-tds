import React,{useState,useEffect} from 'react'
import TableListTosendJournal from'../component/TableListTosendJournal';
import {GetjournalstatToeSend} from'../service/apicall';


const JournalTosendpage = () => {
  
const[datalist,setDatalist]=useState([])

useEffect(()=>{
var  idstate= sessionStorage.getItem("Ustate");
GetjournalstatToeSend(idstate).then(data=>{
  setDatalist(data.listall);
})

},[])
  
  return (
    <div className='body-page-table-warp'>
        <TableListTosendJournal data={datalist}/>
      </div>
  )
}

export default JournalTosendpage;