import React, { useState, useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";

const Help = ({darkMode}) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/help.html")
      .then((response) => response.text())
      .then((data) => setContent(data));
  }, []);


return (
  <Box sx={{ padding: 0, textAlign: "center", mt: 3.5 }}> {/* Added marginTop */}
      {/* Title */}
      <Typography 
        variant="h3" 
        sx={{
          display: "inline-block", // Ensures background only wraps around text 
          mb: 3, 
          color: "#FF8FAB", 
          // color: "#EDCFD3",
          fontWeight: "bold",
          fontFamily: "'Poppins'",
          padding: "5px 10px", // Adds spacing around the text
          borderRadius: "5px", // Softens edges
          backgroundColor: darkMode ? "rgba(96, 84, 86, 0.5)" :"rgba(255, 215, 221, 0.5)", // Translucent #FFD7DD
        }}
      >
        Help
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
  );
};

export default Help;