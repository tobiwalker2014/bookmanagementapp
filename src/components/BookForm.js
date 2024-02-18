import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
  const [book, setBook] = useState(() => {
    return {
      bookname: props.book ? props.book.bookname : '',
      author: props.book ? props.book.author : '',
      quantity: props.book ? props.book.quantity : '',
      price: props.book ? props.book.price : '',
      date: props.book ? props.book.date : ''
    };
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { bookname, author, price, quantity } = book;

  // This function handles the form submission.
  const handleOnSubmit = (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Create an array with the current values of the book fields.
    const values = [bookname, author, price, quantity];
    let errorMsg = '';

    // Check if all fields are filled. 
    // The every() method tests whether all elements in the array pass the test implemented by the provided function.
    const allFieldsFilled = values.every((field) => {
      // Trim the field value and check if it's not empty and not '0'.
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    // If all fields are filled, create a new book object and call the handleOnSubmit function passed in props.
    if (allFieldsFilled) {
      const book = {
        id: uuidv4(), // Generate a unique id for the book.
        bookname,
        author,
        price,
        quantity,
        date: new Date() // Set the current date and time.
      };
      // Call the handleOnSubmit function passed in props with the new book object.
      props.handleOnSubmit(book);
    } else {
      // If not all fields are filled, set the error message.
      errorMsg = 'Please fill out all the fields.';
    }
    // Set the error message in the state.
    setErrorMsg(errorMsg);
  };

  // This function handles changes in the input fields.
  const handleInputChange = (event) => {
    // Destructure the name and value from the event target (the input field)
    const { name, value } = event.target;

    // Use a switch statement to handle different cases based on the name of the input field
    switch (name) {
      case 'quantity':
        // If the input field is 'quantity', only allow changes if the value is an integer.
        if (value === '' || parseInt(value) === +value) {
          // Update the state of the book with the new quantity value
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      case 'price':
        // If the input field is 'price', only allow changes if the value is a decimal with 2 digits after the decimal point.
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          // Update the state of the book with the new price value
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      default:
        // For all other input fields, just update the state of the book with the new value.
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            value={author}
            placeholder="Enter name of author"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Enter available quantity"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;