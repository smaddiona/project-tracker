/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hxnik7frea4rgud",
    "created": "2023-08-16 07:54:21.787Z",
    "updated": "2023-08-16 07:54:21.787Z",
    "name": "customers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ac1zuynh",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hxnik7frea4rgud");

  return dao.deleteCollection(collection);
})
