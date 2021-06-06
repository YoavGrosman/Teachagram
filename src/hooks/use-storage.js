import { useState, useContext, useEffect } from 'react'
import userContext from '../context/user'
import { getUserByUserId, postNewPost } from '../services/firebase'

export default function useStorage(file) {
    const {
        user: { uid: userId = '' }
    } = useContext(userContext);

    useEffect(() => {

        const storageRef = firebase.storage().ref();
        async function postNewPost() {
            const [userId] = await getUserByUserId(userId)
        }
    }, [file])
}