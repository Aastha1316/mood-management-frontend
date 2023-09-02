import {createSlice} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


 const initialState={
  allUserMoods:[]//array to store moods of each user
 };
 const moodSlice = createSlice({
    name:'mood',
    initialState,
  
    reducers:{
      setMood(state,action ){ 

        const {mood,reason}=action.payload;//This line uses object destructuring to extract the values of mood and reason properties from the action.payload
        
      },
     initialMood(state,action){
     
      state.  allUserMoods=action.payload;// setting current state to new state
    }
    

 }});


 export const {setMood, initialMood}=moodSlice.actions;
 export default moodSlice.reducer;