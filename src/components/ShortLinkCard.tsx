import { Card, Group, Anchor, useMantineTheme, Text, Button, Flex, Divider, Space } from "@mantine/core";
import { MdContentCopy, MdShare, MdDelete, MdDone, MdDeleteForever } from "react-icons/md";
import URL_UTILS from "../utils";
import { useLocalDBContext } from "../state/hooks/useLocalDB";
import { useClipboard } from "@mantine/hooks";
import { useEffect, useState } from "react";

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

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    if (confirmDelete) {
      setTimeout(() => {
        setConfirmDelete(false);
      }, 2000);
    }
  }, [confirmDelete]);

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
          <Text size="xs" weight={500} color={theme.colors.brand[1]} mr={16} id="timestamp-label">
            {".CR/3AT3D"}
          </Text>
          <Text size="xs" weight={400} color={theme.colors.brand[1]} id="timestamp">
            {new Date(createdAt).toLocaleString()}
          </Text>
        </Flex>
      </Card.Section>
      <Divider size={1} id="divider" />
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
          <Text size="xs" weight={500} color={theme.colors.brand[1]} id="origin-label">
            {".0R/IGIN"}
          </Text>
          <Text
            id="origin-bg"
            size="xs"
            weight={500}
            align="left"
            color={theme.colors.brand[0]}
            sx={{
              backgroundColor: theme.colors.brand[1],
              padding: 4,
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <Anchor id="origin" href={url} target="_blank" rel="noopener noreferrer">
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

            {/*!TODO! Make a Share Page that allows users to share their short links -> This one was a bit tricky so I left it out */}
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
                if (!confirmDelete) {
                  setConfirmDelete(true);
                  return;
                }

                removeShortLink(id);
              }}
              sx={{
                borderRadius: 0,
                border: 0,
              }}
              w={"100%"}
            >
              {confirmDelete ? (
                <MdDeleteForever color={theme.colors.brand[0]} />
              ) : (
                <MdDelete color={theme.colors.brand[0]} />
              )}
            </Button>
          </Flex>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ShortLinkCard;
