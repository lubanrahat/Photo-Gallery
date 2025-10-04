import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./routes/homepage/homepage";
import { BrowserRouter, Route, Routes } from "react-router";
import CreatePage from "./routes/createPage/createPage";
import PostPage from "./routes/postPage/postPage";
import AuthPage from "./routes/authPage/authPage";
import ProfilePage from "./routes/profilePage/profilePage";
import SearchPage from "./routes/searchPage/searchPage";
import MainaLayout from "./routes/layout/mainaLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainaLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/pin/:id" element={<PostPage />} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
