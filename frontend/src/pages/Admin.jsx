import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
export default function Admin() {
    const { userAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()
    console.log(userAuthenticated)
    useEffect(() => {
        if (userAuthenticated && userAuthenticated?.role !== 'admin') {
            navigate('/')
        }
    }, [userAuthenticated, navigate])

    async function refreshMovies() {
        try {
            const response = await fetch('/api/movies/refresh', {
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
    return (
        <div className='grow'>
            <div className="container mx-auto p-4">
                <div className="pt-0 md:pt-8">
                    <h1 className='text-2xl font-bold mb-4 md:mb-8'>Admin Panel</h1>
                    <button onClick={() => refreshMovies()} className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95">Refresh Movies</button>
                </div>
            </div>
        </div>
    )
}
