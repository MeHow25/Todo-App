import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000'}),
    endpoints: builder => ({
        getTasks: builder.query({
            query: () => '/all_tasks'
        }),
        updateTask: builder.mutation({
            query: taskToUpdate => ({
                url: '/status',
                method: 'POST',
                body: taskToUpdate
            })
        })
    })
});

export const { useGetTasksQuery, useUpdateTaskMutation } = apiSlice