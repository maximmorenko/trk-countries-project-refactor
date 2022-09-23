import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk(
    '@@details/load-country-by-name',
    (name, {extra: {client, api}}) => {
      return client.get(api.searchByCountry(name));
    }
    // из UI ждем название страны, и достаем из екстра аксиос под именем клиент и апи
);

export const loadNeighborsByBorder = createAsyncThunk(
    '@@details/load-neighbors',
    (borders, {extra: {client, api}}) => {
        return client.get(api.filterByCode(borders));
    }
    // из UI ждем бордеры, и достаем из екстра аксиос под именем клиент и апи
);

const initialState = {
    currentCountry: null,
    neighbors: [],
    status: 'idle',
    error: null,
}

const detailsSlice = createSlice({
    name: '@@details',
    initialState,
    reducers: {
        clearDetails: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // добавим кейсы с названиями пендинг реджектид и фулфилд
            .addCase(loadCountryByName.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            
            .addCase(loadCountryByName.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error;
                // если в пейлоаде пусто то берем из мета
            })
            .addCase(loadCountryByName.fulfilled, (state, action) => {
                state.status = 'idle';
                state.currentCountry = action.payload.data[0]; 
                // так как работаем с axios то в пейлоаде обращаемся к первому элементу дата за данными
            })
            .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
                state.neighbors = action.payload.data.map(country => country.name)
                // так как там приходит массив стран в виде объекта, а нам нужны только названия, то обработаем их мапом
            })
    },

});

export const {clearDetails} = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

//selectors
export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
