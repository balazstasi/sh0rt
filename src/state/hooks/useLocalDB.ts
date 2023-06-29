import { useLocalStorage } from "@mantine/hooks";
import { InitialState, ShortLink, TypedDict, WithId } from "../../constants";
import { useRandomWord } from "../../utils/hooks/useRandomWord";
import createContainer from "constate";

const useLocalDB = () => {
  const [shortLinks, setShortLinks] = useLocalStorage<TypedDict<ShortLink>>({
    key: "shortLinks",
    defaultValue: InitialState.shortLinks,
  });

  const { randomWord: generateWordId } = useRandomWord();

  const updateShortLinks = (newShortLinks: TypedDict<ShortLink>): void => {
    setShortLinks(newShortLinks);
  };

  const addShortLink: (shortLink: Partial<ShortLink>) => void = (shortLink) => {
    const shortLinkToAdd: Partial<WithId<ShortLink>> = shortLink;
    const id = `${generateWordId()}-${generateWordId()}-${Math.floor(Math.random() * 100)}`;
    shortLinkToAdd["shortLink"] = `${window.location.origin}/${id}`;
    shortLinkToAdd["id"] = id;
    const newShortLinks = { ...shortLinks };
    newShortLinks[id] = shortLinkToAdd as ShortLink;

    updateShortLinks(newShortLinks);
    console.info("useLocalDB: Added short link", shortLinkToAdd);
  };

  const removeShortLink = (id: string): void => {
    const newShortLinks = { ...shortLinks };
    delete newShortLinks[id];
    updateShortLinks(newShortLinks);
  };

  const getShortLinkBy = (key: keyof ShortLink, value: string): ShortLink | undefined => {
    const shortLink = Object.values(shortLinks).find((shortLink: ShortLink) => shortLink[key] === value);
    return shortLink;
  };

  const updateShortLink = (id: string, by: Partial<ShortLink>): void => {
    const newShortLinks = { ...shortLinks };
    newShortLinks[id] = { ...newShortLinks[id], ...by };
    updateShortLinks(newShortLinks);
  };

  return {
    shortLinks,
    addShortLink,
    removeShortLink,
    updateShortLink,
    getShortLinkBy,
  };
};

export const [LocalDBProvider, useLocalDBContext] = createContainer(useLocalDB);
