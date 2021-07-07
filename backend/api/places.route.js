import express from "express"
import placesCtrl from "./places.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(placesCtrl.apiGetPlaces)
router.route("/id/:id").get(placesCtrl.apiGetPlaceById)

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router