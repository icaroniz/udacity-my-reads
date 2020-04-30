import React from 'react'
import {Link, Route, Switch} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./SearchPage";
import ShelvesPage from "./ShelvesPage";
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: [
      {
        id: "currentlyReading",
        name: "Currently Reading",
        books: [],
      },
      {
        id: "wantToRead",
        name: "Want to Read",
        books: [],
      },
      {
        id: "read",
        name: "Read",
        books: [],
      },
    ],
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const updatedShelves = this.state.shelves.map(shelf => ({
        ...shelf,
        books: books.filter(book => book.shelf === shelf.id).map(book => book.id)
      }))
      this.setState(() => ({
        shelves: updatedShelves,
        loading: false,
      }));
    });
  }

  moveToShelf = (book, shelfId) => BooksAPI.update(book, shelfId).then(shelves => {
    this.setState(() => ({
      shelves: this.state.shelves.map(shelf => ({
        ...shelf,
        books: shelves[shelf.id],
      })),
    }))
  });

  render() {
    const {shelves} = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <ShelvesPage shelves={shelves} onShelfUpdate={this.moveToShelf}/>
          )}/>
          <Route exact path="/search" render={() => (
            <SearchPage shelves={shelves} onShelfUpdate={this.moveToShelf}/>
          )}/>
          <Route>
            <p>That url could not be found</p>
            <Link to="/">Go to Home Page</Link>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
