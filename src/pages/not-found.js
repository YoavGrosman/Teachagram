import { useEffect } from 'react';

export default function NotFound() {

    useEffect(() => {
        document.title = '404 | Teachagram'
    }, [])
    return (
        <div className="bg-gray-background">
            <div className="mx-auto max-w-screen-large">
                <p className="text-center text-2xl">Not Found!</p>
            </div>
        </div>
    )
}