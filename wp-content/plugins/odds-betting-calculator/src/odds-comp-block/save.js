/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
import { groupBy } from 'lodash'; // Import lodash's groupBy function

const groupItemsBySportTitle = (items) => {
  return groupBy(items, 'sport_title');
};

const save = ({ attributes }) => {
  const groupedItems = groupItemsBySportTitle(attributes.selectedItems);

  return (
    <div>
      <h2>{__('Selected Items')}</h2>
      {attributes.selectedItems.length === 0 ? (
        <p>No selected items.</p>
      ) : (
        <div>
          {Object.entries(groupedItems).map(([sportTitle, items]) => (
            <div key={sportTitle}>
              <h3 class="sports-title">{sportTitle}</h3>
              {items.map((item) => (
                <div class="match-wrapper" key={item.id}>
                  <p class="teams" style="font-weight:bold;"><span style="color:green;">{`${item.home_team}`}</span> VS <span style="color:red;">{`${item.away_team}`}</span></p>
                  {item.bookmakers.map((broker) => (
                    <div class="pricing" key={broker.key}>
                      <div class="bookmaker-title">
                        <b>{broker.title}</b>
                      </div>
                      {broker.markets.map((market) => (
                        <div key={market.key}>
                           <p class="prices"> Price : 
                            {market.outcomes.map((outcome) => (
                              <span class={item.home_team === outcome.name ? 'home' : 'away' }>
                              {`${outcome.price}`}
                            </span>
                            ))}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default save;


