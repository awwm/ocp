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

  const onItemChange = (item, isChecked) => {
    const updatedSelectedItems = isChecked
      ? [...selectedItems, item]
      : selectedItems.filter((selectedItem) => selectedItem.id !== item.id);

    setSelectedItems(updatedSelectedItems);
    setAttributes({ selectedItems: updatedSelectedItems });
  };

  // Group items by sport_title
  const groupedData = data.reduce((acc, item) => {
    const sportTitle = item.sport_title;
    if (!acc[sportTitle]) {
      acc[sportTitle] = [];
    }
    acc[sportTitle].push(item);
    return acc;
  }, {});

  return (
    <div {...useBlockProps}>
      <h2>{__('Select Items')}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data.</p>
      ) : (
        <div>
          {Object.entries(groupedData).map(([sportTitle, items]) => (
            <div key={sportTitle}>
				<h3>{sportTitle}</h3>
				{items.map((item) => (
					<div key={item.id}>
					<CheckboxControl
						label={`${item.home_team} vs ${item.away_team}`}
						checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
						onChange={(isChecked) => onItemChange(item, isChecked)}
					/>
					<ul>
						{item.bookmakers.map((broker) => (
						<li key={broker.key}>{broker.title}
							{broker.markets.map((market) => (
								<div key={market.key}>
									<ul>
										{market.outcomes.map((outcome) => (
										<li key={outcome.name}>{`${outcome.name} - Price: ${outcome.price}`}</li>
										))}
									</ul>
								</div>
							))}
						</li>
						))}
					</ul>
					</div>
				))}
            </div>
          ))}
        </div>
      )}
      <SaveSelectedItems selectedItems={selectedItems} />
    </div>
  );
};

export default Edit;
