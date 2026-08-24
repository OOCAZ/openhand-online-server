"use client";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  ThemeProvider,
  createTheme,
  Typography,
  Snackbar,
} from "@mui/material";
import Image from "mui-image";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Countdown from "react-countdown";

function App() {
  const [numbers, setNumbers] = React.useState([]);
  const [currentNumber, setCurrentNumber] = React.useState(String);
  const [loading, setLoading] = React.useState(false);
  const [countdownDate] = useState(() => Date.now() + 30000);

  // Single snackbar state
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" | "info"
  });

  function showSnackbar(message, severity = "success") {
    setSnackbar({ open: true, message, severity });
  }

  function handleSnackbarClose(event, reason) {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  async function onAddNumber() {
    const addNumber = {
      number: currentNumber,
    };

    var code = 555;
    setLoading(true);
    await axios
      .post("/api/add", addNumber)
      .then((res) => {
        code = res.status;
        console.log(res);
      })
      .catch((err) => {
        code = err.response.status;
        console.log(err);
      });
    const submittedNumber = currentNumber;
    setLoading(false);
    if (code === 200) {
      showSnackbar(`Successfully added the number: ${submittedNumber}`, "success");
    } else {
      showSnackbar(`There was an error performing the operation with the number: ${submittedNumber}`, "error");
    }
    setCurrentNumber("");
    getListNumbers();
    return;
  }

  async function onRemoveNumber() {
    const removeNumber = {
      number: currentNumber,
    };

    var code = 555;
    setLoading(true);
    await axios
      .post("/api/remove", removeNumber)
      .then((res) => {
        code = res.status;
        console.log(res);
      })
      .catch((err) => {
        code = err.response.status;
        console.log(err);
      });
    const submittedNumber = currentNumber;
    setLoading(false);
    if (code === 200) {
      showSnackbar(`Successfully removed the number: ${submittedNumber}`, "success");
    } else {
      showSnackbar(`There was an error performing the operation with the number: ${submittedNumber}`, "error");
    }
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
        <h1 data-testid="numbers">{numbers}</h1>
        <Typography sx={{ m: 2 }} variant="h6">
          Countdown to Refresh:
        </Typography>
        <Countdown style={{ marginBottom: 40 }} date={countdownDate} />
        <Typography sx={{ m: 2 }}> </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            data-testid="input-field"
            id="outlined-basic"
            label="Number"
            variant="outlined"
            onChange={handleChange}
            value={currentNumber}
          />
        </ThemeProvider>
        <Button
          data-testid="add-number"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={onAddNumber}
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Number"}
        </Button>
        <Button
          data-testid="remove-number"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={onRemoveNumber}
          disabled={loading}
        >
          {loading ? "Loading..." : "Remove Number"}
        </Button>
        <a href={"/"}>
          <Button variant="contained" sx={{ mt: 2, mb: 4 }}>
            Manual Refresh
          </Button>
        </a>
      </header>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
