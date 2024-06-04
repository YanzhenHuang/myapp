/**
 * A data model retrieved from the database that represents a post.
 * @member {string} id - The unique identifier for the post.
 * @member {string} uid - The user id of the post sender.
 * @member {string} content - The textual content of the post.
 */
export interface PostModel {
    id: string;
    uid: string;
    content: string;
}

