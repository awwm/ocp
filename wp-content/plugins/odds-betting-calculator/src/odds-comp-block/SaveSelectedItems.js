import { useEffect } from 'react';
import { useDispatch } from '@wordpress/data';

function SaveSelectedItems({ selectedItems }) {
  const { editPost } = useDispatch('core/editor');

  useEffect(() => {
    // Retrieve postId using the same way as before
    const postId = wp.data.select('core/editor').getCurrentPostId();

    // Retrieve the previous value of the selectedItems from post meta
    const prevSelectedItems = wp.data.select('core/editor').getEditedPostAttribute('meta')['oddComparisonVal'];

    // Initialize prevSelectedItems as an empty array if it's undefined
    const prevItems = prevSelectedItems ? prevSelectedItems : [];

    // Merge the previous values with the new ones
    const updatedSelectedItems = [...new Set([...prevItems, ...selectedItems])];

    // Save selected items to post meta
    editPost({ meta: { oddComparisonVal: updatedSelectedItems } }, postId);
  }, [selectedItems]);

  return null;
}

export default SaveSelectedItems;
