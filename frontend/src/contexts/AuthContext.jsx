import { createContext, useState, useEffect } from 'react'
import getUser from '../helpers/getUser'

export const AuthContext = createContext({ userAuthenticated: null, loading: true})

export const AuthProvider = ({ children }) => {
    const [userAuthenticated, setUserAuthenticated] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser()
                setUserAuthenticated(user)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])
    


return (
    <AuthContext.Provider value={{ userAuthenticated, loading }}>
        {children}
    </AuthContext.Provider>
)   
}

