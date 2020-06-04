# Search Params

Easily Set and Get URL search parameters with 0 dependencies.

## Install

```bash
npm install @dayql/search-params
```

## Documentation

### Getting Started

The first thing we need to do is create a new instance. We can do that by:

```javascript
import { SearchParams } from '@dayql/search-params';

const params = new SearchParams();
```

While you can recreate and sync your instance, it's recommended to keep track of the same params object for easier usage.
