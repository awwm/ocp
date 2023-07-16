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
const save = ({ attributes }) => {
    return (
      <div>
        <h2>{__('Selected Items')}</h2>
        {attributes.selectedItems.length === 0 ? (
          <p>No selected items.</p>
        ) : (
          <ul>
            {attributes.selectedItems.map((itemId) => (
              <li key={itemId}>{itemId}</li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default save;