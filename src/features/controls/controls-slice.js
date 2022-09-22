import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    search: '',
    region: '',
};

export const controlsSlice = createSlice({
    name: '@@controls',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            // обращаемся к текущему стейту, к его полю серч и устанавливаем в него значение полученое из пейлоада
            state.search = action.payload
        },
        setRegion: (state, action) => {
            state.region = action.payload
        },
        clearControls: () => initialState,
    }
});

export const {setSearch, setRegion, clearControls} = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

export const selectSearch = (state) => state.controls.search;
export const selectRegion = (state) => state.controls.region;
export const selectControls = (state) => state.controls;
