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
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
import { useEffect, useState } from "@wordpress/element";

export default function Edit() {
	const [oddsData, setOddsData] = useState(null);

    useEffect(() => {
        fetch('https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=uk&markets=h2h&apiKey=81fcb06f4f39ab2a3faf0dbe93e23524')
            .then(response => response.json())
            .then(data => {
                setOddsData(data);
            })
            .catch(error => {
                console.error('Error fetching data from the API:', error);
            });
    }, []);

	if (!oddsData) {
		return (
			<p>
				{ __(
					'Fetching data from the Odds API...',
					'ocbc'
				) }
			</p>
		);
	};

	return (
		<div>
			<h3>
				{ __(
					'Upcoming Odds',
					'ocbc'
				) }
			</h3>
			<ul>
				{ oddsData.map((item, index) => {
					return (
						<li key={index}>
							{item.id}
						</li>
					)				
				}) }
			</ul>
		</div>
	);
}
