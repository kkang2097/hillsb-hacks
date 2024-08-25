"use client";

import Image from "next/image";
import { useState } from "react";
import UploadBar from "./components/UploadBar";
import ViewOne from "./components/ViewOne"; // Import the ViewOne component
import ViewTwo from "./components/ViewTwo"; // Import the ViewTwo component
import ViewToggle from "./components/ViewToggle"; // Import the ViewToggle component


export default function Dashboard() {
  return (
      <div className="h-screen w-full flex">
        <ViewToggle />
      </div>
  );
}