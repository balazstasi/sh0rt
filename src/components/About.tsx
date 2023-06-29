import {
  Container,
  Text,
  Button,
  Image,
  useMantineColorScheme,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import { MdOutlineArrowDownward } from "react-icons/md";
import { Link } from "react-scroll";
import Logo from "../Images/logos/black_transparent.png";

const About = () => {
  const theme = useMantineTheme();
  const { classes } = useStyle();

  return (
    <section id="about">
      <Container fluid sx={classes.container}>
        <Container bg={theme.colors.brand[1]} color={theme.colors.brand[0]}>
          <Container sx={classes.title}>
            <Image src={Logo} alt={"sample1"} m="auto" mb={"16vh"} style={{ width: "48%" }} />
            <Text variant="text" weight={400} size="md" className="desc">
              <Text color={theme.colors.brand[0]} size={32}>
                Save & Access
              </Text>
              <Text color={theme.colors.brand[0]} size={16}>
                all your links from one place
              </Text>
              <Text color={theme.colors.brand[0]} size={32}>
                .sh/0rt & simple
              </Text>
            </Text>
            <Link to="shorten-url-input" smooth duration={500}>
              <Button
                size="lg"
                variant="filled"
                radius={0}
                bg={theme.colors.brand[0]}
                color={theme.colors.brand[1]}
                w="fit-content"
                border={0}
                h={60}
                mt={12}
                mb={12}
                margin="auto"
                rightIcon={<MdOutlineArrowDownward color={theme.colors.brand[1]} />}
              >
                <Text color={theme.colors.brand[1]}>Click here to get started</Text>
              </Button>
            </Link>
          </Container>
        </Container>
      </Container>
    </section>
  );
};

const useStyle = createStyles((theme) => ({
  container: {
    marginTop: 16,
    marginBottom: 16,
    minWidth: "100vw",
    minHeight: "100vh",
    maxWidth: "100%",
    overflowX: "hidden",
    background: theme.colors.brand[1],
  },

  title: {
    textAlign: "center",
    margin: "auto",
    fontFamily: "Archivo Narrow, sans-serif",
  },

  desc: {
    color: "white",
    textAlign: "center",
    margin: "auto",
    fontFamily: "Archivo Narrow, sans-serif",
  },
}));

export default About;
