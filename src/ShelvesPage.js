import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";

class ShelvesPage extends Component {
  state = {
    books: [],
    loading: true,
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books,
        loading: false,
      }));
    });
  }

  render() {
    const {books, loading} = this.state;
    const {shelves, onShelfUpdate} = this.props;
    return (
      <div className="list-books">
        <div className="page-title">
          <h1>MyReads</h1>
        </div>
        <div className="page-content">
          <div>
            {shelves.map(shelf => (
              <Bookshelf
                key={shelf.id}
                title={shelf.name}
                books={books.filter(book => shelf.books.includes(book.id))}
                shelves={shelves}
                loading={loading}
                onShelfUpdate={onShelfUpdate}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

ShelvesPage.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShelfUpdate: PropTypes.func.isRequired,
};

export default ShelvesPage;