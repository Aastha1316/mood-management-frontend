import {createSlice} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState={// defines the initial state for the Redux slice.
//state contains three properties
   token:null,
   userId:null,
   tokenExpiration:null,
   isLogin:false,
}
const reduceSlice = createSlice({//function used to define the Redux slice, takes three properties
    name:'auth',//string that represents the name of the slice.
    initialState,// initial state object defined earlier
    reducers:{//object that defines the Redux reducer functions
           setAuthData(state,action){
      
           const {userId,token,tokenExpiration}=action.payload;
           state.userId=userId//assigns updated value
           state.token=token
           state.tokenExpiration=tokenExpiration
           state.isLogin=true
           
           },
           clearAuthData(state){
            
            state.userId=null;//asigns null value to clear
            state.token=null;
           state.tokenExpiration=null;
           state.isLogin=false;
           },

           
           
    },
});

export const {setAuthData,clearAuthData}=reduceSlice.actions;
export default reduceSlice.reducer;

