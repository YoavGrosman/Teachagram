import { useState, useContext } from 'react'
import FirebaseContext from '../context/firebase'

export default function NewPostForm({ userId }) {

    const [newPhoto, setNewPhoto] = useState('');
    const [error, setError] = useState('')
    const types = ['image/png', 'image/jpeg']

    const { firebase } = useContext(FirebaseContext)

    const newPhotoHandler = async (event) => {
        event.preventDefault();
        const photo = event.target.files[0];

        if (photo && types.includes(photo.type) && window.confirm("Upload new image to your profile?")) {
            const storageRef = await firebase.storage().ref(photo.name);

            // Upload to Firestorage
            storageRef.put(photo).on('state_changed', (snap) => { }, (err) => { },
                async () => {
                    const url = await storageRef.getDownloadURL();

                    // Add new item to photos 
                    await firebase
                        .firestore()
                        .collection('photos')
                        .add({
                            caption: 'Hello is it you?',
                            userId: userId,
                            photoId: photo.name,
                            imageSrc: url,
                            userLatitude: '40.7128°',
                            userLongitude: '74.0060°',
                            likes: [],
                            comments: [],
                            dateCreated: Date.now()
                        })
                });
            setError('');
        } else {
            setError('Please choose an image file (png or jpg)');
        }
        setNewPhoto('')
    }

    return (
        <div className="grid justify-center gap-4 mx-auto mb-4">
            <form method="POST">
                <label>
                    <input
                        type="file"
                        value={newPhoto}
                        onChange={newPhotoHandler}
                        className="opacity-0" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-300 hover:text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </label>
            </form>
        </div>
    )
}