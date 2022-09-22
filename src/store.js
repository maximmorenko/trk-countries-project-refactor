import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

import * as api from './config';
import { themeReducer } from "./features/theme/theme-slice";
import { controlsReducer } from "./features/controls/controls-slice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        controls: controlsReducer,
    },
    devTools: true,
    // воспользуемся екстрааргументом, установим в нем клиента и апи, чтобы дергать их в любом месте
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axios,
                api,
            },
        },
        serializableCheck: false, // отключаем проверку на сериализацию, чтобы не было проблем с axios
    })
});
