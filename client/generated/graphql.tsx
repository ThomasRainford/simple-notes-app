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
  title: Scalars['String'];
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
  updateNotesList: NotesListResponse;
  addNote?: Maybe<NoteResponse>;
  updateNote?: Maybe<NoteResponse>;
  deleteNotesList: Scalars['Boolean'];
  deleteNote: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: User;
  updateUser: UserResponse;
};


export type MutationCreateListArgs = {
  title: Scalars['String'];
};


export type MutationUpdateNotesListArgs = {
  newTitle: Scalars['String'];
  listId: Scalars['String'];
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

export type AddNoteMutationVariables = Exact<{
  listId: Scalars['String'];
  noteInput: NoteInput;
}>;


export type AddNoteMutation = (
  { __typename?: 'Mutation' }
  & { addNote?: Maybe<(
    { __typename?: 'NoteResponse' }
    & { note?: Maybe<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'title' | 'text'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )>> }
  )> }
);

export type CreateListMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createList: (
    { __typename?: 'NotesList' }
    & Pick<NotesList, '_id' | 'title'>
  ) }
);

export type DeleteNoteMutationVariables = Exact<{
  noteLocation: NoteLocationInput;
}>;


export type DeleteNoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNote'>
);

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
  & { logout: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
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

export type UpdateNoteMutationVariables = Exact<{
  noteLocation: NoteLocationInput;
  updatedNoteFields: NoteUpdateInput;
}>;


export type UpdateNoteMutation = (
  { __typename?: 'Mutation' }
  & { updateNote?: Maybe<(
    { __typename?: 'NoteResponse' }
    & { note?: Maybe<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'title' | 'text'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )>> }
  )> }
);

export type GetAllNotesListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllNotesListsQuery = (
  { __typename?: 'Query' }
  & { getAllNotesLists?: Maybe<Array<(
    { __typename?: 'NotesList' }
    & Pick<NotesList, 'id' | 'title'>
    & { notes: Array<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'title' | 'text'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  )>> }
);

export type GetNotesListQueryVariables = Exact<{
  listId: Scalars['String'];
}>;


export type GetNotesListQuery = (
  { __typename?: 'Query' }
  & { getNotesList?: Maybe<(
    { __typename?: 'NotesListResponse' }
    & { notesList?: Maybe<(
      { __typename?: 'NotesList' }
      & Pick<NotesList, 'id'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'Error' }
      & Pick<Error, 'property' | 'message'>
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'username'>
  )> }
);


export const AddNoteDocument = gql`
    mutation AddNote($listId: String!, $noteInput: NoteInput!) {
  addNote(listId: $listId, noteInput: $noteInput) {
    note {
      id
      title
      text
    }
    errors {
      property
      message
    }
  }
}
    `;

export function useAddNoteMutation() {
  return Urql.useMutation<AddNoteMutation, AddNoteMutationVariables>(AddNoteDocument);
};
export const CreateListDocument = gql`
    mutation CreateList($title: String!) {
  createList(title: $title) {
    _id
    title
  }
}
    `;

export function useCreateListMutation() {
  return Urql.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument);
};
export const DeleteNoteDocument = gql`
    mutation DeleteNote($noteLocation: NoteLocationInput!) {
  deleteNote(noteLocation: $noteLocation)
}
    `;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
};
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
  logout {
    id
  }
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
export const UpdateNoteDocument = gql`
    mutation UpdateNote($noteLocation: NoteLocationInput!, $updatedNoteFields: NoteUpdateInput!) {
  updateNote(noteLocation: $noteLocation, updatedNoteFields: $updatedNoteFields) {
    note {
      id
      title
      text
    }
    errors {
      property
      message
    }
  }
}
    `;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
};
export const GetAllNotesListsDocument = gql`
    query GetAllNotesLists {
  getAllNotesLists {
    id
    title
    notes {
      id
      title
      text
    }
    user {
      id
    }
  }
}
    `;

export function useGetAllNotesListsQuery(options: Omit<Urql.UseQueryArgs<GetAllNotesListsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllNotesListsQuery>({ query: GetAllNotesListsDocument, ...options });
};
export const GetNotesListDocument = gql`
    query GetNotesList($listId: String!) {
  getNotesList(listId: $listId) {
    notesList {
      id
    }
    errors {
      property
      message
    }
  }
}
    `;

export function useGetNotesListQuery(options: Omit<Urql.UseQueryArgs<GetNotesListQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetNotesListQuery>({ query: GetNotesListDocument, ...options });
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