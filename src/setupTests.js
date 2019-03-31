import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { matchers } from 'jest-emotion';

Enzyme.configure({ adapter: new EnzymeAdapter() });
expect.extend(matchers);
