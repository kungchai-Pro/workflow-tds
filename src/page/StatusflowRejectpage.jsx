import React, { useState, useEffect } from 'react'
import { GetjournalstatToReject } from '../service/apicall';
import TableListRejectjournal from '../component/TableListRejectjournal';

const StatusflowRejectpage = () => {

  const [datareceive, setDatareceive] = useState([]);

  useEffect(() => {
    sessionStorage.getItem("Uname");
    sessionStorage.getItem("Udepcode");
    var idstate = sessionStorage.getItem("Ustate");
    var idpreReceive =0;
    if(idstate==2){
      idpreReceive = idstate
    }else{
      var idpreReceive = idstate - 1;
    }
    

    GetjournalstatToReject(idpreReceive).then(data => {
      console.log(data.listall);
      setDatareceive(data.listall);
    })
  }, [])


  return (
    <div className='body-page-table-warp' >
      <TableListRejectjournal data={datareceive} />
    </div>
  )
}

export default StatusflowRejectpage;