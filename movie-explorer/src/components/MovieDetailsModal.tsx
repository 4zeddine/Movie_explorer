import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface MovieDetailsModalProps {
  movieId: number;
  onClose: () => void;
}

const fetchMovieDetails = async (movieId: number) => {
  const response = await axios.get(`/api/movies?action=details&id=${movieId}`);
  return response.data;
};

const MovieDetailsModal = ({ movieId, onClose }: MovieDetailsModalProps) => {
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery<Movie>({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{movie?.title}</DialogTitle>
        </DialogHeader>
        {isLoading && <p>Loading movie details...</p>}
        {isError && <p>Error loading movie details.</p>}
        {movie && (
          <ScrollArea className="h-[60vh]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full mb-4 rounded"
            />
            <p className="mb-4">{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}/10</p>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsModal;
