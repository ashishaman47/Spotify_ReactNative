/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
  About: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
  AlbumScreen: undefined;
};

export type TabTwoParamList = {
  SearchScreen: undefined;
};

export type TabThreeParamList = {
  LibraryScreen: undefined;
}

export type TabFourParamList = {
  AboutScreen: undefined;
}

// Here we'll define standard typr of an album and we'll be able to import this type and use it wherever we'll need this type --> in order not to write again and again
export type Album = {
  id: string,
  imageUri: string,
  artistsHeadline: string,
  name: string,
  by: string,
  numberOfLikes: number,
}

export type Song = {
  id: string,
  imageUri: string,
  title: string,
  artist: string,
}