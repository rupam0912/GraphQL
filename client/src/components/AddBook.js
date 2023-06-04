import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_BOOK_MUTATION,
  GET_AUTHORS_QUERY,
  GET_BOOKS_QUERY,
} from "../queries/queries";

const AddBook = () => {
  const authorsRes = useQuery(GET_AUTHORS_QUERY);
  const [addBook, addBookRes] = useMutation(ADD_BOOK_MUTATION);
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const displayAuthors = () => {
    if (authorsRes?.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return authorsRes?.data?.authors?.map((author) => {
        return (
          <option key={author?.id} value={author?.id}>
            {author?.name}
          </option>
        );
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: formData.name,
        genre: formData.genre,
        authorId: formData.authorId,
      },
      refetchQueries: [{ query: GET_BOOKS_QUERY }],
    });
  };

  return (
    <form id="add-book" onSubmit={handleFormSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) =>
            setFormData({ ...formData, authorId: e.target.value })
          }
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
