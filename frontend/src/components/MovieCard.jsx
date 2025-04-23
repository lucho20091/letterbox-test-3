import { useNavigate } from 'react-router-dom'
import { IoTrash, IoTrashOutline } from 'react-icons/io5'
export default function MovieCard({ movie, type = 'movie', addToWatchList, deleteFromWatchlist, userAuthenticated, profile}) {
    const navigate = useNavigate()
    return type === 'movie' ? (
        <div 
            className="group cursor-pointer"
            onClick={() =>  navigate(`/movie/${movie.slug}`) }
        >  
            <div 
                className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl 
                aspect-[2/3] sm-aspect-[2/3]"
                >
                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                        <h2 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2 line-clamp-2 text-center">{movie.title}</h2>
                    </div>
                </div>
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center space-x-1 bg-black/50
                backdrop-blur-xs px-1 sm:px-2 py-1 sm:py-2 rounded-lg group-hover:backdrop-blur-3xl">
                    {Array.from({ length: Math.floor(movie.rating/2)}).map((_, index) => (
                        <span key={index} className="text-yellow-500 text-base sm:text-xl group-hover:text-yellow-300">★</span>
                    ))}
                    <span className="text-sm sm:text-lg font-semibold text-white group-hover:font-bold">{movie.rating/2}/5</span>
                </div>
            </div>
        </div>
    ) : type === 'watchlist' ? (
        <div className="group cursor-pointer">  
        <div  className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl 
            aspect-[2/3] sm-aspect-[2/3]">
            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                    <h2 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2 line-clamp-2 text-center">{movie.title}</h2>
                </div>
            </div>
            {userAuthenticated && userAuthenticated?.username === profile?.username && <button className="absolute top-2 right-2 bg-red-600 px-1 md:px-2 py-1 text-white rounded-sm flex items-center gap-1 hover:bg-red-700 transition-all duration-300" onClick={(e) => deleteFromWatchlist(movie.imdbID, e)}>
                <IoTrashOutline />
                <span className="text-sm">Delete</span>
            </button>}
        </div>
    </div>
    ) : type === 'watchlist-page' ? (
        <div className="group cursor-pointer">  
        <div  className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl 
            aspect-[2/3] sm-aspect-[2/3]">
            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                    <h2 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2 line-clamp-2 text-center">{movie.title}</h2>
                </div>
            </div>
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                <img src={movie.userImage} alt={movie.username} className="w-10 h-10 rounded-full" />
            </div>
        </div>
    </div>
    ) : type === 'search' ? (
        <div className="group cursor-pointer" onClick={() => addToWatchList(movie)}>  
        <div  className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl 
            aspect-[2/3] sm-aspect-[2/3]">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                    <h2 className="text-sm sm:text-xl font-semibold text-white mb-1 sm:mb-2 line-clamp-2 text-center">{movie.Title} {movie.Year.substring(0,4)}</h2>
                </div>
            </div>
        </div>
    </div>
    ) : null
}
