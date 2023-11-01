import React, { useState, useEffect } from "react";
import TopBar from "./TopBar/TopBar";
import Sidebar from "./Sidebar/Sidebar";
import NotesEditor from "./NotesEditor/NotesEditor";
import Grid from "@mui/joy/Grid";
import NotesList from "./NotesList/NotesList";
import NewNote from "./NewNote/NewNote";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [noteListSize, setNoteListSize] = useState(8.2);
  const [showNewNote, setShowNewNote] = useState(false);
  const [selectedCatButton, setSelectedCatButton] = useState(null);
  const [currentCatIndex, setCurrentCatIndex] = useState(null);

  const token = localStorage.getItem("token");

  //Select Category//
  const selectCategory = (catIndex) => {
    if (catIndex === selectedCatButton) {
      setCurrentCatIndex(null);
      setSelectedCatButton(null);
    } else {
      setCurrentCatIndex(catIndex);
      setSelectedCatButton(catIndex);
    }
    console.log("Selected cat" + `${catIndex}`);
  };
  //Select Category//

  //Category  Fetch//
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories", {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 403) {
          navigate("/");
        } else {
          setCategory(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [navigate, token]);

  const updateNoteListSize = (newValue) => {
    setNoteListSize(newValue);
  };

  const resetNoteListSize = () => {
    setNoteListSize(8.2);
  };

  const showNewNoteHandler = () => {
    setShowNewNote(true);
  };

  const hideNewNoteHandler = () => {
    setShowNewNote(false);
  };

  return (
    <>
      <header>
        <TopBar />
      </header>
      <Grid container xs={12}>
        <Grid
          xs={3.5}
          sx={{
            margin: ".6em",
            borderRadius: "16px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <aside>
            <Sidebar
              setCategory={setCategory}
              category={category}
              selectCategory={selectCategory}
              selectedCatButton={selectedCatButton}
              resetW={resetNoteListSize}
              removeNewNote={hideNewNoteHandler}
              token={token}
            />
          </aside>
        </Grid>
        {selectedCatButton ? (
          <>
            <Grid
              xs={noteListSize}
              sx={{
                margin: ".6em 0",
                borderRadius: "16px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <NotesList
                category={category}
                changeSize={updateNoteListSize}
                showNewNote={showNewNoteHandler}
                currentCatIndex={currentCatIndex}
                token={token}
              />
            </Grid>
            {showNewNote && (
              <Grid
                xs={4.9}
                sx={{
                  margin: ".6em",
                  borderRadius: "16px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
              >
                <NewNote
                  currentCatIndex={currentCatIndex}
                  setCategory={setCategory}
                  category={category}
                  token={token}
                />
              </Grid>
            )}
          </>
        ) : (
          <Grid
            xs={8.2}
            sx={{
              margin: ".6em 0",
              borderRadius: "16px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            <NotesEditor />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
