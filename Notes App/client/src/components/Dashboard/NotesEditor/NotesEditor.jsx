import React from "react";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import CheckIcon from "@mui/icons-material/Check";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotesEditor = () => {
  const toastMess = () => {
    toast.error("Please select a category!");
  };

  return (
    <Grid container xs={12} sx={{ height: "100%" }}>
      <Grid
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
        xs={12}
      >
        <div style={{ display: "flex", gap: "1em", marginLeft: "1em" }}>
          <Button
            sx={{
              width: "120px",
              height: "32px",
              backgroundColor: "#1264A3",
              "&:hover": {
                background: "#1264A3",
              },
            }}
          ></Button>
          <Button
            sx={{
              width: "120px",
              height: "32px",
              backgroundColor: "#1264A3",
              "&:hover": {
                background: "#1264A3",
              },
            }}
          ></Button>
          <Button
            sx={{
              width: "120px",
              height: "32px",
              backgroundColor: "#68C142",
              "&:hover": {
                background: "#68C142",
              },
            }}
          ></Button>
        </div>
        <div style={{ display: "flex", gap: "1em", marginRight: "1em" }}>
          <Button
            sx={{
              width: "32px",
              height: "32px",
              backgroundColor: "#1264A3",
              "&:hover": {
                background: "#1264A3",
              },
            }}
          ></Button>
          <Button
            sx={{
              width: "32px",
              height: "32px",
              backgroundColor: "#1264A3",
              "&:hover": {
                background: "#1264A3",
              },
            }}
          ></Button>
          <Button
            sx={{
              width: "32px",
              height: "32px",
              backgroundColor: "#1264A3",
              "&:hover": {
                background: "#1264A3",
              },
            }}
          ></Button>
        </div>
      </Grid>
      <Grid xs={12} sx={{ mt: 1 }}>
        <form style={{ padding: ".5em 1.5em" }}>
          <Input
            sx={{
              border: "none",
              borderBottom: "2px solid #D8D9DA",
              borderRadius: "0",
              background: "none",
              paddingBottom: "2em",
              textAlign: "center",
            }}
            placeholder="Add a tittle"
          />
          <Textarea
            placeholder="Write your note here..."
            required
            elevation={0}
            maxRows={10}
            sx={{
              marginTop: "2em",
              border: "none",
              borderRadius: "0",
              background: "none",
              height: "54vh",
            }}
          />
          <ButtonGroup sx={{ mt: 10, float: "right" }} onClick={toastMess}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#68C142",
                fontSize: "14px",
                fontWeight: "400",
                color: "#fff",
              }}
            >
              Save Changes
            </Button>
            <IconButton
              variant="contained"
              sx={{
                backgroundColor: "#68C142",
                color: "#fff",
              }}
            >
              <CheckIcon />
            </IconButton>
          </ButtonGroup>
          <ToastContainer
            oastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </form>
      </Grid>
    </Grid>
  );
};

export default NotesEditor;
