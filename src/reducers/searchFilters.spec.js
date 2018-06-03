import searchFilters from './searchFilters';

describe('search filters reducer', () => {
  it('should handle initial state', () => {
    expect(searchFilters(undefined, [])).toEqual({
      available: {
        isFetching: false,
        filters: []
      },
      selected: {}
    });
  });

  it('should handle UPDATE_SEARCH_FILTER', () => {
    expect(
      searchFilters(
        {
          available: { isFetching: false, filters: [] },
          selected: { one: 1, two: 2 }
        },
        {
          type: 'UPDATE_SEARCH_FILTER',
          filter: {
            one: 3
          }
        }
      )
    ).toEqual({
      available: { isFetching: false, filters: [] },
      selected: { one: 3, two: 2 }
    });
    
  });
  
  it('should handle UPDATE_SEARCH_FILTER for empty prop', () => {
    expect(
      searchFilters(
        {
          available: { isFetching: false, filters: [] },
          selected: { one: 1, two: 2 }
        },
        {
          type: 'UPDATE_SEARCH_FILTER',
          filter: {
            one: ""
          }
        }
      )
    ).toEqual({
      available: { isFetching: false, filters: [] },
      selected: { two: 2 }
    });
    
  });

  it('should handle RESET_SEARCH_FILTERS', () => {
    expect(
      searchFilters(
        {
          available: { isFetching: false, filters: [] },
          selected: { one: 1, two: 2 }
        },
        {
          type: 'RESET_SEARCH_FILTERS'
        }
      )
    ).toEqual({
      available: { isFetching: false, filters: [] },
      selected: {}
    });
  });

  it('should handle START_FETCH_SEARCH_FILTERS', () => {
    expect(
      searchFilters(
        {
          available: { isFetching: false, filters: [] },
          selected: { one: 1, two: 2 }
        },
        {
          type: 'START_FETCH_SEARCH_FILTERS'
        }
      )
    ).toEqual({
      available: { isFetching: true, filters: [] },
      selected: { one: 1, two: 2 }
    });
  });

  it('should handle RECEIVE_FETCH_SEARCH_FILTERS', () => {
    let tempFilters = [
      {
        key: 'k1',
        title: 'K1',
        choices: {
          list: [
            { value: '', title: 'Select One' },
            { value: 'Gold', title: 'Gold' }
          ]
        }
      }
    ];

    expect(
      searchFilters(
        {
          available: { isFetching: true, filters: [] },
          selected: { one: 1, two: 2 }
        },
        {
          type: 'RECEIVE_FETCH_SEARCH_FILTERS',
          filters: tempFilters
        }
      )
    ).toEqual({
      available: { isFetching: false, filters: tempFilters },
      selected: { one: 1, two: 2 }
    });
  });
});
