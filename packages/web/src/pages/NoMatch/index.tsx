import { Link } from "react-router-dom";
import { Stack, Text } from "@mantine/core";

export default function NoMatch() {
  return (
    <div>
      <Stack>
        <Text fw={700} fz={32} c="blue">
          404 - Not Found
        </Text>
        <Text>
          <Link to="/">Go to the home page</Link>
        </Text>
      </Stack>
    </div>
  );
}
