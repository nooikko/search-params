# Search Params

Easily Set and Get URL search parameters with 0 dependencies.

## Install

```bash
npm install @dayql/search-params
```

## Documentation
---
### Getting Started

The first thing we need to do is create a new instance. We can do that by:

```javascript
import { createSearchParams } from 'search-params';

const params = createSearchParams();
```
While you can recreate and sync your instance, it's recommended to keep track of the same params object for easier usage.

### API
---
#### createSearchParams(options)
Returns a new instance of the SearchParams class. 
```javascript
const params = createSearchParams();
```

##### options
Type: `object`

##### useHashRouter
Type: `boolean`
Default: `false`

Required if you are using as hash router or hash of any time. This allows the setting of the URL parameters without wiping out the hash.

##### useDuplicatesAsArrays
Type: `boolean`
Default: `false`

Determines if duplicate URL keys are treated as an array or not.

**Example**:
Without option:
```javascript
const url = '?foo=bar&foo=heck';
// Expected output: { foo: 'heck' }
```

With option:
```javascript
const url = '?foo=bar&foo=heck';
// Expected output: { foo: ['bar', 'heck'] }
```

#### .setAll(search, title?)
Overrides all other values with the information provided.

##### search
Type: `object`
Required: `true`

An object with key value pairs to store in the URL.

