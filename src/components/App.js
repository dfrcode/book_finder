import React, { Component } from "react";
import axios from "axios";

import styles from "./Add.module.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: "Dostoevsky",
      data: [],
    };
    this.getResources();
  }

  async getResources() {
    await axios({
      url: "https://openlibrary.org/search.json",
      params: {
        q: `${this.state.book}`,
      },
    })
      .then((res) => {
        this.setState((state) => {
          return {
            data: [...res.data.docs],
          };
        });
      })
      .catch((err) => console.error(err.JSON()));
  }

  enterNameBook = (e) => {
    this.setState((state) => {
      return {
        book: e.target.value,
      };
    });
    this.getResources();
  };

  render() {
    return (
      <div>
        <div className={styles.search}>
          <input
            className={styles.search_input}
            type="text"
            value={this.state.book}
            placeholder="Enter name author book..."
            onChange={this.enterNameBook}
          />
        </div>

        <div>
          <ul className={styles.list}>
            {this.state.data.map((item) =>
              item.author_name ? (
                <li key={item._version_} className={styles.item}>
                  <p>Image: {item.cover_i ? item.cover_i : "Not image"}</p>
                  <p>Title: {item.title ? item.title : "Not title"}</p>
                  <p>Name: {item.author_name}</p>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
