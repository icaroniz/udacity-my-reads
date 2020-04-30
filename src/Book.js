import React from 'react';
import PropTypes from 'prop-types';

const Book = ({book, shelfId, onShelfUpdate}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : 'http://placehold.it/128x193'}")`
          }}
        />
        <div className="book-shelf-changer">
          <select value={shelfId || 'move'} onChange={e => onShelfUpdate(book, e.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && (
        <div className="book-authors">
          {book.authors.join(', ')}
        </div>
      )}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelfId: PropTypes.string,
  onShelfUpdate: PropTypes.func,
};

export default Book;