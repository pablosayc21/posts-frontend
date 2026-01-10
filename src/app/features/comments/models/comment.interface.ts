export interface PostComment {
    _id: string;
    postId: string;
    name: string;
    email?: string;
    body: string;
    createdAt: string;
}