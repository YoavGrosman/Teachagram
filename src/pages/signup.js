import { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUsernameExists } from '../services/firebase'

export default function Signup() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext)

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const isInvalid = password === '' || emailAddress === '' || username === '' || fullName === '';

    const handleSignup = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExists(username);
        if (!usernameExists.length) {
            try {
                const createdUserResults = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);

                await createdUserResults.user.updateProfile({
                    displayName: username
                })

                await firebase.firestore().collection('users').add({
                    userId: createdUserResults.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });

                history.push(ROUTES.DASHBOARD)
            } catch (error) {
                setEmailAddress('');
                setPassword('');
                setFullName('');
                setUsername('');
                setError(error.message)
            }
        } else {
            setUsername('');
            setError('Username taken, please try another.');
        }
    }

    useEffect(() => {
        document.title = 'Sign Up - Teachagram'
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border 
                border-gray-primary rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" className="mt-2 w-6/12 mb-4" />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red text-red-primary">{error}</p>}

                    <form onSubmit={handleSignup} method="POST">
                        <input
                            aria-label="Enter Your User Name"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                        border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />
                        <input
                            aria-label="Enter Your Full Name"
                            type="text"
                            placeholder="Full Name"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                        border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input
                            aria-label="Enter Your Email Address"
                            type="text"
                            placeholder="Email Address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                        border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmailAddress(target.value)}
                            value={emailAddress}
                        />
                        <input
                            aria-label="Enter Your Password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                        border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-7 font-bold
                                    ${isInvalid && 'opacity-50'}`}
                        >Sign Up</button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white my-2 p-4 border 
            border-gray-primary rounded">
                    <p className="text-sm">Already have an account?{` `}
                        <Link to="/login" className="font-bold text-blue-medium">
                            Log In
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}