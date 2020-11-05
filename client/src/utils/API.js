import axios from "axios";
import _ from 'lodash';

export default {
  search: function() {
    return axios.get('https://data.sfgov.org/resource/dtit-7gp4.json', {
    params: {
      "$$app_token" : "VLs2GGSAdZuQR8i7yUYJfWNmM"
    }
  })
  .then(function (res) {
    console.log(res.data);
    const coords = _.map(res.data, (data) => {
      data.point = data.point.coordinates;
      return _.pick(data, ['point', 'id','address', 'name',])
    });
    return coords;
  })
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

