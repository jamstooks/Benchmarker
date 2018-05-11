# FilteredSelector

Allow users to find objects using filters and
select objects in three ways:

  1. Individual Entities
  2. Specific Sub-entities
  3. Groups of Entities

 Here's an analogy using Github repos...
 
  1. A repository (always `master`)
  2. A specific repository's release or branch
  3. A set of github repositories
    a. ex: All repos for a given user
    b. ex: All repos for a given team
    c. ex: Individually selected repositories
    d. ex: All releases for a given repository

## Props

`filters`: passed in as a URI string

`dataSource`: this is an Object that uses `selected filters`
to run queries to return `entities`. See details below.

`formatComponent`: this optional format component will
be used to display the elements

## External State (ie. external properties)

`selection`: an array of entities and/or groups

## Design

### Filters

Filters are described in an object:

    {
      filters: [
        {
          title: <input_title>,
          keyName: <unique_name>,
          helpText: <string>,
          choices: {
            list: [
              {title: "<title>" value: "<value>"}, ...] 
              // should include a default, like
              // {title: <"Select One" or "All">, value: ""}
            // considering supporting
            // callback: <callback_name>, // or
            // endpoint: <endpoint_uri>
          }
        },
        ...
      ]
    }

#### Selected Filters

The current state of the filters is stored as:

    {
      <keyName_from_filter>: <selected_value>,
    }

### Saved Entities

Entities are stored as JSON objects:

    {
      id: <entity_id>,
      name: <entity_name>,
      version: <null for "latest" or version_name>,
      extraData: <additional_properties_as_object>
    }

### Groups

Groups can either follow a query or include ad-hoc entities:

    {
      name: <group_name>,
      filterGroup: <list_of_filter_selections>, // or
      entityList: [<entity_objects>...]
    }

The `filterGroup` property will be used by your `dataSource`
to create a list of entities. If the `filterGroup` is
`null`, then the `entityList` property will be used. 

## Your `DataSource`

Your datasource must know how to convert selected filters
into a list of entities. It should be an ES6 class that
has the following property methods:

`performEntitySearch`

Resulting entities should be returned as objects:

    {
      id: <entity_id>,
      name: <entity_name>,
      availableVersions: <list_of_versions>,
      selectedVersion: <null for "latest" or version_name>,
      extraData: <additional_properties_as_object>
    }
