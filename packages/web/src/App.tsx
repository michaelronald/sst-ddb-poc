import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import {
  Customers,
  Dashboard,
  NoMatch,
  Payments,
  Programs,
  TrainingAndCertification,
  Vendors,
} from "./pages";
import { NAV_LINKS_PATH } from "./utils/constants";
import { Layout } from "./Layout";

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Routes>
            <Route path={NAV_LINKS_PATH.Dashboard} element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path={NAV_LINKS_PATH.Vendors} element={<Vendors />} />
              <Route path={NAV_LINKS_PATH.Programs} element={<Programs />} />
              <Route
                path={NAV_LINKS_PATH.TrainingAndCertification}
                element={<TrainingAndCertification />}
              />
              <Route path={NAV_LINKS_PATH.Payments} element={<Payments />} />
              <Route path={NAV_LINKS_PATH.Customers} element={<Customers />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </BrowserRouter>
  );
}
