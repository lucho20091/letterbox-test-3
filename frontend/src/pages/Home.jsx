import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
export default function Home() {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/movies', {
                    credentials: 'include'
                })
                const data = await response.json()
                setMovies(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div className='grow'>
            <div className="container mx-auto p-4">
                <div className="pt-0 md:pt-8">
                    <h1 className="text-4xl font-bold mb-2">Movies</h1>
                    <p className="text-gray-700">Discover and rate your favorite films</p>
                </div>
                <div className="grid py-4 md:py-8 gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {movies && movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    )
}

