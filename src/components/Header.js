import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import AppContext from "../AppContext";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 10,
    color: "grey",
    margin: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    borderBottomColor: "grey",
    minWidth: 100,
  },
  select: {
    fontSize: 14,
    color: "grey",
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Header = ({ title }) => {
  const classes = useStyles();
  const {
    CITIES,
    currentCity,
    setCurrentCity,
    CATEGORIES,
    currentCategory,
    setCategory,
    setQuery,
    query,
  } = useContext(AppContext);

  const handleCityChange = (e) => {
    setCurrentCity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Typography component="h2" variant="h6" color="black" gutterBottom>
          {title}
        </Typography>
        <div className="">
          <FormControl className={classes.formControl} size="small">
            <Select
              value={currentCity}
              className={classes.select}
              onChange={handleCityChange}
            >
              <MenuItem value={-1} disabled={true}>
                Select City
              </MenuItem>
              {CITIES.map((city, index) => (
                <MenuItem value={index}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl} size="small">
            <Select
              value={currentCategory}
              className={classes.select}
              onChange={handleCategoryChange}
            >
              <MenuItem value={-1} disabled={true}>
                Select Category
              </MenuItem>
              {CATEGORIES.map((category, index) => (
                <MenuItem value={index}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl} size="small">
            <Input
              value={query}
              className={classes.select}
              startAdornment={
                <InputAdornment position="end">
                  <Icon className={classes.searchIcon + " fa fa-search"} />
                </InputAdornment>
              }
              onChange={handleQueryChange}
            ></Input>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default Header;
