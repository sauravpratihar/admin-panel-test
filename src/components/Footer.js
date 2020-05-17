import React, { useContext, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../AppContext";

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

const Footer = ({ totalData }) => {
  const classes = useStyles();
  const { rowPerPage, setRowPerPage, setOffset, currentOffset } = useContext(
    AppContext
  );
  //   const [rowPerPage, setRowPerPage] = useState(context.rowPerPage);
  //   console.log("context", context);
  const handleRPPChange = (e) => {
    setRowPerPage(e.target.value);
  };

  const handlePagination = (type) => {
    if (type === "prev") {
      setOffset(currentOffset - 1);
    } else if (type === "next") {
      setOffset(currentOffset + 1);
    }
  };

  console.log((currentOffset + 1) * rowPerPage, totalData);
  const start = currentOffset * rowPerPage + 1;
  const end = (currentOffset + 1) * rowPerPage;
  return (
    <div className={classes.pagination}>
      <FormControl
        className={classes.formControl}
        size="small"
        style={{ paddingRight: 10 }}
      >
        <p style={{ fontSize: 14 }}>Row par pages: </p>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rowPerPage}
          className={classes.select}
          disableUnderline={true} //here
          onChange={handleRPPChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <span style={{ paddingRight: 10 }}>
        {totalData === 0 ? "0" : start} - {end < totalData ? end : totalData} of{" "}
        {totalData}
      </span>
      <div style={{ paddingRight: 10 }}>
        <IconButton
          onClick={() => handlePagination("prev")}
          disabled={currentOffset * rowPerPage === 0}
        >
          <Icon
            className="fa fa-chevron-left"
            style={{ fontSize: 14, color: "grey", margin: 0 }}
          />
        </IconButton>

        <IconButton
          onClick={() => handlePagination("next")}
          disabled={(currentOffset + 1) * rowPerPage >= totalData}
        >
          <Icon
            className="fa fa-chevron-right"
            style={{ fontSize: 14, color: "grey", margin: 0 }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
