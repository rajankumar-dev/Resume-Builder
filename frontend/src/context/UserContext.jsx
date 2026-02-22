import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoding] = useState(true);

    useEffect(() => {
        if (user) return

        const accessToken = localStorage.getItem('token')
        if (!accessToken) {
            setLoding(false)
            return
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.auth.get_profile)
                setUser(response.data)
            } catch (error) {
                console.error('Error fetching user profile:', error)
                localStorage.removeItem('token')
            } finally {
                setLoding(false)
            }
        }

        fetchUser()

    }, []);

    const updateUser = (userData) => {
        setUser(userData)
        localStorage.setItem('token', userData.token)
        setLoding(false)
    }

    const clearUser = () => {
        setUser(null)
        localStorage.removeItem('token')
    }

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )

}