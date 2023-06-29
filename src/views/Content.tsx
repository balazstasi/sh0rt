import About from "../components/About";
import UrlInput from "../components/ShortLinkInput";
import ShortenedUrlGrid from "../components/ShortLinkGrid";
import { useLocalDBContext } from "../state/hooks/useLocalDB";
import { Container, LoadingOverlay, Overlay, Space, createStyles, useMantineTheme } from "@mantine/core";
import URL_UTILS from "../utils";
import { useEffect, useState } from "react";
import Logo from "../images/logos/black_transparent.png";
import { Text, Image } from "@mantine/core";

const Content = () => {
  const { getShortLinkBy } = useLocalDBContext();
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useMantineTheme();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Overlay>
        <Space h="xl" />
        <Container align="center">
          <Image src={Logo} size="xl" />
          <LoadingOverlay visible={loading}></LoadingOverlay>
        </Container>
      </Overlay>
    );
  }

  const toRedirect = getShortLinkBy("shortLink", window.location.href);
  if (toRedirect != null) {
    setLoading(false);
    URL_UTILS.navigateTo(toRedirect.url);
  }

  return (
    <Container fluid sx={classes.container}>
      <About />
      <UrlInput />
      <ShortenedUrlGrid />
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    background: theme.colors.brand[1],
    padding: 0,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 500,
  },
}));

export default Content;
