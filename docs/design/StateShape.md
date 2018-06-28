# State Shape

The heart of the application is the state. So, we'll start by
talking about what that is. For a bit of background on the terms
used below, see [What's What?](../introduction/WhatIsWhat.md).

## The Basics

Essentially, we are just storing a few things:

* the user-selected entities
* the user-selected data filters
* data to be displayed


    {
      entities: {
        selected: {
          entities: [],
          groups: []
        },
        ...
      },
      dataPoints: {
        selected: [],
        ...
      },
      viewData: {
        items: {
          columns: [],
          list: []
        },
        ...
      },
    }

## Learn More

 - [View Data](ViewData.md)
 - [Select Entities](SelectingEntities.md)
 - [Data Points](DataPoints.md)


## Data Filters

### Available Data Filters

`availableDataFilters` represents the filters available to the user
to filter the data to be displayed for the selected Institutions, Groups
of Institutions, and Specific STARS Reports.

In order to be flexible, the app provides a default component for data
filter selection, but developers can provide a custom component as
necessary. For the default component, filters are extremely simple:

    {
      name: "Filter Name",
      key: "filter_key"
    },

and are represented as simple checkboxes. More complex filtering is
described in the [DataFilter Component](../components/DataFilter.md).

### Selected Data Filters

`selectedDataFilters` are also very simple in the default component and
represented identically to `availableDataFilters`.
