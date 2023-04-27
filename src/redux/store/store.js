import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import loginReducer  from '../features/loginSlice'
import  conventionnalinkReducer from'../features/conventionnalinkSlice';
import  codeColorReducer from'../features/codeColorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loginUser:loginReducer,
    conventionnalink:conventionnalinkReducer,
    codeColor:codeColorReducer
  },
})