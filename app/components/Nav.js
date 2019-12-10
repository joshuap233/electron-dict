import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {NAV_BUTTONS} from "./Items";

export default function Nav(props) {
  const {location, changeTo} = props;
  return (
    <ButtonGroup variant="contained" size="medium">
      {
        NAV_BUTTONS.map(button => (
          <Button
            key={button.name}
            onClick={() => changeTo(button.route)}
            color={NAV_BUTTONS.getColor(location, button.route)}
          >
            {button.name}
          </Button>
        ))
      }
    </ButtonGroup>
  );

}
