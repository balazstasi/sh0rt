import About from "../components/About";
import UrlInput from "../components/ShortLinkInput";
import ShortenedUrlGrid from "../components/ShortLinkGrid";
import { useLocalDBContext } from "../state/hooks/useLocalDB";
import { Container, createStyles } from "@mantine/core";

const Content = () => {
  const { getShortLinkBy } = useLocalDBContext();
  const { classes } = useStyles();

  const toRedirect = getShortLinkBy("shortLink", window.location.href);
  if (toRedirect != null) {
    window.location.href = toRedirect.url;
  }

  return (
    <Container sx={classes.container}>
      <About />
      <UrlInput />
      <ShortenedUrlGrid />
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: 24,
    marginBottom: 24,
    minWidth: "100%",
    minHeight: "100vh",
    background: theme.colors.brand[1],
  },
}));

export default Content;
