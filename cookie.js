( function ( win, doc, undef ) {
	'use strict';

	var stringentEncodeURIComponent = function ( str ) {
		return encodeURIComponent( str )
			.replace( /!/g, '%21' )
			.replace( /'/g, '%27' )
			.replace( /\(/g, '%28' )
			.replace( /\)/g, '%29' )
			.replace( /\*/g, '%2A' );
	},
	stringentDecodeURIComponent = function ( str ) {
		return decodeURIComponent( str )
			.replace( /%21/g, '!' )
			.replace( /%27/g, '\'' )
			.replace( /%28/g, '(' )
			.replace( /%29/g, ')' )
			.replace( /%2A/g, '*' );
	},
	obj = function( name, value, params ) {
		this.name = name;
		this.value = value || this.get();
		this.params = params || {};
	};

	obj.get = function ( name ) {
		var matches = doc.cookie.match( /\w+=[^;]+/g ),
		len = matches !== null ? matches.length : 0,
		ret = [],
		cookie,
		i;

		for ( i = 0; i < len; i++ ) {
			cookie = matches[ i ].match( /(\w+)=(.+)/ );

			if ( name === cookie[ 1 ] ) {
				ret.push( stringentDecodeURIComponent( cookie[ 2 ] ) );
			}
		}

		return ret;
	};
	obj.set = function ( name, value, params ) {
		params = params || {};

		doc.cookie = name + '=' + stringentEncodeURIComponent( value ) +
			( params.expires !== undef ? '; expires=' + params.expires : '') +
			( params.max_age !== undef ? '; max-age=' + params.max_age : '' ) +
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