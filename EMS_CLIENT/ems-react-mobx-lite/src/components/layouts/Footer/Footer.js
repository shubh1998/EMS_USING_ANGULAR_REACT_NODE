import { makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import CustomTypography from "../../ui/Typography";

const useStyle = makeStyles({
  footer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 40,
  },
});

export const Footer = observer(() => {
  const classes = useStyle();
  return (
    <div className={classes.footer}>
      <CustomTypography
        variant="caption"
        label="@Copyright - Shubham gupta"
        color="primary"
      />
    </div>
  );
})