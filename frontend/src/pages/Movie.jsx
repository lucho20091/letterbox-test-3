import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import MainCard from '../components/movie-page/MainCard'
import ReviewForm from '../components/movie-page/ReviewForm'
import MovieComments from '../components/movie-page/MovieComments'
import { AuthContext } from '../contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '../components/Loading'
export default function Movie() {
    const { slug } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [comments, setComments] = useState([])
    const [formData, setFormData] = useState({
        username: '',
        image: '',
        comment: '',
        rating: '10',
        movieSlug: slug
    })
    const navigate = useNavigate()
    const { userAuthenticated, loading: userLoading } = useContext(AuthContext)
    // Fetch movie
    useEffect(() => {
        const fetchMovie = async () => {
            try{
                const response = await fetch(`http://localhost:3000/api/movies/${slug}`)
                if (!response.ok) {
                    throw new Error('Movie not found')
                }
                const data = await response.json()
                setMovie(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }, [slug])
    // Fetch comments
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/comments/${slug}`, {
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Comments not found')
            }
            const data = await response.json()
            setComments(data)
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        fetchComments()
    }, [slug])
    // fetch user
    useEffect(() => {
        if (!userLoading && userAuthenticated){
            setFormData(prev => ({...prev, username: userAuthenticated.username, image: userAuthenticated.image}))
        }
    }, [userLoading, userAuthenticated])

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/comments/${slug}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error('Failed to submit comment')
            }
            const data = await response.json()
            fetchComments()  
            toast.success('Comment submitted successfully')
        } catch (error) {
            setError(error)
            toast.error('Failed to submit comment')
        }
    }

    const handleCommentDelete = (deleteCommentId) => {
        setComments(comments.filter(comment => comment._id !== deleteCommentId))
    }

    if (loading) {
        return <Loading />
    }

    if (!movie) {
        return <div>Movie not found</div>
    }

    return (
        <div className='grow'>
            <div className="container mx-auto p-4">
                <div className="pt-0 md:pt-8">
                    <button onClick={() => navigate(-1)} className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95 group">
                        <svg
                            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                        </svg>
                        <span className="group-hover:font-semibold transition-all duration-300">Back to Movies</span>
                    </button>
                    <MainCard movie={movie} comments={comments} />
                    <ReviewForm 
                        userAuthenticated={userAuthenticated}
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    <MovieComments comments={comments} fetchComments={fetchComments} />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
