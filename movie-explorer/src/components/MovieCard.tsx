import { Movie } from "@/types";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className="w-full h-auto rounded-lg"
      />
      <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
