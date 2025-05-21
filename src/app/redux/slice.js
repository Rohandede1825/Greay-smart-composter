const { createSlice, nanoid, current, createAsyncThunk } = require("@reduxjs/toolkit");


let initialState = {
  users:[] ,//....if no data initially
  userAPIData: [],
  //users: JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [],
 
}

export const fetchApiUsers = createAsyncThunk("fetchApiUsers", async () => {
  // console.log("Action called" )
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  return result.json();
});

const Slice = createSlice({
  name: "addUserSlice",
  initialState,
  reducers: {
   
    addUser: (state, action) => {
      const data = {
        id: nanoid(),
        name: action.payload[0],
    
      }
      state.users.push(data);
      let userData = JSON.stringify(current(state.users));
    
     // localStorage.setItem('users', userData)
    },

    removeUser: (state, action) => {
      const data = state.users.filter((item) => {
        return item.id !== action.payload
      })
      state.users = data;
      let userdata = JSON.stringify((data));
      localStorage.setItem('users', userdata)
      //localStorage.clear();
    },

updateUser: (state, action) => {
      const updatedData = { name: action.payload[1]};
      state.users = action.payload[1];
    },




    addinitialData: (state, action) => {
    },

    getReduxData: (state, action) => {
   // console.log(initialState.users)

    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiUsers.fulfilled, (state, action) => {
      // console.log("reducer call", action);
      state.isloading = false,
        state.userAPIData = action.payload
      
    })

  }
});
export const { addUser, removeUser,updateUser,addinitialData,getReduxData } = Slice.actions;
export default Slice.reducer