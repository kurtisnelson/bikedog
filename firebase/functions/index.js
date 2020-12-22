const http = require("http")
const functions = require("firebase-functions")
const admin = require("firebase-admin")
const fetch = require("node-fetch")
const geofire = require("geofire-common")
const { Firestore } = require("@google-cloud/firestore")
const agent = new http.Agent({ keepAlive: true })

admin.initializeApp()

const db = admin.firestore()
const parksRef = db.collection("parks")

exports.syncParks = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "128MB",
  })
  .pubsub.schedule("45 23 * * 6")
  .timeZone("etc/UTC")
  .onRun(context => {
    const bulk = db.bulkWriter()

    return getParks()
      .then(parks => {
        return Promise.all(
          parks
            .sort(() => Math.random() - 0.5) // In case of timeouts, this will eventually update the whole dataset.
            .map(park => {
              const uuid = toUUID(park.globalid)
              console.log(uuid)
              park.location = new Firestore.GeoPoint(
                Number(park.latitude),
                Number(park.longitude)
              )
              park.geohash = geofire.geohashForLocation([
                park.location.latitude,
                park.location.longitude,
              ])
              delete park.globalid
              delete park.last_edited_user
              delete park.latitude
              delete park.longitude
              delete park.shape
              return bulk.set(parksRef.doc(uuid), park)
            })
        )
      })
      .then(() => {
        console.log("Synced all parks")
        return bulk.close()
      })
      .then(() => {
        console.info("Saved all parks")
        return "ok"
      })
  })

function getParks() {
  return fetch(
    "http://data.sfgov.org/resource/gtr9-ntp6.json?$$app_token=" +
      functions.config().sfgov.token,
    { agent: agent }
  ).then(res => res.json())
}

function toUUID(id) {
  return id.substring(1, id.length - 1)
}
