import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  groupcolor:[]
}

export const codeColorSlice = createSlice({
  name: 'codecolor',
  initialState,
  reducers: {
    addcolorAll: (state,action) => {
      state.value.push(action.payload);
    },
    removeColorByid:(state,action)=>{
      
      const newItem = state.value.filter((_, i) => i !== action.payload)
      // const newCartItem = state.value.filter(
      //   (item) => item.id !== action.payload.id
      // );
      state.value = newItem;
    },
    removeall:(state,action)=>{
      state.value=[];
    },
    addgroupColor:(state,action)=>{
      state.groupcolor.push(action.payload)
    },
    removeGroupColorByid:(state,action)=>{
      
      const newItem = state.groupcolor.filter((_, i) => i !== action.payload)
      // const newCartItem = state.value.filter(
      //   (item) => item.id !== action.payload.id
      // );
      state.groupcolor = newItem;
    },
    removegroupColor:(state,action)=>{
      state.groupcolor=[];
    },

    
    
  },
})

// Action creators are generated for each case reducer function
export const {addcolorAll,removeall,addgroupColor,removeColorByid,removeGroupColorByid,removegroupColor} = codeColorSlice.actions
export const selectColor=(state)=>state.codeColor.value;
export const selectGroupcolor=(state)=>state.codeColor.groupcolor;
export default codeColorSlice.reducer