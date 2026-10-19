export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    status: "draft" | "published";
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
    };
    category: {
        id: number;
        name: string;
    };
    cover_image: string | null;
}

export interface CategoryOption {
    id: number;
    name: string;
}

export interface PaginatedPosts {
    data: Post[];
    current_page: number;
    last_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface PostIndexProps {
    posts: PaginatedPosts;
}

export interface PostCreateProps {
    categories: CategoryOption[];
}
