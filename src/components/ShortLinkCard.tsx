import { Card, Group, Anchor, useMantineTheme, Text, Button, Flex, Divider, Space } from "@mantine/core";
import { MdContentCopy, MdShare, MdDelete, MdDone } from "react-icons/md";
import URL_UTILS from "../utils";
import { useLocalDBContext } from "../state/hooks/useLocalDB";
import { useClipboard } from "@mantine/hooks";

type ShortLinkCardProps = {
  url: string;
  shortLink: string;
  createdAt: number;
  id: string;
};

const ShortLinkCard = ({ id, url, shortLink, createdAt }: ShortLinkCardProps) => {
  const theme = useMantineTheme();
  const { removeShortLink } = useLocalDBContext();
  const clipboard = useClipboard({ timeout: 1000 });

  return (
    <Card
      shadow="sm"
      p="xl"
      radius="0"
      withBorder
      bg={theme.colors.brand[0]}
      className="card"
      id={`url-card-${new URL(URL_UTILS.makeProper(url)).href}`}
    >
      <Card.Section p={16}>
        <Flex
          direction="row"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Text size="xs" weight={500} color={theme.colors.brand[1]} mr={16}>
            {".CR/3AT3D"}
          </Text>
          <Text size="xs" weight={400}>
            {new Date(createdAt).toLocaleString()}
          </Text>
        </Flex>
      </Card.Section>
      <Divider size={1} />
      <Card.Section p={16}>
        <Group position="left" spacing={0}>
          <Text
            size="xs"
            weight={500}
            color={theme.colors.brand[1]}
            style={{ textAlign: "center", alignSelf: "center" }}
          >
            {".SH/0RT"}
          </Text>
          <Text
            size="xs"
            align="left"
            weight={500}
            sx={{
              backgroundColor: "black",
              padding: 4,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <Anchor
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: theme.colors.brand[0] }}
            >
              {shortLink}
            </Anchor>
          </Text>
        </Group>
        <Group position="left" spacing={0}>
          <Text size="xs" weight={500} color={theme.colors.brand[1]}>
            {".0R/IGIN"}
          </Text>
          <Text
            size="xs"
            weight={500}
            align="left"
            sx={{
              backgroundColor: "black",
              padding: 4,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <Anchor
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.colors.brand[0],
              }}
            >
              {url}
            </Anchor>
          </Text>
        </Group>
      </Card.Section>
      <Divider size={1} />
      <Card.Section p={16}>
        <Group position="center" spacing="sm" w={"100%"}>
          <Flex
            w={"100%"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={async (event: { preventDefault: () => void }) => {
                event.preventDefault();
                clipboard.copy(shortLink);
              }}
              variant="subtle"
              bg={theme.colors.brand[1]}
              color={theme.colors.brand[0]}
              className="url-buttons"
              id={`copy-${id}`}
              sx={{
                borderRadius: 0,
                border: 0,
              }}
              w={"100%"}
            >
              {clipboard.copied ? <MdDone color="white" /> : <MdContentCopy color="white" />}
            </Button>

            <Space w={1} />

            {/* 
          !TODO!
          Make a Share Page that allows users to share their short links
        */}
            <Button
              onClick={async (event: { preventDefault: () => void }) => {
                event.preventDefault();
                navigator.share
                  ? navigator.share({
                      title: "Shortened URL",
                      text: "Check out this shortened URL!",
                      url: shortLink,
                    })
                  : URL_UTILS.navigateTo(url);
              }}
              variant="subtle"
              bg={theme.colors.brand[1]}
              color={theme.colors.brand[0]}
              id={`share-${id}`}
              sx={{
                borderRadius: 0,
                border: 0,
              }}
              w={"100%"}
            >
              <MdShare color="white" />
            </Button>

            <Space w={1} />

            <Button
              variant="subtle"
              bg={theme.colors.brand[1]}
              color={theme.colors.brand[0]}
              id={`delete-${id}`}
              onClick={(event: { preventDefault: () => void }) => {
                event.preventDefault();
                removeShortLink(id);
              }}
              sx={{
                borderRadius: 0,
                border: 0,
              }}
              w={"100%"}
            >
              <MdDelete color="white" />
            </Button>
          </Flex>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ShortLinkCard;
