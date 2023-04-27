import React,{useState,useEffect} from 'react'
import{Getjournalstateflow}from'../service/apicall';
import TableListDepartjournal from '../component/TableListDepartjournal';

export const Groupdepartmentpage = () => {

  const[datajour,setDatajour]=useState([])

    useEffect(()=>{
      const idstate=sessionStorage.getItem('Ustate');

      Getjournalstateflow(idstate).then(data=>{
        // console.log(data.listall);
        setDatajour(data.listall)
      })
    },[])

  return (
    <div  className='body-page-table-warp'>
      <TableListDepartjournal data={datajour}/>
    </div>
  )
}
export default Groupdepartmentpage;