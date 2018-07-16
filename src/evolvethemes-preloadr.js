( function( window, factory ) {
	if ( typeof module === 'object' && module.exports ) {
		module.exports.Preloadr = factory();
	}
	else {
		window.Preloadr = factory();
	}
} )( typeof window !== 'undefined' ? window : this, function() {
	'use strict';

	var self = {},
		html = window.document.documentElement;

	/* The stack of events to wait for the page to be officially loaded. */
	self.stack = {};

	/* The page status. */
	self.status = '';

	/**
	 * Check if the page has been loaded.
	 */
	self.loaded = function() {
		return self.status === 'loaded';
	};

	/**
	 * Add a new element to the loading stack.
	 */
	self.add = function( key ) {
		self.stack[ key ] = false;
	};

	/**
	 * Check if all elements in the stack have been loaded.
	 */
	self.check = function() {
		var loaded = true;

		for ( var j in self.stack ) {
			if ( self.stack[ j ] !== true ) {
				loaded = false;
				break;
			}
		}

		return loaded;
	};

	/**
	 * Complete an element of the stack.
	 */
	self.complete = function( key ) {
		if ( self.stack[ key ] === false ) {
			self.stack[ key ] = true;

			var loaded_event = new CustomEvent( 'evolvethemes-preloadr-element-' + key + '-loaded' );

			html.dispatchEvent( loaded_event );

			if ( ! self.loaded() && self.check() ) {
				self.show();
			}
		}
	};

	/**
	 * Trigger the display of the page.
	 */
	self.show = function() {
		setTimeout( function() {
			self.setStatus( 'loaded' );

			html.classList.remove( 'evolvethemes-preloadr-not-loaded' );
		}, 10 );
	};

	/**
	 * Set the status of the preloader.
	 */
	self.setStatus = function( status ) {
		var prefix = 'evolvethemes-preloadr-status-',
			classes = html.className.split( ' ' ).filter( function( c ) {
				return c.lastIndexOf( prefix, 0 ) !== 0;
			} );

		self.status = status;

		if ( self.status ) {
			classes.push( prefix + self.status );

			var event = new CustomEvent( 'evolvethemes-preloadr-' + self.status );

			html.dispatchEvent( event );
		}

		html.className = classes.join( ' ' ).trim();
	};

	/**
	 * Initialization.
	 */
	self.init = function( queue ) {
		self.stack = {};

		queue.forEach( function( el ) {
			self.stack[ el ] = false;
		} );

		( function() {
			function CustomEvent( event, params ) {
				params = params || { bubbles: false, cancelable: false, detail: undefined };
				var evt = document.createEvent( 'CustomEvent' );
				evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
				return evt;
			}

			CustomEvent.prototype = window.Event.prototype;

			window.CustomEvent = CustomEvent;
		} )();

		html.classList.add( 'evolvethemes-preloadr-not-loaded' );

		/* Set the page status to 'loading'. */
		self.setStatus( 'loading' );
	};

	return self;

} );
