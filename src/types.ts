export type UserRole = 'learner' | 'teacher';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  comments: number;
  category: string;
  image: string;
  excerpt: string;
  content?: string;
}
