import axios from "axios";
import _ from 'lodash';

export default {
  search: function () {
    return axios.get('https://data.sfgov.org/resource/dtit-7gp4.json', {
      params: {
        "$$app_token": "VLs2GGSAdZuQR8i7yUYJfWNmM"
      }
    })
      .then(function (res) {
        console.log(res.data);
        const coords = _.map(res.data, (data) => {
          data.point = data.point.coordinates;
          return _.pick(data, ['point', 'id', 'address', 'name', 'cta_link'])
        });
        return coords;
      })
  },

  newMarkers: function () {
    return axios.get('/api/locations', { headers: { authorization: localStorage.getItem('token') } })
      .then(function (res) {
        console.log(res.data);
        const markers = _.map(res.data, (data) => {
          data.latitude = parseFloat(data.latitude);
          data.longitude = parseFloat(data.longitude);
          return _.pick(data, ['name', 'latitude', 'longitude'])
        });
        return markers;
      })
  },

  geoData: function () {
    return axios.get('https://disease.sh/v3/covid-19/states', {

    })
      .then(function (res) {
        console.log(res.data);
        // const coords = _.map(res.data, (data) => {
        //   data.point = data.point.coordinates;
        //   return _.pick(data, ['point', 'id', 'address', 'name', 'cta_link'])
      });
    // return coords;
  }

}

// export default {
//   search: function() {
//     return axios.get('https://dog.ceo/api/breeds/image/random');
//   },
//   searchByBreed: function(breed) {
//     return axios.get(`https://dog.ceo/api/breed/${breed}/images`);
//   }
// };

