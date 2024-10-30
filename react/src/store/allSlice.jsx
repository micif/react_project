import { createSlice } from '@reduxjs/toolkit'
const initValue = ({ users: [] },{events:[]},{})

const sliceSlice = createSlice({
   name:"sliceSlice",
    initialState: initValue,
    reducers: {
   
        updateUsers: (state, action) => {
            state.users = action.payload
        },
        updateEvents: (state, action) => {
            state.posts = action.payload
        }
    }

})
export const { updateUsers,updateEvents } = sliceSlice.actions
export default sliceSlice.reducer