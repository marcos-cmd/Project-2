import React from 'react';
// import Card from './Card';
// import MatchBar from './MatchBar';
// import { useSelector } from 'react-redux';
// import { useTestSite } from '../hooks/UseTestSites';
import API from '../../../utils/API';
import MapContainer from './MapContainer'

// const Discover = () => {

//   useEffect(() => {
//     loadAPI();
//   }, []);

//   const loadAPI = () => {
//     API.search()
//   };
//   return (
//     <div>
//       <h1>Hi</h1>
//     </div>
//   );
// };
class Discover extends React.Component {

  async componentDidMount() {
    const coords = await this.loadAPI();
    console.log('I AM COORDS', coords);
  }

  loadAPI = async() => {
    return await API.search()
  };

  render() {
    return (
        <MapContainer>
        </MapContainer>
    );
  }
}

export default Discover;