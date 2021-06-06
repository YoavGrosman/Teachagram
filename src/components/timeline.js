import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton';
import Post from './post';
import NewPostForm from './newPostForm'
import usePhotos from '../hooks/use-photos';
import useUser from '../hooks/use-user'
import FirebaseContext from '../context/firebase'

export default function Timeline() {

    const {
        user: { userId, username }
    } = useUser();

    const { photos, setPhotos } = usePhotos();

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

                    const { id } = await firebase
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

                    const newPhoto = {
                        caption: 'Hello is it you?',
                        comments: [],
                        likes: [],
                        docId: id,
                        imageSrc: url,
                        userLatitude: '40.7128°',
                        userLongitude: '74.0060°',
                        username: username,
                        userId: userId,
                        photoId: photo.name,
                        userLikedPhoto: false,
                        dateCreated: Date.now()
                    }
                    setPhotos([newPhoto, ...photos])
                });
            setError('');
        } else {
            setError('Please choose an image file (png or jpg)');
        }
    }

    return (
        <div className="container col-span-2">
            <NewPostForm newPhotoHandler={newPhotoHandler} />
            {!photos ? (
                <>
                    <Skeleton count={4} height={400} width={560} class="mb-5" />
                </>
            ) : photos?.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content}></Post>)
            ) : (
                <h1>No Photos for you!</h1>
            )}
        </div>
    )
}