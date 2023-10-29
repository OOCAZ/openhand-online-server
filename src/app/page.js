"use client";
import "./App.css";
import React, { useEffect } from "react";
import {
  Button,
  TextField,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Countdown from "react-countdown";

function App() {
  const [numbers, setNumbers] = React.useState([]);
  const [currentNumber, setCurrentNumber] = React.useState(String);
  const [lastNumber, setLastNumber] = React.useState(String);
  const [addOpen, setAddOpen] = React.useState(false);
  const [removeOpen, setRemoveOpen] = React.useState(false);

  async function fetchData() {
    try {
      const res = await axios.get("/api/numbers");
      var temp1 = "";
      Object.entries(res.data).forEach((entry) => {
        const [key, value] = entry;
        temp1 = temp1 + value.number.toString() + ", ";
      });
      setNumbers(temp1);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setCurrentNumber(event.target.value);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  function getListNumbers() {
    fetchData();
  }

  function onAddNumber() {
    const addNumber = {
      number: currentNumber,
    };

    axios.post("/api/add", addNumber);
    setLastNumber(currentNumber);
    setAddOpen(true);
    setCurrentNumber("");
    getListNumbers();
    return;
  }

  function onRemoveNumber() {
    const removeNumber = {
      number: currentNumber,
    };

    axios.post("/api/remove", removeNumber);
    setLastNumber(currentNumber);
    setRemoveOpen(true);
    setCurrentNumber("");
    getListNumbers();
    return;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <Image src="/openhandweb.png" alt="Open Hand Logo" />*/}
        <h1>Welcome to OpenHand!</h1>
        <h2 style={{ marginBottom: "5vh" }}>
          Stay as long as you&apos;d like; your food is not going anywhere! And
          we love talking to you!{" "}
        </h2>
        <h2>Numbers Ready:</h2>
        <h1>{numbers}</h1>
        <Typography sx={{ m: 2 }} variant="h6">
          Countdown to Refresh:
        </Typography>
        <Countdown style={{ marginBottom: 40 }} date={Date.now() + 30000} />
        <Typography sx={{ m: 2 }}> </Typography>
        <ThemeProvider theme={theme}>
          <Collapse in={addOpen}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAddOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Successfully added the number: {lastNumber}
            </Alert>
          </Collapse>
          <Collapse in={removeOpen}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setRemoveOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Successfully removed the number: {lastNumber}
            </Alert>
          </Collapse>
          <TextField
            id="outlined-basic"
            label="Number"
            variant="outlined"
            onChange={handleChange}
            value={currentNumber}
          />
        </ThemeProvider>
        <Button variant="contained" sx={{ mt: 2 }} onClick={onAddNumber}>
          Add Number
        </Button>
        <Button variant="contained" sx={{ mt: 2 }} onClick={onRemoveNumber}>
          Remove Number
        </Button>
        <a href={"/"}>
          <Button variant="contained" sx={{ mt: 2, mb: 4 }}>
            Manual Refresh
          </Button>
        </a>
      </header>
    </div>
  );
}

export default App;
