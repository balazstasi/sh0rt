import { Container, Button, TextInput, useMantineTheme, MantineTheme, Text } from "@mantine/core";
import { useState } from "react";
import { ShortLink } from "../constants";
import { useLocalDBContext } from "../state/hooks/useLocalDB";
import { useBlinkURL } from "../utils/hooks/useBlinkURL";
import URL_UTILS from "../utils";

const UrlInput = () => {
  const theme = useMantineTheme();
  const { addShortLink, getShortLinkBy } = useLocalDBContext();

  const [url, setUrl] = useState<string>("");
  const { blink } = useBlinkURL(url, () => setUrl(""));

  function isValidURL(str: string) {
    const pattern = new RegExp(
      "^([a-zA-Z]+:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    );
    return pattern.test(str);
  }

  const handleSubmit = async () => {
    //-> Invalid URL
    if (!isValidURL(url)) {
      setUrl("Invalid URL");
      setTimeout(() => {
        setUrl("");
      }, 2000);
      return;
    }

    //-> Already existing URL -> blink the card
    if (getShortLinkBy("url", new URL(URL_UTILS.makeProper(url)).href)) {
      setUrl("URL already exists, check the highlighted card below!");
      blink(new URL(URL_UTILS.makeProper(url)).href);
      return;
    }

    //-> Adding new short URLs
    const shortLinkToStore: Partial<ShortLink> = {
      url: new URL(URL_UTILS.makeProper(url)).href,
      createdAt: Date.now(),
    };

    addShortLink(shortLinkToStore);
    setUrl("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <Container
      align="center"
      id="shorten-url-input"
      fluid
      alignSelf="center"
      sx={{
        maxWidth: "80%",
        minWidth: "80%",
        marginBottom: 64,
      }}
    >
      <Text
        sx={{ textAlign: "left" }}
        color={theme.colors.brand[0]}
        weight={300}
        size={12}
        py={1}
        mb={8}
        mt={16}
      >
        .sh0/rten your links here!
      </Text>
      <TextInput
        onSubmit={handleSubmit}
        onChange={handleChange}
        withAsterisk={false}
        value={url}
        autoFocus={false}
        placeholder="Paste a link here..."
        variant="filled"
        radius={0}
        size="lg"
        required
        rightSectionWidth={120}
        id="url-input"
        color={theme.colors.brand[0]}
        border={1}
        rightSection={
          <Button
            id="url-input-button"
            onClick={(event: { preventDefault: () => void }) => {
              event.preventDefault();
              document?.getElementById("url-input")?.focus();
              handleSubmit();
            }}
            variant="filled"
            size="md"
            radius="md"
            color="white"
            mr={0}
            border={1}
            tabIndex={-1}
            type="submit"
          >
            Shorten It!
          </Button>
        }
        onKeyDown={(event: { key: string; preventDefault: () => void }) => {
          if (event.key === "Enter") {
            event.preventDefault();
            document?.getElementById("url-input-button")?.click();
            document?.getElementById("url-input")?.blur();
            handleSubmit();
          }
        }}
        autoComplete="off"
        styles={(theme: MantineTheme) => ({
          input: {
            "&:-webkit-autofill::placeholder": {
              color: theme.colors.brand[0],
            },
            "&:focus-within": {
              boxShadow: `0 0 0 2px ${theme.colors.brand[0]} !important`,
            },
            "::placeholder": {
              color: theme.colors.brand[0],
              fontWeight: "lighter",
              fontFamily: theme.fontFamily,
              fontSize: "1rem",
            },
            color: theme.colors.brand[0],
            borderColor: theme.colors.brand[0],
            backgroundColor: theme.colors.brand[1],
          },
        })}
      />
    </Container>
  );
};

export default UrlInput;
