import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import axios from "axios";

const NotesList = ({
  category,
  currentCatIndex,
  changeSize,
  showNewNote,
  token,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true);

  //Notes Fetch//
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getNotes");
        setNotesList(res.data);
      } catch (err) {
        console.log("Data not showing " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  //Notes Fetch//

  // //Delete Note//
  // const deleteNote = async (noteId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/note/${noteId}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     setNotesList((prevNotes) =>
  //       prevNotes.filter((note) => note._id !== noteId)
  //     );
  //   } catch (error) {
  //     console.log("Error deleting note: ", error);
  //   }
  // };
  // //Delete Note//

  //Filter Notes By Category//
  const selectedCategory = category[currentCatIndex];
  const filteredList = notesList.filter(
    (item) => item.categoryId === selectedCategory._id
  );
  //Filter Notes By Category//

  //View Change//
  const handleButtonClick = () => {
    changeSize(3.2);
    showNewNote();
  };
  //View Change//
  return (
    <>
      <Grid container xs={12}>
        <Grid
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
          xs={12}
        >
          <div style={{ display: "flex", gap: "2em" }}>
            <ButtonGroup onClick={handleButtonClick}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#68C142",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#fff",
                  padding: "0 4em",
                }}
              >
                Create Note
              </Button>
              <IconButton
                variant="contained"
                sx={{
                  backgroundColor: "#68C142",
                  color: "#fff",
                }}
              >
                <AddIcon />
              </IconButton>
            </ButtonGroup>
            <form>
              <Input
                startDecorator={<SearchIcon />}
                sx={{
                  background: "none",
                  textAlign: "center",
                }}
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
        </Grid>
        <Grid xs={12} sx={{ overflowY: "auto", height: "80vh" }}>
          {filteredList
            .filter(
              (item) =>
                (item.title &&
                  item.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (item.text &&
                  item.text.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((item, index) => (
              <List aria-labelledby="ellipsis-list-demo" key={index}>
                <ListItem sx={{ ml: 1 }} onClick={handleButtonClick}>
                  <ListItemContent sx={{ ml: 1 }}>
                    <Typography level="title-md">{item.title}</Typography>
                    <Typography level="body-md" noWrap>
                      {item.content}
                    </Typography>
                  </ListItemContent>
                </ListItem>
                <Divider sx={{ mt: 1, mb: 1 }} />
              </List>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default NotesList;
