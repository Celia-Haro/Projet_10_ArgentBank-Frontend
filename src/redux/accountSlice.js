import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedAccount: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload;
        },
        clearSelectedAccount: (state) => {
            state.selectedAccount = null;
        },
    },
});

export const { setSelectedAccount, clearSelectedAccount } = accountSlice.actions;
export default accountSlice.reducer;
