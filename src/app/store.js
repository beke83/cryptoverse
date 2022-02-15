import { configureStore } from '@reduxjs/toolkit';

//connect the api to the store by the import below
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
});