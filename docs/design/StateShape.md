# State Shape

The heart of the application is the state. So, we'll start by
talking about what that is. For a bit of background on the terms
used below, see [What's What?](../introduction/WhatIsWhat.md).

## The Basics

Essentially, we are just storing a few things:

* the available filters
* the user-selected filters
* the user-selected entities
* data to be displayed

    {
      viewData: {
        isFetching: <bool>,
        didInvalidate: <bool>,
        lastUpdated: <timestamp>,
        items: [],
        columns: [],
      },

      availableSearchFilters: [],
      selectedSearchFilters: {},
      
      searchResults: {
        isFetching: <bool>,
        didInvalidate: <bool>,
        lastUpdated: <timestamp>,
        entities: [],
      },

      availableDataFilters: [],
      selectedDataFilters: [],

      selectedEntities: [],

      availableGroups: {
        isFetching: <bool>,
        didInvalidate: <bool>,
        lastUpdated: <timestamp>,
        groups: [],
      },
      selectedGroups: []
    }

## View Data

`viewData` will be the data that we display as a graph and with a
table for the user. Typically, `items` and `columns` will be structured, like this:

    {
      columns: [
        {
          title: "Institution Name",
          key: "name"
        },
        ...
      ]
      items: [
        {
          id: 1,
          name: "University of Somewhere",
          ...
        }
      ]
    }

How this data is retrieved is addressed in
[Async Actions](AsyncActions.md)

## Search Filters

### Available Search Filters

`availableSearchFilters` are more like a configuration of the app.
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

`selectedSearchFilters` are the search filters currently selected by a user:

    {
      <filter_key>: <selected_value>,
      <filter_key>: <selected_value>,
      ...
    }

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

## Selected Entities

As described in the [overview](Overview.md), `selectedEntities` are
selected STARS Institutions and Reports.

### Specific Institutions

    {
      name: "University of Elsewhere",
      id: <unique_id>,
      selectedVersions: [1, 2],
      availableVersions: [
        { id: 1, name: "1.2", date: "Aug 2018" }
      ]
    }

`availableVersions` are all the reports submitted by the institution.
A user can simply select the institution and get the latest report,
but specific reports can be stored in `selectedVersions` for display.
If `selectedVersions` is `[]` then the latest report will be used.

## Available Group Cache

These are the groups that have been saved by the user.
Groups are stored in a permanant data store, but can be safely cached
locally for quick READ-ONLY access.

### Ad-hoc Groups

These are groups of specific reports created by a user.

    {
      type: 'ADHOC_GROUP',
      name: "Pac 10",
      key: <unique_id>,
      entities: [
        {
          name: "University of Elsewhere",
          id: <unique_id>,
          selectedVersions: [1, 2],
          availableVersions: [
            { id: 1, name: "1.2", date: "Aug 2018" }
          ]
        },
        ...
      ]
    }

Question: will we need to updateAvailable versions every session?
I guess it depends on the group management UI.

### Filtered Groups

Filtered groups are also created by a user, but only the filters are
stored. This means that the group will be regenerated when used.

    {
      type: 'FILTERED_GROUP',
      name: "Silver-Rated Doctorate-Granting Institutions",
      key: <unique_id>,
      filters: [
        {type: "Doctoral"},
        {rating: "Silver"},
      ],
      cache: [<cached_during_session>]
    }
  
Note: This assumes that we are using the "latest" version for
these intitutions unless one of the filters is "version".

## Selected groups

These are the groups that are currently selected for display and
is just an array of group keys.

    [1, 3]