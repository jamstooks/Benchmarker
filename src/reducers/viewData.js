const viewData = (
  state = {
    isFetching: false,
    isSorting: false,
    items: {
      columns: [],
      list: []
    },
    sortColumn: null
  },
  action
) => {
  switch (action.type) {
    case "START_UPDATE_VIEW_DATA":
      return {
        ...state,
        ...{
          isFetching: true,
          isSorting: false,
          items: { columns: [], list: [] }
        }
      };
    case "RECEIVE_VIEW_DATA":
      return {
        ...state,
        ...{
          isFetching: false,
          isSorting: false,
          items: action.data
        }
      };
    case "START_SORT_VIEW_DATA":
      return {
        ...state,
        ...{
          sortColumn: action.columnKey,
          isSorting: true
        }
      };
    default:
      return state;
  }
};

export default viewData;
