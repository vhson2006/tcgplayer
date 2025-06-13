import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const PlacesAutocomplete = () => (
    <GooglePlacesAutocomplete
      apiKey={process.env.REACT_APP_GOOGLE_MAP || ''}
    />
);

export default PlacesAutocomplete;