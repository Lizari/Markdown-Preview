export type Article = {
  id: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  content: string;
};