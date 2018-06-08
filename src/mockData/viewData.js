// Mock submission data
export const mockSubmissionData = [
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

export const mockEntities = [
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

export const mockDataFilters = [
  {
    title: "Overall Score",
    key: "overall",
    is_numeric: true,
    units: null
  },
  {
    title: "Co-Curricular Education",
    key: "sub_1",
    is_numeric: true,
    units: "%"
  }
];
