import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: string;
};

/** Category object */
export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String'];
};

export type CategoryInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

/** Item object */
export type Item = {
  __typename?: 'Item';
  category: Category;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
};

/** Input for new Item */
export type ItemInput = {
  category: CategoryInput;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
};

/** List of Category and ListItems that belong to that Category, for ShoppingList */
export type List = {
  __typename?: 'List';
  category: Category;
  items?: Maybe<Array<Maybe<ListItem>>>;
};

/** Input for List in ShoppingList */
export type ListInput = {
  category: Scalars['ID'];
  items: Array<Maybe<ListItemInput>>;
};

/** Item and item specific fields for the ShoppingList' list field */
export type ListItem = {
  __typename?: 'ListItem';
  completed: Scalars['Boolean'];
  item: Item;
  pcs: Scalars['Int'];
};

/** Input for ListItem in ShoppingList */
export type ListItemInput = {
  completed: Scalars['Boolean'];
  /** ID as Item ID */
  item: Scalars['ID'];
  pcs: Scalars['Int'];
};

/** Object for an array of monthly picked items of an User */
export type MonthlySummary = {
  __typename?: 'MonthlySummary';
  itemCount?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add new item and create a new category if it doesent exist */
  itemAddOne?: Maybe<Item>;
  /**
   * Complete or cancel ShoppingList with updated List,
   * add it to User' history, calculate statistics and set User openList to null
   */
  shoppingListFinish?: Maybe<User>;
  /** Saves User's openList. If User doesen't have an openList, creates it. */
  shoppingListSave?: Maybe<StatusEnum>;
  /** Create a new user. Required params: email, password. */
  userCreate?: Maybe<User>;
  /** Login user. */
  userLogin: UserWithToken;
};


export type MutationItemAddOneArgs = {
  input?: Maybe<ItemInput>;
};


export type MutationShoppingListFinishArgs = {
  input?: Maybe<ShoppingListFinishInput>;
};


export type MutationShoppingListSaveArgs = {
  input?: Maybe<ShoppingListSaveInput>;
};


export type MutationUserCreateArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUserLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Get categories as an array with items. Optional search argument for category: name */
  categories: Array<Category>;
  /** Get a single item. Search parameters: id, name. */
  itemFindOne?: Maybe<Item>;
  /** Get items as an array. Optional search parameter: name. */
  items: Array<Item>;
  /** Ping query to wake up the server */
  ping?: Maybe<Scalars['String']>;
  /** Returns User's openList or null */
  shoppingList?: Maybe<ShoppingList>;
  user?: Maybe<User>;
};


export type QueryCategoriesArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryItemFindOneArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};


export type QueryItemsArgs = {
  name?: Maybe<Scalars['String']>;
};

/** Shopping list for User openList and history */
export type ShoppingList = {
  __typename?: 'ShoppingList';
  date: Scalars['Date'];
  id: Scalars['ID'];
  itemCount?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<Maybe<List>>>;
  name: Scalars['String'];
  status: StatusEnum;
};

/** Input for completing or cancelling ShoppingList */
export type ShoppingListFinishInput = {
  date: Scalars['Date'];
  list: Array<Maybe<ListInput>>;
  status: StatusEnum;
};

/** Input for saving ShoppingList */
export type ShoppingListSaveInput = {
  date: Scalars['Date'];
  id?: Maybe<Scalars['ID']>;
  itemCount?: Maybe<Scalars['Int']>;
  list: Array<Maybe<ListInput>>;
  name: Scalars['String'];
  status?: Maybe<StatusEnum>;
};

/** User' TopItem, TopCategory and MonthlySummary statistics */
export type Statistics = {
  __typename?: 'Statistics';
  monthlySummaries?: Maybe<Array<Maybe<MonthlySummary>>>;
  topCategories?: Maybe<Array<Maybe<TopCategory>>>;
  topItems?: Maybe<Array<Maybe<TopItem>>>;
};

/** Status enum for ShoppingList (saved, completed, cancelled) */
export enum StatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Saved = 'SAVED'
}

/** Object for an array of most popular Categories of an User */
export type TopCategory = {
  __typename?: 'TopCategory';
  category: Category;
  percentage?: Maybe<Scalars['Float']>;
};

/** Object for an array of most popular Items of an User */
export type TopItem = {
  __typename?: 'TopItem';
  item: Item;
  percentage?: Maybe<Scalars['Float']>;
};

/** User info and her open shopping list, history and statistics */
export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  history?: Maybe<Array<Maybe<ShoppingList>>>;
  id?: Maybe<Scalars['ID']>;
  openList?: Maybe<ShoppingList>;
  statistics?: Maybe<Statistics>;
};

/** User with Oauth token */
export type UserWithToken = {
  __typename?: 'UserWithToken';
  user: User;
  value: Scalars['String'];
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, items?: Array<{ __typename?: 'Item', id: string, name: string, note?: string | null | undefined, image?: string | null | undefined } | null | undefined> | null | undefined }> };

export type ItemFindOneQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
}>;


export type ItemFindOneQuery = { __typename?: 'Query', itemFindOne?: { __typename?: 'Item', id: string, name: string, note?: string | null | undefined, image?: string | null | undefined, category: { __typename?: 'Category', id: string, name: string } } | null | undefined };

export type ItemAddOneMutationVariables = Exact<{
  input: ItemInput;
}>;


export type ItemAddOneMutation = { __typename?: 'Mutation', itemAddOne?: { __typename?: 'Item', name: string, id: string, note?: string | null | undefined, category: { __typename?: 'Category', id: string } } | null | undefined };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping?: string | null | undefined };

export type ListBaseFieldsFragment = { __typename?: 'ShoppingList', id: string, name: string, date: any, status: StatusEnum, itemCount?: number | null | undefined };

export type ListAllFieldsFragment = { __typename?: 'ShoppingList', id: string, name: string, date: any, status: StatusEnum, itemCount?: number | null | undefined, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', id: string, name: string }, items?: Array<{ __typename?: 'ListItem', completed: boolean, pcs: number, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type ShoppingListQueryVariables = Exact<{ [key: string]: never; }>;


export type ShoppingListQuery = { __typename?: 'Query', shoppingList?: { __typename?: 'ShoppingList', id: string, name: string, date: any, status: StatusEnum, itemCount?: number | null | undefined, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', id: string, name: string }, items?: Array<{ __typename?: 'ListItem', completed: boolean, pcs: number, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type ShoppingListSaveMutationVariables = Exact<{
  input?: Maybe<ShoppingListSaveInput>;
}>;


export type ShoppingListSaveMutation = { __typename?: 'Mutation', shoppingListSave?: StatusEnum | null | undefined };

export type ShoppingListFinishMutationVariables = Exact<{
  input?: Maybe<ShoppingListFinishInput>;
}>;


export type ShoppingListFinishMutation = { __typename?: 'Mutation', shoppingListFinish?: { __typename?: 'User', id?: string | null | undefined, email: string, openList?: { __typename?: 'ShoppingList', name: string } | null | undefined, history?: Array<{ __typename?: 'ShoppingList', id: string, name: string, date: any, status: StatusEnum, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', name: string }, items?: Array<{ __typename?: 'ListItem', pcs: number, completed: boolean, item: { __typename?: 'Item', name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined, statistics?: { __typename?: 'Statistics', topItems?: Array<{ __typename?: 'TopItem', percentage?: number | null | undefined, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined, topCategories?: Array<{ __typename?: 'TopCategory', percentage?: number | null | undefined, category: { __typename?: 'Category', id: string, name: string } } | null | undefined> | null | undefined, monthlySummaries?: Array<{ __typename?: 'MonthlySummary', month?: any | null | undefined, itemCount?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined } | null | undefined };

export type UserStatisticsFragment = { __typename?: 'User', statistics?: { __typename?: 'Statistics', topItems?: Array<{ __typename?: 'TopItem', percentage?: number | null | undefined, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined, topCategories?: Array<{ __typename?: 'TopCategory', percentage?: number | null | undefined, category: { __typename?: 'Category', id: string, name: string } } | null | undefined> | null | undefined, monthlySummaries?: Array<{ __typename?: 'MonthlySummary', month?: any | null | undefined, itemCount?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type UserHistoryFragment = { __typename?: 'User', history?: Array<{ __typename?: 'ShoppingList', id: string, name: string, date: any, status: StatusEnum, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', name: string }, items?: Array<{ __typename?: 'ListItem', pcs: number, completed: boolean, item: { __typename?: 'Item', name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export type UserOpenListFragment = { __typename?: 'User', openList?: { __typename?: 'ShoppingList', id: string, name: string, date: any, itemCount?: number | null | undefined, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', id: string, name: string }, items?: Array<{ __typename?: 'ListItem', completed: boolean, pcs: number, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id?: string | null | undefined, email: string, openList?: { __typename?: 'ShoppingList', id: string, name: string, date: any, itemCount?: number | null | undefined, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', id: string, name: string }, items?: Array<{ __typename?: 'ListItem', completed: boolean, pcs: number, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined, history?: Array<{ __typename?: 'ShoppingList', id: string, name: string, date: any, status: StatusEnum, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', name: string }, items?: Array<{ __typename?: 'ListItem', pcs: number, completed: boolean, item: { __typename?: 'Item', name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined, statistics?: { __typename?: 'Statistics', topItems?: Array<{ __typename?: 'TopItem', percentage?: number | null | undefined, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined, topCategories?: Array<{ __typename?: 'TopCategory', percentage?: number | null | undefined, category: { __typename?: 'Category', id: string, name: string } } | null | undefined> | null | undefined, monthlySummaries?: Array<{ __typename?: 'MonthlySummary', month?: any | null | undefined, itemCount?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined } | null | undefined };

export type UserCreateMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserCreateMutation = { __typename?: 'Mutation', userCreate?: { __typename?: 'User', email: string } | null | undefined };

export type UserLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { __typename?: 'Mutation', userLogin: { __typename?: 'UserWithToken', value: string, user: { __typename?: 'User', id?: string | null | undefined, email: string, openList?: { __typename?: 'ShoppingList', id: string, name: string, date: any, itemCount?: number | null | undefined, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', id: string, name: string }, items?: Array<{ __typename?: 'ListItem', completed: boolean, pcs: number, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined, history?: Array<{ __typename?: 'ShoppingList', id: string, name: string, date: any, status: StatusEnum, list?: Array<{ __typename?: 'List', category: { __typename?: 'Category', name: string }, items?: Array<{ __typename?: 'ListItem', pcs: number, completed: boolean, item: { __typename?: 'Item', name: string } } | null | undefined> | null | undefined } | null | undefined> | null | undefined } | null | undefined> | null | undefined, statistics?: { __typename?: 'Statistics', topItems?: Array<{ __typename?: 'TopItem', percentage?: number | null | undefined, item: { __typename?: 'Item', id: string, name: string } } | null | undefined> | null | undefined, topCategories?: Array<{ __typename?: 'TopCategory', percentage?: number | null | undefined, category: { __typename?: 'Category', id: string, name: string } } | null | undefined> | null | undefined, monthlySummaries?: Array<{ __typename?: 'MonthlySummary', month?: any | null | undefined, itemCount?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined } } };

export const ListBaseFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"listBaseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShoppingList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"itemCount"}}]}}]} as unknown as DocumentNode<ListBaseFieldsFragment, unknown>;
export const ListAllFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"listAllFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShoppingList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"listBaseFields"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"pcs"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},...ListBaseFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ListAllFieldsFragment, unknown>;
export const UserStatisticsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userStatistics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"monthlySummaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"itemCount"}}]}}]}}]}}]} as unknown as DocumentNode<UserStatisticsFragment, unknown>;
export const UserHistoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userHistory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pcs"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserHistoryFragment, unknown>;
export const UserOpenListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userOpenList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"itemCount"}},{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"pcs"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserOpenListFragment, unknown>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const ItemFindOneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemFindOne"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemFindOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ItemFindOneQuery, ItemFindOneQueryVariables>;
export const ItemAddOneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"itemAddOne"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemAddOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ItemAddOneMutation, ItemAddOneMutationVariables>;
export const PingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ping"}}]}}]} as unknown as DocumentNode<PingQuery, PingQueryVariables>;
export const ShoppingListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ShoppingList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shoppingList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"listAllFields"}}]}}]}},...ListAllFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ShoppingListQuery, ShoppingListQueryVariables>;
export const ShoppingListSaveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShoppingListSave"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ShoppingListSaveInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shoppingListSave"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ShoppingListSaveMutation, ShoppingListSaveMutationVariables>;
export const ShoppingListFinishDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShoppingListFinish"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ShoppingListFinishInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shoppingListFinish"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"openList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"userHistory"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"userStatistics"}}]}}]}},...UserHistoryFragmentDoc.definitions,...UserStatisticsFragmentDoc.definitions]} as unknown as DocumentNode<ShoppingListFinishMutation, ShoppingListFinishMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"userOpenList"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"userHistory"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"userStatistics"}}]}}]}},...UserOpenListFragmentDoc.definitions,...UserHistoryFragmentDoc.definitions,...UserStatisticsFragmentDoc.definitions]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UserCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"userCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UserCreateMutation, UserCreateMutationVariables>;
export const UserLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"userLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"userOpenList"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"userHistory"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"userStatistics"}}]}}]}}]}},...UserOpenListFragmentDoc.definitions,...UserHistoryFragmentDoc.definitions,...UserStatisticsFragmentDoc.definitions]} as unknown as DocumentNode<UserLoginMutation, UserLoginMutationVariables>;