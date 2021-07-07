import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let places

export default class placesDAO {
  static async injectDB(conn) {
    if (places) {
      return
    }
    try {
      places = await conn.db(process.env.TOURREVIEWS_NS).collection("places")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in placesDAO: ${e}`,
      )
    }
  }

  static async getPlaces({
    filters = null,
    page = 0,
    placesPerPage = 4,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      // } else if ("cuisine" in filters) {
      //   query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("location" in filters) {
        query = { "location": { $eq: filters["location"] } }
      }
    }

    let cursor
    
    try {
      cursor = await places
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { placesList: [], totalNumPlaces: 0 }
    }

    const displayCursor = cursor.limit(placesPerPage).skip(placesPerPage * page)

    try {
      const placesList = await displayCursor.toArray()
      const totalNumPlaces = await places.countDocuments(query)

      return { placesList, totalNumPlaces }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { placessList: [], totalNumPlaces: 0 }
    }
  }
  static async getPlaceByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$place_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await places.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getPlaceByID: ${e}`)
      throw e
    }
  }
}



