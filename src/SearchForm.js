import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  render() {
    const {term, onTermUpdate} = this.props;
    return (
      <div className="search-books-input-wrapper">
        <input
          type="text"
          value={term}
          placeholder="Search by title or author"
          onChange={e => onTermUpdate(e.target.value)}
        />
      </div>
    )
  }
}

SearchForm.propTypes = {
  term: PropTypes.string.isRequired,
  onTermUpdate: PropTypes.func.isRequired,
};

export default SearchForm;