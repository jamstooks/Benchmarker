# DataFilters

Displays a series of data filters.

Currently those filters are only displayed as checkboxes, but
more complex filtering options will come soon.

## Configuration

`DataFilter` accepts 3 properties:

### `filters`

This is simply a group of filters in the form:

    [
      {
        name: "<name_of_the_filter>",
        key: "<a_unique_key>"
      }
    ]

Eventually filters can include `type` properties and even custom
elements of their own

### `selection`

This represents the selected filters. In this first iteration it
is simply a list of the selected filters (i.e. those checked off),
but in subsequent versions this will likely be key-value pairings
or even more complex objects.

### `handleFilterChange`

What to call when a filter is changed.