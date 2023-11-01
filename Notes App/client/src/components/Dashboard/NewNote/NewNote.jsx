import React, { useState } from "react";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

const NewNote = ({ category, setCategory, currentCatIndex, token }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  //Add Note//
  const saveNoteToCategory = async (e) => {
    e.preventDefault();
    if (currentCatIndex !== null && noteTitle && noteContent) {
      try {
        const selCategory = category[currentCatIndex];
        const newNote = {
          title: noteTitle,
          content: noteContent,
          categoryId: selCategory._id,
        };

        await axios
          .post(
            "http://localhost:5000/note",
            newNote,

            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            selCategory.notes.push(res.data);
            console.log(res.data);
            setCategory([...category]);
            setNoteTitle("");
            setNoteContent("");
          });
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }
  };
  //Add Note//

  return (
    <Grid container xs={12} sx={{ height: "100%" }}>
      {currentCatIndex !== null && (
        <>
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
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
              <Textarea
                placeholder="Write your note here..."
                id="note-text"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
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
              <ButtonGroup
                onClick={saveNoteToCategory}
                sx={{ mt: 10, float: "right" }}
              >
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
            </form>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default NewNote;
