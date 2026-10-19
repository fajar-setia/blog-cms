import type {
    Post,
    PaginatedPosts,
} from '../../posts/types/post.types';

export interface BlogIndexProps {
    posts: PaginatedPosts;
}

export interface BlogShowProps {
    post: Post;
}