import About from "../components/About";
import UrlInput from "../components/ShortLinkInput";
import ShortenedUrlGrid from "../components/ShortLinkGrid";
import { useLocalDBContext } from "../state/hooks/useLocalDB";
import {
  Container,
  Flex,
  Loader,
  LoadingOverlay,
  Overlay,
  Space,
  Text,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import URL_UTILS from "../utils";
import { useCallback, useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Image } from "@mantine/core";
import Footer from "../components/Footer";
import { useDebouncedValue } from "@mantine/hooks";

const Content = () => {
  const { getShortLinkBy } = useLocalDBContext();
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useMantineTheme();

  const [showFooter, setShowFooter] = useState<boolean>(false);
  const [showFooterDebounced] = useDebouncedValue(showFooter, 100);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // If we ar at the bottom of the page show the footer
      // Upon scrolling a little up hide it again
      setShowFooter(window.innerHeight + window.scrollY >= document.body.offsetHeight - 2);
    });
  }, [setShowFooter, theme.spacing.xl]);

  const redirect = useCallback(() => {
    const toRedirect = getShortLinkBy("shortLink", window.location.href);
    if (toRedirect != null) {
      setLoading(false);
      URL_UTILS.navigateTo(toRedirect.url);
    }
  }, [getShortLinkBy]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (window.location.href.split("/").length < 4) return;
      redirect();
    }, 1000);
  }, [redirect]);

  if (loading) {
    return (
      <Overlay>
        <Space h="xl" />
        <Container align="center">
          <Image src={Logo} size="xl" />
          <LoadingOverlay visible={loading} />
          <Loader
            variant={window.location.href.split("/").length < 4 ? "dots" : "dots"}
            color="white"
            size={64}
          />
          <Space h={64} />
          {window.location.href.split("/").length >= 4 && (
            <Text
              size={32}
              weight={700}
              color={theme.colors.brand[1]}
              bg={theme.colors.brand[0]}
              w="fill-content"
            >
              <Text mb={16}>
                {`Redirecting to:
                ${
                  new URL(getShortLinkBy("shortLink", window.location.href)?.url ?? "https://I.DK/")?.hostname
                }`}
              </Text>
            </Text>
          )}
        </Container>
      </Overlay>
    );
  }

  return (
    <Container fluid sx={classes.container}>
      <Flex direction="column" align="center" justify="space-between">
        <Container>
          <About />
          <UrlInput />
          <ShortenedUrlGrid />
          {showFooterDebounced && <Footer />}
        </Container>
      </Flex>
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
