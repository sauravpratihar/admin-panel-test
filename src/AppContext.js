import React, { Component } from "react";

const AppContext = React.createContext();

class AppProvider extends Component {
  // Context state
  state = {
    rowPerPage: 10,
    CITIES: ["MUMBAI", "BANGALORE", "PUNE", "DELHI", "AHMEDABAD"],
    CATEGORIES: ["IFSC", "BRANCH", "BANK NAME"],
    currentCity: 0,
    currentOffset: 0,
    currentCategory: -1,
    query: "",
  };

  // Method to update state
  setRowPerPage = (rowPerPage) => {
    this.setState((prevState) => ({ rowPerPage }));
  };
  setCurrentCity = (currentCity) => {
    this.setState((prevState) => ({ currentCity }));
  };
  setOffset = (currentOffset) => {
    this.setState((prevState) => ({ currentOffset }));
  };
  setCategory = (currentCategory) => {
    this.setState((prevState) => ({ currentCategory }));
  };
  setQuery = (query) => {
    this.setState((prevState) => ({ query }));
  };

  render() {
    const { children } = this.props;
    const {
      rowPerPage,
      CITIES,
      currentCity,
      currentOffset,
      CATEGORIES,
      currentCategory,
      query,
    } = this.state;
    const {
      setRowPerPage,
      setCurrentCity,
      setOffset,
      setQuery,
      setCategory,
    } = this;

    return (
      <AppContext.Provider
        value={{
          rowPerPage,
          setRowPerPage,
          currentCity,
          setCurrentCity,
          CITIES,
          currentOffset,
          setOffset,
          CATEGORIES,
          currentCategory,
          setCategory,
          query,
          setQuery,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;

export { AppProvider };
