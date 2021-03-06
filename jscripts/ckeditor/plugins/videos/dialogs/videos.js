/*
 * By: AliReza_Tofighi - Http://My-BB.Ir
*/
CKEDITOR.dialog.add( 'videosDialog', function ( editor ) {
	return {
		title: editor.lang.videos.title,
		minWidth: 400,
		minHeight: 100,

		contents: [
			{
				id: 'tab-basic',
				label: editor.lang.videos.title,
				elements: [
					// UI elements of the first tab will be defined here 
					{
						type: 'select',
						id: 'video',
						'default': '',
						label: editor.lang.videos.video,
						items: [
							[ 'Dailymotion', 'dailymotion' ],
							[ 'MetaCafe', 'metacafe' ],
							[ 'MySpace TV', 'myspacetv' ],
							[ 'Vimeo', 'vimeo' ],
							[ 'Yahoo Video', 'yahoo' ],
							[ 'YouTube', 'youtube' ]
						]
					},
					{
						type: 'text',
						id: 'videourl',
						label: editor.lang.videos.dialog,
						'default': 'http://',
					}
				]
			}
		],
		onOk: function() {
			var dialog = this;
			var value = dialog.getValueOf( 'tab-basic', 'videourl' );
			if(value == '' || value == 'http://' || dialog.getValueOf( 'tab-basic', 'video' ) == '') return;
			if(editor.mode == 'source') {
				CKEDITOR.performInsert('[video='+dialog.getValueOf( 'tab-basic', 'video' )+']'+value+'[/video]');
				return;
			}
			else
			{
				editor.insertText( '[video='+dialog.getValueOf( 'tab-basic', 'video' )+']'+value+'[/video]' );
			}
		}
	};
});