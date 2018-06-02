export const HOST = "184.72.170.85";
export const PORT = "8081";

export const searchResultColumns = [
  {
    title: "Institution Name",
    key: "name"
  },
  {
    title: "Rating",
    key: "rating_name"
  },
  {
    title: "Type",
    key: "type"
  }
];

export const initialDataFilters = [
  {
    name: "Category",
    type: "select",
    key: "category",
    buttonTitle: "Add Score",
    choices: {
      isFetching: false,
      items: [
        {
          name: "Institutional Characteristics",
          id: "cat-22"
        },
        {
          name: "Academics",
          id: "cat-23"
        },
        {
          name: "Engagement",
          id: "cat-24"
        },
        {
          name: "Operations",
          id: "cat-25"
        },
        {
          name: "Planning & Administration",
          id: "cat-26"
        },
        {
          name: "Innovation & Leadership",
          id: "cat-27"
        }
      ]
    },
    value: null,
    parentKey: null
  },

  {
    name: "Subcategory",
    type: "select",
    key: "subcategory",
    buttonTitle: "Add Score",
    choices: {
      isFetching: false,
      items: []
    },
    value: null,
    parentKey: "category"
  },

  {
    name: "Credit",
    type: "select",
    key: "credit",
    buttonTitle: "Add Score",
    choices: {
      isFetching: false,
      items: []
    },
    value: null,
    parentKey: "subcategory"
  },
  {
    name: "Field",
    type: "select",
    key: "field",
    buttonTitle: "Add Value",
    choices: {
      isFetching: false,
      items: []
    },
    value: null,
    parentKey: "credit"
  }
];
