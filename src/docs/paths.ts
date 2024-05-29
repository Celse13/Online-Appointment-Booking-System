import { OpenAPIV3 } from 'openapi-types';
import examples from './examples/examples';
import authPaths from './auth/auth';
import usersPaths from './users/users';
const allPaths: OpenAPIV3.PathsObject = {
    ...examples,
    ...authPaths,
    ...usersPaths
};

export default allPaths;