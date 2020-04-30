import React from 'react';
import PropTypes from 'prop-types';
import Book from "./Book";

const BooksList = ({books, shelves, onShelfUpdate}) => {
  return (
    <ol className="books-grid">
      {books.map(book => {
        const shelf = shelves.find(shelf => shelf.books.includes(book.id));
        return (
          <li key={book.id}>
            <Book book={book} shelfId={shelf && shelf.id} onShelfUpdate={onShelfUpdate} />
          </li>
        )
      })}
    </ol>
  );
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onShelfUpdate: PropTypes.func,
};

BooksList.defaultProps = {
  onShelfUpdate: () => {},
};

export default BooksList;