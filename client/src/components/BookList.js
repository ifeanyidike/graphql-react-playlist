import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { getBooksQuery } from "../queries/queries"
import BookDetails from "./BookDetails"
const BookList = () => {
    const [selected, setSelected] = useState(null)
    const { loading, error, data } = useQuery(getBooksQuery);

    if (data && data.selected) {
        setSelected(data.books)
    }

    return (
        <div>
            {error && error}
            {
                loading ?
                    <div>Loading books...</div>
                    :
                    <ul className="book__list">
                        {data.books.map(book => <li onClick={e => setSelected(book.id)}
                            key={book.id}>{book.name}</li>)}
                    </ul>
            }

            {
                <BookDetails bookId={selected} />

            }

        </div>
    )
}

export default BookList