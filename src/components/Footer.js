import React, { useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../AppContext";

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(3),
    display: "inline-flex",
    alignSelf: "flex-end",
    margin: 10,
  },
  pagingColumn: {
    paddingRight: 10,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: 14,
    color: "grey",
  },
  formControl: {
    flexDirection: "row",
    paddingRight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
  },
  footerText: {
    fontSize: 14,
  },
  underline: {
    paddingRight: 10,
    fontSize: 16,
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));

const Footer = ({ totalData }) => {
  const classes = useStyles();
  const { rowPerPage, setRowPerPage, setOffset, currentOffset } = useContext(
    AppContext
  );
  const handleRPPChange = (e) => {
    setRowPerPage(e.target.value);
  };

  const handlePagination = (type) => {
    // when previous button pressed
    if (type === "prev") {
      setOffset(currentOffset - 1);
    } else if (type === "next") {
      // when next button pressed
      setOffset(currentOffset + 1);
    }
  };

  const start = currentOffset * rowPerPage + 1;
  const end = (currentOffset + 1) * rowPerPage;
  return (
    <div className={classes.pagination}>
      <FormControl className={classes.formControl} size="small">
        <span className={classes.footerText}>Row par pages: </span>

        <Select
          value={rowPerPage}
          className={classes.underline}
          onChange={handleRPPChange}
          defaultValue={10}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <span className={classes.pagingColumn}>
        {totalData === 0 ? "0" : start} - {end < totalData ? end : totalData} of{" "}
        {totalData}
      </span>
      <div className={classes.pagingColumn}>
        <IconButton
          onClick={() => handlePagination("prev")}
          disabled={currentOffset * rowPerPage === 0}
          // disable buton when initial page
        >
          <Icon className={classes.icon + " fa fa-chevron-left"} />
        </IconButton>

        <IconButton
          onClick={() => handlePagination("next")}
          disabled={(currentOffset + 1) * rowPerPage >= totalData}
          // disable buton when last page
        >
          <Icon className={classes.icon + " fa fa-chevron-right"} />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
