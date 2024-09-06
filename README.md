# Movie Explorer

Movie Explorer is a Next.js application that allows users to browse and search for movies using the TMDB API. The app features a responsive design, infinite scrolling, and detailed movie information.

## Features

- Browse popular movies
- Search for movies by title
- Infinite scrolling for movie lists
- Detailed movie information in a modal
- Responsive design for various screen sizes

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI components
- React Query for data fetching and caching
- Axios for API requests

## Design Choices and Data Fetching Strategy

### Server-Side API Route

I implemented a server-side API route to handle requests to the TMDB API. This approach offers several benefits:

1. API key protection: The TMDB API key is kept secure on the server-side.
2. Request consolidation: All TMDB API requests are routed through a single endpoint, simplifying client-side code.
3. Flexibility: The server-side route can easily be extended to handle additional TMDB API endpoints.

The API route is implemented in `src/app/api/movies/route.ts`.

### React Query for Data Fetching and Caching

I chose React Query for data fetching and caching due to its powerful features:

1. Automatic caching: React Query caches API responses, reducing unnecessary network requests.
2. Easy pagination and infinite scrolling: The `useInfiniteQuery` hook simplifies implementing infinite scrolling.
3. Optimistic updates: React Query allows for smooth UI updates before server confirmation.
4. Background refetching: Data can be refreshed in the background for improved user experience.

React Query is used in components like `src/app/page.tsx` for fetching movie data.

### Modular Component Structure

The application is built using a modular component structure, promoting reusability and maintainability:

- `MovieList`: Renders the list of movies and handles infinite scrolling.
- `MovieCard`: Displays individual movie information in a card format.
- `MovieDetailsModal`: Shows detailed movie information in a modal.
- `SearchBar`: Allows users to search for movies.

This structure allows for easy testing and future enhancements.

### Responsive Design with Tailwind CSS

Tailwind CSS is used for styling, providing a utility-first approach that allows for rapid development and easy customization. The responsive design ensures the application looks great on various screen sizes.

### TypeScript for Type Safety

TypeScript is used throughout the project to provide type safety and improve developer experience. Custom types are defined for movie data and component props in `src/types.ts`.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add your TMDB API key: `TMDB_API_KEY=your_api_key_here`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
