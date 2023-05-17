import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Flex,
  Image,
  ActionIcon,
  useMantineColorScheme,
  Stack,
} from "@mantine/core";
import { Sun, Moon } from "lucide-react";
import { NavbarLink } from "./components";
import ChannlWorksLogo from "./assets/channlworks-logo.png";
import { NAV_LINKS } from "./utils/constants";

export function Layout() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const dark = colorScheme === "dark";

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
              {NAV_LINKS.map((link, index) => (
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
        <Header height={{ base: 90 }} p="lg">
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
