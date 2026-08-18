import type { GraphQLResolveInfo } from 'graphql';
import type { GraphqlContext } from '../graphql-handler.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CharacterDetail = {
  readonly __typename?: 'CharacterDetail';
  readonly comments: ReadonlyArray<Comment>;
  readonly gender: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly imageUrl: Scalars['String']['output'];
  readonly isFavorite: Scalars['Boolean']['output'];
  readonly name: Scalars['String']['output'];
  readonly origin: Origin;
  readonly species: Scalars['String']['output'];
  readonly status: Scalars['String']['output'];
  readonly type: Scalars['String']['output'];
};


export type CharacterDetailCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CharacterFilter = {
  readonly gender?: InputMaybe<Scalars['String']['input']>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
  readonly origin?: InputMaybe<Scalars['String']['input']>;
  readonly species?: InputMaybe<Scalars['String']['input']>;
  readonly status?: InputMaybe<Scalars['String']['input']>;
};

export type CharacterSummary = {
  readonly __typename?: 'CharacterSummary';
  readonly id: Scalars['ID']['output'];
  readonly imageUrl: Scalars['String']['output'];
  readonly name: Scalars['String']['output'];
  readonly species: Scalars['String']['output'];
};

export type Comment = {
  readonly __typename?: 'Comment';
  readonly body: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
};

export type Origin = {
  readonly __typename?: 'Origin';
  readonly name: Scalars['String']['output'];
  readonly url: Scalars['String']['output'];
};

export type Query = {
  readonly __typename?: 'Query';
  readonly character?: Maybe<CharacterDetail>;
  readonly characters: ReadonlyArray<CharacterSummary>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharacterFilter>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CharacterDetail: ResolverTypeWrapper<CharacterDetail>;
  CharacterFilter: CharacterFilter;
  CharacterSummary: ResolverTypeWrapper<CharacterSummary>;
  Comment: ResolverTypeWrapper<Comment>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Origin: ResolverTypeWrapper<Origin>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CharacterDetail: CharacterDetail;
  CharacterFilter: CharacterFilter;
  CharacterSummary: CharacterSummary;
  Comment: Comment;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Origin: Origin;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
};

export type CharacterDetailResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CharacterDetail'] = ResolversParentTypes['CharacterDetail']> = {
  comments?: Resolver<ReadonlyArray<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<CharacterDetailCommentsArgs, 'limit' | 'offset'>>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<ResolversTypes['Origin'], ParentType, ContextType>;
  species?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CharacterSummaryResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['CharacterSummary'] = ResolversParentTypes['CharacterSummary']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  species?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CommentResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type OriginResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Origin'] = ResolversParentTypes['Origin']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphqlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  character?: Resolver<Maybe<ResolversTypes['CharacterDetail']>, ParentType, ContextType, RequireFields<QueryCharacterArgs, 'id'>>;
  characters?: Resolver<ReadonlyArray<ResolversTypes['CharacterSummary']>, ParentType, ContextType, Partial<QueryCharactersArgs>>;
};

export type Resolvers<ContextType = GraphqlContext> = {
  CharacterDetail?: CharacterDetailResolvers<ContextType>;
  CharacterSummary?: CharacterSummaryResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Origin?: OriginResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

