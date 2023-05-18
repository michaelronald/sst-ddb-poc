import { useQuery } from "@tanstack/react-query";
import { listVendors } from "./api";
import { LoadingOverlay, Stack, Table, Text } from "@mantine/core";
import { Check, X } from "lucide-react";

export default function Vendors() {
  const { data, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: listVendors,
  });

  const cols = (
    <tr>
      <th>Vendor Name</th>
      <th>Description</th>
      <th>Contact Person</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  );

  const rows = data?.map((row) => (
    <tr key={row.vendorName}>
      <td>{row.vendorName}</td>
      <td>{row.description}</td>
      <td>{row.contactPerson}</td>
      <td>{row.contactPhone}</td>
      <td>{row.contactEmail}</td>
      <td>{row.status === "active" ? <Check /> : <X />}</td>
    </tr>
  ));

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
        Vendors
      </Text>
      <Table withBorder highlightOnHover>
        <thead>{cols}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  );
}
