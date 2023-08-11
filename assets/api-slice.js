// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8000'}),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        // The `getPosts` endpoint is a "query" operation that returns data
        getTasks: builder.query({
            // The URL for the request is '/fakeApi/posts'
            query: () => '/all_tasks'
        })
    })
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetTasksQuery } = apiSlice