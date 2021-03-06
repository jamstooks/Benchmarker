import * as actions from "./groups";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import cookie from "react-cookies";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let oldCookie = cookie.load("savedGroups");

describe("group actions", () => {
  beforeEach(() => {
    cookie.save("savedGroups", []);
  });
  afterEach(() => {
    cookie.save("savedGroups", oldCookie);
  });

  it("startRequestAllGroups should create START_REQUEST_ALL_GROUPS action", () => {
    expect(actions.startRequestAllGroups()).toEqual({
      type: "START_REQUEST_ALL_GROUPS"
    });
  });

  it("startRequestRenameGroup should create START_REQUEST_RENAME_GROUP action", () => {
    expect(actions.startRequestRenameGroup("key")).toEqual({
      type: "START_REQUEST_RENAME_GROUP",
      groupKey: "key"
    });
  });

  it("receiveRenamedGroup should create RECEIVE_RENAMED_GROUP action", () => {
    expect(actions.receiveRenamedGroup("key")).toEqual({
      type: "RECEIVE_RENAMED_GROUP",
      groupKey: "key"
    });
  });

  it("receiveAllGroups should create RECEIVE_ALL_GROUPS action", () => {
    expect(actions.receiveAllGroups([]).type).toEqual("RECEIVE_ALL_GROUPS");
    expect(actions.receiveAllGroups([]).groups).toEqual([]);
  });

  it("fetchGroups creates START_REQUEST_ALL_GROUPS and RECEIVE_ALL_GROUPS", () => {
    const expectedActions = [
      { type: "START_REQUEST_ALL_GROUPS" },
      {
        type: "RECEIVE_ALL_GROUPS",
        groups: []
      }
    ];
    const store = mockStore({
      availableGroups: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 234,
        groups: []
      }
    });

    return store.dispatch(actions.fetchGroups()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      expect(store.getActions()[1].groups).toEqual(expectedActions[1].groups);
    });
  });

  it("addToNewGroup creates REQUEST_NEW_ADHOC_GROUP and RECEIVE_ALL_GROUPS", () => {
    let tempKey = "1234";
    let keyWithinGroup = "1";
    // existing groups
    cookie.save("savedGroups", [
      {
        type: "ADHOC_GROUP",
        name: "Existing Group",
        key: "existing key",
        entities: []
      }
    ]);

    const expectedActions = [
      { type: "REQUEST_NEW_ADHOC_GROUP" },
      {
        type: "RECEIVE_ALL_GROUPS",
        groups: [
          {
            type: "ADHOC_GROUP",
            name: "Existing Group",
            key: "existing key",
            entities: []
          },
          {
            type: "ADHOC_GROUP",
            name: "New Group 2",
            key: tempKey,
            entities: [
              {
                keyWithinGroup: keyWithinGroup,
                name: "University of Elsewhere",
                id: 1,
                selectedVersions: [],
                availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
              }
            ]
          }
        ]
      }
    ];
    const store = mockStore({
      availableGroups: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 234,
        groups: [
          {
            type: "ADHOC_GROUP",
            name: "Existing Group",
            key: "existing key"
          }
        ]
      }
    });

    return store
      .dispatch(
        actions.addToNewGroup(
          {
            name: "University of Elsewhere",
            id: 1,
            selectedVersions: [],
            availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
          },
          tempKey,
          keyWithinGroup
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].groups).toEqual(expectedActions[1].groups);
      });
  });

  it("requestCreateAdhocGroup should create REQUEST_NEW_ADHOC_GROUP action", () => {
    expect(actions.requestCreateAdhocGroup()).toEqual({
      type: "REQUEST_NEW_ADHOC_GROUP"
    });
  });

  it("deleteAdhocGroup should create DELETE_ADHOC_GROUP action", () => {
    expect(actions.deleteAdhocGroup(1)).toEqual({
      type: "DELETE_ADHOC_GROUP",
      groupKey: 1
    });
  });

  it("requestAddToAdhocGroup should create REQUEST_ADD_TO_ADHOC_GROUP action", () => {
    expect(
      actions.requestAddToAdhocGroup(
        {
          type: "INSTITUTION",
          name: "University of Elsewhere",
          id: 1,
          availableVersions: [{ id: 1, name: "2.0" }]
        },
        1
      )
    ).toEqual({
      type: "REQUEST_ADD_TO_ADHOC_GROUP",
      entity: {
        type: "INSTITUTION",
        name: "University of Elsewhere",
        id: 1,
        availableVersions: [{ id: 1, name: "2.0" }]
      },
      groupKey: 1
    });
  });

  it("requestRemoveFromAdhocGroup should create REQUEST_REMOVE_FROM_ADHOC_GROUP action", () => {
    expect(actions.requestRemoveFromAdhocGroup(1, 2)).toEqual({
      type: "REQUEST_REMOVE_FROM_ADHOC_GROUP",
      keyWithinGroup: 1,
      groupKey: 2
    });
  });

  it("addToGroup creates REQUEST_ADD_TO_ADHOC_GROUP and RECEIVE_ALL_GROUPS", () => {
    let keyWithinGroup = "1";

    const expectedActions = [
      {
        type: "REQUEST_ADD_TO_ADHOC_GROUP",
        entity: {
          name: "University of Elsewhere",
          id: 1,
          selectedVersions: [],
          availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
        },
        groupKey: 1
      },
      {
        type: "RECEIVE_ALL_GROUPS",
        groups: [
          {
            type: "ADHOC_GROUP",
            name: "Add-to Group Test",
            key: 1,
            entities: [
              {
                name: "University of Elsewhere",
                id: 1,
                keyWithinGroup: keyWithinGroup,
                selectedVersions: [],
                availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
              }
            ]
          }
        ]
      }
    ];

    let savedGroups = [
      {
        type: "ADHOC_GROUP",
        name: "Add-to Group Test",
        key: 1,
        entities: []
      }
    ];
    cookie.save("savedGroups", savedGroups);
    const store = mockStore({
      availableGroups: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 123,
        groups: savedGroups
      }
    });

    return store
      .dispatch(
        actions.addToGroup(
          {
            name: "University of Elsewhere",
            id: 1,
            selectedVersions: [],
            availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
          },
          1,
          keyWithinGroup
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].groups).toEqual(expectedActions[1].groups);
      });
  });

  it("removeFromGroup creates REMOVE_FROM_ADHOC_GROUP and RECEIVE_ALL_GROUPS", () => {
    let groupKey = 1;
    let keyWithinGroup = 2;

    const expectedActions = [
      {
        type: "REQUEST_REMOVE_FROM_ADHOC_GROUP",
        keyWithinGroup,
        groupKey
      },
      {
        type: "RECEIVE_ALL_GROUPS",
        groups: [
          {
            type: "ADHOC_GROUP",
            name: "Remove from Group Test",
            key: groupKey,
            entities: [
              {
                name: "University of Elsewhere",
                id: 2,
                keyWithinGroup: keyWithinGroup + 1,
                selectedVersions: [],
                availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
              }
            ]
          }
        ]
      }
    ];

    let savedGroups = [
      {
        type: "ADHOC_GROUP",
        name: "Remove from Group Test",
        key: groupKey,
        entities: [
          {
            name: "University of Somewhere",
            id: 1,
            keyWithinGroup: keyWithinGroup,
            selectedVersions: [1],
            availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
          },
          {
            name: "University of Elsewhere",
            id: 2,
            keyWithinGroup: keyWithinGroup + 1,
            selectedVersions: [],
            availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
          }
        ]
      }
    ];
    cookie.save("savedGroups", savedGroups);
    const store = mockStore({
      availableGroups: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 123,
        groups: savedGroups
      }
    });

    return store
      .dispatch(actions.removeFromAdhocGroup(keyWithinGroup, groupKey))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].groups).toEqual(expectedActions[1].groups);
      });
  });

  it("addToNewGroup creates REQUEST_NEW_ADHOC_GROUP and RECEIVE_ALL_GROUPS", () => {
    let tempKey = "1234";
    // existing groups
    cookie.save("savedGroups", [
      {
        name: "Unnamed Group",
        key: tempKey
      }
    ]);

    const expectedActions = [
      { type: "START_REQUEST_RENAME_GROUP", groupKey: tempKey },
      {
        type: "RECEIVE_RENAMED_GROUP",
        groupKey: tempKey
      }
    ];
    const store = mockStore({
      availableGroups: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 234,
        groups: [
          {
            name: "Unnamed Group",
            key: tempKey
          }
        ],
        beingRenamed: []
      }
    });

    return store.dispatch(actions.renameGroup(tempKey)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });
});
