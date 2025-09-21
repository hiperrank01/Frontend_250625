# Dashboard Data Fetching Review

Here are some notes and suggestions for improving the data fetching logic on the dashboard page.

## `useMutation` vs. `useQuery`

Currently, the dashboard uses a `useMutation` hook from React Query to fetch chart data when the page loads.

- **`useMutation`** is primarily designed for creating, updating, or deleting data (i.e., making changes to data on the server).
- **`useQuery`** is designed for fetching and caching data.

While it's possible to fetch data with `useMutation`, using `useQuery` is more idiomatic and provides several benefits for data fetching:

- **Automatic Refetching**: `useQuery` can automatically refetch data when the window is refocused or the network reconnects.
- **Caching**: Data is cached, so if the user navigates away and comes back, the data can be shown instantly while being refetched in the background.
- **Simpler Component Logic**: You don't need a `useEffect` and a `mutate` call to trigger the fetch. The query runs automatically when the component mounts.

### Recommendation

I recommend refactoring the code to use `useQuery` for fetching the report data. This will make the code cleaner, more idiomatic, and leverage the strengths of React Query for data fetching.

I can proceed with this refactoring if you'd like.

## API Endpoint

The API endpoint used in `fetch/dashboard/report-api.ts` is:
`/api/ncc/monthly_report/combination-chart/`

You mentioned:
`/api/ncc/mothly_report/combination-chart/`

Please double-check that the endpoint in the code is correct. It seems like there might be a typo in the one you provided (`mothly_report` vs. `monthly_report`). I have assumed the code is correct for now.

## Overall Structure

The rest of the structure looks good. The separation of the API call into a `fetch` directory, the hook into a `hooks` directory, and the component in the `app` directory follows good practices.
