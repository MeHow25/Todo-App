import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(),
    endpoints: builder => ({
        getTasks: builder.query({
            query: () => '/all_tasks'
        }),
        addTask: builder.mutation({
            query: taskToAdd => ({
                url: '/task_add',
                method: 'POST',
                body: taskToAdd
            })
        }),
        updateTask: builder.mutation({
            query: taskToUpdate => ({
                url: '/status',
                method: 'POST',
                body: taskToUpdate
            })
        }),
        deleteAllTasks: builder.mutation({
            query: () => ({
                url: '/delete_all',
                method: 'POST'
            })
        })
    })
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteAllTasksMutation } = apiSlice