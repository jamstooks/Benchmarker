# Searching for Entities

Filters are provided to let the user quickly find entities.

See [Selecting Entities](README.md) for more information about
how these fit into the overall shape.

## State Shape
    
    {
        filters: {
            available: {
              isFetching: false,
              filters: []
            },
            selected: {}
        },
        results: {
            isFetching: <bool>,
            entities: []
        }
    }

## Search Filters

### Available Search Filters

`search.filters.available` are more like a configuration of the app.
They are not designed to change during runtime, but developers should
be able to change them as new filters become available. Filters are used
to select entities or groups of entities. A filter is currently
represented like this:

    {
      title: "Country",
      keyName: "country",
      choices: {
        list: [
          { key: "Select One", value: "" },
          { key: "canada", value: "Canada" },
          { key: "mexico", value: "Mexico" },
          { key: "usa", value: "USA" },
          ...
        ]
      }
    }

Currently `choices` has a `list` property, but it may one day need
some sort of callback or even API endpoint alternative.

### Selected Filters

`search.filters.selected` are the search filters currently selected by a user:

    {
      <filter_key>: <selected_value>,
      <filter_key>: <selected_value>,
      ...
    }
