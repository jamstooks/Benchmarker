# Pivoting

## The Problem

We have a bunch of `SubmissionValues` coming from the db:

    [
      {
        "report_id": 22,
        "report_name": "University of Somewhere",
        "data_point_key": "sub_1",
        "title": "Data Point 1",
        "imperial_value": 0.25,
        ...
        "additional_data": {}
      },
      ...
      {
        "report_id": 22,
        "report_name": "University of Elsewhere",
        "data_point_key": "sub_1",
        "title": "Data Point 1",
        "imperial_value": 0.54,
        ...
        "additional_data": {}
      },
    ]
    
And we want to display it like:

| Report                | Date      | Rating | Data Point 1 | Data Point 2 |
| --------------------- | --------- | ------ | ------------ | ------------ |
| U. of Somewhere (2.0) | Aug 2013  | Silver | .54          | 1.7          |
| U. of Elsewhere (2.0) | Jun 2015  | Gold   | .25          | 10           |
| My Adhoc Group        |           |        | .7           | 3            |

This is really a pivot problem, but the question is, does this happen
on the server side, or in the javascript?

## Data for the DataView

Ideally we want the data property to the DataView component to:

  - be orderable
  - include meta data about each report and value for potiential pop-ups

    [
      { 
        entity: { title: "U of Somewhere (2.0)", link: "http://.."},
        sub_1: { title: "Data Point 1", value: .54, link: "..." },
        sub_2: { title: "Data Point 2", value: 1.7, link: "..." },
        meta: { <report_and_institution_metadata> }
      },
      { 
        entity: { title: "U of Elsewhere (2.0)", link: "http://.."},
        sub_1: { title: "Data Point 1", value: .25, link: "..." },
        sub_2: { title: "Data Point 2", value: 10, link: "..." },
        meta: { <report_and_institution_metadata> }
      },
      {
        entity: { title: "My Adhoc Group", link: null },
        sub_1: { title: "Data Point 1", value: .7, link: null },
        sub_2: { title: "Data Point 2", value: 3, link: null },
        meta: { <group_metadata> }
      }
    ]

### Notes

Other data that might be necessary:

  - ordinals
  - type, like numeric
  - submissiondata meta data, like standard deviation

When deleting entities or data points, we should remove them w/out
having to connect to the backend.

### Questions

- Should more metadata be tied to each column or in the extra column above?
