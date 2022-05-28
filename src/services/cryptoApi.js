import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//these are the headers goten from coin ranking rapid api
//hecking
const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '00eee68114msh57b48093eb0004bp18728ajsna100f954f1f1'
}

// this is the base url
const baseUrl = 'https://coinranking1.p.rapidapi.com';

//function to add the url and header when you want to call any particular url
const createRequest = (url) => ({
    url,
    headers: cryptoApiHeaders
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        })
    })
});

//export the cryptos query
export const {
    useGetCryptosQuery  // a hook in redux toolkit to instantly get all the data for your query 
} = cryptoApi;
