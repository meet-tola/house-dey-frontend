import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Input } from '../ui/input';

const AddressAutocomplete = ({ onAddressSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'ng' }, // Restricting to Nigeria
    },
    debounce: 300, // Delay to minimize API calls
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => async () => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      // Call onAddressSelect with just the address string
      onAddressSelect(description);
    } catch (error) {
      console.error('Error fetching address details:', error);
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="relative w-full">
      <Input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter an address"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
      />
      {status === 'OK' && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
