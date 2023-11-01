import React, { useState } from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  //Logout//
  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };
   //Logout//

  const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.background.level1
        : "#1F2A44",
    ...theme.typography["body-lg"],
    height: "50px",
  }));

  return (
    <Grid container>
      <Grid xs={12}>
        <Item
          sx={{
            textAlign: "left",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            fontSize: "16px",
            lineHeight: "21.79px",
            userSelect: "none",
            fontFamily: "Open Sans, sans-serif;",
          }}
        >
          Your Notes{" "}
          <IconButton
            variant="plain"
            sx={{ color: "#ffff" }}
            onClick={handleLogout}
          >
            <CloseIcon />
          </IconButton>
        </Item>
      </Grid>
    </Grid>
  );
};

export default TopBar;
