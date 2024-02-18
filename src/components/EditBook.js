import React, { useContext } from 'react';
import BookForm from './BookForm';
import { useNavigate, useParams } from 'react-router-dom';
import BooksContext from '../context/BooksContext';

// This is a functional component for editing a book.
const EditBook = () => {
  // We're using the useContext hook to access the books and setBooks function from our BooksContext.
  const { books, setBooks } = useContext(BooksContext);

  // useParams is a hook from react-router-dom that returns an object of key/value pairs of URL parameters. Here we're destructuring the id from it.
  const { id } = useParams();

  // Find the book to edit from the books array.
  const bookToEdit = books.find((book) => book.id === id);

  // useNavigate is a hook from react-router-dom that returns a function to navigate to different routes.
  const navigate = useNavigate();

  // This function handles the form submission.
  const handleOnSubmit = (book) => {
    // Filter out the book that's being edited from the books array.
    const filteredBooks = books.filter((book) => book.id !== id);

    // Add the edited book to the beginning of the books array and update the books state.
    setBooks([book, ...filteredBooks]);

    // Navigate back to the home page.
    navigate('/');
  };

  // The component returns a BookForm component with the book to edit and the handleOnSubmit function passed as props.
  return (
    <div>
      <BookForm book={bookToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default EditBook;