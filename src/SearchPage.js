import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import SearchForm from "./SearchForm";
import BooksList from "./BooksList";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

class SearchPage extends Component {
  state = {
    loading: false,
    term: '',
    books: [],
    error: false,
  };

  updateTerm = (term) => {
    this.setState({
      term,
      books: [],
    });
    if (typeof term === 'string' && term.trim() !== '') {
      this.doSearch(term);
    } else {
      this.setState({
        loading: false,
        error: false,
      })
    }
  };

  doSearch = (term) => {
    this.setState({
      loading: true,
      error: false,
    })
    BooksAPI.search(term).then(books => {
      if (!books.error) {
        this.setState({
          loading: false,
          books,
        })
      } else {
        this.setState({
          loading: false,
          books: [],
          error: books.error,
        })
      }
    });
  };

  render() {
    const {books, term, loading, error} = this.state;
    const {shelves, onShelfUpdate} = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <SearchForm term={term} onTermUpdate={this.updateTerm}/>
        </div>
        <div className="search-books-results">
          {loading ? <Spinner/> : <BooksList books={books} shelves={shelves} onShelfUpdate={onShelfUpdate}/>}
          {!loading && error && (<p>There was an error while getting the books: {error}</p>)}
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShelfUpdate: PropTypes.func.isRequired,
};

export default SearchPage;