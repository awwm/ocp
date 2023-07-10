var el = wp.element.createElement;

wp.blocks.registerBlockType('gutenberg-odds-block/odds', {
	title: 'Odds',		// Block name visible to the user within the editor
	icon: 'chart-bar',	// Toolbar icon displayed beneath the name of the block
	category: 'common',	// The category under which the block will appear in the Add block menu
	attributes: {			// The data this block will be storing
		type: { type: 'string', default: 'default' },			// Notice box type for loading the appropriate CSS class. Default class is 'default'.
		title: { type: 'string' },			// Title of Notice box in h4 tag
		content: { type: 'array', source: 'children', selector: 'p' }		/// Notice box content in p tag
	},
    example: {
        attributes: {
            cover: 'https://placehold.co/400',
        },
        viewportWidth: 400
    },
	edit: function(props) {
		// Defines how the block will render in the editor
		
      function updateTitle( event ) {
	      props.setAttributes( { title: event.target.value } );
	   }

	   function updateContent( newdata ) {
	      props.setAttributes( { content: newdata } );
	   }

	   function updateType( newdata ) {
	      props.setAttributes( { type: event.target.value } );
	   }

		return el( 'div', 
			{ 
				className: 'odds-box odds-' + props.attributes.type
			},
			el(
				'input', 
				{
					type: 'text', 
					placeholder: 'Write your title here...',
					value: props.attributes.title,
					onChange: updateTitle,
					style: { width: '100%' }
				}
			),
			el(
				wp.editor.RichText,
                {
                tagName: 'p',
                onChange: updateContent,
                value: props.attributes.content,
                placeholder: 'Write your description here...'
                }
            ), 
			el(
				'select', 
				{
					onChange: updateType,
					value: props.attributes.type,
				},
				el("option", {value: "bookmaker-1" }, "Book Maker 1"),
				el("option", {value: "bookmaker-2" }, "Book Maker 2"),
				el("option", {value: "bookmaker-3" }, "Book Maker 3"),
				el("option", {value: "bookmaker-4" }, "Book Maker 4")
			)

		);	// End return

	},	// End edit()
	save: function(props) {
		// Defines how the block will render on the frontend
		
		return el( 'div', 
			{ 
				className: 'odds-box odds-' + props.attributes.type
			}, 
			el(
				'h4', 
				null,
				props.attributes.title
			),
			el( wp.editor.RichText.Content, {
            tagName: 'p',
            value: props.attributes.content
         })
			
		);	// End return
		
	}	// End save()
});