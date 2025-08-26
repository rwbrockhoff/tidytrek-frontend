// Frontend types using camelCase convention
export type SavedPack = {
	packId: number;
	packName: string;
	packDescription: string | null;
	packPhotoUrl: string | null;
	username: string;
	profilePhotoUrl: string | null;
};

export type SavedPacksQueryState = {
	savedPacks: SavedPack[];
};

export type GetSavedPacksRequest = {
	bookmarks: SavedPack[];
};

export type BookmarkPackData = {
	packId: number;
};
