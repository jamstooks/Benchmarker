export const searchFilters = [
  {
    choices: {
      list: [
        { value: "", title: "Select One" },
        { value: "Reporter", title: "Reporter" },
        { value: "Bronze", title: "Bronze" },
        { value: "Silver", title: "Silver" },
        { value: "Gold", title: "Gold" },
        { value: "Platinum", title: "Platinum" }
      ]
    },
    keyName: "rating",
    title: "Rating"
  },
  {
    choices: {
      list: [
        { value: "", title: "Select One" },
        { value: "Doctoral/Research", title: "Doctoral/Research" },
        { value: "Master", title: "Master" },
        { value: "Baccalaureate", title: "Baccalaureate" },
        { value: "Associate", title: "Associate" }
      ]
    },
    keyName: "type",
    title: "Type"
  }
];

export const searchResultColumns = [
  {
    title: "Institution Name",
    key: "name"
  },
  {
    title: "Rating",
    key: "rating"
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
