/* v8 ignore start */
import {StackProps} from 'aws-cdk-lib';
export interface IEnvironment extends StackProps {
  stage: string;
  region: string;
}
/* v8 ignore stop */
