import {createSlice} from '@reduxjs/toolkit'

// interface userData{
//     email:string;
//     password:string;
// }

const initialState={
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')as string):null,
    loading:false,
    error:null,
    value:0
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        logout:(state)=>{
           state.user=null 
           localStorage.removeItem('user')
        },
    }
})



export const {login,logout}=userSlice.actions;

export const selectUser=(state:any)=>state.user.user;

export default userSlice.reducer;

