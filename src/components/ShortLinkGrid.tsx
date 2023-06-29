import { useMemo } from "react";
import { Container, Flex, createStyles } from "@mantine/core";
import { useLocalDBContext } from "../state/hooks/useLocalDB";
import { ShortLink } from "../constants";
import ShortLinkCard from "./ShortLinkCard";

const ShortenedUrlGrid = () => {
  const { classes } = useStyles();
  const { shortLinks } = useLocalDBContext();

  const shortLinksArray = useMemo(() => Object.entries(shortLinks), [shortLinks]);

  return (
    <Container fluid px="64px" align="center">
      <Flex sx={classes.flexWrap}>
        {shortLinksArray.map((shortLinkIdTuple: [string, ShortLink]) => {
          const [, shortLinkData] = shortLinkIdTuple;

          return (
            <Flex direction="column" sx={classes.mediaSizes} key={shortLinkData.id}>
              <ShortLinkCard {...shortLinkData} />
            </Flex>
          );
        })}
      </Flex>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  flexWrap: {
    flexWrap: "wrap",
  },
  mediaSizes: {
    "@media (max-width: 768px)": {
      width: "100%",
    },
    "@media (min-width: 768px)": {
      width: "50%",
    },
    "@media (min-width: 1024px)": {
      width: "33%",
    },
    "@media (min-width: 1440px)": {
      width: "25%",
    },
  },
}));

export default ShortenedUrlGrid;
