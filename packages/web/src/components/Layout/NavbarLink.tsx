import { createStyles, rem, Tooltip, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  to: string;
  active?: boolean;
  onClick?(): void;
}

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export function NavbarLink({
  icon: Icon,
  label,
  to,
  active,
  onClick,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={to}>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: active })}
        >
          <Icon size={20} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}
