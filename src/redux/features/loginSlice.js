import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    userAll:[]
  }
  
export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    isLogin: (state,action) => {
      state.list=action.payload;
    },
    UserList: (state,action) => {
      state.userAll=action.payload;
    }
  },

})

// Action creators are generated for each case reducer function
export const { isLogin,UserList} = loginSlice.actions
export const selectUserAll = (state) => state.loginUser.userAll;
export default loginSlice.reducer