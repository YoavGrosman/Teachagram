export default function NewPostForm({ newPhotoHandler }) {
    return (
        <div className="grid justify-center gap-4 mx-auto mb-4">
            <form method="POST">
                <label>
                    <input
                        type="file"
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