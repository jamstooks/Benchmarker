# Groups

Groups of entities can be stored by the user for use later.
There are two types of groups: Ad-hoc Groups and Filtered Groups.

See [Selecting Entities](README.md) for more information about
how these fit into the overall shape.

## State Shape
    
    {
        isFetching: <bool>,
        available: [],
        beingRenamed: []
    }

## Available Group Cache

These are the groups that have been saved by the user.
Groups are stored in a permanant data store, but can be safely cached
locally at `groups.available` for quick READ-ONLY access.

## Group Types

### `ADHOC_GROUP`

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

### `FILTERED_GROUP`

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
