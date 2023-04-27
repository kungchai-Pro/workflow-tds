
import axios from "axios";
  const Url = 'http://192.168.218.239:3005/api/v1';

// login
export function LoginAccount(passowrds) {

  return axios.post(Url + '/account/login', {
    Password: passowrds
  })
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// user aprove all 
export function AccountFlow() {
  return axios.get(Url + '/account/accountlist')
    .then(function (response) {
      //console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// cansize type list 
export function CansizeTypeList() {
  return axios.get(Url + '/cansizeType/cansizeTypelist')
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// printingsystem list
export function PringtingsystemList() {
  return axios.get(Url + '/printingsystem/printinglist')
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//coatingsystem list
export function CoatingsystemList() {
  return axios.get(Url + '/coatingsystem/coatingsystemlist')
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// create new journal tds
export function CreateNewJournal(data, Uname) {
  const d = new Date();
  var datetimes = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  //console.log(JSON.stringify(data));
  var isremarknow = "";
  if (data.TdsRemark == undefined) {
    isremarknow = "";
  }
  else {
    isremarknow = data.TdsRemark;
  }

  return axios.post(Url + '/tdsjournal/createjournal', {
    tdsRunning: data.tdsRun,
    refTDS: data.TDSref,
    docVersion: data.docVersion,
    customerName: data.customerName,
    productName: data.productName,
    filmCode: data.filmCode,
    partFile: data.partFile,
    itemId: data.ItemId,
    sheetSize: data.SheetSize,
    printingCode: data.Printing,
    coatingCode: data.Coating,
    note: data.Note,
    remark: isremarknow,
    statusFlow: "draft",
    stateFlow: "1",
    createBy: Uname,
    datetime: "",
    productGroup: 'normal'
  })
    .then(function (response) {
      // console.log(response);

    })
    .catch(function (error) {
      console.log(error);
    });
}


// update  new journal tds
export function UpdateNewJournal(data, Uname, filenames) {
  const d = new Date();
  var datetimes = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  // console.log(JSON.stringify(data));
  // console.log(filenames);
  // console.log(Uname);
  var isremarknow = "";
  if (data.remark == undefined) {
    isremarknow = "";
  }
  else {
    isremarknow = data.TdsRemark;
  }

  // console.log(data);

  return axios.post(Url + '/tdsjournal/updateByid', {
    journalId: data.journalId,
    tdsRunning: data.tdsRunning,
    refTDS: data.refTDS,
    docVersion: data.docVersion,
    customerName: data.customerName,
    productName: data.productName,
    filmCode: data.filmCode,
    partFile: filenames,
    itemId: data.itemId,
    sheetSize: data.sheetSize,
    printingCode: data.printingCode,
    coatingCode: data.coatingCode,
    note: data.note,
    remark: data.remark,
    statusFlow: "draft",
    stateFlow: "1",
    createBy: Uname,
    datetime: datetimes,
    productGroup: 'normal'
  })
    .then(function (response) {
      console.log(response);

    })
    .catch(function (error) {
      console.log(error);
    });

}


//get journal list all
export function GetjournalList() {

  //return axios.get(Url + '/tdsjournal/tsdjournalList')
  return axios.get(Url + '/tdsjournal/tdsjournalList')
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}


//get  นับจำนวน สถานะ  ทั้งหมด นำไปแสดงหน้าแรกของระบบ 
export function GetjournalStateResualtAll() {


  return axios.get(Url + '/tdsjournal/tdsResualtstateAll')
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//get journal list all
export function GetjournalListByid(id) {

  //return axios.get(Url + '/tdsjournal/tsdjournalList')
  return axios.get(Url + `/tdsjournal/tdsjournalByid/${id}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//get journal list  new ที่สร้างใหม่
export function GetjournalNew() {
  return axios.post(Url + '/tdsjournal/tdsjournalNew', {
    "stateflow": "draft"
  })
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}


//get journal list  ตาม state flow
export function Getjournalstateflow(idstate) {

  return axios.get(Url + `/tdsjournal/tdsjournalBystate/${idstate}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//get journal list  ตาม state flow เอาไว้ตรวจสอบหากมีสถานะ send
export function GetjournalstateReceive(idstate) {

  return axios.get(Url + `/tdsjournal/tdsjournalStatusSend/${idstate}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//get journal list  ตาม state flow เอาไว้ตรวจสอบหากมีสาถานะ receive
export function GetjournalstatToeSend(idstate) {

  return axios.get(Url + `/tdsjournal/tdsjournalStatusReceive/${idstate}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//get journal list  ตาม state flow เอาไว้ตรวจสอบหากมีสาถานะ reject 
export function GetjournalstatToReject(idstate) {

  return axios.get(Url + `/tdsjournal/tdsjournalStatusReject/${idstate}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}



//get journal list all
export const GetjournalByid = (id) => {
  return axios.get(Url + `/tdsjournal/tdsjournalByid/${id}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//get journal detail list all
export const GetjourtDetialClassB_Byid = (id) => {
  return axios.get(Url + `/tdsjournaldetail/tsdjournaldetailByid/${id}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//up load file
export const uplodfile = async (file) => {
  const fd = new FormData();
  fd.append('file', file);

 return fetch(Url + '/tdsjournal/uploadfile', {
    method: 'POST',
    body: fd
  })
    .then(res => res.json())
    .then(json =>{return json})
    .catch(err => console.log(err))

}


//get canting type  by code all
export const cantingsystemByCode = (id) => {

  return axios.post(Url + '/cansizeType/cansizeTypeByCode', {
    id: id,
  })
    .then(function (response) {
      // console.log(response);
      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}

//get coating type type  by code all
export const coatingtypeByCode = (id) => {

  return axios.post(Url + '/coatingType/CoatingBycode', {
    id: id,
  })
    .then(function (response) {
      // console.log(response);
      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}

//get cansizetype type  by property
export const cansizeTypeByProperty = (id) => {

  return axios.post(Url + '/cansizeType/cansizeTypeByProperty', {
    id: id,
  })
    .then(function (response) {
      // console.log(response);
      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}

//get cansizetype type  by Code
export const cansizeTypeByCode = (id) => {

  return axios.post(Url + '/cansizeType/cansizeTypeByCode', {
    id: id,
  })
    .then(function (response) {
      // console.log(response);
      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}

// insert data  part B 

export const insertdatajournalClassB = (data) => {

  // console.log(data)
  return axios.post(Url + '/tdsjournaldetail/createjournaldetail', {
    "journalId": data.journalId,
    "tdsRunning": data.tdsRunning,
    "side_1th": "",
    "color_1th": "",
    "fmCode_1th": "",
    "dfw_1th": "",
    "temp_1th": "",
    "Speed_1th": "",

    "side_2th": data.side_th2,
    "color_2th": data.colorshade_th2,
    "fmCode_2th": data.fmcode_th2,
    "dfw_2th": data.dfw_th2,
    "lacq_2th": data.lacq_th2,
    "temp_2th": data.temp_th2,
    "Speed_2th": data.speed_th2,
    "rubber_2th": data.rubber_th2,

    "side_3th": data.side_th3,
    "color_3th": data.colorshade_th3,
    "fmCode_3th": data.fmcode_th3,
    "dfw_3th": data.dfw_th3,
    "lacq_3th": data.lacq_th3,
    "temp_3th": data.temp_th3,
    "Speed_3th": data.speed_th3,
    "rubber_3th": data.rubber_th3,

    "side_4th": data.side_th4,
    "color_4th": data.colorshade_th4,
    "fmCode_4th": data.fmcode_th4,
    "dfw_4th": data.dfw_th4,
    "lacq_4th": data.lacq_th4,
    "temp_4th": data.temp_th4,
    "Speed_4th": data.speed_th4,
    "rubber_4th": data.rubber_th4,

    "side_5th": data.side_th5,
    "color_5th": data.colorshade_th5,
    "fmCode_5th": data.fmcode_th5,
    "dfw_5th": data.dfw_th5,
    "lacq_5th": data.lacq_th5,
    "temp_5th": data.temp_th5,
    "Speed_5th": data.speed_th5,
    "rubber_5th": data.rubber_th5,

    "side_6th": data.side_th6,
    "color_6th": data.colorshade_th6,
    "fmCode_6th": data.fmcode_th6,
    "dfw_6th": data.dfw_th6,
    "temp_6th": data.temp_th6,
    "Speed_6th": data.speed_th6,

    "side_7th": data.side_th7,
    "color_7th": data.colorshade_th7,
    "fmCode_7th": data.fmcode_th7,
    "dfw_7th": data.dfw_th7,
    "lacq_7th": data.lacq_th7,
    "temp_7th": data.temp_th7,
    "Speed_7th": data.speed_th7,
    "rubber_7th": data.rubber_th7
  })
    .then(function (response) {
      // console.log(response);
      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}


export const Update_tdatajournalClassB = (data) => {
  // console.log(data);

  return axios.post(Url + '/tdsjournaldetail/updateByid', {
    "journalId": data.journalId,
    "tdsRunning": data.tdsRunning,
    "side_1th": "",
    "color_1th": "",
    "fmCode_1th": "",
    "dfw_1th": "",
    "temp_1th": "",
    "Speed_1th": "",

    "side_2th": data.side_th2,
    "color_2th": data.colorshade_th2,
    "fmCode_2th": data.fmcode_th2,
    "dfw_2th": data.dfw_th2,
    "lacq_2th": data.lacq_th2,
    "temp_2th": data.temp_th2,
    "Speed_2th": data.speed_th2,
    "rubber_2th": data.rubber_th2,

    "side_3th": data.side_th3,
    "color_3th": data.colorshade_th3,
    "fmCode_3th": data.fmcode_th3,
    "dfw_3th": data.dfw_th3,
    "lacq_3th": data.lacq_th3,
    "temp_3th": data.temp_th3,
    "Speed_3th": data.speed_th3,
    "rubber_3th": data.rubber_th3,

    "side_4th": data.side_th4,
    "color_4th": data.colorshade_th4,
    "fmCode_4th": data.fmcode_th4,
    "dfw_4th": data.dfw_th4,
    "lacq_4th": data.lacq_th4,
    "temp_4th": data.temp_th4,
    "Speed_4th": data.speed_th4,
    "rubber_4th": data.rubber_th4,

    "side_5th": data.side_th5,
    "color_5th": data.colorshade_th5,
    "fmCode_5th": data.fmcode_th5,
    "dfw_5th": data.dfw_th5,
    "lacq_5th": data.lacq_th5,
    "temp_5th": data.temp_th5,
    "Speed_5th": data.speed_th5,
    "rubber_5th": data.rubber_th5,

    "side_6th": data.side_th6,
    "color_6th": data.colorshade_th6,
    "fmCode_6th": data.fmcode_th6,
    "dfw_6th": data.dfw_th6,
    "temp_6th": data.temp_th6,
    "Speed_6th": data.speed_th6,

    "side_7th": data.side_th7,
    "color_7th": data.colorshade_th7,
    "fmCode_7th": data.fmcode_th7,
    "dfw_7th": data.dfw_th7,
    "lacq_7th": data.lacq_th7,
    "temp_7th": data.temp_th7,
    "Speed_7th": data.speed_th7,
    "rubber_7th": data.rubber_th7,
  })
    .then(function (response) {
      // console.log(response);
      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}

// running number tds 
export const RunningnumberByyear = (id) => {
  return axios.get(Url + `/tdsrunning/tdsrunningByid/${id}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// running number tds 
export const RunningUpdate = (idrun, upstate) => {
  console.log(idrun, upstate)
  return axios.post(Url + `/tdsrunning/updateByid`, {
    TdsRunning: upstate,
    runid: idrun
  })
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// สร้างสถานะ flow status ตาม ผู้ใช้งานและแผนก
export const Statusflow = (tdsRunning, byUser, statusFlow, depCode, revision) => {
  const d = new Date();
  var datetimes = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  return axios.post(Url + `/statusWorkflow/createstatusWorkflow`, {
    "tdsRunning": tdsRunning,
    "byUser": byUser,
    "statusFlow": statusFlow,
    "docVersion": revision,
    "depCode": depCode,
    "datetime": datetimes
  })
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}


//update หน้า prepress
export const journalUpdateStatusByid = (journalId, Statusflow, stateFlow) => {
  // console.log(idrun,upstate)
  return axios.post(Url + `/tdsjournal/updateStatusByid`, {
    "journalId": journalId,
    "statusFlow": Statusflow,
    "stateFlow": stateFlow
  })
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

//update หน้า RD และ mf1 
export const journalUpdateStatusEdit = (journalId, Statusflow, stateFlow, sheetSize, productGroup, remarked) => {
  // console.log(idrun,upstate)
  return axios.post(Url + `/tdsjournal/updateProductByid`, {
    "journalId": journalId,
    "statusFlow": Statusflow,
    "stateFlow": stateFlow,
    "sheetSize": sheetSize,
    "productGroup": productGroup,
    "remarks": remarked
  })
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// tds workflow status 
export const statusworkflowByrunning = (id,idverison) => {
  return axios.get(Url + `/statusWorkflow/statusWorkflowByrunning/${id}/${idverison}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// get lacquers list 
export const lacquerslistall = (id) => {
  return axios.get(Url + `/Lacquers/LacquersList`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}
//  /tokenline/tokenlineBydepartment/:id

// send line by department
export const LinesendBydepartment = (messeng) => {

  const codedepart = sessionStorage.getItem('Udepcode');

  return axios.post(Url + `/tokenline/tokenlineBydepartment`, {
    message: messeng,
    codedep: codedepart
  })
    .then(function (response) {

      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

export const AddconventoinalInk = (data) => {
  console.log(data);
  return axios.post(Url + `/conventionalInk/addconventionalInk`,
    {
      "color_unit1": data.color_unit1,
      "color_unit2": data.color_unit2,
      "color_pt": data.color_pt,
      "fmc_unit1": data.fmc_unit1,
      "fmc_unit2": data.fmc_unit2,
      "fmc_pt": data.fmc_pt,
      "thick_unit1": data.thick_unit1,
      "thick_unit2": data.thick_unit2,
      "thick_pt": data.thick_pt,
      "temp_unit1": data.temp_unit1,
      "temp_unit2": data.temp_unit2,
      "temp_pt": data.temp_pt,
      "speed_unit1": data.speed_unit1,
      "speed_unit2": data.speed_unit2,
      "speed_pt": data.speed_pt,
      "sequence": data.sequence,
      "tdsRunning": data.tdsRunning
    })
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })


}

// tds workflow status 
export const getconventionalInk = (id) => {
  return axios.get(Url + `/conventionalInk/findById/${id}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}
// getdataDuplicate /// เข้าไปดึงข้อมูลเพื่อว่าหน้า duplicate 
//localhost:3005/api/v1/tdsjournal/getjournalDetailByid/28
export const getjournalDetailByid = (id) => {
  return axios.get(Url + `/tdsjournal/getjournalDetailByid/${id}`)
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}

// ตรวจสอบว่าเอกสาร revision ล่าสุด

export const getRevisionLast = (data) => {
 // console.log(data);
  return axios.post(Url + `/tdsjournal/revisionlast`,
    {
      "docNumber":data,
    })
    .then(function (response) {
      // console.log(response.data)
      return response.data;
    })
    .catch(function (error) {

      console.log(error);
    })
}


// get Cansize sheet all------------->

export const get_CanSheetAll=()=>{
  return axios.get(Url + `/cansizeType/cansizeTypelist`)
  .then(function (response) {
    // console.log(response.data)
    return response.data;
  })
  .catch(function (error) {

    console.log(error);
  })
}

export const get_CanSheetByid=(id)=>{
  return axios.get(Url + `/cansizeType/cansizeTypeById/${id}`)
  .then(function (response) {
    // console.log(response.data)
    return response.data;
  })
  .catch(function (error) {

    console.log(error);
  })
}

//insert new cansizeType
export const post_Cansheet=(data)=>{
//  console.log(data)
  return axios.post(Url + `/cansizeType/createCansizeType`,
  {
    cansize:data.cansize,
    sheetsize:data.sheetsize,
    rubber:data.rubber,
    property:data.property,
    cancode:data.cancode,
    widths:data.widths,
    lengths:data.Height
  })
  .then(function (response) {
     console.log(response.data)
    return response.data;
  })
  .catch(function (error) {

    console.log(error);
  })
}

//delete cansizetype
export const deleteCansize=(id)=>{
  return axios.get(Url + `/cansizeType/deleteByid/${id}`)
  .then(function (response) {
    // console.log(response.data)
    return response.data;
  })
  .catch(function (error) {

    console.log(error);
  })
}

//insert new cansizeType
export const put_Cansheet=(data)=>{
 //   console.log(data);
    return axios.post(Url + `/cansizeType/updateByid`,
    {
      cansizeId:data.cansizeId,
      cansize:data.cansize,
      sheetsize:data.sheetsize,
      rubber:data.rubber,
      property:data.property,
      cancode:data.cancode,
      widths:data.widths,
      lengths:data.lengths
    })
    .then(function (response) {
       console.log(response.data)
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  //end --->

  // get Codecolors
  //insert new Header Code color
export const post_Codecolor=(data)=>{
    //console.log(data)
    return axios.post(Url + `/codecolors/createColor`,
    {
      tdsRunning:data.docId,
      codeColors:data.codeName,
      remarks:data.remarks,
      docVersion:data.docVersion
    })
    .then(function (response) {
       console.log(response.data)
      return response.data;
    })
    .catch(function (error) {
  
      console.log(error);
    })
  }

    //insert new Header Code color detail
export const post_CodecolorDetail=(data,codeColor,docversions)=>{
  // console.log(data)
  const dataAll={
    tdsRunning:data.docId,
    codeColors:codeColor,
    inkName:data.inkName,
    formulates:data.formulate,
    Kgs:data.kg,
    docVersion:docversions
  }
  
  return axios.post(Url + `/codecolordetail/createColor`,dataAll)
  .then(function (response) {
     console.log(response.data)
    return response.data;
  })
  .catch(function (error) {

    console.log(error);
  })
}


export const get_CodecolorH=(coderun,docVersion)=>{
  // console.log(data)
  const dataAll={
    coderun:coderun,
    docVersion:docVersion
  }
  
  return axios.post(Url + `/codecolors/codeColorByRunning`,dataAll)
  .then(function (response) {
    //  console.log(response.data)
    return response.data;
  })
  .catch(function (error) {

    console.log(error);
  })
}
export const get_CodecolorD=(coderun,docVersion)=>{
  // console.log(data)
  const dataAll={
    coderun:coderun,
    docVersion:docVersion
  }
  
  return axios.post(Url + `/codecolordetail/codecolorByRunning`,dataAll)
  .then(function (response) {
    //  console.log(response.data)
    return response.data;
  })
  .catch(function (error) {

    console.log(error);
  })
}