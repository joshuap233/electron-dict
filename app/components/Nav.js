import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {BUTTONS} from "./Buttons";

export default function Nav(props) {
  const {location, changeTo} = props;
  return (
    <ButtonGroup variant="contained" size="medium">
      {
        BUTTONS.map(button => (
          <Button
            key={button.name}
            onClick={() => changeTo(button.route)}
            color={isCurrentRoute(button.route)}
          >
            {button.name}
          </Button>
        ))
      }
    </ButtonGroup>
  );

  function isCurrentRoute(route) {
    return location.pathname === route ? 'primary' : 'default';
  }
}