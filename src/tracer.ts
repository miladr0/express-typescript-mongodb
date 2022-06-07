import tracer from 'dd-trace';
import { isProduction } from './config';

if (isProduction) {
  tracer.init(); // initialized in a different file to avoid hoisting.
}
export default tracer;
