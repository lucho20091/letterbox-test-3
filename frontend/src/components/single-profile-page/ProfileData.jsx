export default function ProfileData({ profile, reviews, watchlist }) {
    return (
        <div className="max-w-md mx-auto">
            <div className="flex gap-4">
                <img src={profile.image} alt={`${profile.username} profile`} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-purple-500 shadow-lg" />
                <div className="flex flex-col justify-around">
                    <h1 className="text-2xl font-bold">{profile.username}</h1>
                    <div className="flex gap-2 sm:gap-4 ">
                        <p className="text-xs sm:text-base bg-gradient-to-r from-indigo-950/90 to-violet-950/90 text-white shadow-lg p-4 font-bold rounded-lg">
                        <span className="hidden sm:inline">Movies</span> Rated: {reviews.length}</p>
                        <p className="text-xs sm:text-base bg-gradient-to-r from-indigo-950/90 to-violet-950/90 text-white shadow-lg p-4 font-bold rounded-lg">Watchlist: {watchlist.length}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
