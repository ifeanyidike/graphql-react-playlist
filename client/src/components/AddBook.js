import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, getBooksQuery, addBookMutation } from "../queries/queries"

const AddBook = () => {
    const [name, setName] = useState("")
    const [genre, setGenre] = useState("")
    const [authorId, setAuthorId] = useState("")

    const { loading, error, data } = useQuery(getAuthorsQuery)
    //mutations
    const [addBook] = useMutation(addBookMutation)

    const submitForm = (e) => {
        e.preventDefault();

        addBook({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })

    }

    return (
        <form className="addbook" onSubmit={submitForm}>
            {error && error}


            <div className="field">
                <label>Book name</label>
                <input type="text" onChange={e => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre</label>
                <input type="text" onChange={e => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author</label>

                <select onChange={e => setAuthorId(e.target.value)}>

                    {
                        loading ?
                            <option>Loading authors...</option>
                            :
                            <>
                                <option>Select Author</option>
                                {data.authors.map(author => <option value={author.id}
                                    key={author.id}>{author.name}</option>)}
                            </>
                    }

                </select>
            </div>
            <button>+</button>

        </form>
    )
}

export default AddBook
