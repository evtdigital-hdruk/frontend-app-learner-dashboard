import * as paragon from '@edx/paragon';

import queryString from 'query-string';

import { MockUseState } from 'testUtils';
import { reduxHooks } from 'hooks';
import { ListPageSize, SortKeys } from 'data/constants/app';
import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCurrentVideoList: jest.fn(),
    useVideoPageNumber: jest.fn(() => 23),
    useSetVideoPageNumber: jest.fn(),
  },
}));

jest.mock('query-string', () => ({
  parse: jest.fn(() => ({})),
}));

const state = new MockUseState(hooks);

const testList = ['a', 'b'];
const testListData = {
  numPages: 52,
  visible: testList,
};
const testSortBy = 'fake sort option';
const testFilters = ['some', 'fake', 'filters'];
const testSetFilters = { add: jest.fn(), remove: jest.fn() };
const testCheckboxSetValues = [testFilters, testSetFilters];
const setVideoPageNumber = jest.fn(val => ({ setVideoPageNumber: val }));
reduxHooks.useSetVideoPageNumber.mockReturnValue(setVideoPageNumber);

describe('CourseList hooks', () => {
  let out;

  reduxHooks.useCurrentVideoList.mockReturnValue(testListData);
  paragon.useCheckboxSetValues.mockImplementation(() => testCheckboxSetValues);

  describe('state values', () => {
    state.testGetter(state.keys.sortBy);
    jest.clearAllMocks();
  });

  describe('useVideoListData', () => {
    afterEach(state.restore);
    beforeEach(() => {
      state.mock();
      state.mockVal(state.keys.sortBy, testSortBy);
      out = hooks.useVideoListData();
    });
    describe('behavior', () => {
      it('initializes sort with enrollment date', () => {
        state.expectInitializedWith(state.keys.sortBy, SortKeys.enrolled);
      });
      it('loads current course list with sortBy, filters, and page size', () => {
        expect(reduxHooks.useCurrentVideoList).toHaveBeenCalledWith({
          sortBy: testSortBy,
          filters: testFilters,
          pageSize: ListPageSize,
        });
      });
      it('loads current course list with page size 0 if/when there is query param disable_pagination=1', () => {
        state.mock();
        state.mockVal(state.keys.sortBy, testSortBy);
        queryString.parse.mockReturnValueOnce({ disable_pagination: 1 });
        out = hooks.useVideoListData();
        expect(reduxHooks.useCurrentVideoList).toHaveBeenCalledWith({
          sortBy: testSortBy,
          filters: testFilters,
          pageSize: 0,
        });
      });
    });
    describe('output', () => {
      test('pageNumber loads from usePageNumber hook', () => {
        expect(out.videoPageNumber).toEqual(reduxHooks.usePageNumber());
      });
      test('numPages and visible list load from useCurrentVideoList hook', () => {
        expect(out.numPages).toEqual(testListData.numPages);
        expect(out.visibleList).toEqual(testListData.visible);
      });
      test('showFilters is true iff filters is not empty', () => {
        expect(out.showFilters).toEqual(true);
        state.mockVal(state.keys.sortBy, testSortBy);
        paragon.useCheckboxSetValues.mockReturnValueOnce([[], testSetFilters]);
        out = hooks.useVideoListData();
        // don't show filter when list is empty.
        expect(out.showFilters).toEqual(false);
      });
      describe('filterOptions', () => {
        test('sortBy and setSortBy are connected to the state value', () => {
          expect(out.filterOptions.sortBy).toEqual(testSortBy);
          expect(out.filterOptions.setSortBy).toEqual(state.setState.sortBy);
        });
        test('filters and setFilters passed by useCheckboxSetValues', () => {
          expect(out.filterOptions.filters).toEqual(testFilters);
          expect(out.filterOptions.setFilters).toEqual(testSetFilters);
        });
        test('handleRemoveFilter creates callback to call setFilter.remove', () => {
          const cb = out.filterOptions.handleRemoveFilter(testFilters[0]);
          expect(testSetFilters.remove).not.toHaveBeenCalled();
          cb();
          expect(testSetFilters.remove).toHaveBeenCalledWith(testFilters[0]);
        });
        test('setPageNumber dispatches setPageNumber action with passed value', () => {
          expect(out.setVideoPageNumber(2)).toEqual(setVideoPageNumber(2));
        });
      });
    });
  });
});
