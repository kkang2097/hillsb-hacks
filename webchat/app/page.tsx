"use client";

import Image from "next/image";
import { useState } from "react";
import UploadBar from "./components/UploadBar";
import LogView from "./components/LogView"; // Import LogView

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="title">Dashboard</h1>
        <nav className="nav">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Settings</a>
          <a href="#" className="nav-link">Profile</a>
          <a href="#" className="nav-link">Logout</a>
        </nav>
      </header>

      <div className="main-content">
        <div className="upload-container">
          <UploadBar />
        </div>
        <div className="log-container">
          <LogView />
        </div>
      </div>
    </div>
  );
}