import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk(
    '@@countries/load-countries',
    (_, {
        extra: {client, api},
    }) => {
        return client.get(api.ALL_COUNTRIES);
    }
);

const initialState = {
    status: 'idle',
    error: null,
    list: [],
};

export const countrySlice = createSlice({
    name: '@@countries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // создание асинхронного санка дает возможность использовать екстра редюсеры
        builder
            // добавим кейсы с названиями пендинг реджектид и фулфилд
            .addCase(loadCountries.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCountries.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error; // если в пейлоаде пусто то берем из мета
            })
            .addCase(loadCountries.fulfilled, (state, action) => {
                state.status = 'received';
                state.list = action.payload.data; // так как работаем с axios то в пейлоаде обращаемся к дата за данными
            })
    },
});

export const countryReduser = countrySlice.reducer;


// селекторы
export const selectCountriesInfo = (state) => ({
    status: state.countries.status,
    error: state.countries.error,
    qty: state.countries.list.length
})
  
export const selectAllCountries = (state) => state.countries.list;

export const selectVisibleCountries = (state, {search = '', region = ''}) => {
    return state.countries.list.filter(
        country => (
            country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)
        )
    )
}
