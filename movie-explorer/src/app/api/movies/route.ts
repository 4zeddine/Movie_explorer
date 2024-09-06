import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface TMDBResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const id = searchParams.get("id");
  const search = searchParams.get("search");
  const page = searchParams.get("page") || "1";

  try {
    let url: string;
    let params: { [key: string]: string };

    switch (action) {
      case "popular":
        url = `${BASE_URL}/movie/popular`;
        params = { api_key: TMDB_API_KEY!, page };
        break;
      case "details":
        url = `${BASE_URL}/movie/${id}`;
        params = { api_key: TMDB_API_KEY! };
        break;
      case "search":
        url = `${BASE_URL}/search/movie`;
        params = { api_key: TMDB_API_KEY!, query: search!, page };
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const response = await axios.get<TMDBResponse | MovieDetails>(url, {
      params,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    return NextResponse.json(
      { error: "Error fetching data from TMDB" },
      { status: 500 }
    );
  }
}
