import { StrictDict } from 'utils';

import simpleSelectors from './simpleSelectors';
import appSelectors from './appSelectors';
import courseCard from './courseCard';
import currentList from './currentList';
import currentVideoList from './currentVideoList';

export default StrictDict({
  ...simpleSelectors,
  ...appSelectors,
  courseCard,
  currentList,
  currentVideoList,
});
