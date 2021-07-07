import React, { useState, useEffect } from "react";
import PlaceDataService from "../services/place";
import { Link } from "react-router-dom";

const PlacesList = props => {
  const [places, setPlaces] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchLocation, setSearchLocation ] = useState("");
  
  useEffect(() => {
    retrievePlaces(); 
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchLocation = e => {
    const searchLocation = e.target.value;
    setSearchLocation(searchLocation);
  };


  const retrievePlaces = () => {
    PlaceDataService.getAll()
      .then(response => {
        console.log(response.data);
        setPlaces(response.data.places);
        
      })
      .catch(e => {
        console.log(e);
      });
  };
 

  const refreshList = () => {
    retrievePlaces();
  };

  const find = (query, by) => {
    PlaceDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setPlaces(response.data.places);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const findByName = () => {
    find(searchName, "name")
  };

  const findByLocation = () => {
    find(searchLocation, "location")
  };

  
  return (
    <div>
      <div className="row pb-1">
      <table><tr><td>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        </td><td> 
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by location"
            value={searchLocation}
            onChange={onChangeSearchLocation}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByLocation}
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        </td></tr></table>
      </div>
      <div className="row">
        {places.map((place) => {
          const address = `${place.location}`; 
          return (
            <div className="col-lg-4 pb-1">
              <div className="card justify-content-center align-items-center">
                <div className="card-body">
                  <h5 className="card-title">{place.name}</h5>
                  <p className="card-text">
                  <img src={place.image} height={200} width={335}></img><br></br> 
                    <strong>Location: </strong>{address}<br></br>
                  </p>
                  <div className="row">
                  <Link to={"/places/"+place._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacesList;