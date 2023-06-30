import {
  useMantineTheme,
  Container,
  Grid,
  Text,
  Group,
  Avatar,
  UnstyledButton,
  Anchor,
  Code,
  Divider,
  createStyles,
} from "@mantine/core";
import { MdLocalFireDepartment } from "react-icons/md";

const Footer = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Container sx={classes.footer} id="footer">
      <Divider size={1} mb={16} />

      <Grid px={16}>
        <Grid.Col xs={12} sm={8} md={8} lg={8}>
          <Text size="xs" weight={700} color="white" mb={10}>
            --- URL Shortener ---
          </Text>

          <Text color="white" mb="5px">
            Made for an interview, really simple, made in a day as discussed. :) <br /> Hope you like it!
          </Text>
        </Grid.Col>

        <Grid.Col xs={12} sm={4} md={4} lg={4}>
          <Code sx={classes.footerCard} p={32}>
            <Text px={8} py={4}>
              Made by:
            </Text>
            <Anchor href="https://github.com/balazstasi">
              <UnstyledButton>
                <Group p={8}>
                  <Avatar size={40} bg={theme.colors.brand[0]}>
                    <MdLocalFireDepartment color={theme.colors.brand[1]} />
                  </Avatar>
                  <div>
                    <Text color="white">Tasi</Text>
                    <Text size="xs" color="white">
                      balazstasi@tuta.io
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
            </Anchor>
          </Code>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor: theme.colors.brand[1],
    clear: "both",
    width: "100vw",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },

  footerCard: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    padding: 32,
    color: theme.colors.brand[0],
    backgroundColor: theme.colors.brand[1],
  },
}));

export default Footer;
