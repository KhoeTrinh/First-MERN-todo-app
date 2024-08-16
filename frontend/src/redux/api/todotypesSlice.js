import {apiSlice} from './apiSlice'
import { TODOTYPES_URL } from '../constants'

export const todotypeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTodotype: builder.mutation({
            query: (data) => ({
                url: TODOTYPES_URL,
                method: 'POST',
                body: data,
            }),
        }),
        updateTodotype: builder.mutation({
            query: ({data, id}) => ({
                url: `${TODOTYPES_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteTodotype: builder.mutation({
            query: (id) => ({
                url: `${TODOTYPES_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        fetchTodotypes: builder.query({
            query: () => `${TODOTYPES_URL}/todotypes`
        })
    })
})

export const {
    useCreateTodotypeMutation,
    useUpdateTodotypeMutation,
    useDeleteTodotypeMutation,
    useFetchTodotypesQuery,
} = todotypeSlice 