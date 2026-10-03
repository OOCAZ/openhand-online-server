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
import axios from "axios";
import Alert from "@mui/material/Alert";
import Countdown from "react-countdown";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5c9eff",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          padding: "18px 48px",
          fontSize: "clamp(1.1rem, 2.5vw, 2rem)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          maxWidth: "600px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "clamp(1.1rem, 2.5vw, 2rem)",
        },
        input: {
          // Give the value room to breathe inside the field.
          paddingTop: "1.1rem",
          paddingBottom: "1.1rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Widen the border notch so the enlarged floating label fits in the
        // gap instead of being painted over by the border line.
        notchedOutline: {
          "& legend": {
            fontSize: "clamp(0.85rem, 1.9vw, 1.5rem)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "clamp(1.1rem, 2.5vw, 2rem)",
          // When the label floats (field focused or filled), lift it clear of
          // the input text and scale it down so it sits on the border instead
          // of overlapping the value.
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -1.4rem) scale(0.75)",
          },
        },
      },
    },
  },
});

function App() {
  const [numbers, setNumbers] = React.useState([]);
  const [currentNumber, setCurrentNumber] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const [countdownDate] = useState(() => Date.now() + 30000);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
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

  async function onAddNumber() {
    const addNumber = { number: currentNumber };
    var code = 555;
    setLoading(true);
    await axios
      .post("/api/add", addNumber)
      .then((res) => {
        code = res.status;
      })
      .catch((err) => {
        code = err.response.status;
      });
    const submittedNumber = currentNumber;
    setLoading(false);
    if (code === 200) {
      showSnackbar(`Successfully added: ${submittedNumber}`, "success");
    } else {
      showSnackbar(`Error with number: ${submittedNumber}`, "error");
    }
    setCurrentNumber("");
    fetchData();
  }

  async function onRemoveNumber() {
    const removeNumber = { number: currentNumber };
    var code = 555;
    setLoading(true);
    await axios
      .post("/api/remove", removeNumber)
      .then((res) => {
        code = res.status;
      })
      .catch((err) => {
        code = err.response.status;
      });
    const submittedNumber = currentNumber;
    setLoading(false);
    if (code === 200) {
      showSnackbar(`Successfully removed: ${submittedNumber}`, "success");
    } else {
      showSnackbar(`Error with number: ${submittedNumber}`, "error");
    }
    setCurrentNumber("");
    fetchData();
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1 className="app-title">Welcome to OpenHand!</h1>
          <h2 className="app-subtitle" style={{ marginBottom: "1.5rem" }}>
            Stay as long as you&apos;d like; your food is not going anywhere! And
            we love talking to you!{" "}
          </h2>

          <Typography variant="subtitle2" sx={{ opacity: 0.6, mb: 0.5, fontSize: "clamp(1rem, 2.5vw, 2.2rem)" }}>
            Numbers Ready
          </Typography>
          <div className="numbers-display" data-testid="numbers">
            {numbers || "—"}
          </div>

          <div className="countdown-section">
            <Typography variant="caption" sx={{ fontSize: "clamp(0.9rem, 2vw, 1.8rem)" }}>
              Auto-refresh in
            </Typography>
            <Countdown date={countdownDate} />
          </div>

          {controlsVisible && (
            <>
              <TextField
                data-testid="input-field"
                id="outlined-basic"
                label="Enter a number"
                variant="outlined"
                onChange={handleChange}
                value={currentNumber}
              />

              <div className="button-group">
                <Button
                  data-testid="add-number"
                  variant="contained"
                  onClick={onAddNumber}
                  disabled={loading || !currentNumber}
                >
                  {loading ? "Loading..." : "Add Number"}
                </Button>
                <Button
                  data-testid="remove-number"
                  variant="contained"
                  color="secondary"
                  onClick={onRemoveNumber}
                  disabled={loading || !currentNumber}
                >
                  {loading ? "Loading..." : "Remove Number"}
                </Button>
                <Button
                  variant="outlined"
                  href="/"
                  sx={{ borderColor: "rgba(255,255,255,0.2)", color: "#ccc" }}
                >
                  Refresh
                </Button>
              </div>
            </>
          )}

          <div className="button-group" style={{ marginTop: controlsVisible ? "1.5rem" : "2rem" }}>
            <Button
              variant="outlined"
              onClick={() => setControlsVisible((v) => !v)}
              sx={{ borderColor: "rgba(255,255,255,0.2)", color: "#ccc" }}
            >
              {controlsVisible ? "Hide Controls" : "Show Controls"}
            </Button>
          </div>
        </header>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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
    </ThemeProvider>
  );
}

export default App;
