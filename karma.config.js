/**
 * Copyright 2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/* eslint-env node */

const laxarInfrastructure = require( 'laxar-infrastructure' );

module.exports = config => {
   config.set(
      laxarInfrastructure.karma( [ 'spec/laxar-html-display-widget.spec.js' ], {
         context: __dirname,
         module: {
            rules: require( './webpack.config.js' )[ 0 ].module.rules
         }
      } )
   );
};
