import React from 'react';
import { Button, Card } from 'react-bootstrap'; // Importing Button and Card components from react-bootstrap
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom

// This is a functional component for displaying a book.
const Book = ({
  id,
  bookname,
  author,
  price,
  quantity,
  date,
  handleRemoveBook // These are the props that the component receives.
}) => {
  const navigate = useNavigate(); // useNavigate is a hook from react-router-dom that returns a function to navigate to different routes.

  // The component returns a Card component from react-bootstrap with the book details and Edit and Delete buttons.
  return (
    <Card style={{ width: '18rem' }} className="book">
      <Card.Body>
        <Card.Title className="book-title">{bookname}</Card.Title>
        <div className="book-details">
          <div>Author: {author}</div>
          <div>Quantity: {quantity} </div>
          <div>Price: {price} </div>
          <div>Date: {new Date(date).toDateString()}</div> {/* Convert the date to a human-readable format */}
        </div>
        {/* When the Edit button is clicked, navigate to the edit page for this book */}
        <Button variant="primary" onClick={() => navigate(`/edit/${id}`)}>
          Edit
        </Button>{' '}
        {/* When the Delete button is clicked, call the handleRemoveBook function with the id of this book */}
        <Button variant="danger" onClick={() => handleRemoveBook(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Book;