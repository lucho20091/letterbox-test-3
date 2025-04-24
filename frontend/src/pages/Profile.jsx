import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ProfileData from '../components/single-profile-page/ProfileData'
import MoviesProfile from '../components/single-profile-page/MoviesProfile'
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
export default function Profile(){
    const [profile, setProfile] = useState(null)
    const [reviews, setReviews] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { username } = useParams()
    useEffect(() => {
        const fetchProfile = async () => {  
            try{
                setLoading(true)
                const response = await fetch(`/api/profile/${username}`, {
                    credentials: 'include'
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch profile')
                }
                const data = await response.json()
                const { user, MoviesRated } = data
                setProfile(user)
                setReviews(MoviesRated)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [username])

    async function fetchWatchlist(){
        try{
            const response = await fetch(`/api/watchlist/${username}`, {
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Failed to fetch watchlist')
            }
            const data = await response.json()
            setWatchlist(data)
        } catch (error){
            console.error(error)
        }
    }
    useEffect(() => {
        fetchWatchlist()
    }, [username])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
    
    return (
        <div className="grow">
            <div className="container mx-auto p-4">
                <div className="pt-0 md:pt-8">
                    <ProfileData profile={profile} reviews={reviews} watchlist={watchlist} />
                </div>
                <MoviesProfile profile={profile} reviews={reviews} watchlist={watchlist} fetchWatchlist={fetchWatchlist}/>
            </div>
            <ToastContainer />
        </div>
    )
}