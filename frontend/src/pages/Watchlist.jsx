import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await fetch('/api/watchlist', {
                    credentials: 'include'
                })
                const data = await response.json()
                setWatchlist(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchWatchlist()
    }, [])

    const usersWatchlist = Object.keys(watchlist)


    if (loading) {
        return <Loading />
    }
    
    return (
        <div className='grow'>
            <div className="container mx-auto p-4">
                <div className="pt-0 md:pt-8">
                    <h1 className="text-4xl font-bold mb-2">Watchlist</h1>
                    <p className="text-gray-700">Keep track of the movies you want to watch</p>
                </div>
                <div className="mt-4 md:mt-8">
                    {usersWatchlist.map((user) => (
                        <div key={user} className="mb-4 md:mb-8 flex flex-col gap-4 sm:gap-6">
                            <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={() => navigate(`/profile/${user}`)}>
                                <img src={watchlist[user][0].userImage} alt={watchlist[user][0].username} className="w-10 h-10 rounded-full border-2 border-purple-400" />
                                <p className="font-bold underline underline-offset-8 decoration-purple-400">{user}</p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                                {watchlist[user].map((movie) => (
                                    <MovieCard key={movie._id} movie={movie} type="watchlist" user={user} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
