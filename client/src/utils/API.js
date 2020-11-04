import axios from "axios";

export default {
  search: function() {
    return axios.get('https://data.sfgov.org/resource/dtit-7gp4.json', {
    params: {
      "$$app_token" : "VLs2GGSAdZuQR8i7yUYJfWNmM"
    }
  })
  .then(function (response) {
    console.log(response);
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

