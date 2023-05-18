import {
  Group,
  Paper,
  createStyles,
  rem,
  Text,
  Stack,
  LoadingOverlay,
} from "@mantine/core";
import { UserPlus2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_LINKS_PATH } from "../../utils/constants";
import { getDashboardDetails } from "./api";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: count, isLoading } = useQuery({
    queryKey: ["dashboard-details"],
    queryFn: getDashboardDetails,
  });

  if (isLoading) {
    return (
      <>
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          loaderProps={{
            variant: "bars",
          }}
        />
      </>
    );
  }

  return (
    <Stack>
      <Text fw={700} fz={32} c="blue">
        Dashboard
      </Text>
      <Link to={NAV_LINKS_PATH.Vendors} style={{ textDecoration: "none" }}>
        <Card count={count} />
      </Link>
    </Stack>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

function Card({ count }: { count: number }) {
  const { classes } = useStyles();

  return (
    <Paper withBorder p="md" radius="md" key={"Vendors"} w={300}>
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          Vendors
        </Text>
        <UserPlus2 className={classes.icon} size={25} />
      </Group>
      <Group align="flex-end" spacing="xs" mt={25}>
        <Text className={classes.value}>{count}</Text>
        <Text color={"teal"} fz="sm" fw={500} className={classes.diff}>
          <ArrowUpRight size={20} />
        </Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous month
      </Text>
    </Paper>
  );
}
