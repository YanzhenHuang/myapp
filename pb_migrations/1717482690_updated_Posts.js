/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q4lq7twxkmm4gp1")

  collection.indexes = [
    "CREATE INDEX `idx_lgGS45l` ON `Posts` (`uid`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q4lq7twxkmm4gp1")

  collection.indexes = [
    "CREATE INDEX `idx_lgGS45l` ON `Posts` (\n  `uid`,\n  `created`,\n  `updated`\n)"
  ]

  return dao.saveCollection(collection)
})
