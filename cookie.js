( function ( win, doc, undef ) {
	'use strict';

	var isString = ( function () {
		var objTypeRegExp = /\s([a-z]+)/i;

		return function ( str ) {
			return Object.prototype.toString.call( str ).match( objTypeRegExp )[ 1 ].toLowerCase() === 'string';
		};
	})(),
	stringentEncodeURIComponent = function ( str ) {
		return isString( str ) ? encodeURIComponent( str )
			.replace( /!/g, '%21' )
			.replace( /'/g, '%27' )
			.replace( /\(/g, '%28' )
			.replace( /\)/g, '%29' )
			.replace( /\*/g, '%2A' )
			: str;
	},
	stringentDecodeURIComponent = function ( str ) {
		return isString( str ) ? decodeURIComponent( str )
			.replace( /%21/g, '!' )
			.replace( /%27/g, '\'' )
			.replace( /%28/g, '(' )
			.replace( /%29/g, ')' )
			.replace( /%2A/g, '*' )
			: str;
	},
	obj = function( name, value, params ) {
		this.name = name;
		this.value = value || this.get();
		this.params = params || {};
	};

	obj.get = ( function () {
		var cookieStringRegExp = /\w+=[^;]+/g,
		cookiePairRegExp = /(\w+)=(.+)/;
	
		return function ( name ) {
			var matches = doc.cookie.match( cookieStringRegExp ),
			len = matches !== null ? matches.length : 0,
			ret = [],
			cookie,
			i;

			for ( i = 0; i < len; i++ ) {
				cookie = matches[ i ].match( cookiePairRegExp );

				if ( name === cookie[ 1 ] ) {
					ret.push( stringentDecodeURIComponent( cookie[ 2 ] ) );
				}
			}

			return ret;
		};
	})();
	obj.set = function ( name, value, params ) {
		params = params || {};

		doc.cookie = name + '=' + stringentEncodeURIComponent( value ) +
			( params.expires !== undef ? '; expires=' + params.expires : ( params.max_age !== undef ? '; max-age=' + params.max_age : '' ) ) +
			( params.domain !== undef ? '; domain=' + params.domain : '' ) +
			( params.path !== undef ? '; path=' + params.path : '' ) +
			( params.secure ? '; secure' : '' );

		return value;
	};
	obj.clear = function ( name, params ) {
		params = params || {};
		params.max_age = 0;

		obj.set( name, undef, params );
	};

	obj.prototype.get = function () {
		return obj.get( this.name );
	};
	obj.prototype.set = function ( value, params ) {
		return obj.set( this.name, value || this.value[ 0 ], params || this.params );
	};
	obj.prototype.clear = function ( params ) {
		return obj.clear( this.name, params );
	};

	win.Cookie = obj;
}( window, document ) );