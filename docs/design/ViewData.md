# View Data

This is the data that is a product of the selected entities
and selected data points. It is update every time these change.

- [Data Structure](#data)
- [Methods](#methods)

<a name='data'></a>
## Data Structure

    viewData: {
      isFetching: <bool>,
      isSorting: <bool>,
      items: {
        columns: [],
        list: []
      },
      sortColumn: <key or null>
    },

`items` are retrieved based on filters using the `connector`.

`items.list` can be sorted using the `orderViewData(columnKey)`
method.

`columns` are calculated from `dataFilters` provided to the connector.

`sortColumn` represents the specific dataFilter that the user has
selected to sort by. It is saved and persists between data fetches.
It can be null to simply sort by the first column (entity name). If
the specific dataFilter is deselected by the user, it will be reset.

### Columns

These are just tied to the selected data keys, with the entity name
always being the first column even if no other columns have been selected

Each column must have:
- `title` - what shows up in the header of the table column
- `key` - the unique lookup key for that column
- `isNumeric` - indicates if this is a numeric entity (can it be graphed)
- `unit` - an optional string representation of the unit of measure

An example might be:

    [
      {'title': 'University', 'key': 'entity', isNumeric: false, unit: null},
      {'title': 'Data Point 1', 'key': 'd_1', isNumeric: true, unit: "%"},
      {'title': 'Data Point 2', 'key': 'd_2', isNumeric: true, unit: null}
    ]

Note: - entity column title is provided by the connector

### Specific Items

Each item represents a specific entity's values for a given `DataPoint`

 - columnKey - the key tied to the DataPoint
  - `value` - what is displayed in the table
  - `link` - displayed as an external link icon

@todo - consider adding an id or key property for react

    [
      { 
        entity: { value: "U of Somewhere", link: "http://.."},
        d_1: { value: .54, link: "http://.." },
        d_2: { value: 1.7, link: "http://.." }
      },
      { 
        entity: { title: "U of Elsewhere", link: "http://.."},
        d_1: { value: .25, link: "http://.." },
        d_2: { value: 10, link: "http://.." }
      },
    ]

So with the state above, this should look like:

| University      | Data Point 1 | Data Point 2 |
| --------------- | ------------ | ------------ |
| U. of Somewhere | .54          | 1.7          |
| U. of Elsewhere | .25          | 10           |

<a name='data'></a>
## Methods

Whenever a user adds or removes a DataPoint or Entity, the
displayed data needs to change. All actions are defined in
[src/actions/viewData.js](../../src/actions/viewData.js),
but the asynchronous methods we're interested in here are

- `fetchViewData(entites, dataPoints)`
- `removeColumn(columnKey)`
- `removeEntity(entityId)`
- `setSortColumn(columnKey)`

`fetchViewData` will be called anytime
an entity or dataPoint is added. The `connector` is then
called upon to actually get the data by calling
`connector.getViewData(entities, dataPoints)`.

Once the data is received from the `connector` it is stored
in the state, but can be modified *locally* in two ways:

 1. When the user selects a particular column to sort by
 2. When new data is fetched, it may need to be re-sorted

`removeColumn(columnKey)` and `removeEntity(entityId)` act
on `viewData.items` without using the connector to reduce
connections. These are both called by methods in
[Select Entities](SelectEntities.md) and
[Data Filters](DataFilters.md).
