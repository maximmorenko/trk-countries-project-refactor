import { createSlice } from "@reduxjs/toolkit";


// для работы функциональности нужен слайс
// слайс нужно подключить к стору
const themeSlice = createSlice({
    name: '@@theme', // название слайса
    initialState: 'light', // стейт по умолчанию светлый 
    reducers: {
        setTheme: (_, action) => action.payload,
    }
});

// из слайса экспортируем экшны и редюсеры
export const {setTheme} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
