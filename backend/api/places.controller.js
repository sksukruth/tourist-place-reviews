import placesDAO from "../dao/placesDAO.js"

export default class placesController {
  static async apiGetPlaces(req, res, next) {
    const placesPerPage = req.query.placesPerPage ? parseInt(req.query.placesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.location) {
      filters.location = req.query.location
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { placesList, totalNumPlaces } = await placesDAO.getPlaces({
      filters,
      page,
      placesPerPage,
    })

    let response = {
      places: placesList,
      page: page,
      filters: filters,
      entries_per_page: placesPerPage,
      total_results: totalNumPlaces,
    }
    res.json(response)
  }
  static async apiGetPlaceById(req, res, next) {
    try {
      let id = req.params.id || {}
      let place = await placesDAO.getPlaceByID(id)
      if (!place) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(place)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}