import { OpenAPIV3 } from 'openapi-types';
import examples from './examples/examples';
import authPaths from './auth/auth';
import usersPaths from './users/users';
import appointmentControllerPath from './appointment/appointment';
import adminPaths from './admin/business';
import servicePath from './services/services';

const allPaths: OpenAPIV3.PathsObject = {
  ...examples,
  ...authPaths,
  ...usersPaths,
  ...appointmentControllerPath,
  ...adminPaths,
  ...servicePath,
};

export default allPaths;
