import React, { useState, useEffect } from "react";
import PlaceDataService from "../services/place";
import { Link } from "react-router-dom";

const Place = props => {
  const initialPlaceState = {
    id: null,
    name: "",
    address: {},
    reviews: []
  };
  const [place, setPlace] = useState(initialPlaceState);

  const getPlace = id => {
    PlaceDataService.get(id)
      .then(response => {
        setPlace(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPlace(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    PlaceDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setPlace((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {place ? (
        <div>
          <h5>{place.name}</h5>
          <p>
            <strong>Location: </strong>{place.location}
          </p>
          <Link to={"/places/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <br></br><br></br>  
          <h4> Reviews </h4>
          <div className="row">
            {place.reviews.length > 0 ? (
             place.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card justify-content-center align-items-center">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date.substring(0,10)}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            <Link to={{
                              pathname: "/places/" + props.match.params.id + "/review",
                              state: {
                                currentReview: review
                              }
                            }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No place selected.</p>
        </div>
      )}
    </div>
  );
};

export default Place;