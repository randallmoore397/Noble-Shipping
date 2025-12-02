'use client'

import { useEffect } from 'react'

export default function DatabaseKeepAlive() {
    useEffect(() => {
        const fetchKeepAlive = async () => {
            try {
                const response = await fetch('/api/keep-alive')
                const data = await response.json()
                console.log('Database Keep-Alive Check:', data)
            } catch (error) {
                console.error('Database Keep-Alive Failed:', error)
            }
        }

        // Run immediately on mount
        fetchKeepAlive()

        // Run every 2 hours (2 * 60 * 60 * 1000 ms)
        const intervalId = setInterval(fetchKeepAlive, 2 * 60 * 60 * 1000)

        // Cleanup interval on unmount
        return () => clearInterval(intervalId)
    }, [])

    // This component doesn't render anything visible
    return null
}
