import { createSlice } from '@reduxjs/toolkit'
const oject={
color_unit1: "",color_unit2: "",color_pt: "",
fmc_unit1: "",fmc_unit2: "",fmc_pt: "",
thick_unit1: "",thick_unit2: "",thick_pt: "",
temp_unit1: "",temp_unit2: "",temp_pt: "",
speed_unit1: "",speed_unit2: "",speed_pt: "",
sequence:"",tdsRunning:""}
const initialState = {
    list1: [oject],
    list2: [oject],
    list3: [oject],
    list4: [oject],
    list5: [oject],
    list6: [oject],
    list7: [oject],
  }
  
export const conventionnalinkSlice = createSlice({
  name: 'conventionnalink',
  initialState,
  reducers: {
    AddInkpart1: (state,action) => {
      state.list1=action.payload
    },
    AddInkpart2: (state,action) => {
      state.list2=action.payload
    },
    AddInkpart3: (state,action) => {
      state.list3=action.payload
    },
    AddInkpart4: (state,action) => {
      state.list4=action.payload
    },
    AddInkpart5: (state,action) => {
      state.list5=action.payload
    },
    AddInkpart6: (state,action) => {
      state.list6=action.payload
    },
    AddInkpart7: (state,action) => {
      state.list7=action.payload
    },
    RemoveAllpart: (state,action) => {
      state.list1=[oject]
      state.list2=[oject]
      state.list3=[oject]
      state.list4=[oject]
      state.list5=[oject]
      state.list6=[oject]
      state.list7=[oject]
    }
  },

})

// Action creators are generated for each case reducer function
export const { AddInkpart1,AddInkpart2,AddInkpart3,AddInkpart4,AddInkpart5,AddInkpart6,AddInkpart7,RemoveAllpart } = conventionnalinkSlice.actions

export default conventionnalinkSlice.reducer