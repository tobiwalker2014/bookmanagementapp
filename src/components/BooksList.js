import React, { useContext } from 'react';
import _ from 'lodash';
import Book from './Book';
import BooksContext from '../context/BooksContext';

// This is a functional component for displaying a list of books.
const BooksList = () => {
  // We're using the useContext hook to access the books and setBooks function from our BooksContext.
  const { books, setBooks } = useContext(BooksContext);

  // This function handles the removal of a book.
  const handleRemoveBook = (id) => {
    // Confirm with the user if they really want to remove the book.
    const isConfirmed = window.confirm("Are you sure you want to remove this book?");
    // If the user confirms, filter out the book with the given id and update the books state.
    if (isConfirmed) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  // The component returns a div containing a list of Book components if there are any books, or a message if there are no books.
  return (
      <div className="book-list">
        {!_.isEmpty(books) ? (
          // If the books array is not empty, map over it and create a Book component for each book.
          // Pass the book's properties and the handleRemoveBook function as props to the Book component.
          books.map((book) => (
            <Book key={book.id} {...book} handleRemoveBook={handleRemoveBook} />
          ))
        ) : (
          // If the books array is empty, display a message prompting the user to add some books.
          <p className="message">No books available. Please add some books.</p>
        )}
      </div>
  );
};

export default BooksList;