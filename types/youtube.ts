export interface Video {
  id: string;
  videoName?: string;
}

export interface Category {
  title: string;
  videos: Video[];
}
