import {createSlice} from '@reduxjs/toolkit'

const initialAdminState={
    admin:localStorage.getItem('admin')?JSON.parse(localStorage.getItem('admin')):null,
    loading:false,
    error:null
}

export const adminSlice=createSlice({
    name:"admin",
    initialAdminState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload
            localStorage.setItem('admin',JSON.stringify(action.payload))
        },
        logout:(state)=>{
           state.user=null 
           localStorage.removeItem('admin')
        }
    }
})

export const {login,logout}=adminSlice.actions;

export const selectAdmin=(state:any)=>state.user.user;

export default adminSlice.reducer;

