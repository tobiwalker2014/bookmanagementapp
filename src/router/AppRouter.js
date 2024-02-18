import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import AddBook from '../components/AddBook';
import BooksList from '../components/BooksList';
import useLocalStorage from '../hooks/useLocalStorage';
import BooksContext from '../context/BooksContext';
import EditBook from '../components/EditBook';

// This is the main router component for the application.
const AppRouter = () => {
  // We're using a custom hook useLocalStorage to persist the books data in the local storage.
  const [books, setBooks] = useLocalStorage('books', []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          {/* We're providing the books and setBooks function to all child components using the BooksContext.Provider */}
          <BooksContext.Provider value={React.useMemo(() => ({ books, setBooks }), [books, setBooks])}>
            {/* We're defining the routes for the application using the Routes component from react-router-dom */}
            <Routes>
              {/* The BooksList component is rendered when the user is at the root path ("/") */}
              <Route path="/" element={<BooksList />} exact={true} />
              {/* The AddBook component is rendered when the user is at the "/add" path */}
              <Route path="/add" element={<AddBook />} />
              {/* The EditBook component is rendered when the user is at the "/edit/:id" path */}
              <Route path="/edit/:id" element={<EditBook />} />
            </Routes>
          </BooksContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;