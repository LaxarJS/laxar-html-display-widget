/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
define( [
   '../ax-html-display-widget',
   'laxar/laxar_testing',
   './fixtures'
], function( widgetModule, ax, fixtures ) {
   'use strict';

   describe( 'An AxHtmlDisplayWidget', function() {
      var testBed;

      beforeEach( function setup() {
         testBed = ax.testing.portalMocksAngular.createControllerTestBed( 'laxarjs/ax-html-display-widget' );
         testBed.useWidgetJson();
         testBed.featuresMock = { content: { resource: 'myResource' } };
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      afterEach( function() {
         testBed.tearDown();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'when a didReplace event is published for the configured resource', function() {

         it( 'replaces its internal model with the published resource (R1.1, R1.3)', function() {
            testBed.setup();

            publishEventAndTick( 'didReplace.myResource', { resource: 'myResource', data: fixtures.data } );
            expect( testBed.scope.model.i18nHtmlContent ).toEqual( fixtures.data );
         } );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'when a didUpdate event is published for the configured resource', function() {

         it( 'updates its internal model with the published data (R1.1)', function() {
            testBed.setup();

            publishEventAndTick( 'didReplace.myResource', { resource: 'myResource', data: fixtures.data } );

            publishEventAndTick( 'didUpdate.myResource', fixtures.updateEvent1 );
            expect( testBed.scope.model.i18nHtmlContent ).toEqual( fixtures.data1 );

            publishEventAndTick( 'didUpdate.myResource', fixtures.updateEvent2 );
            expect( testBed.scope.model.i18nHtmlContent ).toEqual( fixtures.data2 );
         } );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'when a didChangeLocale event is published', function() {

         it( 'uses the published locale to determine the source that should be displayed (R2.1)', function() {
            testBed.setup();
            testBed.scope.model.i18nHtmlContent = fixtures.data;

            useLocale( 'en' );
            expect( testBed.scope.i18n.locale ).toEqual( 'default' );
            expect( testBed.scope.i18n.tags[ 'default' ] ).toEqual( 'en' );
         } );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      describe( 'when an attribute path was configured', function() {
         it( 'retrieves the actual HTML content from that path within the published resource (R1.2)', function() {

            testBed.featuresMock = {
               content: {
                  resource: 'myResource',
                  attribute: 'path.to.content'
               }
            };
            testBed.setup();

            publishEventAndTick( 'didReplace.myResource', { resource: 'myResource', data: fixtures.data3 } );
            expect( testBed.scope.model.i18nHtmlContent ).toEqual( fixtures.data3.path.to.content );

            publishEventAndTick( 'didUpdate.myResource', { resource: 'myResource', patches: fixtures.patches1 } );
            expect( testBed.scope.model.i18nHtmlContent.de ).toEqual( 'Partial' );
            expect( testBed.scope.model.i18nHtmlContent.en ).toEqual( 'Partially' );

            publishEventAndTick( 'didUpdate.myResource', { resource: 'myResource', patches: fixtures.patches2 } );
            expect( testBed.scope.model.i18nHtmlContent ).toEqual( 'New Text' );

            publishEventAndTick( 'didUpdate.myResource', { resource: 'myResource', patches: fixtures.patches3 } );
            expect( testBed.scope.model.i18nHtmlContent ).toEqual( fixtures.patches3[ 0 ].value );
         } );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function publishEvent( eventName, eventData ) {
         testBed.eventBusMock.publish( eventName, eventData );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function publishEventAndTick( eventName, eventData ) {
         publishEvent( eventName, eventData );
         jasmine.Clock.tick( 0 );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function useLocale( languageTag, locale ) {
         locale = locale || 'default';
         testBed.eventBusMock.publish( 'didChangeLocale.' + locale, {
            locale: locale,
            languageTag: languageTag
         } );
         jasmine.Clock.tick( 0 );
      }
   } );
} );
