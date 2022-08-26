import NavBar from "../components/NavBar"
import BreadCrumbs from "../components/Breadcrumbs";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

import { Routes, Route } from "react-router-dom";
import Error from "../components/Error";

const AuthPage = () => {
  return (
    <>
      <NavBar />
      <div style={{
        margin: "6em auto",
        width: "fit-content",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}>
        <BreadCrumbs />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Error error={404} />} />
        </Routes>
      </div>
    </>
  )
}

export default AuthPage;