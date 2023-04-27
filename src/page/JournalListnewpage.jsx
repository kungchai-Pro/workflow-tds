import React, { useState, useEffect } from 'react'
import TableListNewjournal from '../component/TableListNewjournal';
import { GetjournalNew } from '../service/apicall';

const JournalListnewpage = () => {

  const[datajour,setDatajour]=useState([])
  
  useEffect(()=>{
    GetjournalNew().then(data=>{

      setDatajour(data.listall);

      console.log(data.listall);
       
    })
    },[])

  return (
    <div className='body-page-table-warp' >
      <TableListNewjournal data={datajour} />
    </div>
  )
}

export default JournalListnewpage