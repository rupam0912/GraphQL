import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_QUERY } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const booksRes = useQuery(GET_BOOKS_QUERY);
  const [selectedBook, setSelectedBook] = useState(null);

  const displayBooks = () => {
    if (booksRes?.loading) {
      return <div>Loading books...</div>;
    } else {
      return booksRes?.data?.books?.map((book) => {
        return (
          <li key={book?.id} onClick={(e) => setSelectedBook(book?.id)}>
            {book?.name}
          </li>
        );
      });
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default BookList;
