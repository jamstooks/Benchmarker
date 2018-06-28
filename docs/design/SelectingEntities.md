# Selecting Entities

The entities components help users select entities (reports)
and groups of entities.

## State Shape
    
    {
        search: {
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
        },
        selected: {
            entities: [],
            groups: {
                aggregate: [],
                individual: []
            }
        },
        availableGroups: {
            isFetching: false,
            didInvalidate: false,
            groups: [],
            beingRenamed: []
        },
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

## Selected Entities

As described in the [overview](Overview.md), `selectedEntities` are
selected STARS Institutions and Reports.

### Specific Institutions (Entities)

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
