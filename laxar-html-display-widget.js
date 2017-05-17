/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import * as ax from 'laxar';
import * as patterns from 'laxar-patterns';
export const injections = [ 'axWithDom', 'axFeatures', 'axI18n', 'axContext' ];
export function create( withDom, features, i18n, context ) {

   let htmlObject;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   patterns.resources.handlerFor( context ).registerResourceFromFeature( 'content', {
      onUpdateReplace() {
         htmlObject = ax.object.path( context.resources.content, features.content.attribute, '' );
         render();
      }
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   i18n.whenLocaleChanged( render );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function render() {
      withDom( element => {
         element.querySelector( 'div' ).innerHTML = i18n.localize( htmlObject );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return { onDomAvailable: render };
}
