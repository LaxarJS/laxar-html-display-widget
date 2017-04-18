/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
export default {
   data: {
      de: '<div>Hallo, Welt!</div>',
      en: '<span>Hello, world!</span>',
      en_US: '<span>Hello, big world!</span>',
      'default': '<div>Hi!</div>'
   },
   updateEvent1: {
      resource: 'myResource',
      patches: [
         {
            op: 'replace',
            path: '/de',
            value: 'Hallo, schnöde Welt!'
         },
         {
            op: 'replace',
            path: '/en',
            value: '<span>Hello, brave new world!</span>'
         },
         {
            op: 'add',
            path: '/fr',
            value: 'Bonjour, le monde!'
         }
      ]
   },
   data1: {
      de: 'Hallo, schnöde Welt!',
      en: '<span>Hello, brave new world!</span>',
      en_US: '<span>Hello, big world!</span>',
      fr: 'Bonjour, le monde!',
      'default': '<div>Hey!</div>'
   },
   updateEvent2: {
      resource: 'myResource',
      patches: [
         {
            op: 'replace',
            path: '/de',
            value: 'Hallo, Jungs!'
         },
         {
            op: 'remove',
            path: '/fr'
         },
         {
            op: 'add',
            path: '/fr',
            value: 'Ça va?'
         },
         {
            op: 'add',
            path: '/it',
            value: 'Ciao, mondo!'
         },
         {
            op: 'remove',
            path: '/default'
         }
      ]
   },
   data2: {
      de: 'Hallo, Jungs!',
      en: '<span>Hello, brave new world!</span>',
      en_US: '<span>Hello, big world!</span>',
      fr: 'Ça va?',
      it: 'Ciao, mondo!'
   },
   data3: {
      something: [],
      somethingElse: {
         name: 'otto'
      },
      path: {
         to: {
            content: {
               en: '<em>This is the content</em>'
            }
         }
      }
   },
   patches1: [
      {
         op: 'replace',
         path: '/something',
         value: [ 1, 2, 3 ]
      },
      {
         op: 'add',
         path: '/path/to/somethingElse',
         value: 'Hello'
      },
      {
         op: 'replace',
         path: '/path/to/content/de',
         value: 'Partial'
      },
      {
         op: 'add',
         path: '/path/to/content/en',
         value: 'Partially'
      }
   ],
   patches2: [
      {
         op: 'replace',
         path: '/path/to/content',
         value: 'New Text'
      }
   ],
   patches3: [
      {
         op: 'replace',
         path: '/path/to/content',
         value: {
            en: '<em>This is the content</em>'
         }
      }
   ]
};
