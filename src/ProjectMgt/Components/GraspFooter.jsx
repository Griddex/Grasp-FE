import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function GraspFooter() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {new Date().getFullYear()} &copy;&nbsp;
      <Link color="inherit" href="https://grasperp.com/">
        Grasp ERP
      </Link>
      {" team."}
    </Typography>
  );
}
