/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */

import * as axMocks from 'laxar-mocks';
import fixtures from './fixtures';


let testEventBus;
let widgetDom;

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSetup( widgetConfiguration ) {

   beforeEach( axMocks.setupForWidget() );

   beforeEach( () => {
      axMocks.widget.configure( widgetConfiguration );
   } );

   beforeEach( axMocks.widget.load );

   beforeEach( () => {
      testEventBus = axMocks.eventBus;
   } );


   beforeEach( () => { widgetDom = axMocks.widget.render(); } );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

afterEach( axMocks.tearDown );

///////////////////////////////////////////////////////////////////////////////////////////////////////////

describe( 'An laxar-html-display-widget', () => {

   describe( 'when a didReplace event is published for the configured resource', () => {

      createSetup( { content: { resource: 'myResource' } } );

      it( 'displays the localized content of the published resource (R1.1, R1.3)', () => {
         publishEventAndTick( 'didReplace.myResource', { resource: 'myResource', data: fixtures.data } );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( fixtures.data.en );
      } );
   } );

   ////////////////////////////////////////////////////////////////////////////////////////////////////////

   describe( 'when a didUpdate event is published for the configured resource', () => {

      createSetup( { content: { resource: 'myResource' } } );

      it( 'displays the localized content of the updated resource (R1.1)', () => {
         publishEventAndTick( 'didReplace.myResource', { resource: 'myResource', data: fixtures.data } );

         publishEventAndTick( 'didUpdate.myResource', fixtures.updateEvent1 );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( fixtures.data1.en );

         publishEventAndTick( 'didUpdate.myResource', fixtures.updateEvent2 );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( fixtures.data2.en );
      } );
   } );

   ////////////////////////////////////////////////////////////////////////////////////////////////////////

   describe( 'when a didChangeLocale event is published', () => {

      createSetup( { content: { resource: 'myResource' } } );

      it( 'uses the published locale to determine the source that should be displayed (R2.1)', () => {
         publishEventAndTick( 'didReplace.myResource', { resource: 'myResource', data: fixtures.data } );

         useLocale( 'de' );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( fixtures.data.de );
      } );
   } );

   ////////////////////////////////////////////////////////////////////////////////////////////////////////

   describe( 'when an attribute path was configured', () => {
      createSetup( {
         content: {
            resource: 'myResource',
            attribute: 'path.to.content'
         }
      } );

      it( 'retrieves the actual HTML content from that path within the published resource (R1.2)', () => {
         publishEventAndTick( 'didReplace.myResource', { resource: 'myResource', data: fixtures.data3 } );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( fixtures.data3.path.to.content.en );

         publishEventAndTick(
            'didUpdate.myResource',
            { resource: 'myResource', patches: fixtures.patches1 }
         );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( 'Partially' );
         useLocale( 'de' );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( 'Partial' );

         publishEventAndTick(
            'didUpdate.myResource',
            { resource: 'myResource', patches: fixtures.patches2 }
         );
         useLocale( 'en' );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( 'New Text' );

         publishEventAndTick(
            'didUpdate.myResource',
            { resource: 'myResource', patches: fixtures.patches3 }
         );
         expect( widgetDom.querySelector( 'div' ).innerHTML ).toEqual( fixtures.patches3[ 0 ].value.en );
      } );
   } );

   ////////////////////////////////////////////////////////////////////////////////////////////////////////

   function publishEvent( eventName, eventData ) {
      testEventBus.publish( eventName, eventData );
   }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////

   function publishEventAndTick( eventName, eventData ) {
      publishEvent( eventName, eventData );
      testEventBus.flush();
   }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////

   function useLocale( languageTag, locale = 'default') {
      testEventBus.publish( `didChangeLocale.${locale}`, {
         locale,
         languageTag
      } );
      testEventBus.flush();
   }
} );
