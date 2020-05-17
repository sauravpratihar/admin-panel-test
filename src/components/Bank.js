import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "./Header";
import Footer from "./Footer";
import AppContext from "../AppContext";
import { addCache, getCache } from "../Caching";
import { debounce } from "../utils";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    "& th": {
      color: "grey",
    },
  },
}));

export default function Bank() {
  const classes = useStyles();
  // const context = useContext(AppContext);
  const [globalData, setGlobalData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const {
    rowPerPage,
    CITIES,
    currentCity,
    currentOffset,
    currentCategory,
    query,
  } = useContext(AppContext);

  // fetch data from api
  const fetchData = async (city) => {
    // check if api response in cache
    let response = await getCache(city);
    let data;
    if (response) {
      data = response;
    } else {
      // if not in cache, call api
      response = await fetch(
        `https://vast-shore-74260.herokuapp.com/banks?city=${city}`
      );
      data = await response.json();
      await addCache(city, data);
    }
    setGlobalData(data);
  };

  useEffect(() => {
    fetchData(CITIES[currentCity]);
  }, [currentCity, CITIES]);

  useEffect(() => {
    // filter category from global data
    const findQuery = (category, query) => {
      query = query.toLowerCase();
      let filteredData = [];
      switch (category) {
        case 0:
          // IFSC
          filteredData = globalData.filter((item) =>
            item.ifsc.toLowerCase().includes(query)
          );
          break;
        case 1:
          // BRANCH
          filteredData = globalData.filter((item) =>
            item.branch.toLowerCase().includes(query)
          );
          break;
        case 2:
          // BANK NAME
          filteredData = globalData.filter((item) =>
            item.bank_name.toLowerCase().includes(query)
          );
          break;
        default:
          console.log("Invalid Category");
      }
      return filteredData;
    };

    if (query && currentCategory !== -1) {
      // stop calling function till the time complete (user input)
      debounce(() => {
        setIsFilter(true);
        setFilteredData(findQuery(currentCategory, query));
      }, 500)();
    } else if (!query) {
      setIsFilter(false);
    }
  }, [query, currentCategory, globalData]);

  const firstNRows = isFilter
    ? filteredData.slice(
        currentOffset * rowPerPage,
        (currentOffset + 1) * rowPerPage
      )
    : globalData.slice(
        currentOffset * rowPerPage,
        (currentOffset + 1) * rowPerPage
      );

  if (!firstNRows.length && !isFilter)
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  return (
    <React.Fragment>
      <Header title="Banks" />
      <Table size="small">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell>Bank</TableCell>
            <TableCell>IFSC</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell>Bank ID</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {firstNRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.bank_name}</TableCell>
              <TableCell>{row.ifsc}</TableCell>
              <TableCell>{row.branch}</TableCell>
              <TableCell>{row.bank_id}</TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Footer totalData={isFilter ? filteredData.length : globalData.length} />
    </React.Fragment>
  );
}
