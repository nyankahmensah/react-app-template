import { gql } from "@apollo/client";

const schema  = gql`

  type Me {
    _id: ID
    email: String
    phone: String
    name: String
    permissions: [String]
  }

  enum Theme {
    light
    dark
  }

  type Config {
    theme: Theme
  }

  extend type Query {
    isLoggedIn: Boolean!
    me: Me
    config: Config
  }
  
`;

export default schema;