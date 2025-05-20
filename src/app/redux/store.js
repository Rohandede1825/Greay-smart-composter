const { configureStore } = require("@reduxjs/toolkit");
import userReducers from './slice'
import todoReducer from './slice2'
//import reducer from './slice'
export const store = configureStore({
    reducer: {
        userData: userReducers,
        todasData: todoReducer
    }
})  