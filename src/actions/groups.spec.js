import * as actions from "./groups";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import cookie from "react-cookies";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("group actions", () => {
  afterEach(() => {
    cookie.save("savedGroups", []);
  });

  it("startRequestAllGroups should create START_REQUEST_ALL_GROUPS action", () => {
    expect(actions.startRequestAllGroups()).toEqual({
      type: "START_REQUEST_ALL_GROUPS"
    });
  });

  it("recieveAllGroups should create RECIEVE_ALL_GROUPS action", () => {
    expect(actions.recieveAllGroups([]).type).toEqual("RECIEVE_ALL_GROUPS");
    expect(actions.recieveAllGroups([]).groups).toEqual([]);
  });

  it("fetchGroups creates START_REQUEST_ALL_GROUPS and RECIEVE_ALL_GROUPS", () => {
    const expectedActions = [
      { type: "START_REQUEST_ALL_GROUPS" },
      {
        type: "RECIEVE_ALL_GROUPS",
        groups: []
      }
    ];
    const store = mockStore({ availableGroups: {} });

    return store.dispatch(actions.fetchGroups()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      expect(store.getActions()[1].groups).toEqual(expectedActions[1].groups);
    });
  });

  it("addToNewGroup creates REQUEST_NEW_ADHOC_GROUP and RECIEVE_ALL_GROUPS", () => {
    let tempKey = "1234";

    const expectedActions = [
      { type: "REQUEST_NEW_ADHOC_GROUP" },
      {
        type: "RECIEVE_ALL_GROUPS",
        groups: [
          {
            type: "ADHOC_GROUP",
            name: "New Group",
            key: tempKey,
            entities: [
              {
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
    const store = mockStore({ availableGroups: {} });

    return store
      .dispatch(
        actions.addToNewGroup(
          {
            name: "University of Elsewhere",
            id: 1,
            selectedVersions: [],
            availableVersions: [{ id: 1, name: "1.2", date: "Aug 2018" }]
          },
          tempKey
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

  // it("renameAdhocGroup should create RENAME_ADHOC_GROUP action", () => {
  //   expect(actions.renameAdhocGroup(1, "group-name")).toEqual({
  //     type: "RENAME_ADHOC_GROUP",
  //     groupKey: 1,
  //     newName: "group-name"
  //   });
  // });

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

  it("removeFromAdhocGroup should create REMOVE_FROM_ADHOC_GROUP action", () => {
    expect(actions.removeFromAdhocGroup(1, 2)).toEqual({
      type: "REMOVE_FROM_ADHOC_GROUP",
      entityID: 1,
      groupKey: 2
    });
  });

  it("addToGroup creates REQUEST_ADD_TO_ADHOC_GROUP and RECIEVE_ALL_GROUPS", () => {
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
        type: "RECIEVE_ALL_GROUPS",
        groups: [
          {
            type: "ADHOC_GROUP",
            name: "Add-to Group Test",
            key: 1,
            entities: [
              {
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
          1
        )
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
        expect(store.getActions()[1].groups).toEqual(expectedActions[1].groups);
      });
  });
});
