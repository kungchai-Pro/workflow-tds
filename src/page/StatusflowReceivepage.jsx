import React,{useState,useEffect} from 'react'
import{GetjournalstateReceive}from'../service/apicall';
import TableListReceivejournal from'../component/TableListReceivejournal';

const StatusflowSendpage = () => {

  const[datareceive,setDatareceive]=useState([]);

  useEffect(()=>{
    sessionStorage.getItem("Uname");
    sessionStorage.getItem("Udepcode");
  var  idstate= sessionStorage.getItem("Ustate");
  var idpreReceive=idstate-1;

    GetjournalstateReceive(idpreReceive).then(data=>{
      console.log(data.listall);
      setDatareceive(data.listall);
    })
  },[])
  

  return (
    <div className='body-page-table-warp' >
      <TableListReceivejournal data={datareceive} />
      </div>
  )
}

export default StatusflowSendpage;