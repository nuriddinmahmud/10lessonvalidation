import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IData } from "../../types/types";

interface IUser {
    value: IData | null
}

const initialState: IUser = {
    value: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        udpatingValues: (state, actions: PayloadAction<IData | null>) => {
            if (actions.payload == null) {
                state.value = null
            } else {
                state.value = {
                    ...state.value,
                    ...actions.payload
                }
            }
        }
    }
})

export const { udpatingValues } = userSlice.actions
export default userSlice.reducer