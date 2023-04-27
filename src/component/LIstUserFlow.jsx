import React,{useEffect,useState} from 'react'
import{useSelector}from'react-redux';
import {selectUserAll}from'../redux/features/loginSlice';
import { FaCheckCircle ,FaAngleDoubleRight,FaExclamationCircle} from "react-icons/fa";

const LIstUserFlow = ({statFlow}) => {
    const userDto=useSelector(selectUserAll);
    const[allusers,setAllusers]=useState([])
    useEffect(()=>{
       setAllusers(userDto);
    },[userDto,allusers])

    const unameList=(sf)=>{
        
    var datas =allusers.find((item)=>item.stateflows==sf)
        return datas.nameUser;
    }

if(allusers.length!=0){
    return (
        <div><FaExclamationCircle size={15}/>{unameList(statFlow)}</div>
      )
}
else{
    return(
        <div>....</div>
    )
    
}

}

export default LIstUserFlow