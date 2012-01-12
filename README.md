Cookie, A JavaScript Object for Accessing Individual HTTP Cookies
=================================================================

JavaScript can access and modify HTTP cookies through the `document.cookie` interface. Unfortunately it is a bit limited in accessing individual cookies. Cookie is a wrapper around the native interface to help with this.

### Usage

When setting a cookie, an optional params object can be specified of the form:

``` JS
{
  'domain': '.domain.com',
  'path': '/',
  'expires': 'Wdy, DD-Mon-YY HH:MM:SS GMT',
  'max_age': DELTA_SECONDS,
  'secure': TRUTHY
}
```

When getting the cookie value, an array is returned with any matching cookies.
*RFC2109 states cookies are unique based on their name, domain and path. The `document.cookie` interface returns all accessible cookies (name, value pairs) by the domain and path matching rules. This creates a situation where a cookie name could be shared between multiple cookies.*

When setting a value, care should be taken to assign the correct domain and path to avoid either creating a new cookie or updating the incorrect one.

**Using Cookie as an object:**

``` JS
Cookie.get('cookieName');
Cookie.set('cookieName', 'cookieValue', OPTIONAL_PARAMS_OBJECT);
Cookie.clear('cookieName');
```

**Using Cookie as a constructor:**

``` JS
var c = Cookie('cookieName');
c.get();
c.set('cookieValue', OPTIONAL_PARAMS_OBJECT);
c.clear();
```

## References

+ http://www.w3.org/Protocols/rfc2109/rfc2109
+ http://blog.jasoncust.com/2012/01/problem-with-documentcookie.html