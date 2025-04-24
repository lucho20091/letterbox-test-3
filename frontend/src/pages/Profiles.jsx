import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import ProfileCard from '../components/profiles-page/ProfileCard'
import Loading from '../components/Loading'
export default function Profiles(){
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfiles = async () => {
            try{
                setLoading(true)
                const response = await fetch('/api/profiles', {
                    credentials: 'include'
                })
                if (!response.ok) {
                    throw new Error('Failed to fetch profiles')
                }
                const data = await response.json()
                setProfiles(data)       
            } catch (error) {   
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProfiles()
    }, [])

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
                    <h1 className="text-4xl font-bold mb-2">Profiles</h1>
                    <p className="text-gray-700">Discover profiles of users who have shared their movie ratings</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 sm:gap-6 md:mt-8">
                    {profiles.map((profile) => (
                        <ProfileCard key={profile._id} profile={profile} />
                    ))}
                </div>
            </div>
        </div>
    )
}