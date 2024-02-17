import React, { useContext } from 'react';
import BookForm from './BookForm';
import BooksContext from '../context/BooksContext';
import { useNavigate } from 'react-router-dom';

// This is a functional component for adding a new book.
const AddBook = () => {
  // We're using the useContext hook to access the books and setBooks function from our BooksContext.
  const { books, setBooks } = useContext(BooksContext);

  // useNavigate is a hook from react-router-dom that returns a function to navigate to different routes.
  const navigate = useNavigate();

  // This function handles the form submission.
  const handleOnSubmit = (book) => {
    // Add the new book to the beginning of the books array and update the books state.
    setBooks([book, ...books]);

    // Navigate back to the home page.
    navigate('/');
  };

  // The component returns a BookForm component with the handleOnSubmit function passed as a prop.
  return (
      <BookForm handleOnSubmit={handleOnSubmit} />
  );
};

export default AddBook;