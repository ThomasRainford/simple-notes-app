import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getAllNotesLists?: Maybe<Array<NotesList>>;
  getAllNotes?: Maybe<Array<Note>>;
  getNotesList?: Maybe<NotesListResponse>;
  getNote?: Maybe<NoteResponse>;
  me?: Maybe<User>;
};


export type QueryGetAllNotesArgs = {
  listId: Scalars['String'];
};


export type QueryGetNotesListArgs = {
  listId: Scalars['String'];
};


export type QueryGetNoteArgs = {
  noteLocation: NoteLocationInput;
};

export type NotesList = {
  __typename?: 'NotesList';
  _id: Scalars['ID'];
  id: Scalars['String'];
  user: User;
  notes: Array<Note>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  lists: Array<NotesList>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type NotesListResponse = {
  __typename?: 'NotesListResponse';
  notesList?: Maybe<NotesList>;
  errors?: Maybe<Array<Error>>;
};

export type Error = {
  __typename?: 'Error';
  property: Scalars['String'];
  message: Scalars['String'];
};

export type NoteResponse = {
  __typename?: 'NoteResponse';
  note?: Maybe<Note>;
  errors?: Maybe<Array<Error>>;
};

export type NoteLocationInput = {
  listId: Scalars['String'];
  noteId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createList: NotesList;
  addNote?: Maybe<NotesListResponse>;
  updateNote?: Maybe<NoteResponse>;
  deleteNotesList: Scalars['Boolean'];
  deleteNote: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateUser: UserResponse;
};


export type MutationAddNoteArgs = {
  noteInput: NoteInput;
  listId: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  updatedNoteFields: NoteUpdateInput;
  noteLocation: NoteLocationInput;
};


export type MutationDeleteNotesListArgs = {
  listId: Scalars['String'];
};


export type MutationDeleteNoteArgs = {
  noteLocation: NoteLocationInput;
};


export type MutationRegisterArgs = {
  registerInput: UserRegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type NoteInput = {
  title: Scalars['String'];
  text: Scalars['String'];
};

export type NoteUpdateInput = {
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserRegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  registerInput: UserRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type GetAllNotesListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNotesListsQuery = (
  { __typename?: 'Query' }
  & { getAllNotesLists?: Maybe<Array<(
    { __typename?: 'NotesList' }
    & Pick<NotesList, 'id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'username'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      username
      email
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($registerInput: UserRegisterInput!) {
  register(registerInput: $registerInput) {
    user {
      username
      email
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetAllNotesListsDocument = gql`
    query GetAllNotesLists {
  getAllNotesLists {
    id
    user {
      id
    }
  }
}
    `;

export function useGetAllNotesListsQuery(options: Omit<Urql.UseQueryArgs<GetAllNotesListsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllNotesListsQuery>({ query: GetAllNotesListsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    email
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};