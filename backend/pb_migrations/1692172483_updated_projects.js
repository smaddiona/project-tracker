/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a58vlidhlt3y353")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ja3h6hjq",
    "name": "tags",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "apm0uno9ssqmnpx",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "efdn7x7v",
    "name": "customer",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hxnik7frea4rgud",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("a58vlidhlt3y353")

  // remove
  collection.schema.removeField("ja3h6hjq")

  // remove
  collection.schema.removeField("efdn7x7v")

  return dao.saveCollection(collection)
})
