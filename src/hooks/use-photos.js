import { useState, useContext, useEffect } from 'react'
import userContext from '../context/user'
import { getUserByUserId, getPhotos } from '../services/firebase'

export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const {
        user: { uid: userId = '' }
    } = useContext(userContext);

    useEffect(() => {
        async function getTimeLinePhotos() {
            console.log('getTimeLinePhotos')
            const [{ following }] = await getUserByUserId(userId)
            let followUserPhotos = [];

            if (following.length > 0) {
                followUserPhotos = await getPhotos(userId, following);
            }

            followUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);

            console.log('About to set Photos:', followUserPhotos)
            setPhotos(followUserPhotos);
        }

        getTimeLinePhotos();

        return () => {
            console.log('cleanup')
        }
    }, [userId]);

    return { photos, setPhotos }
}