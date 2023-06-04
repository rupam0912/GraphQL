import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_DETAILS } from "../queries/queries";

const BookDetails = (props) => {
  const bookRes = useQuery(GET_BOOK_DETAILS, {
    variables: {
      id: props.bookId,
    },
  });

  const displayBookDetails = () => {
    const book = bookRes?.data?.book;
    if (book) {
      return (
        <div>
          <h2>{book?.name}</h2>
          <p>{book?.genre}</p>
          <p>{book?.author?.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book?.author?.books?.map((item) => {
              return <li key={item.id}>{item?.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>{!props.bookId ? `No book selected...` : "Loading..."}</div>;
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
