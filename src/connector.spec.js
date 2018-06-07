import { _pivotStarsData } from "./connector";

// Example submission data
const demoSubmissionData = [
  {
    id: 978,
    data_point_key: "sub_1",
    title: "Co-Curricular Education Score",
    short_title: "Co-Curricular Education",
    imperial_value: 0.666666666666667,
    detail_url:
      "https://stars.aashe.org/pacific-lutheran-university-wa/2010-09-13/",
    report_url:
      "https://stars.aashe.org/pacific-lutheran-university-wa/2010-09-13/",
    report_id: 29,
    inst_id: 25
  },
  {
    id: 1140,
    data_point_key: "sub_1",
    title: "Co-Curricular Education Score",
    short_title: "Co-Curricular Education",
    imperial_value: 0.816111111111111,
    detail_url:
      "https://stars.aashe.org/arizona-state-university-az/2011-07-29/",
    report_url:
      "https://stars.aashe.org/arizona-state-university-az/2011-07-29/",
    report_id: 64,
    inst_id: 21
  },
  {
    id: 1302,
    data_point_key: "sub_1",
    title: "Co-Curricular Education Score",
    short_title: "Co-Curricular Education",
    imperial_value: 0.444444444444444,
    detail_url: "https://stars.aashe.org/williams-college-ma/2011-08-01/",
    report_url: "https://stars.aashe.org/williams-college-ma/2011-08-01/",
    report_id: 63,
    inst_id: 18
  },
  {
    id: 976,
    data_point_key: "overall",
    title: "Overall Score",
    short_title: "Overall Score",
    imperial_value: 45.0594265232975,
    detail_url:
      "https://stars.aashe.org/pacific-lutheran-university-wa/2010-09-13/",
    report_url:
      "https://stars.aashe.org/pacific-lutheran-university-wa/2010-09-13/",
    report_id: 29,
    inst_id: 25
  },
  {
    id: 1138,
    data_point_key: "overall",
    title: "Overall Score",
    short_title: "Overall Score",
    imperial_value: 66.9719298245614,
    detail_url:
      "https://stars.aashe.org/arizona-state-university-az/2011-07-29/",
    report_url:
      "https://stars.aashe.org/arizona-state-university-az/2011-07-29/",
    report_id: 64,
    inst_id: 21
  },
  {
    id: 1300,
    data_point_key: "overall",
    title: "Overall Score",
    short_title: "Overall Score",
    imperial_value: 47.3520479016576,
    detail_url: "https://stars.aashe.org/williams-college-ma/2011-08-01/",
    report_url: "https://stars.aashe.org/williams-college-ma/2011-08-01/",
    report_id: 63,
    inst_id: 18
  }
];

const demoEntities = [
  {
    name: "Arizona State",
    id: 21,
    selectedVersions: [64],
    availableVersions: [
      {
        id: 64,
        name: "1.2",
        date: "Jul 2011",
        report_url:
          "https://stars.aashe.org/arizona-state-university-az/2011-07-29/",
        is_latest: true
      }
    ]
  },
  {
    name: "Williams College",
    id: 18,
    selectedVersions: [],
    availableVersions: [
      {
        id: 63,
        name: "1.2",
        date: "Aug 2011",
        report_url: "https://stars.aashe.org/williams-college-ma/2011-08-01/",
        is_latest: true
      }
    ]
  },
  {
    name: "Pacific Lutheran University",
    id: 25,
    selectedVersions: [29],
    availableVersions: [
      {
        id: 29,
        name: "1.2",
        date: "Sep 2010",
        report_url:
          "https://stars.aashe.org/pacific-lutheran-university-wa/2010-09-13/",
        is_latest: false
      }
    ]
  }
];

const demoDataFilters = [
  {
    name: "Overall Score",
    key: "overall"
  },
  {
    name: "Co-Curricular Education",
    key: "sub_1"
  }
];

describe("connector methods", () => {
  it("_pivotStarsData should pivot the data", () => {
    expect(
      _pivotStarsData(demoEntities, demoDataFilters, demoSubmissionData)
    ).toEqual({
      columns: [
        { title: "Report", key: "entity" },
        { title: "Overall Score", key: "overall" },
        { title: "Co-Curricular Education", key: "sub_1" }
      ],
      list: [
        {
          entity: {
            value: "Pacific Lutheran University",
            link:
              "https://stars.aashe.org/pacific-lutheran-university-wa/2010-09-13/"
          },
          sub_1: {
            value: 0.666666666666667,
            link:
              "https://stars.aashe.org/pacific-lutheran-university-wa/2010-09-13/"
          },
          overall: {
            value: 45.0594265232975,
            link:
              "https://stars.aashe.org/pacific-lutheran-university-wa/2010-09-13/"
          }
        },
        {
          entity: {
            value: "Williams College",
            link: "https://stars.aashe.org/williams-college-ma/2011-08-01/"
          },
          sub_1: {
            value: 0.444444444444444,
            link: "https://stars.aashe.org/williams-college-ma/2011-08-01/"
          },
          overall: {
            value: 47.3520479016576,
            link: "https://stars.aashe.org/williams-college-ma/2011-08-01/"
          }
        },
        {
          entity: {
            value: "Arizona State",
            link:
              "https://stars.aashe.org/arizona-state-university-az/2011-07-29/"
          },
          sub_1: {
            value: 0.816111111111111,
            link:
              "https://stars.aashe.org/arizona-state-university-az/2011-07-29/"
          },
          overall: {
            value: 66.9719298245614,
            link:
              "https://stars.aashe.org/arizona-state-university-az/2011-07-29/"
          }
        }
      ]
    });
  });
});
