export type Game = {
  title: string;
  url: string;
  // Feed may use different thumbnail keys; we keep them optional and resolve at use site
  thumbnail?: string;
  thumb?: string;
  image?: string;
  category?: string;
  description?: string;
  instructions?: string;
};

export type GamesResponse = Game[];


