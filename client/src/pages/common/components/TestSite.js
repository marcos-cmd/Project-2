import React from 'react';
// import Card from './Card';
// import MatchBar from './MatchBar';
// import { useSelector } from 'react-redux';
// import { useTestSite } from '../hooks/UseTestSites';
import API from '../../../utils/API';

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

  componentDidMount() {
    this.loadAPI();
  }

  loadAPI = () => {
    API.search()
  };

  render() {
    return (
        <h1>hi</h1>
    );
  }
}

export default Discover;