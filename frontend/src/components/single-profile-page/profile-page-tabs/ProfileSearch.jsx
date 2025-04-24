import { useState, useEffect } from "react";
import MovieCard from "../../MovieCard";
import { toast } from "react-toastify";
export default function ProfileSearch({ fetchWatchlist, username }) {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`/api/search/${search}`, {
                credentials: 'include'
            })
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error searching for movies:", error);
        }
    };  

    const addToWatchList = async (movie) => {
        try{
            const response = await fetch(`/api/watchlist`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    imdbID: movie.imdbID,
                    image: movie.Poster,
                    title: movie.Title
                })
            })
            if (response.ok){
                toast.success('Movie added to watchlist');
                fetchWatchlist();
            } else {
                toast.error('Failed to add movie to watchlist');
            }
        } catch (error) {
            console.error("Error adding movie to watchlist", error);
            toast.error("Error adding movie to watchlist");
        }
    }


    
    return (
        <div className="py-4 md:py-8">
            <form 
            onSubmit={handleSearch}
            className="max-w-md mx-auto bg-gradient-to-r from-indigo-950 to-violet-950 text-white shadow-lg p-4 rounded-lg flex items-center justify-between gap-2">
                <input 
                    type="text" 
                    placeholder="Search for a movie" 
                    className="w-full p-2 rounded-lg bg-indigo-800 rounded-lg text-white placeholder-indigo-500 transition-all duration-300 focus:outline-none" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="title"
                />
                <button 
                className="py-2 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-500 hover:to-violet-500">
                        <span className="group-hover:font-semibold transition-all duration-300">Search</span>
                    </button>
            </form>
            {movies.length > 0 && (
                <div className="grid py-4 md:py-8 gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {movies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} type="search" addToWatchList={addToWatchList}/>)}
                </div>
            )}
        </div>
    )
}
