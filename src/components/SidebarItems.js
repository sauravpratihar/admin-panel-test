import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  sidebar: {
    fontSize: 20,
    color: "grey",
    margin: 0,
  },
  text: {
    color: "grey",
  },
}));

export const SidebarItems = () => {
  const classes = useStyles();

  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <Icon className={classes.sidebar + " fa fa-landmark"} />
        </ListItemIcon>
        <ListItemText primary="BANKS" className={classes.text} />
      </ListItem>
    </div>
  );
};
