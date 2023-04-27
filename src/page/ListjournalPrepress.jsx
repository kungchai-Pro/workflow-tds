import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableLisjournalPrepress from '../component/TableLisjournalPrepress';
import { GetjournalList,GetjournalStateResualtAll } from '../service/apicall';
import { Form } from 'react-bootstrap';


const ListjournalPrepress = () => {
    const [filteredList, setFilteredList] = useState([])
    useEffect(() => {

    GetjournalList().then(data => {
   
      setFilteredList(data.listall);
    })
      }, [])
    
  return (
    <div  className='body-page-table-warp' >
        <div>ListjournalPrepress</div>
        <TableLisjournalPrepress data={filteredList} />
    </div>  
  )
}

export default ListjournalPrepress