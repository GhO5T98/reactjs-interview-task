import React, { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import LinearProgress from "@mui/joy/LinearProgress";
import Key from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName,setFullName] = useState('')
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const minLength = 8;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        fullName,
        email,
        password,
      });

      if (response.status === 201) {

        localStorage.setItem('token', response.data.token);
        setIsRegistered(true);
        navigate('/')
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

 
  return (
    <>
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
          <Typography level="h1">Register To Our Notes App!</Typography>
          <Typography level="body-sm">Click Below To Register. </Typography>
          <Button
            sx={{ mt: 3, borderRadius: "0" }}
            variant="solid"
            color="primary"
            startDecorator={<AppRegistrationIcon />}
            onClick={() => setOpen(true)}
          >
            REGISTER
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog sx={{ textAlign: "center" }}>
              <Typography level="h2">Register</Typography>
              <Typography level="body-sm">
                Fill in your personal informations.
              </Typography>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setOpen(false); // First event handler
                  handleRegister(event); // Second event handler
                }}
              >
                <Stack spacing={2}>
                  <FormControl>
                    <Input
                      startDecorator={<PersonIcon />}
                      placeholder="Your Full Name..."
                      type="text"
                      autoFocus
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      startDecorator={<EmailIcon />}
                      placeholder="Your Email..."
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
                    Already have an account?
                    <Link to={"/"}>Log In Here.</Link>
                  </Typography>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
