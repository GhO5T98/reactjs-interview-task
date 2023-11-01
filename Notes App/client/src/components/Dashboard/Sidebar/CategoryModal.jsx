import React, { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CategoryModal = ({ open, setOpen, setCategory, token }) => {
  const [name, setName] = useState("");

  //Create Category//
  const createCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/category",
        { name },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCategory((prevCategories) => [...prevCategories, response.data]);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };
  //Create Category//

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <form onSubmit={createCategory}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
          >
            <FormControl>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Add a title..."
                autoFocus
                required
                sx={{ backgroundColor: "#F5F5F7" }}
              />
            </FormControl>
            <Button
              type="submit"
              sx={{
                padding: "0 .5em",
                backgroundColor: "#68C142",
                "&:hover": {
                  background: "#68C142",
                },
              }}
            >
              <CheckIcon />
            </Button>
            <Button
              sx={{
                padding: "0 .5em",
                backgroundColor: "#FE4C4A",
                "&:hover": {
                  background: "#FE4C4A",
                },
              }}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default CategoryModal;
