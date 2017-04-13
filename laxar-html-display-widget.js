/**
 * Copyright 2017
 */
import * as ax from 'laxar';
export const injections = [ 'axWithDom', 'axFeatures', 'axEventBus' ];
export function create( axWithDom, features, eventBus ) {
   let htmlText;
   eventBus.subscribe( `didReplace.${features.content.resource}`, event => {
      htmlText = ax.object.path( event.data, features.content.attribute );
   } );
   return {
      onDomAvailable() {
         axWithDom( element => {
            element.querySelector( 'div' ).innerHTML = htmlText;
         } );
      }
   };
}
