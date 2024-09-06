"use client";

import MovieDetailsModal from "@/components/MovieDetailsModal";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import { Movie } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchMovies = async ({ pageParam = 1, searchQuery = "" }) => {
  const endpoint = searchQuery ? "search" : "popular";
  const params = searchQuery
    ? { search: searchQuery, page: pageParam }
    : { page: pageParam };
  const response = await axios.get(`/api/movies?action=${endpoint}`, {
    params,
  });
  return response.data;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["movies", searchQuery],
      queryFn: ({ pageParam }) => fetchMovies({ pageParam, searchQuery }),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const movies = data?.pages.flatMap((page) => page.results) || [];

  return (
    <main className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-xl font-bold mb-4">Movie Explorer</h1>
      <div className="w-64 mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading movies...</p>
        </div>
      ) : (
        <MovieList
          movies={movies}
          onMovieClick={handleMovieClick}
          onLoadMore={fetchNextPage}
          hasMore={!!hasNextPage}
          isLoadingMore={isFetchingNextPage}
        />
      )}
      {selectedMovie && (
        <MovieDetailsModal
          movieId={selectedMovie.id}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
