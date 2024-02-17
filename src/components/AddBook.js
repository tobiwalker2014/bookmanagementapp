import React, { useContext } from 'react';
import BookForm from './BookForm';
import BooksContext from '../context/BooksContext';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const { books, setBooks } = useContext(BooksContext);
  const navigate = useNavigate();

  const handleOnSubmit = (book) => {
    console.log('book', book);
    setBooks([book, ...books]);
    navigate('/');
  };

  return (
      <BookForm handleOnSubmit={handleOnSubmit} />
  );
};

export default AddBook;