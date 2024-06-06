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

/**
 * A data model used for user registration.
 * @member {string} username - The username of the user.
 * @member {string} email - The email address of the user.
 * @member {string} password - The password of the user.
 * @member {string} passwordConfirm - The confirmation of the password.
 * @member {Blob} avatar - The avatar of the user.
 */
export interface UserRegisterModel {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    avatar: Blob;
}


/**
 * A generic state management interface for React components.
 * @member {T} state - The current state value.
 * @member {(newState: T) => void} setState - A function to update the state.
 */
export interface ReactGetSetState<T> {
    state: T;
    setState: (newState: T) => void;
}
