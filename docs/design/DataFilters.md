# Data Filters

These provide a way for users to select the data they want.
Representing the selected filters is fairly easy, but defining
filters and then providing the user interface is a little harder.

Basic data filters could be thought of as check boxes... "I want
this data point or I don't." STARS needs more complicated data
filters that drill-down based on other filters.

## Filter

A filter has a name, choices, the currently selected choice and an
optional parent-filter. Child-filters depend on their parent filter
to populate their choices. Here's an example of two filters:

    {
      name: "Category",
      type: "select",
      key: "category",
      buttonTitle: "Add Score",
      choices: {
        isFetching: false,
        items: [
          {name: "cat1", id: 1},
          {name: "cat2", id: 2}
        ],
      },
      value: 1,
      parentKey: null
    }

    {
      name: "Subcategory",
      type: "select",
      key: "subcategory",
      buttonTitle: "Add Score",
      choices: {
        isFetching: false,
        items: [
          {name: "subcat1", id: 3},
          {name: "subcat2", id: 4}
        ],
      },
      value: null,
      parentKey: "category"
    }

There may be a need for other types of filters, like yes/no filters:

    {
      name: "Overall Score",
      type: "boolean",
      key: "overallScore",
      defaultValue: false,
      value: false
    }

In this case there is a filter that would show a checkbox that is
not checked by default.

## Selected Filters

Selected filters are simply the `filterKey` and the `id`. They are
stored in a list of tuples so that they can be sorted.

    [
      ("category", 2),
      ("subcategory", 4)
    ]

## Fetching the choices

Choices need to be fetched on initialization and then again
whenever a parent filter changes its selection. This can be done
simply with two redux actions, one that requests the values and
sets `isFetching` to `true` and one that receives the updated
list of choices.

## UI Notes

 - when a filter has no choices then the select will be disabled
 - select-type choices have a button beside them to add them to
 the selected filters
