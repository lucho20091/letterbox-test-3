import { AuthContext } from "../../contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import ProfileReviews from "./profile-page-tabs/ProfileReviews"
import ProfileWatchlist from "./profile-page-tabs/ProfileWatchlist"
import ProfileSearch from "./profile-page-tabs/ProfileSearch"
export default function MoviesProfile({ reviews, watchlist, profile, fetchWatchlist }) {
    const { userAuthenticated, loading: userLoading } = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState('reviews')

    return (
        <div className="mt-4 md:mt-8">
            <div className="max-w-md mx-auto">
                <button 
                onClick={() => setActiveTab('reviews')}
                className={`${activeTab === 'reviews' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-indigo-600 hover:text-indigo-400'} px-4 py-2 font-medium text-sm sm:text-lg transition-colors duration-300`}
                >Reviews</button>
                <button 
                onClick={() => setActiveTab('watchlist')}
                className={`${activeTab === 'watchlist' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-indigo-600 hover:text-indigo-400'} px-4 py-2 font-medium text-sm sm:text-lg transition-colors duration-300`}
                >Watchlist</button>
                {userAuthenticated?.username === profile.username && <button 
                onClick={() => setActiveTab('search')}
                className={`${activeTab === 'search' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-indigo-600 hover:text-indigo-400'} px-4 py-2 font-medium text-sm sm:text-lg transition-colors duration-300`}
                >Search Movies</button>}
            </div>
            {activeTab === 'reviews' && <ProfileReviews reviews={reviews} />}
            {activeTab === 'watchlist' && <ProfileWatchlist watchlist={watchlist} fetchWatchlist={fetchWatchlist} userAuthenticated={userAuthenticated} profile={profile}/>}
            {activeTab === 'search' && <ProfileSearch fetchWatchlist={fetchWatchlist} username={userAuthenticated?.username}/>}
        </div>
    )
}
