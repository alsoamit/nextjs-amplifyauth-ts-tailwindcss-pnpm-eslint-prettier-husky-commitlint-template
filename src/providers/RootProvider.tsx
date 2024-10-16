"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "@/config/amplify.config";
import Navbar from "@/components/layout/Navbar";

Amplify.configure(amplifyConfig, { ssr: true });

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
