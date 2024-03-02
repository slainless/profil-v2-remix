
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-profil-v2.digitaldesa.id/grapher",
  documents: [
    "app/**/*.tsx",
    "app/**/*.ts",
  ],
  generates: {
    "app/graphql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
    }
  },
  ignoreNoDocuments: true,
};

export default config;
