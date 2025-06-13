import {APIProvider, Map} from '@vis.gl/react-google-maps';

const GoogleMap = () => (
  <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP || ''}>
    <Map
    style={{width: '600px', height: '400px'}}
    defaultCenter={{lat: 22.54992, lng: 0}}
    defaultZoom={3}
    gestureHandling={'greedy'}
    disableDefaultUI={true}
    />
  </APIProvider>
);

export default GoogleMap;