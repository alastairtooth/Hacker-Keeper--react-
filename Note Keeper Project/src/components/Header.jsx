import React from "react";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";

function Header() {
  return (
    <header>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ImportantDevicesIcon fontSize="large" style={{ fill: "#F6416C", marginRight:"20px" }} />
        <h1> Hacker-Keeper</h1>
      </div>
    </header>
  );
}

export default Header;
