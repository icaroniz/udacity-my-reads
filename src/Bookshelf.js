import React from 'react';
import PropTypes from 'prop-types';
import BooksList from "./BooksList";
import Spinner from "./Spinner";

const Bookshelf = ({books, shelves, title, loading, onShelfUpdate}) => {
  const content = books.length > 0 ? <BooksList books={books} shelves={shelves} onShelfUpdate={onShelfUpdate} /> : <p>This bookshelf is empty</p>;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {loading ? <Spinner/> : content}
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onShelfUpdate: PropTypes.func.isRequired,
};

Bookshelf.defaultProps = {
  onShelfUpdate: () => {},
};

export default Bookshelf;