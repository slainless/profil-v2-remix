/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  ID: Scalars['Int']['output'];
  annotation: Scalars['String']['output'];
  category: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  short: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  thumbnail?: Maybe<GalleryItem>;
  title: Scalars['String']['output'];
  type: ArticleType;
  updatedAt: Scalars['Time']['output'];
  user?: Maybe<Staff>;
  views: Scalars['Int']['output'];
};

export type ArticleType = {
  __typename?: 'ArticleType';
  ID: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  short: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  type: ArticleTypeValue;
};

export enum ArticleTypeValue {
  Bumdes = 'BUMDES',
  General = 'GENERAL',
  Potential = 'POTENTIAL',
  Tourism = 'TOURISM'
}

export type Bansos = {
  __typename?: 'Bansos';
  frequency: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  step: Scalars['Int']['output'];
  values: Array<Scalars['Int']['output']>;
};

export type BansosRecipient = {
  __typename?: 'BansosRecipient';
  KK: Scalars['String']['output'];
  NIK: Scalars['String']['output'];
  bansos: Array<Bansos>;
  name: Scalars['String']['output'];
};

export type BansosStatistic = {
  __typename?: 'BansosStatistic';
  stopped: Array<IntKv>;
  total: Array<IntKv>;
};

export type Contact = {
  __typename?: 'Contact';
  ID: Scalars['Int']['output'];
  contact: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type Desa = {
  __typename?: 'Desa';
  ID: Scalars['String']['output'];
  deskel: Scalars['String']['output'];
  kabkota: Scalars['String']['output'];
  kecamatan: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  provinsi: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  slugDeskel: Scalars['String']['output'];
  slugKabkota: Scalars['String']['output'];
  slugKecamatan: Scalars['String']['output'];
  slugProvinsi: Scalars['String']['output'];
  timezone: Scalars['Int']['output'];
};

export type ExternalLink = {
  __typename?: 'ExternalLink';
  ID: Scalars['Int']['output'];
  URL: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type GalleryItem = {
  __typename?: 'GalleryItem';
  ID: Scalars['Int']['output'];
  URL: Scalars['String']['output'];
  annotation: Scalars['String']['output'];
  caption: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  updatedAt: Scalars['Time']['output'];
};

export enum GovMemberType {
  Aparat = 'APARAT',
  Bpd = 'BPD'
}

export type IntKv = {
  __typename?: 'IntKV';
  name: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type MarketItem = {
  __typename?: 'MarketItem';
  ID: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  category?: Maybe<MarketItemCategory>;
  createdAt: Scalars['Time']['output'];
  defaultPhoto: GalleryItem;
  defaultVariant: MarketItemVariant;
  description: Scalars['String']['output'];
  likes: Scalars['Int']['output'];
  media: Array<GalleryItem>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  reviews: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  subcategory: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  user?: Maybe<User>;
  variants: Array<MarketItemVariant>;
  views: Scalars['Int']['output'];
};

export type MarketItemCategory = {
  __typename?: 'MarketItemCategory';
  ID: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type MarketItemReview = {
  __typename?: 'MarketItemReview';
  ID: Scalars['Int']['output'];
  comment: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
  user?: Maybe<User>;
};

export type MarketItemVariant = {
  __typename?: 'MarketItemVariant';
  ID: Scalars['Int']['output'];
  isDisabled: Scalars['Boolean']['output'];
  isLimitedByStock: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  photoID: Scalars['Int']['output'];
  price: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
};

export enum MarketplaceSortBy {
  Createdat = 'CREATEDAT',
  Rating = 'RATING'
}

export type OrgMember = {
  __typename?: 'OrgMember';
  ID: Scalars['Int']['output'];
  createdAt: Scalars['Time']['output'];
  name: Scalars['String']['output'];
  orgID: Scalars['Int']['output'];
  parentID: Scalars['Int']['output'];
  photoURL: Scalars['String']['output'];
  position: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

export enum OrgSortBy {
  Createdat = 'CREATEDAT',
  Position = 'POSITION'
}

export type Organization = {
  __typename?: 'Organization';
  ID: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  short: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type PpidCategory = {
  __typename?: 'PPIDCategory';
  ID: Scalars['Int']['output'];
  createdAt: Scalars['Time']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: PpidType;
  updatedAt: Scalars['Time']['output'];
};

export type PpidFile = {
  __typename?: 'PPIDFile';
  ID: Scalars['Int']['output'];
  category: PpidCategory;
  createdAt: Scalars['Time']['output'];
  description: Scalars['String']['output'];
  downloadCount: Scalars['Int']['output'];
  fileURL: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

export enum PpidType {
  Berkala = 'BERKALA',
  Sertamerta = 'SERTAMERTA',
  Setiapsaat = 'SETIAPSAAT'
}

export type Point = {
  __typename?: 'Point';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type PointOfInterest = {
  __typename?: 'PointOfInterest';
  ID: Scalars['Int']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  description: Scalars['String']['output'];
  photos: Array<GalleryItem>;
  point: Point;
  thumbnail?: Maybe<GalleryItem>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type PopulationStatistic = {
  __typename?: 'PopulationStatistic';
  bloodType: Array<IntKv>;
  dusun: Array<IntKv>;
  education: Array<IntKv>;
  female: Scalars['Int']['output'];
  femaleAgeRanges: Array<IntKv>;
  job: Array<IntKv>;
  male: Scalars['Int']['output'];
  maleAgeRanges: Array<IntKv>;
  maritalStatus: Array<IntKv>;
  mutation: Scalars['Int']['output'];
  mutationIn: Array<IntKv>;
  mutationOut: Array<IntKv>;
  religion: Array<IntKv>;
  statusInFamily: Array<IntKv>;
  temporary: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  wajibPilih: Array<IntKv>;
};

export type Profile = {
  __typename?: 'Profile';
  BPDChart: Scalars['String']['output'];
  SPDChart: Scalars['String']['output'];
  alias: SettingAlias;
  area: Scalars['Int']['output'];
  borders: Array<StringKv>;
  contact: Scalars['String']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  history: SettingHistory;
  infographyLayout: Array<SettingLayout>;
  landingLayout: Array<SettingLayout>;
  logoURL: Scalars['String']['output'];
  mission: Array<Scalars['String']['output']>;
  name: SettingName;
  navbarLayout: Array<SettingLayout>;
  navmenuLayout: Array<SettingLayout>;
  officeAddress: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  primaryPalette: Array<Scalars['String']['output']>;
  profileLayout: Array<SettingLayout>;
  serviceEmail: Scalars['String']['output'];
  servicePhone: Scalars['String']['output'];
  socialMedia: SettingSocialMedia;
  surveyURL: Scalars['String']['output'];
  vision: Scalars['String']['output'];
  welcome: SettingWelcome;
  workHour: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  APBDCategories: Array<TransactionCategory>;
  APBDReport: Array<Transaction>;
  APBDSummary: Array<TransactionSummary>;
  BUMDESSummary: Array<TransactionSummary>;
  PPIDCategories: Array<PpidCategory>;
  PPIDFiles: Array<PpidFile>;
  _domainMap: Array<StringKv>;
  _slugMap: Array<StringKv>;
  articleByID?: Maybe<Article>;
  articleBySlug?: Maybe<Article>;
  articleTypes: Array<ArticleType>;
  articles: Array<Article>;
  availableIDM: Array<Scalars['Int']['output']>;
  availableSDGs: Array<Scalars['Int']['output']>;
  bansosRecipient: Array<BansosRecipient>;
  bansosStatistic: BansosStatistic;
  externalLinks: Array<ExternalLink>;
  gallery: Array<GalleryItem>;
  govMembers: Array<OrgMember>;
  importantContacts: Array<Contact>;
  latestAPBDSummary?: Maybe<TransactionSummary>;
  latestBUMDESSummary?: Maybe<TransactionSummary>;
  marketItemByID?: Maybe<MarketItem>;
  marketItemCategories: Array<MarketItemCategory>;
  marketItemReviews: Array<MarketItemReview>;
  marketplace: Array<MarketItem>;
  orgMembers: Array<OrgMember>;
  organizations: Array<Organization>;
  pointOfInterestByID?: Maybe<PointOfInterest>;
  pointOfInterests: Array<PointOfInterest>;
  populationStatistic: PopulationStatistic;
  profile?: Maybe<Profile>;
  stunting: Array<Stunting>;
  userByUsername?: Maybe<User>;
  visitorStatistic: VisitorStatistic;
};


export type QueryApbdReportArgs = {
  fromYear?: InputMaybe<Scalars['Int']['input']>;
  toYear?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryApbdSummaryArgs = {
  fromYear?: InputMaybe<Scalars['Int']['input']>;
  toYear?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBumdesSummaryArgs = {
  fromYear?: InputMaybe<Scalars['Int']['input']>;
  orgID: Scalars['Int']['input'];
  toYear?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPpidFilesArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Int']['input']>;
  categoryID?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Sort>;
};


export type QueryArticleByIdArgs = {
  ID: Scalars['Int']['input'];
  type?: InputMaybe<ArticleTypeValue>;
};


export type QueryArticleBySlugArgs = {
  slug: Scalars['String']['input'];
  type?: InputMaybe<ArticleTypeValue>;
};


export type QueryArticlesArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Sort>;
  type?: InputMaybe<ArticleTypeValue>;
};


export type QueryBansosRecipientArgs = {
  searchQuery: Scalars['String']['input'];
};


export type QueryGalleryArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
};


export type QueryGovMembersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
  sortBy?: InputMaybe<OrgSortBy>;
  type?: InputMaybe<GovMemberType>;
};


export type QueryMarketItemByIdArgs = {
  ID: Scalars['Int']['input'];
  desa?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMarketItemReviewsArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Int']['input']>;
  itemID: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
};


export type QueryMarketplaceArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Int']['input']>;
  categoryID?: InputMaybe<Scalars['Int']['input']>;
  desa?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Sort>;
};


export type QueryOrgMembersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  orgID?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Sort>;
  sortBy?: InputMaybe<OrgSortBy>;
};


export type QueryPointOfInterestByIdArgs = {
  ID: Scalars['Int']['input'];
};


export type QueryPointOfInterestsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStuntingArgs = {
  fromYear?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  toYear?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};

export type SettingAlias = {
  __typename?: 'SettingAlias';
  BPD: Scalars['String']['output'];
  desa: Scalars['String']['output'];
  dusun: Scalars['String']['output'];
  pemimpin: Scalars['String']['output'];
};

export type SettingHistory = {
  __typename?: 'SettingHistory';
  content: Scalars['String']['output'];
  photoURL: Scalars['String']['output'];
};

export type SettingLayout = {
  __typename?: 'SettingLayout';
  ID: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  visible: Scalars['Boolean']['output'];
};

export type SettingName = {
  __typename?: 'SettingName';
  deskel: Scalars['String']['output'];
  ibukota: Scalars['String']['output'];
  kabkota: Scalars['String']['output'];
  kecamatan: Scalars['String']['output'];
  provinsi: Scalars['String']['output'];
};

export type SettingSocialMedia = {
  __typename?: 'SettingSocialMedia';
  facebook: Scalars['String']['output'];
  instagram: Scalars['String']['output'];
  tiktok: Scalars['String']['output'];
  twitter: Scalars['String']['output'];
  youtube: Scalars['String']['output'];
};

export type SettingWelcome = {
  __typename?: 'SettingWelcome';
  backgroundURL: Scalars['String']['output'];
  content: Scalars['String']['output'];
  personName: Scalars['String']['output'];
  personRole: Scalars['String']['output'];
  photoURL: Scalars['String']['output'];
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Staff = {
  __typename?: 'Staff';
  ID: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  status: UserStatus;
};

export type StringKv = {
  __typename?: 'StringKV';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Stunting = {
  __typename?: 'Stunting';
  baduta: Scalars['Int']['output'];
  balita: Scalars['Int']['output'];
  berisiko: Scalars['Int']['output'];
  keluargaSasaran: Scalars['Int']['output'];
  pasanganUsiaSubur: Scalars['Int']['output'];
  pasanganUsiaSuburHamil: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  budget: Scalars['String']['output'];
  category: TransactionCategory;
  details: Array<StringKv>;
  year: Scalars['Int']['output'];
};

export type TransactionCategory = {
  __typename?: 'TransactionCategory';
  ID: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: TransactionType;
};

export type TransactionSummary = {
  __typename?: 'TransactionSummary';
  expense: Scalars['String']['output'];
  financingExpense: Scalars['String']['output'];
  financingIncome: Scalars['String']['output'];
  income: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export enum TransactionType {
  Expense = 'EXPENSE',
  FinancingExpense = 'FINANCING_EXPENSE',
  FinancingIncome = 'FINANCING_INCOME',
  Income = 'INCOME'
}

export type User = {
  __typename?: 'User';
  ID: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  desa?: Maybe<Desa>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  photoURL: Scalars['String']['output'];
  registerMethod: Scalars['String']['output'];
  status: UserStatus;
  updatedAt: Scalars['Time']['output'];
};

export enum UserLevel {
  Admin = 'ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export enum UserStatus {
  Blocked = 'BLOCKED',
  Inactive = 'INACTIVE',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export type VisitorStatistic = {
  __typename?: 'VisitorStatistic';
  lastMonth: Scalars['Int']['output'];
  lastWeek: Scalars['Int']['output'];
  thisMonth: Scalars['Int']['output'];
  thisWeek: Scalars['Int']['output'];
  today: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  yesterday: Scalars['Int']['output'];
};

export type PpidCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type PpidCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'PPIDCategory', ID: number, name: string, description: string, type: PpidType }> };

export type PpidFilesQueryVariables = Exact<{
  categoryID?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PpidFilesQuery = { __typename?: 'Query', files: Array<{ __typename?: 'PPIDFile', ID: number, fileURL: string, name: string, downloadCount: number, updatedAt: any, category: { __typename?: 'PPIDCategory', name: string, type: PpidType } }> };

export type CommonTxnFieldsFragment = { __typename?: 'Transaction', year: number, budget: string, category: { __typename?: 'TransactionCategory', ID: number }, details: Array<{ __typename?: 'StringKV', name: string, value: string }> };

export type CommonTxnCategoryFieldsFragment = { __typename?: 'TransactionCategory', ID: number, name: string, type: TransactionType };

export type GetApbDesReportsQueryVariables = Exact<{
  from?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetApbDesReportsQuery = { __typename?: 'Query', reports: Array<{ __typename?: 'Transaction', year: number, budget: string, category: { __typename?: 'TransactionCategory', ID: number }, details: Array<{ __typename?: 'StringKV', name: string, value: string }> }> };

export type GetApbDesCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApbDesCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'TransactionCategory', ID: number, name: string, type: TransactionType }> };

export type GetApbDesReportsWithCategoriesQueryVariables = Exact<{
  from?: InputMaybe<Scalars['Int']['input']>;
  to?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetApbDesReportsWithCategoriesQuery = { __typename?: 'Query', reports: Array<{ __typename?: 'Transaction', year: number, budget: string, category: { __typename?: 'TransactionCategory', ID: number }, details: Array<{ __typename?: 'StringKV', name: string, value: string }> }>, categories: Array<{ __typename?: 'TransactionCategory', ID: number, name: string, type: TransactionType }> };

export type ArticleCardFieldsFragment = { __typename?: 'Article', ID: number, title: string, slug: string, views: number, createdAt: any, updatedAt: any, thumbnail?: { __typename?: 'GalleryItem', URL: string } | null, type: { __typename?: 'ArticleType', name: string, short: string, slug: string }, user?: { __typename?: 'Staff', name: string, position: string } | null };

export type ArticleDetailQueryVariables = Exact<{
  type?: InputMaybe<ArticleTypeValue>;
  slug: Scalars['String']['input'];
}>;


export type ArticleDetailQuery = { __typename?: 'Query', article?: { __typename?: 'Article', content: string, short: string, ID: number, title: string, slug: string, views: number, createdAt: any, updatedAt: any, type: { __typename?: 'ArticleType', type: ArticleTypeValue, name: string, short: string, slug: string }, thumbnail?: { __typename?: 'GalleryItem', caption: string, URL: string } | null, user?: { __typename?: 'Staff', name: string, position: string } | null } | null };

export type ArticlesQueryVariables = Exact<{
  type?: InputMaybe<ArticleTypeValue>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', short: string, ID: number, title: string, slug: string, views: number, createdAt: any, updatedAt: any, type: { __typename?: 'ArticleType', type: ArticleTypeValue, name: string, short: string, slug: string }, thumbnail?: { __typename?: 'GalleryItem', URL: string } | null, user?: { __typename?: 'Staff', name: string, position: string } | null }> };

export type ArticleCardsQueryVariables = Exact<{
  type?: InputMaybe<ArticleTypeValue>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ArticleCardsQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', ID: number, title: string, slug: string, views: number, short: string, createdAt: any, updatedAt: any, thumbnail?: { __typename?: 'GalleryItem', URL: string } | null, user?: { __typename?: 'Staff', name: string, position: string } | null }> };

export type BumdesQueryVariables = Exact<{ [key: string]: never; }>;


export type BumdesQuery = { __typename?: 'Query', bumdes: Array<{ __typename?: 'Article', title: string, slug: string, short: string, thumbnail?: { __typename?: 'GalleryItem', URL: string } | null }> };

export type DestinationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type DestinationsQuery = { __typename?: 'Query', destinations: Array<{ __typename?: 'Article', title: string, short: string, slug: string, thumbnail?: { __typename?: 'GalleryItem', URL: string } | null }> };

export type PotenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type PotenciesQuery = { __typename?: 'Query', potencies: Array<{ __typename?: 'Article', title: string, short: string, slug: string, thumbnail?: { __typename?: 'GalleryItem', URL: string } | null }> };

export type BansosQueryVariables = Exact<{ [key: string]: never; }>;


export type BansosQuery = { __typename?: 'Query', bansosStatistic: { __typename?: 'BansosStatistic', total: Array<{ __typename?: 'IntKV', name: string, value: number }> } };

export type BansosRecipientQueryVariables = Exact<{
  searchQuery: Scalars['String']['input'];
}>;


export type BansosRecipientQuery = { __typename?: 'Query', recipients: Array<{ __typename?: 'BansosRecipient', name: string, NIK: string, KK: string, bansos: Array<{ __typename?: 'Bansos', name: string }> }> };

export type DomainMapQueryVariables = Exact<{ [key: string]: never; }>;


export type DomainMapQuery = { __typename?: 'Query', map: Array<{ __typename?: 'StringKV', name: string, value: string }> };

export type GalleryItemsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GalleryItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'GalleryItem', URL: string, caption: string, ID: number }> };

export type CommonReviewFieldsFragment = { __typename?: 'MarketItemReview', ID: number, comment: string, rating: number, createdAt: any, updatedAt: any, user?: { __typename?: 'User', ID: number, photoURL: string, name: string } | null };

export type CommonItemFieldsFragment = { __typename?: 'MarketItem', name: string, ID: number, slug: string, description: string, rating: number, reviews: number, likes: number, views: number, subcategory: string, createdAt: any, updatedAt: any, user?: { __typename?: 'User', name: string, phone: string } | null, defaultVariant: { __typename?: 'MarketItemVariant', ID: number }, defaultPhoto: { __typename?: 'GalleryItem', ID: number }, variants: Array<{ __typename?: 'MarketItemVariant', ID: number, photoID: number, name: string, price: string, stock: number, isDisabled: boolean, isLimitedByStock: boolean }>, media: Array<{ __typename?: 'GalleryItem', ID: number, URL: string, caption: string, annotation: string, createdAt: any, updatedAt: any }>, category?: { __typename?: 'MarketItemCategory', name: string, slug: string } | null };

export type ProductSlugQueryVariables = Exact<{
  ID: Scalars['Int']['input'];
  schema: Scalars['String']['input'];
}>;


export type ProductSlugQuery = { __typename?: 'Query', product?: { __typename?: 'MarketItem', slug: string } | null };

export type ProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  desa?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'MarketItem', name: string, ID: number, slug: string, description: string, rating: number, reviews: number, likes: number, views: number, subcategory: string, createdAt: any, updatedAt: any, user?: { __typename?: 'User', name: string, phone: string } | null, defaultVariant: { __typename?: 'MarketItemVariant', name: string, price: string }, defaultPhoto: { __typename?: 'GalleryItem', URL: string }, category?: { __typename?: 'MarketItemCategory', name: string, slug: string } | null }> };

export type ProductWithReviewsQueryVariables = Exact<{
  ID: Scalars['Int']['input'];
  schema: Scalars['String']['input'];
  reviewNumbers?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductWithReviewsQuery = { __typename?: 'Query', products?: { __typename?: 'MarketItem', name: string, ID: number, slug: string, description: string, rating: number, reviews: number, likes: number, views: number, subcategory: string, createdAt: any, updatedAt: any, user?: { __typename?: 'User', name: string, phone: string } | null, defaultVariant: { __typename?: 'MarketItemVariant', ID: number }, defaultPhoto: { __typename?: 'GalleryItem', ID: number }, variants: Array<{ __typename?: 'MarketItemVariant', ID: number, photoID: number, name: string, price: string, stock: number, isDisabled: boolean, isLimitedByStock: boolean }>, media: Array<{ __typename?: 'GalleryItem', ID: number, URL: string, caption: string, annotation: string, createdAt: any, updatedAt: any }>, category?: { __typename?: 'MarketItemCategory', name: string, slug: string } | null } | null, reviews: Array<{ __typename?: 'MarketItemReview', ID: number, comment: string, rating: number, createdAt: any, updatedAt: any, user?: { __typename?: 'User', ID: number, photoURL: string, name: string } | null }> };

export type ReviewsQueryVariables = Exact<{
  itemID: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'MarketItemReview', ID: number, comment: string, rating: number, createdAt: any, updatedAt: any, user?: { __typename?: 'User', ID: number, photoURL: string, name: string } | null }> };

export type OrgMembersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type OrgMembersQueryQuery = { __typename?: 'Query', members: Array<{ __typename?: 'OrgMember', name: string, photoURL: string, position: string }> };

export type PointOfInterestsQueryVariables = Exact<{ [key: string]: never; }>;


export type PointOfInterestsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'PointOfInterest', ID: number, title: string, description: string, category: string, thumbnail?: { __typename?: 'GalleryItem', ID: number, URL: string } | null, point: { __typename?: 'Point', latitude: number, longitude: number } }> };

export type PointOfInterestsByIdQueryVariables = Exact<{
  itemID: Scalars['Int']['input'];
}>;


export type PointOfInterestsByIdQuery = { __typename?: 'Query', item?: { __typename?: 'PointOfInterest', ID: number, title: string, description: string, category: string, thumbnail?: { __typename?: 'GalleryItem', ID: number, URL: string } | null, point: { __typename?: 'Point', latitude: number, longitude: number } } | null };

export type MainPointOfInterestQueryVariables = Exact<{ [key: string]: never; }>;


export type MainPointOfInterestQuery = { __typename?: 'Query', item?: { __typename?: 'PointOfInterest', point: { __typename?: 'Point', latitude: number, longitude: number } } | null };

export type PopulationStatisticQueryVariables = Exact<{ [key: string]: never; }>;


export type PopulationStatisticQuery = { __typename?: 'Query', stats: { __typename?: 'PopulationStatistic', total: number, male: number, female: number, mutation: number, temporary: number, religion: Array<{ __typename?: 'IntKV', name: string, value: number }>, bloodType: Array<{ __typename?: 'IntKV', name: string, value: number }>, statusInFamily: Array<{ __typename?: 'IntKV', name: string, value: number }>, maritalStatus: Array<{ __typename?: 'IntKV', name: string, value: number }>, mutationIn: Array<{ __typename?: 'IntKV', name: string, value: number }>, mutationOut: Array<{ __typename?: 'IntKV', name: string, value: number }>, maleAgeRanges: Array<{ __typename?: 'IntKV', name: string, value: number }>, femaleAgeRanges: Array<{ __typename?: 'IntKV', name: string, value: number }>, dusun: Array<{ __typename?: 'IntKV', name: string, value: number }>, education: Array<{ __typename?: 'IntKV', name: string, value: number }>, job: Array<{ __typename?: 'IntKV', name: string, value: number }>, wajibPilih: Array<{ __typename?: 'IntKV', name: string, value: number }> } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', postalCode: string, serviceEmail: string, phone: string, servicePhone: string, workHour: string, contact: string, email: string, logoURL: string, officeAddress: string, description: string, primaryPalette: Array<string>, welcome: { __typename?: 'SettingWelcome', backgroundURL: string }, alias: { __typename?: 'SettingAlias', desa: string, dusun: string, pemimpin: string, BPD: string }, name: { __typename?: 'SettingName', deskel: string, ibukota: string, kabkota: string, kecamatan: string, provinsi: string }, socialMedia: { __typename?: 'SettingSocialMedia', facebook: string, instagram: string, tiktok: string, twitter: string, youtube: string } } | null };

export type DesaProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type DesaProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', vision: string, mission: Array<string>, area: number, BPDChart: string, SPDChart: string, history: { __typename?: 'SettingHistory', photoURL: string, content: string }, borders: Array<{ __typename?: 'StringKV', name: string, value: string }> } | null };

export type ImportantContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ImportantContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', name: string, contact: string, order: number, ID: number }> };

export type ExternalLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type ExternalLinksQuery = { __typename?: 'Query', links: Array<{ __typename?: 'ExternalLink', name: string, URL: string, order: number, ID: number }> };

export type WelcomeQueryVariables = Exact<{ [key: string]: never; }>;


export type WelcomeQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', welcome: { __typename?: 'SettingWelcome', backgroundURL: string, content: string, personName: string, personRole: string, photoURL: string } } | null };

export type BudgetSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type BudgetSummaryQuery = { __typename?: 'Query', summary?: { __typename?: 'TransactionSummary', expense: string, income: string, financingExpense: string, financingIncome: string, year: number } | null };

export type PopulationSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type PopulationSummaryQuery = { __typename?: 'Query', summary: { __typename?: 'PopulationStatistic', total: number, male: number, female: number, temporary: number, mutation: number, mutationOut: Array<{ __typename?: 'IntKV', value: number }>, statusInFamily: Array<{ __typename?: 'IntKV', name: string, value: number }> } };

export type PopulationMutationSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type PopulationMutationSummaryQuery = { __typename?: 'Query', summary: { __typename?: 'PopulationStatistic', total: number, mutationOut: Array<{ __typename?: 'IntKV', value: number }> } };

export type StuntingQueryVariables = Exact<{ [key: string]: never; }>;


export type StuntingQuery = { __typename?: 'Query', stunting: Array<{ __typename?: 'Stunting', year: number, keluargaSasaran: number, berisiko: number, baduta: number, balita: number, pasanganUsiaSubur: number, pasanganUsiaSuburHamil: number }> };

export type UserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', ID: number, name: string, phone: string, photoURL: string, desa?: { __typename?: 'Desa', deskel: string, kabkota: string, provinsi: string } | null } | null };

export const CommonTxnFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonTxnFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<CommonTxnFieldsFragment, unknown>;
export const CommonTxnCategoryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonTxnCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<CommonTxnCategoryFieldsFragment, unknown>;
export const ArticleCardFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"articleCardFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<ArticleCardFieldsFragment, unknown>;
export const CommonReviewFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonReviewFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItemReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CommonReviewFieldsFragment, unknown>;
export const CommonItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultPhoto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"photoID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"isDisabled"}},{"kind":"Field","name":{"kind":"Name","value":"isLimitedByStock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"URL"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"annotation"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CommonItemFieldsFragment, unknown>;
export const PpidCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PPIDCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categories"},"name":{"kind":"Name","value":"PPIDCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<PpidCategoriesQuery, PpidCategoriesQueryVariables>;
export const PpidFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PPIDFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"files"},"name":{"kind":"Name","value":"PPIDFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryID"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"fileURL"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"downloadCount"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<PpidFilesQuery, PpidFilesQueryVariables>;
export const GetApbDesReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAPBDesReports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reports"},"name":{"kind":"Name","value":"APBDReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromYear"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"toYear"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"commonTxnFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonTxnFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetApbDesReportsQuery, GetApbDesReportsQueryVariables>;
export const GetApbDesCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAPBDesCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categories"},"name":{"kind":"Name","value":"APBDCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"commonTxnCategoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonTxnCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<GetApbDesCategoriesQuery, GetApbDesCategoriesQueryVariables>;
export const GetApbDesReportsWithCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAPBDesReportsWithCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reports"},"name":{"kind":"Name","value":"APBDReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fromYear"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"toYear"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"commonTxnFields"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"categories"},"name":{"kind":"Name","value":"APBDCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"commonTxnCategoryFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonTxnFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonTxnCategoryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TransactionCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<GetApbDesReportsWithCategoriesQuery, GetApbDesReportsWithCategoriesQueryVariables>;
export const ArticleDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"articleDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ArticleTypeValue"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"article"},"name":{"kind":"Name","value":"articleBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"articleCardFields"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"short"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"articleCardFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<ArticleDetailQuery, ArticleDetailQueryVariables>;
export const ArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"articles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ArticleTypeValue"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"articleCardFields"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"short"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"articleCardFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"short"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleCardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"articleCards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ArticleTypeValue"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"short"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<ArticleCardsQuery, ArticleCardsQueryVariables>;
export const BumdesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"bumdes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bumdes"},"name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"BUMDES"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"short"}}]}}]}}]} as unknown as DocumentNode<BumdesQuery, BumdesQueryVariables>;
export const DestinationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"destinations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"destinations"},"name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"TOURISM"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"short"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<DestinationsQuery, DestinationsQueryVariables>;
export const PotenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"potencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"potencies"},"name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"POTENTIAL"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"short"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<PotenciesQuery, PotenciesQueryVariables>;
export const BansosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"bansos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bansosStatistic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<BansosQuery, BansosQueryVariables>;
export const BansosRecipientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"bansosRecipient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"recipients"},"name":{"kind":"Name","value":"bansosRecipient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"NIK"}},{"kind":"Field","name":{"kind":"Name","value":"KK"}},{"kind":"Field","name":{"kind":"Name","value":"bansos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<BansosRecipientQuery, BansosRecipientQueryVariables>;
export const DomainMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"domainMap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"map"},"name":{"kind":"Name","value":"_domainMap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<DomainMapQuery, DomainMapQueryVariables>;
export const GalleryItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"galleryItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"items"},"name":{"kind":"Name","value":"gallery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<GalleryItemsQuery, GalleryItemsQueryVariables>;
export const ProductSlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productSlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"schema"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"product"},"name":{"kind":"Name","value":"marketItemByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"Argument","name":{"kind":"Name","value":"desa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"schema"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<ProductSlugQuery, ProductSlugQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"desa"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"products"},"name":{"kind":"Name","value":"marketplace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"desa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"desa"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultPhoto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const ProductWithReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"productWithReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"schema"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewNumbers"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"products"},"name":{"kind":"Name","value":"marketItemByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"Argument","name":{"kind":"Name","value":"desa"},"value":{"kind":"Variable","name":{"kind":"Name","value":"schema"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"commonItemFields"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"marketItemReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewNumbers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"commonReviewFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultPhoto"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"photoID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"isDisabled"}},{"kind":"Field","name":{"kind":"Name","value":"isLimitedByStock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"URL"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"annotation"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonReviewFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItemReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ProductWithReviewsQuery, ProductWithReviewsQueryVariables>;
export const ReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"reviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"reviews"},"name":{"kind":"Name","value":"marketItemReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemID"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"commonReviewFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"commonReviewFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MarketItemReview"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ReviewsQuery, ReviewsQueryVariables>;
export const OrgMembersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"orgMembersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"members"},"name":{"kind":"Name","value":"govMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"EnumValue","value":"POSITION"}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"APARAT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<OrgMembersQueryQuery, OrgMembersQueryQueryVariables>;
export const PointOfInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pointOfInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"items"},"name":{"kind":"Name","value":"pointOfInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"point"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<PointOfInterestsQuery, PointOfInterestsQueryVariables>;
export const PointOfInterestsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pointOfInterestsByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"item"},"name":{"kind":"Name","value":"pointOfInterestByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"point"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<PointOfInterestsByIdQuery, PointOfInterestsByIdQueryVariables>;
export const MainPointOfInterestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mainPointOfInterest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"item"},"name":{"kind":"Name","value":"pointOfInterestByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"point"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]}}]} as unknown as DocumentNode<MainPointOfInterestQuery, MainPointOfInterestQueryVariables>;
export const PopulationStatisticDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"populationStatistic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"stats"},"name":{"kind":"Name","value":"populationStatistic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"male"}},{"kind":"Field","name":{"kind":"Name","value":"female"}},{"kind":"Field","name":{"kind":"Name","value":"mutation"}},{"kind":"Field","name":{"kind":"Name","value":"temporary"}},{"kind":"Field","name":{"kind":"Name","value":"religion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bloodType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusInFamily"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mutationIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mutationOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maleAgeRanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"femaleAgeRanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dusun"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wajibPilih"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<PopulationStatisticQuery, PopulationStatisticQueryVariables>;
export const ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"welcome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"alias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"desa"}},{"kind":"Field","name":{"kind":"Name","value":"dusun"}},{"kind":"Field","name":{"kind":"Name","value":"pemimpin"}},{"kind":"Field","name":{"kind":"Name","value":"BPD"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deskel"}},{"kind":"Field","name":{"kind":"Name","value":"ibukota"}},{"kind":"Field","name":{"kind":"Name","value":"kabkota"}},{"kind":"Field","name":{"kind":"Name","value":"kecamatan"}},{"kind":"Field","name":{"kind":"Name","value":"provinsi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEmail"}},{"kind":"Field","name":{"kind":"Name","value":"socialMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"tiktok"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"servicePhone"}},{"kind":"Field","name":{"kind":"Name","value":"workHour"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logoURL"}},{"kind":"Field","name":{"kind":"Name","value":"officeAddress"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"primaryPalette"}}]}}]}}]} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const DesaProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"desaProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vision"}},{"kind":"Field","name":{"kind":"Name","value":"mission"}},{"kind":"Field","name":{"kind":"Name","value":"history"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photoURL"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"borders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"BPDChart"}},{"kind":"Field","name":{"kind":"Name","value":"SPDChart"}}]}}]}}]} as unknown as DocumentNode<DesaProfileQuery, DesaProfileQueryVariables>;
export const ImportantContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"importantContacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"contacts"},"name":{"kind":"Name","value":"importantContacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<ImportantContactsQuery, ImportantContactsQueryVariables>;
export const ExternalLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"externalLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"links"},"name":{"kind":"Name","value":"externalLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"URL"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<ExternalLinksQuery, ExternalLinksQueryVariables>;
export const WelcomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"welcome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"welcome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundURL"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"personName"}},{"kind":"Field","name":{"kind":"Name","value":"personRole"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}}]}}]}}]} as unknown as DocumentNode<WelcomeQuery, WelcomeQueryVariables>;
export const BudgetSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"budgetSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"summary"},"name":{"kind":"Name","value":"latestAPBDSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expense"}},{"kind":"Field","name":{"kind":"Name","value":"income"}},{"kind":"Field","name":{"kind":"Name","value":"financingExpense"}},{"kind":"Field","name":{"kind":"Name","value":"financingIncome"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<BudgetSummaryQuery, BudgetSummaryQueryVariables>;
export const PopulationSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"populationSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"summary"},"name":{"kind":"Name","value":"populationStatistic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"male"}},{"kind":"Field","name":{"kind":"Name","value":"female"}},{"kind":"Field","name":{"kind":"Name","value":"temporary"}},{"kind":"Field","name":{"kind":"Name","value":"mutation"}},{"kind":"Field","name":{"kind":"Name","value":"mutationOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusInFamily"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<PopulationSummaryQuery, PopulationSummaryQueryVariables>;
export const PopulationMutationSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"populationMutationSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"summary"},"name":{"kind":"Name","value":"populationStatistic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"mutationOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<PopulationMutationSummaryQuery, PopulationMutationSummaryQueryVariables>;
export const StuntingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stunting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stunting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"keluargaSasaran"}},{"kind":"Field","name":{"kind":"Name","value":"berisiko"}},{"kind":"Field","name":{"kind":"Name","value":"baduta"}},{"kind":"Field","name":{"kind":"Name","value":"balita"}},{"kind":"Field","name":{"kind":"Name","value":"pasanganUsiaSubur"}},{"kind":"Field","name":{"kind":"Name","value":"pasanganUsiaSuburHamil"}}]}}]}}]} as unknown as DocumentNode<StuntingQuery, StuntingQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"userByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"desa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deskel"}},{"kind":"Field","name":{"kind":"Name","value":"kabkota"}},{"kind":"Field","name":{"kind":"Name","value":"provinsi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"photoURL"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;