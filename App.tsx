import "@/styles/global.css";

import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "@/components/Toast";

import { Profile } from "@/app/Profile";
import { Login } from "@/app/Login";

export default function App() {
  return (
    <ToastProvider position="top">
      <Login />
      <StatusBar style="dark" />
    </ToastProvider>
  );
}
