# Selected Entities

The representation of entities and [groups](Groups.md)
selected by the user.

See [Selecting Entities](README.md) for more information about
how these fit into the overall shape.

## State Shape
    
    {
        entities: [],
        groups: {
            aggregate: [],
            individual: []
        }
    }

## Entities

As described in the [overview](Overview.md), `Entities` are
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

## Selected groups

These are the groups that are currently selected for display and
is just an array of group keys. They can be retrieved from:
`entities.groups.available`

    [1, 3]
