import { useState } from "react";
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Flex,
  Image,
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  ActionIcon,
  useMantineColorScheme,
  Stack,
} from "@mantine/core";
import {
  Sun,
  Moon,
  LayoutDashboard,
  Check,
  ClipboardCheck,
  DollarSign,
  Users,
  Building2,
} from "lucide-react";
import { NavbarLink } from "./components";
import {
  Customers,
  Dashboard,
  NoMatch,
  Payments,
  Programs,
  TrainingAndCertification,
  Vendors,
} from "./pages";
import ChannlWorksLogo from "./assets/channlworks-logo.png";
import { NAV_LINKS } from "./utils/constants";

const links = [
  { icon: LayoutDashboard, label: "Dashboard", to: NAV_LINKS.Dashboard },
  { icon: Building2, label: "Vendors", to: NAV_LINKS.Vendors },
  { icon: Check, label: "Programs", to: NAV_LINKS.Programs },
  {
    icon: ClipboardCheck,
    label: "Training & Certification",
    to: NAV_LINKS.TrainingAndCertification,
  },
  { icon: DollarSign, label: "Payments", to: NAV_LINKS.Payments },
  { icon: Users, label: "Customers", to: NAV_LINKS.Customers },
];

function Layout() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const dark = colorScheme === "dark";

  const API_URL = import.meta.env.VITE_APP_API_URL;

  console.log("API", API_URL);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ base: 100 }}
        >
          <Navbar.Section grow mt={10}>
            <Stack justify="center" spacing={20}>
              {links.map((link, index) => (
                <NavbarLink
                  {...link}
                  key={link.label}
                  active={index === active}
                  onClick={() => setActive(index)}
                />
              ))}
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 90, md: 110 }} p="lg">
          <Flex
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <Image src={ChannlWorksLogo} width={180} alt="ChannlWorks logo" />
              <ActionIcon
                variant="transparent"
                color={dark ? "yellow" : "blue"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? <Sun /> : <Moon />}
              </ActionIcon>
            </Flex>
          </Flex>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}

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
            <Route path={NAV_LINKS.Dashboard} element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path={NAV_LINKS.Vendors} element={<Vendors />} />
              <Route path={NAV_LINKS.Programs} element={<Programs />} />
              <Route
                path={NAV_LINKS.TrainingAndCertification}
                element={<TrainingAndCertification />}
              />
              <Route path={NAV_LINKS.Payments} element={<Payments />} />
              <Route path={NAV_LINKS.Customers} element={<Customers />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </BrowserRouter>
  );
}
