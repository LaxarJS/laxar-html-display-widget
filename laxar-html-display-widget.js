/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import * as ax from 'laxar';
import * as patterns from 'laxar-patterns';
export const injections = [ 'axWithDom', 'axFeatures', 'axEventBus', 'axI18n', 'axContext' ];
export function create( axWithDom, features, eventBus, axI18n, context ) {

   let htmlObject;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   patterns.resources.handlerFor( context ).registerResourceFromFeature( 'content', {
      onUpdateReplace() {
         htmlObject = ax.object.path( context.resources.content, features.content.attribute );
         try {
            updateView();
         }
         finally { /*DO NOTHING*/ }
      }
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   axI18n.whenLocaleChanged( updateView );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function updateView() {
      axWithDom( element => {
         element.querySelector( 'div' ).innerHTML = axI18n.localize( htmlObject );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return { onDomAvailable: updateView };
}
