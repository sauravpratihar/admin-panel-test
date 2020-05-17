import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

export const SidebarItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Icon
          className="fa fa-landmark"
          style={{ fontSize: 20, color: "grey", margin: 0 }}
        />
      </ListItemIcon>
      <ListItemText primary="BANKS" style={{ color: "grey" }} />
    </ListItem>
  </div>
);
