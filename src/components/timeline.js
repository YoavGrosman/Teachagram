import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton';
import Post from './post';
import NewPostForm from './newPostForm'
import usePhotos from '../hooks/use-photos';
import useUser from '../hooks/use-user'

export default function Timeline() {

    const { photos } = usePhotos();
    const {
        user: { userId }
    } = useUser();

    return (
        <div className="container col-span-2">
            <NewPostForm userId={userId} />
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