import React, { useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { Input } from '../ui/input';

const AddressAutocomplete = ({ onAddressSelect, initialValue = '' }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'ng' }, 
    },
    debounce: 300, 
  });

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue, false);
    }
  }, [initialValue, setValue]);

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

      onAddressSelect(description); // Pass the selected address back to the parent
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
        placeholder="Enter an Address"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
        required
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
