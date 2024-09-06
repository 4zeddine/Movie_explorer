import MovieCard from "./MovieCard";
import { Movie } from "@/types";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

const MovieList = ({
  movies,
  onMovieClick,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: MovieListProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
