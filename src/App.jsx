import "./App.css";
import AppLayout from "./layout/AppLayout";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnBoarding from "./pages/OnBoarding";
import AuthProvider from "./components/features/AuthProvider";
import JobListings from "./pages/JobListings";
import PostJob from "./pages/PostJob";
import Job from "./pages/Job";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },

        {
          path: "/onboarding",
          element: (
            <AuthProvider>
              <OnBoarding />
            </AuthProvider>
          ),
        },
        {
          path: "/job-list",
          element: (
            <AuthProvider>
              <JobListings />
            </AuthProvider>
          ),
        },
        {
          path: "/post-job",
          element: (
            <AuthProvider>
              <PostJob />
            </AuthProvider>
          ),
        },
        {
          path: "/job/:id",
          element: (
            <AuthProvider>
              <Job />
            </AuthProvider>
          ),
        },
      ],
    },
  ]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
