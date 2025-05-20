const { createSlice, nanoid } = require("@reduxjs/toolkit")

const initialState = {
    todos: []
}

const Slice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodos: (state, action) => {
            //console.log(action);
            const data = {
                id: nanoid(),
                name: action.payload,
            }
            //console.log(data.id);
            state.todos.push(data) //holding all redux data
        },

        removeTodos: (state, action) => {
            const data = state.todos.filter((item) => {
                return item.id !== action.payload
            })

            state.todos = data;




            //localStorage.clear();
        }


    }
})
export const { addTodos, removeTodos } = Slice.actions;
export default Slice.reducer