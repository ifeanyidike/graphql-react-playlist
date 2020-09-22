import React from 'react'
import { useQuery } from "@apollo/client"
import { getBookQuery } from "../queries/queries"

const BookDetails = ({ bookId }) => {
    const { loading, error, data } = useQuery(getBookQuery,
        {
            variables:
            {
                id: bookId
            }
        })


    const displayBooks = () => {

        if (bookId == null || bookId === "undefined") {
            return <div>No book selected...</div>
        } else {
            return (
                <div>
                    <h2>{data && data.book.name}</h2>
                    <p>{data && data.book.genre}</p>
                    <p>{data && data.book.author.name}</p>
                    <p>All Books By This Author</p>
                    <ul className="other__books">
                        {data && data.book.author.books.map(item =>
                            <li key={item.id}>{item.name}</li>)}
                    </ul>
                </div>
            )

        }
    }

    return (
        <div className="bookdetails">
            <p>Output Book Details Here</p>
            { displayBooks()}
        </div>
    )
}

export default BookDetails
