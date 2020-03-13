import dust from 'dustjs-linkedin';
import '@testing-library/jest-dom/extend-expect';
import { addSharedHelper } from './src/shared/shared.helper';
addSharedHelper(dust);
global.dust = dust;