import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from 'crypto-hash';

const persistedQueriesMiddleware = createPersistedQueryLink({ sha256 });

export default persistedQueriesMiddleware