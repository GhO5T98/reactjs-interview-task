import React, { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import Typography from "@mui/joy/Typography";
import LinearProgress from "@mui/joy/LinearProgress";
import Key from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const minLength = 8;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      if (token != null) navigate("/Dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials or register.");
    }
  };

  
  return (
    <Grid
      container
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        sx={{
          marginTop: "15%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography level="h1">Welcome To Our Notes App!</Typography>
        <Typography level="body-sm">Click Below To Log In. </Typography>
        <Button
          sx={{ mt: 3, borderRadius: "0" }}
          variant="solid"
          color="primary"
          startDecorator={<WavingHandIcon />}
          onClick={() => setOpen(true)}
        >
          WELCOME!
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog sx={{ textAlign: "center" }}>
            <Typography level="h2">LOG IN</Typography>
            <Typography level="body-sm">
              Fill in your personal informations.
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
                handleLogin(event);
              }}
            >
              <Stack spacing={2}>
                <FormControl>
                  <Input
                    startDecorator={<EmailIcon />}
                    type="email"
                    autoFocus
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Stack
                  spacing={0.5}
                  sx={{
                    "--hue": Math.min(password.length * 10, 120),
                  }}
                >
                  <Input
                    type="password"
                    placeholder="Your Password..."
                    startDecorator={<Key />}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LinearProgress
                    determinate
                    size="sm"
                    value={Math.min((password.length * 100) / minLength, 100)}
                    sx={{
                      bgcolor: "background.level3",
                      color: "hsl(var(--hue) 80% 40%)",
                    }}
                  />
                  <Typography
                    level="body-xs"
                    sx={{
                      alignSelf: "flex-end",
                      color: "hsl(var(--hue) 80% 30%)",
                    }}
                  >
                    {password.length < 3 && "Very weak"}
                    {password.length >= 3 && password.length < 6 && "Weak"}
                    {password.length >= 6 && password.length < 10 && "Strong"}
                    {password.length >= 10 && "Very strong"}
                  </Typography>
                </Stack>
                <Button type="submit">Submit</Button>
                <Typography level="body-xs">
                  Don't have an account?
                  <Link to={"/Register"}>Register Here.</Link>
                </Typography>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Login;
