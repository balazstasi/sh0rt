export interface ShortLink {
  id: string;
  url: string;
  createdAt: number;
  shortLink: string;
}

export type WithId<T> = T & {
  id: string; // concat of two words (e.g. "blue" + "car" = "bluecar") + random number -> "localhost:3000/bluecar42" -> Possible to memorize
};

export type TypedDict<T> = {
  [key: string]: T;
};

export const InitialState = {
  shortLinks: {} as TypedDict<ShortLink>,
};
