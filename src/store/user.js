import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        userRecieved: (user, action) => {
            return action.payload;
        },
    }
});

export default userSlice.reducer;
const { userRecieved } = userSlice.actions;

// actions creators
export const recieveUser = user => userRecieved(user);
