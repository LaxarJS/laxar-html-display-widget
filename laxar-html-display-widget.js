/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
define( [
   'angular',
   'laxar',
   'laxar-patterns'
], function( ng, ax, patterns ) {
   'use strict';

   var moduleName = 'axHtmlDisplayWidget';
   var module     = ng.module( moduleName, [] );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   Controller.$inject = [ '$scope', 'axI18n' ];

   function Controller( $scope, i18n ) {

      $scope.i18n = i18n;

      $scope.model = { i18nHtmlContent: '' };
      $scope.resources = {};

      patterns.resources.handlerFor( $scope ).registerResourceFromFeature( 'content', {
         onUpdateReplace: function() {
            $scope.model.i18nHtmlContent =
               ax.object.path( $scope.resources.content, $scope.features.content.attribute );
         }
      } );

   }

   module.controller( 'AxHtmlDisplayWidgetController', Controller );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return module;

} );
