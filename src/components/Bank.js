import React, { useState, useEffect, useContext } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "./Header";
import Footer from "./Footer";
import AppContext from "../AppContext";

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(3),
    // flex: "row",
    display: "inline-flex",
    alignSelf: "flex-end",
    margin: 10,
  },
  formControl: {
    flexDirection: "row",
  },
  select: {
    fontSize: 14,
    // width: 1,
    // paddingTop: 10,
    paddingRight: 10,
  },
}));

export default function Bank() {
  const classes = useStyles();
  const context = useContext(AppContext);
  const [globalData, setGlobalData] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [pages, setPages] = useState(10);
  const {
    rowPerPage,
    setRowPerPage,
    CITIES,
    currentCity,
    currentOffset,
    currentCategory,
    query,
  } = useContext(AppContext);

  const fetchData = async (city) => {
    const response = await fetch(
      `https://vast-shore-74260.herokuapp.com/banks?city=${city}`
    );
    let data = await response.json();
    // data = data.slice(0, 10);

    setGlobalData(data);
  };

  const findQuery = (category, query) => {
    console.log("findQuery", category, query);
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
        console.log("default");
    }
    return filteredData;
  };

  useEffect(() => {
    fetchData(CITIES[currentCity]);
  }, [currentCity]);

  useEffect(() => {
    console.log("find-q called");
    if (query && currentCategory !== -1) {
      setIsFilter(true);
      setFilteredData(findQuery(currentCategory, query));
    } else if (!query) {
      setIsFilter(false);
    }
  }, [query, currentCategory]);
  const firstTenRows = isFilter
    ? filteredData.slice(
        currentOffset * rowPerPage,
        (currentOffset + 1) * rowPerPage
      )
    : globalData.slice(
        currentOffset * rowPerPage,
        (currentOffset + 1) * rowPerPage
      );
  console.log(currentOffset * rowPerPage, (currentOffset + 1) * rowPerPage);
  console.log("rowPerPage.bank", rowPerPage, firstTenRows);
  // if (!firstTenRows.length) return <p>Loading...</p>;
  return (
    <React.Fragment>
      <Header title="Banks" />
      <Table size="small">
        <TableHead>
          <TableRow style={{ color: "grey" }}>
            <TableCell style={{ color: "grey" }}>Bank</TableCell>
            <TableCell style={{ color: "grey" }}>IFSC</TableCell>
            <TableCell style={{ color: "grey" }}>Branch</TableCell>
            <TableCell style={{ color: "grey" }}>Bank ID</TableCell>
            <TableCell style={{ color: "grey" }}>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {firstTenRows.map((row, index) => (
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
