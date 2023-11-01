import React, { useState } from "react";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/joy/IconButton";
import ButtonGroup from "@mui/joy/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FolderIcon from "@mui/icons-material/Folder";
import CategoryModal from "./CategoryModal";

const Sidebar = ({
  category,
  resetW,
  removeNewNote,
  setCategory,
  selectCategory,
  selectedCatButton,
  token,
}) => {
  const [open, setOpen] = useState(false);
  
  //Category Style Changes//
  const handleCategoryClick = (index) => {
    selectCategory(index);
    resetW();
    removeNewNote();
  };
  //Category Style Changes//

  const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor: "none",
    ...theme.typography["body-sm"],
    padding: ".6em",
  }));

  return (
    <Grid container>
      <Grid xs={12}>
        <Item
          sx={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}
        >
          <ButtonGroup onClick={() => setOpen(true)}>
            <Button
              variant="contained"
              sx={{
                width: "92.5%",
                backgroundColor: "#68C142",
                fontSize: "14px",
                fontWeight: "400",
                color: "#fff",
              }}
            >
              Create Category
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
          <CategoryModal
            setOpen={setOpen}
            open={open}
            setCategory={setCategory}
            token={token}
          />
        </Item>
      </Grid>
      <Grid
        xs={12}
        sx={{
          height: "85vh",
          overflowY: "auto",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Grid xs={12}>
          {category.map((data, index) => {
            return (
              <Item key={index}>
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    padding: "0.8em",
                    backgroundColor:
                      selectedCatButton === index ? "#F8F8FA" : "#1264A3",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: selectedCatButton === index ? "#000" : "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  onClick={() => handleCategoryClick(index)}
                  endDecorator={
                    selectedCatButton === index ? (
                      <ArrowRightIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )
                  }
                >
                  <FolderIcon />
                  {data.name}
                  {/* {`(${data.notes.length})`} */}
                </Button>
              </Item>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
