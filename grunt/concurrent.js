module.exports = {

	// Build
	build_first: [
		'newer:clean:game',
        'newer:copy:fonts',
        'newer:copy:games',
        'newer:sass:build',
        'newer:concat:build_js'
	],
	build_second: [
        'newer:concat:build_css',
	],
	build_third: [
        'newer:postcss:build'
	]

	// Release
};