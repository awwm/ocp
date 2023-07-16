import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import SaveSelectedItems from './SaveSelectedItems';

import './editor.scss';

const API_URL =
  'https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=eu&markets=h2h&apiKey=81fcb06f4f39ab2a3faf0dbe93e23524';

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load previously saved items from post meta
    if (attributes.selectedItems && attributes.selectedItems.length > 0) {
      setSelectedItems(attributes.selectedItems);
    }

    // Fetch data from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const onItemChange = (itemID, isChecked) => {
    const updatedSelectedItems = isChecked
      ? [...selectedItems, itemID]
      : selectedItems.filter((id) => id !== itemID);

    setSelectedItems(updatedSelectedItems);
    setAttributes({ selectedItems: updatedSelectedItems });
  };

  return (
    <div {...useBlockProps}>
      <h2>{__('Select Items')}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data.</p>
      ) : (
        <div>
          {data.map((item) => (
            <CheckboxControl
              key={item.id}
              label={item.id}
              checked={selectedItems.includes(item.id)}
              onChange={(isChecked) => onItemChange(item.id, isChecked)}
            />
          ))}
        </div>
      )}
      <SaveSelectedItems selectedItems={selectedItems} />
    </div>
  );
};

export default Edit;