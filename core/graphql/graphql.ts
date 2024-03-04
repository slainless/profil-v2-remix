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

export type DomainMapQueryVariables = Exact<{ [key: string]: never; }>;


export type DomainMapQuery = { __typename?: 'Query', map: Array<{ __typename?: 'StringKV', name: string, value: string }> };

export type PointOfInterestsQueryVariables = Exact<{ [key: string]: never; }>;


export type PointOfInterestsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'PointOfInterest', ID: number, title: string, description: string, category: string, thumbnail?: { __typename?: 'GalleryItem', ID: number, URL: string } | null, point: { __typename?: 'Point', latitude: number, longitude: number } }> };

export type PointOfInterestsByIdQueryVariables = Exact<{
  itemID: Scalars['Int']['input'];
}>;


export type PointOfInterestsByIdQuery = { __typename?: 'Query', item?: { __typename?: 'PointOfInterest', ID: number, title: string, description: string, category: string, thumbnail?: { __typename?: 'GalleryItem', ID: number, URL: string } | null, point: { __typename?: 'Point', latitude: number, longitude: number } } | null };

export type MainPointOfInterestQueryVariables = Exact<{ [key: string]: never; }>;


export type MainPointOfInterestQuery = { __typename?: 'Query', item?: { __typename?: 'PointOfInterest', point: { __typename?: 'Point', latitude: number, longitude: number } } | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', postalCode: string, serviceEmail: string, phone: string, servicePhone: string, workHour: string, contact: string, email: string, logoURL: string, officeAddress: string, description: string, primaryPalette: Array<string>, alias: { __typename?: 'SettingAlias', desa: string, dusun: string, pemimpin: string, BPD: string }, name: { __typename?: 'SettingName', deskel: string, ibukota: string, kabkota: string, kecamatan: string, provinsi: string }, socialMedia: { __typename?: 'SettingSocialMedia', facebook: string, instagram: string, tiktok: string, twitter: string, youtube: string } } | null };

export type ImportantContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ImportantContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', name: string, contact: string, order: number, ID: number }> };

export type ExternalLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type ExternalLinksQuery = { __typename?: 'Query', links: Array<{ __typename?: 'ExternalLink', name: string, URL: string, order: number, ID: number }> };


export const DomainMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"domainMap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"map"},"name":{"kind":"Name","value":"_domainMap"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<DomainMapQuery, DomainMapQueryVariables>;
export const PointOfInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pointOfInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"items"},"name":{"kind":"Name","value":"pointOfInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"point"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<PointOfInterestsQuery, PointOfInterestsQueryVariables>;
export const PointOfInterestsByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pointOfInterestsByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"item"},"name":{"kind":"Name","value":"pointOfInterestByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"URL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"point"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<PointOfInterestsByIdQuery, PointOfInterestsByIdQueryVariables>;
export const MainPointOfInterestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mainPointOfInterest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"item"},"name":{"kind":"Name","value":"pointOfInterestByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"point"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]}}]} as unknown as DocumentNode<MainPointOfInterestQuery, MainPointOfInterestQueryVariables>;
export const ProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"alias"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"desa"}},{"kind":"Field","name":{"kind":"Name","value":"dusun"}},{"kind":"Field","name":{"kind":"Name","value":"pemimpin"}},{"kind":"Field","name":{"kind":"Name","value":"BPD"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deskel"}},{"kind":"Field","name":{"kind":"Name","value":"ibukota"}},{"kind":"Field","name":{"kind":"Name","value":"kabkota"}},{"kind":"Field","name":{"kind":"Name","value":"kecamatan"}},{"kind":"Field","name":{"kind":"Name","value":"provinsi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceEmail"}},{"kind":"Field","name":{"kind":"Name","value":"socialMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"tiktok"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"servicePhone"}},{"kind":"Field","name":{"kind":"Name","value":"workHour"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logoURL"}},{"kind":"Field","name":{"kind":"Name","value":"officeAddress"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"primaryPalette"}}]}}]}}]} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const ImportantContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"importantContacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"contacts"},"name":{"kind":"Name","value":"importantContacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<ImportantContactsQuery, ImportantContactsQueryVariables>;
export const ExternalLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"externalLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"links"},"name":{"kind":"Name","value":"externalLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"URL"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<ExternalLinksQuery, ExternalLinksQueryVariables>;