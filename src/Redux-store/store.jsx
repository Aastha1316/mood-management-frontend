import { configureStore } from "@reduxjs/toolkit";
import moodSlice from "./moodSlice";
import reduceSlice from "./reduceSlice";
import { useSelector } from "react-redux";

export const store =configureStore({
    reducer:{
        mood:moodSlice,
        auth:reduceSlice,

    }

});
