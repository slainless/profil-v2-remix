/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query PPIDCategories {\n    categories: PPIDCategories {\n      ID          name\n      description type\n    }\n  }\n": types.PpidCategoriesDocument,
    "\n  query PPIDFiles($categoryID: Int, $after: Int) {\n    files: PPIDFiles(categoryID: $categoryID, after: $after) {\n      ID fileURL\n      name\n      category { name type }\n      downloadCount\n      updatedAt\n    }\n  }\n": types.PpidFilesDocument,
    "\n  fragment commonTxnFields on Transaction {\n    year\n    budget\n    category { ID }\n    details {\n      name\n      value\n    }\n  }\n": types.CommonTxnFieldsFragmentDoc,
    "\n  fragment commonTxnCategoryFields on TransactionCategory {\n    ID\n    name\n    type\n  }\n": types.CommonTxnCategoryFieldsFragmentDoc,
    "\n  query getAPBDesReports($from: Int, $to: Int) {\n    reports: APBDReport(fromYear: $from, toYear: $to) {\n      ...commonTxnFields\n    }\n  }\n": types.GetApbDesReportsDocument,
    "\n  query getAPBDesCategories {\n    categories: APBDCategories {\n      ...commonTxnCategoryFields\n    }\n  }\n": types.GetApbDesCategoriesDocument,
    "\n  query getAPBDesReportsWithCategories($from: Int, $to: Int) {\n    reports: APBDReport(fromYear: $from, toYear: $to) {\n      ...commonTxnFields\n    }\n    categories: APBDCategories {\n      ...commonTxnCategoryFields\n    }\n  }\n": types.GetApbDesReportsWithCategoriesDocument,
    "\n  fragment articleCardFields on Article {\n    ID  title slug\n    thumbnail { URL } \n    views\n    createdAt updatedAt\n    type { name short slug }\n    user { name position }\n  }\n": types.ArticleCardFieldsFragmentDoc,
    "\n  query articleDetail($type: ArticleTypeValue, $slug: String!) {\n    article: articleBySlug(slug: $slug, type: $type) {\n      ...articleCardFields\n      type { type }\n      content short\n      thumbnail { caption }\n    }\n  }\n": types.ArticleDetailDocument,
    "\n  query articles($type: ArticleTypeValue, $limit: Int, $cursor: Int) {\n    articles(type: $type, limit: $limit, after: $cursor) {\n      ...articleCardFields\n      type { type }\n      short\n    }\n  }\n": types.ArticlesDocument,
    "\n  query articleCards($type: ArticleTypeValue, $limit: Int, $cursor: Int) {\n    articles(type: $type, limit: $limit, after: $cursor) {\n      ID  title slug\n      thumbnail { URL } \n      views short\n      createdAt updatedAt\n      user { name position }\n    }\n  }\n": types.ArticleCardsDocument,
    "\n  query bumdes {\n    bumdes: articles(type: BUMDES) {\n      thumbnail { URL }\n      title\n      slug\n      short\n    }\n  }\n": types.BumdesDocument,
    "\n  query destinations($limit: Int) {\n    destinations: articles(type: TOURISM, limit: $limit) {\n      thumbnail { URL }\n      title\n      short\n      slug\n    }\n  }\n": types.DestinationsDocument,
    "\n  query potencies {\n    potencies: articles(type: POTENTIAL) {\n      thumbnail { URL }\n      title\n      short\n      slug\n    }\n  }\n": types.PotenciesDocument,
    "\n  query bansos {\n    bansosStatistic {\n      total { name value }\n    }\n  }\n": types.BansosDocument,
    "\n  query bansosRecipient($searchQuery: String!) {\n    recipients: bansosRecipient(searchQuery: $searchQuery) {\n      name \n      NIK KK\n      bansos { name }\n    }\n  }\n": types.BansosRecipientDocument,
    "\n  query domainMap {\n    map: _domainMap { name value }\n  }\n": types.DomainMapDocument,
    "\n  query galleryItems($limit: Int, $cursor: Int) {\n    items: gallery(limit: $limit, after: $cursor) {\n      URL\n      caption\n      ID\n    }\n  }\n": types.GalleryItemsDocument,
    "\n  fragment commonReviewFields on MarketItemReview {\n    ID          user { ID photoURL name }\n    comment     rating\n    createdAt   updatedAt\n  }\n": types.CommonReviewFieldsFragmentDoc,
    "\n  fragment commonItemFields on MarketItem {\n    name    ID      slug    description\n    rating  reviews likes   views\n\n    user        { name phone }\n\n    # rating_n\n    # location\n    \n    defaultVariant  { ID }\n    defaultPhoto    { ID }\n\n    variants {\n      ID  photoID name\n      price stock\n      isDisabled  isLimitedByStock\n    }\n    media {\n      ID  URL caption annotation\n      createdAt updatedAt\n    }\n    category    { name slug }\n    subcategory\n\n    createdAt\n    updatedAt\n  }\n": types.CommonItemFieldsFragmentDoc,
    "\n  query productSlug($ID: Int!, $schema: String!) {\n    product: marketItemByID(ID: $ID, desa: $schema) { slug }\n  }\n": types.ProductSlugDocument,
    "\n  query products($limit: Int, $desa: String, $cursor: Int) {\n    products: marketplace(limit: $limit, desa: $desa, after: $cursor) {\n      name    ID        slug    description\n      rating  reviews   likes   views\n      user            { name phone }\n      defaultVariant  { name price }\n      defaultPhoto    { URL }\n      category    { name slug }\n      subcategory\n\n      createdAt\n      updatedAt\n    }\n  }\n": types.ProductsDocument,
    "\n  query product($ID: Int!, $schema: String!) {\n    products: marketItemByID(ID: $ID, desa: $schema) {\n      ...commonItemFields\n    }\n  }\n": types.ProductDocument,
    "\n  query productWithReviews($ID: Int!, $schema: String!, $reviewNumbers: Int) {\n    product: marketItemByID(ID: $ID, desa: $schema) {\n      ...commonItemFields\n    },\n    reviews: marketItemReviews(itemID: $ID, limit: $reviewNumbers) {\n      ...commonReviewFields\n    }\n  }\n": types.ProductWithReviewsDocument,
    "\n  query reviews($itemID: Int!, $limit: Int, $cursor: Int) {\n    reviews: marketItemReviews(itemID: $itemID, limit: $limit, after: $cursor) {\n      ...commonReviewFields\n    }\n  }\n": types.ReviewsDocument,
    "\n  query orgMembersQuery {\n    members: govMembers(sortBy: POSITION, sort: DESC, type: APARAT) {\n      name\n      photoURL\n      position\n    }\n  }\n": types.OrgMembersQueryDocument,
    "\n  query pointOfInterests {\n    items: pointOfInterests {\n      ID title description\n      thumbnail { ID URL }\n      point { latitude longitude }\n      category\n    }\n  }\n": types.PointOfInterestsDocument,
    "\n  query pointOfInterestsByID($itemID: Int!) {\n    item: pointOfInterestByID(ID: $itemID) {\n      ID title description\n      thumbnail { ID URL }\n      point { latitude longitude }\n      category\n    }\n  }\n": types.PointOfInterestsByIdDocument,
    "\n  query mainPointOfInterest {\n    item: pointOfInterestByID(ID: 1) {\n      point { latitude longitude }\n    }\n  }\n": types.MainPointOfInterestDocument,
    "\n  query populationStatistic {\n    stats: populationStatistic {\n      total     male      female\n      mutation  temporary\n      \n      religion        { name value }\n      bloodType       { name value }\n      statusInFamily  { name value }\n      maritalStatus   { name value }\n      mutationIn      { name value }\n      mutationOut     { name value }\n      maleAgeRanges   { name value }\n      femaleAgeRanges { name value }\n      dusun           { name value }\n      education       { name value }\n      job             { name value }\n      wajibPilih      { name value }\n    }\n  }\n": types.PopulationStatisticDocument,
    "\n  query profile {\n    profile {\n      postalCode\n      # welcome           { backgroundURL content personName personRole photoURL }\n      welcome           { backgroundURL }\n      alias             { desa dusun pemimpin BPD }\n      name              { deskel ibukota kabkota kecamatan provinsi }\n      serviceEmail\n      socialMedia       { facebook instagram tiktok twitter youtube }\n      phone\n      servicePhone\n      workHour\n      contact\n      email\n      logoURL\n      officeAddress\n      description\n\n      # BPDChart\n      # SPDChart\n\n      primaryPalette\n\n      # landingLayout     { ID visible order }\n      # profileLayout     { ID visible order }\n      # infographyLayout  { ID visible order }\n      # navbarLayout      { ID visible order }\n      # navmenuLayout     { ID visible order }\n    }\n  }\n": types.ProfileDocument,
    "\n  query desaProfile {\n    profile {\n      vision\n      mission\n      history { photoURL content }\n      borders { name value }\n      area\n      BPDChart\n      SPDChart\n    }\n  }\n": types.DesaProfileDocument,
    "\n  query importantContacts {\n    contacts: importantContacts {\n      name\n      contact\n      order\n      ID\n    }\n  }\n": types.ImportantContactsDocument,
    "\n  query externalLinks {\n    links: externalLinks {\n      name\n      URL\n      order\n      ID\n    }\n  }\n": types.ExternalLinksDocument,
    "\n  query welcome {\n    profile {\n      welcome {\n        backgroundURL\n        content\n        personName\n        personRole\n        photoURL\n      }\n    }\n  }\n": types.WelcomeDocument,
    "\n  query budgetSummary {\n    summary: latestAPBDSummary {\n      expense\n      income\n      financingExpense\n      financingIncome\n      year\n    }\n  }\n": types.BudgetSummaryDocument,
    "\n  query populationSummary {\n    summary: populationStatistic {\n      total\n      male\n      female\n      temporary\n      mutation\n      mutationOut     { value }\n      statusInFamily  { name value }\n    }\n  }\n": types.PopulationSummaryDocument,
    "\n  query populationMutationSummary {\n    summary: populationStatistic {\n      total\n      mutationOut { value }\n    }\n  }\n": types.PopulationMutationSummaryDocument,
    "\n  query stunting {\n    stunting(limit: 3) {\n      year\n      keluargaSasaran\n      berisiko\n      baduta\n      balita\n      pasanganUsiaSubur\n      pasanganUsiaSuburHamil\n    }\n  }\n": types.StuntingDocument,
    "\n  query user($username: String!) {\n    user: userByUsername(username: $username) {\n      ID\n      desa {\n        deskel\n        kabkota\n        provinsi\n      }\n      name\n      phone\n      photoURL\n    }\n  }\n": types.UserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PPIDCategories {\n    categories: PPIDCategories {\n      ID          name\n      description type\n    }\n  }\n"): (typeof documents)["\n  query PPIDCategories {\n    categories: PPIDCategories {\n      ID          name\n      description type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PPIDFiles($categoryID: Int, $after: Int) {\n    files: PPIDFiles(categoryID: $categoryID, after: $after) {\n      ID fileURL\n      name\n      category { name type }\n      downloadCount\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query PPIDFiles($categoryID: Int, $after: Int) {\n    files: PPIDFiles(categoryID: $categoryID, after: $after) {\n      ID fileURL\n      name\n      category { name type }\n      downloadCount\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment commonTxnFields on Transaction {\n    year\n    budget\n    category { ID }\n    details {\n      name\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment commonTxnFields on Transaction {\n    year\n    budget\n    category { ID }\n    details {\n      name\n      value\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment commonTxnCategoryFields on TransactionCategory {\n    ID\n    name\n    type\n  }\n"): (typeof documents)["\n  fragment commonTxnCategoryFields on TransactionCategory {\n    ID\n    name\n    type\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAPBDesReports($from: Int, $to: Int) {\n    reports: APBDReport(fromYear: $from, toYear: $to) {\n      ...commonTxnFields\n    }\n  }\n"): (typeof documents)["\n  query getAPBDesReports($from: Int, $to: Int) {\n    reports: APBDReport(fromYear: $from, toYear: $to) {\n      ...commonTxnFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAPBDesCategories {\n    categories: APBDCategories {\n      ...commonTxnCategoryFields\n    }\n  }\n"): (typeof documents)["\n  query getAPBDesCategories {\n    categories: APBDCategories {\n      ...commonTxnCategoryFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAPBDesReportsWithCategories($from: Int, $to: Int) {\n    reports: APBDReport(fromYear: $from, toYear: $to) {\n      ...commonTxnFields\n    }\n    categories: APBDCategories {\n      ...commonTxnCategoryFields\n    }\n  }\n"): (typeof documents)["\n  query getAPBDesReportsWithCategories($from: Int, $to: Int) {\n    reports: APBDReport(fromYear: $from, toYear: $to) {\n      ...commonTxnFields\n    }\n    categories: APBDCategories {\n      ...commonTxnCategoryFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment articleCardFields on Article {\n    ID  title slug\n    thumbnail { URL } \n    views\n    createdAt updatedAt\n    type { name short slug }\n    user { name position }\n  }\n"): (typeof documents)["\n  fragment articleCardFields on Article {\n    ID  title slug\n    thumbnail { URL } \n    views\n    createdAt updatedAt\n    type { name short slug }\n    user { name position }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query articleDetail($type: ArticleTypeValue, $slug: String!) {\n    article: articleBySlug(slug: $slug, type: $type) {\n      ...articleCardFields\n      type { type }\n      content short\n      thumbnail { caption }\n    }\n  }\n"): (typeof documents)["\n  query articleDetail($type: ArticleTypeValue, $slug: String!) {\n    article: articleBySlug(slug: $slug, type: $type) {\n      ...articleCardFields\n      type { type }\n      content short\n      thumbnail { caption }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query articles($type: ArticleTypeValue, $limit: Int, $cursor: Int) {\n    articles(type: $type, limit: $limit, after: $cursor) {\n      ...articleCardFields\n      type { type }\n      short\n    }\n  }\n"): (typeof documents)["\n  query articles($type: ArticleTypeValue, $limit: Int, $cursor: Int) {\n    articles(type: $type, limit: $limit, after: $cursor) {\n      ...articleCardFields\n      type { type }\n      short\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query articleCards($type: ArticleTypeValue, $limit: Int, $cursor: Int) {\n    articles(type: $type, limit: $limit, after: $cursor) {\n      ID  title slug\n      thumbnail { URL } \n      views short\n      createdAt updatedAt\n      user { name position }\n    }\n  }\n"): (typeof documents)["\n  query articleCards($type: ArticleTypeValue, $limit: Int, $cursor: Int) {\n    articles(type: $type, limit: $limit, after: $cursor) {\n      ID  title slug\n      thumbnail { URL } \n      views short\n      createdAt updatedAt\n      user { name position }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query bumdes {\n    bumdes: articles(type: BUMDES) {\n      thumbnail { URL }\n      title\n      slug\n      short\n    }\n  }\n"): (typeof documents)["\n  query bumdes {\n    bumdes: articles(type: BUMDES) {\n      thumbnail { URL }\n      title\n      slug\n      short\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query destinations($limit: Int) {\n    destinations: articles(type: TOURISM, limit: $limit) {\n      thumbnail { URL }\n      title\n      short\n      slug\n    }\n  }\n"): (typeof documents)["\n  query destinations($limit: Int) {\n    destinations: articles(type: TOURISM, limit: $limit) {\n      thumbnail { URL }\n      title\n      short\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query potencies {\n    potencies: articles(type: POTENTIAL) {\n      thumbnail { URL }\n      title\n      short\n      slug\n    }\n  }\n"): (typeof documents)["\n  query potencies {\n    potencies: articles(type: POTENTIAL) {\n      thumbnail { URL }\n      title\n      short\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query bansos {\n    bansosStatistic {\n      total { name value }\n    }\n  }\n"): (typeof documents)["\n  query bansos {\n    bansosStatistic {\n      total { name value }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query bansosRecipient($searchQuery: String!) {\n    recipients: bansosRecipient(searchQuery: $searchQuery) {\n      name \n      NIK KK\n      bansos { name }\n    }\n  }\n"): (typeof documents)["\n  query bansosRecipient($searchQuery: String!) {\n    recipients: bansosRecipient(searchQuery: $searchQuery) {\n      name \n      NIK KK\n      bansos { name }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query domainMap {\n    map: _domainMap { name value }\n  }\n"): (typeof documents)["\n  query domainMap {\n    map: _domainMap { name value }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query galleryItems($limit: Int, $cursor: Int) {\n    items: gallery(limit: $limit, after: $cursor) {\n      URL\n      caption\n      ID\n    }\n  }\n"): (typeof documents)["\n  query galleryItems($limit: Int, $cursor: Int) {\n    items: gallery(limit: $limit, after: $cursor) {\n      URL\n      caption\n      ID\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment commonReviewFields on MarketItemReview {\n    ID          user { ID photoURL name }\n    comment     rating\n    createdAt   updatedAt\n  }\n"): (typeof documents)["\n  fragment commonReviewFields on MarketItemReview {\n    ID          user { ID photoURL name }\n    comment     rating\n    createdAt   updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment commonItemFields on MarketItem {\n    name    ID      slug    description\n    rating  reviews likes   views\n\n    user        { name phone }\n\n    # rating_n\n    # location\n    \n    defaultVariant  { ID }\n    defaultPhoto    { ID }\n\n    variants {\n      ID  photoID name\n      price stock\n      isDisabled  isLimitedByStock\n    }\n    media {\n      ID  URL caption annotation\n      createdAt updatedAt\n    }\n    category    { name slug }\n    subcategory\n\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment commonItemFields on MarketItem {\n    name    ID      slug    description\n    rating  reviews likes   views\n\n    user        { name phone }\n\n    # rating_n\n    # location\n    \n    defaultVariant  { ID }\n    defaultPhoto    { ID }\n\n    variants {\n      ID  photoID name\n      price stock\n      isDisabled  isLimitedByStock\n    }\n    media {\n      ID  URL caption annotation\n      createdAt updatedAt\n    }\n    category    { name slug }\n    subcategory\n\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query productSlug($ID: Int!, $schema: String!) {\n    product: marketItemByID(ID: $ID, desa: $schema) { slug }\n  }\n"): (typeof documents)["\n  query productSlug($ID: Int!, $schema: String!) {\n    product: marketItemByID(ID: $ID, desa: $schema) { slug }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query products($limit: Int, $desa: String, $cursor: Int) {\n    products: marketplace(limit: $limit, desa: $desa, after: $cursor) {\n      name    ID        slug    description\n      rating  reviews   likes   views\n      user            { name phone }\n      defaultVariant  { name price }\n      defaultPhoto    { URL }\n      category    { name slug }\n      subcategory\n\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query products($limit: Int, $desa: String, $cursor: Int) {\n    products: marketplace(limit: $limit, desa: $desa, after: $cursor) {\n      name    ID        slug    description\n      rating  reviews   likes   views\n      user            { name phone }\n      defaultVariant  { name price }\n      defaultPhoto    { URL }\n      category    { name slug }\n      subcategory\n\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query product($ID: Int!, $schema: String!) {\n    products: marketItemByID(ID: $ID, desa: $schema) {\n      ...commonItemFields\n    }\n  }\n"): (typeof documents)["\n  query product($ID: Int!, $schema: String!) {\n    products: marketItemByID(ID: $ID, desa: $schema) {\n      ...commonItemFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query productWithReviews($ID: Int!, $schema: String!, $reviewNumbers: Int) {\n    product: marketItemByID(ID: $ID, desa: $schema) {\n      ...commonItemFields\n    },\n    reviews: marketItemReviews(itemID: $ID, limit: $reviewNumbers) {\n      ...commonReviewFields\n    }\n  }\n"): (typeof documents)["\n  query productWithReviews($ID: Int!, $schema: String!, $reviewNumbers: Int) {\n    product: marketItemByID(ID: $ID, desa: $schema) {\n      ...commonItemFields\n    },\n    reviews: marketItemReviews(itemID: $ID, limit: $reviewNumbers) {\n      ...commonReviewFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query reviews($itemID: Int!, $limit: Int, $cursor: Int) {\n    reviews: marketItemReviews(itemID: $itemID, limit: $limit, after: $cursor) {\n      ...commonReviewFields\n    }\n  }\n"): (typeof documents)["\n  query reviews($itemID: Int!, $limit: Int, $cursor: Int) {\n    reviews: marketItemReviews(itemID: $itemID, limit: $limit, after: $cursor) {\n      ...commonReviewFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query orgMembersQuery {\n    members: govMembers(sortBy: POSITION, sort: DESC, type: APARAT) {\n      name\n      photoURL\n      position\n    }\n  }\n"): (typeof documents)["\n  query orgMembersQuery {\n    members: govMembers(sortBy: POSITION, sort: DESC, type: APARAT) {\n      name\n      photoURL\n      position\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query pointOfInterests {\n    items: pointOfInterests {\n      ID title description\n      thumbnail { ID URL }\n      point { latitude longitude }\n      category\n    }\n  }\n"): (typeof documents)["\n  query pointOfInterests {\n    items: pointOfInterests {\n      ID title description\n      thumbnail { ID URL }\n      point { latitude longitude }\n      category\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query pointOfInterestsByID($itemID: Int!) {\n    item: pointOfInterestByID(ID: $itemID) {\n      ID title description\n      thumbnail { ID URL }\n      point { latitude longitude }\n      category\n    }\n  }\n"): (typeof documents)["\n  query pointOfInterestsByID($itemID: Int!) {\n    item: pointOfInterestByID(ID: $itemID) {\n      ID title description\n      thumbnail { ID URL }\n      point { latitude longitude }\n      category\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query mainPointOfInterest {\n    item: pointOfInterestByID(ID: 1) {\n      point { latitude longitude }\n    }\n  }\n"): (typeof documents)["\n  query mainPointOfInterest {\n    item: pointOfInterestByID(ID: 1) {\n      point { latitude longitude }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query populationStatistic {\n    stats: populationStatistic {\n      total     male      female\n      mutation  temporary\n      \n      religion        { name value }\n      bloodType       { name value }\n      statusInFamily  { name value }\n      maritalStatus   { name value }\n      mutationIn      { name value }\n      mutationOut     { name value }\n      maleAgeRanges   { name value }\n      femaleAgeRanges { name value }\n      dusun           { name value }\n      education       { name value }\n      job             { name value }\n      wajibPilih      { name value }\n    }\n  }\n"): (typeof documents)["\n  query populationStatistic {\n    stats: populationStatistic {\n      total     male      female\n      mutation  temporary\n      \n      religion        { name value }\n      bloodType       { name value }\n      statusInFamily  { name value }\n      maritalStatus   { name value }\n      mutationIn      { name value }\n      mutationOut     { name value }\n      maleAgeRanges   { name value }\n      femaleAgeRanges { name value }\n      dusun           { name value }\n      education       { name value }\n      job             { name value }\n      wajibPilih      { name value }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query profile {\n    profile {\n      postalCode\n      # welcome           { backgroundURL content personName personRole photoURL }\n      welcome           { backgroundURL }\n      alias             { desa dusun pemimpin BPD }\n      name              { deskel ibukota kabkota kecamatan provinsi }\n      serviceEmail\n      socialMedia       { facebook instagram tiktok twitter youtube }\n      phone\n      servicePhone\n      workHour\n      contact\n      email\n      logoURL\n      officeAddress\n      description\n\n      # BPDChart\n      # SPDChart\n\n      primaryPalette\n\n      # landingLayout     { ID visible order }\n      # profileLayout     { ID visible order }\n      # infographyLayout  { ID visible order }\n      # navbarLayout      { ID visible order }\n      # navmenuLayout     { ID visible order }\n    }\n  }\n"): (typeof documents)["\n  query profile {\n    profile {\n      postalCode\n      # welcome           { backgroundURL content personName personRole photoURL }\n      welcome           { backgroundURL }\n      alias             { desa dusun pemimpin BPD }\n      name              { deskel ibukota kabkota kecamatan provinsi }\n      serviceEmail\n      socialMedia       { facebook instagram tiktok twitter youtube }\n      phone\n      servicePhone\n      workHour\n      contact\n      email\n      logoURL\n      officeAddress\n      description\n\n      # BPDChart\n      # SPDChart\n\n      primaryPalette\n\n      # landingLayout     { ID visible order }\n      # profileLayout     { ID visible order }\n      # infographyLayout  { ID visible order }\n      # navbarLayout      { ID visible order }\n      # navmenuLayout     { ID visible order }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query desaProfile {\n    profile {\n      vision\n      mission\n      history { photoURL content }\n      borders { name value }\n      area\n      BPDChart\n      SPDChart\n    }\n  }\n"): (typeof documents)["\n  query desaProfile {\n    profile {\n      vision\n      mission\n      history { photoURL content }\n      borders { name value }\n      area\n      BPDChart\n      SPDChart\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query importantContacts {\n    contacts: importantContacts {\n      name\n      contact\n      order\n      ID\n    }\n  }\n"): (typeof documents)["\n  query importantContacts {\n    contacts: importantContacts {\n      name\n      contact\n      order\n      ID\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query externalLinks {\n    links: externalLinks {\n      name\n      URL\n      order\n      ID\n    }\n  }\n"): (typeof documents)["\n  query externalLinks {\n    links: externalLinks {\n      name\n      URL\n      order\n      ID\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query welcome {\n    profile {\n      welcome {\n        backgroundURL\n        content\n        personName\n        personRole\n        photoURL\n      }\n    }\n  }\n"): (typeof documents)["\n  query welcome {\n    profile {\n      welcome {\n        backgroundURL\n        content\n        personName\n        personRole\n        photoURL\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query budgetSummary {\n    summary: latestAPBDSummary {\n      expense\n      income\n      financingExpense\n      financingIncome\n      year\n    }\n  }\n"): (typeof documents)["\n  query budgetSummary {\n    summary: latestAPBDSummary {\n      expense\n      income\n      financingExpense\n      financingIncome\n      year\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query populationSummary {\n    summary: populationStatistic {\n      total\n      male\n      female\n      temporary\n      mutation\n      mutationOut     { value }\n      statusInFamily  { name value }\n    }\n  }\n"): (typeof documents)["\n  query populationSummary {\n    summary: populationStatistic {\n      total\n      male\n      female\n      temporary\n      mutation\n      mutationOut     { value }\n      statusInFamily  { name value }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query populationMutationSummary {\n    summary: populationStatistic {\n      total\n      mutationOut { value }\n    }\n  }\n"): (typeof documents)["\n  query populationMutationSummary {\n    summary: populationStatistic {\n      total\n      mutationOut { value }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query stunting {\n    stunting(limit: 3) {\n      year\n      keluargaSasaran\n      berisiko\n      baduta\n      balita\n      pasanganUsiaSubur\n      pasanganUsiaSuburHamil\n    }\n  }\n"): (typeof documents)["\n  query stunting {\n    stunting(limit: 3) {\n      year\n      keluargaSasaran\n      berisiko\n      baduta\n      balita\n      pasanganUsiaSubur\n      pasanganUsiaSuburHamil\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query user($username: String!) {\n    user: userByUsername(username: $username) {\n      ID\n      desa {\n        deskel\n        kabkota\n        provinsi\n      }\n      name\n      phone\n      photoURL\n    }\n  }\n"): (typeof documents)["\n  query user($username: String!) {\n    user: userByUsername(username: $username) {\n      ID\n      desa {\n        deskel\n        kabkota\n        provinsi\n      }\n      name\n      phone\n      photoURL\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;