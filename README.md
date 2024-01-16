# Travel Agency Trip Restorer

## Description

The Travel Agency Trip Restorer is a JavaScript module designed to help travel agencies recover the original trip itinerary for users based on an array of tickets. Each ticket contains information about the source and destination cities. This module assists in reconstructing the complete trip order.

## Installation

To use the Travel Agency Trip Restorer, follow these installation steps:

```bash
npm install travel-agency-trip-restorer
```

## Usage

To restore a trip, import the module and provide an array of tickets as follows:

```javascript
const restoreTrip = require('travel-agency-trip-restorer');

const tickets = [
  { source: 'Amsterdam', destination: 'Berlin' },
  { source: 'Paris', destination: 'London' },
  { source: 'London', destination: 'Amsterdam' },
];

const restoredTrip = restoreTrip(tickets);
console.log(restoredTrip);
```

The `restoreTrip` function takes an array of tickets as input and returns a string of comma-separated cities representing the restored trip order.

## Example

For the given example:

```javascript
const tickets = [
  { source: 'Amsterdam', destination: 'Berlin' },
  { source: 'Paris', destination: 'London' },
  { source: 'London', destination: 'Amsterdam' },
];

const restoredTrip = restoreTrip(tickets);
console.log(restoredTrip);
```

The result will be:

```
Paris, London, Amsterdam, Berlin
```

## Handled Edge Cases

- **Invalid Input Format:**
  - The function checks if the input `tickets` is an array, has at least one element, and every element is a valid ticket (with 'source' and 'destination' properties).
  
- **Missing Source or Destination in Ticket:**
  - The function checks if each ticket in the input array has both 'source' and 'destination' properties.
  
- **Empty Tickets Array:**
  - The function handles the case where the `tickets` array is empty, returning an empty string.
  
- **Finding Starting City:**
  - The function finds the starting city for the trip by checking which city has no outbound connections. If such a city is found, it is returned as the starting city.
  
- **Circular Trip Detection:**
  - The `findCircularStartingCity` function uses depth-first search (DFS) to detect cycles in the graph. If a cycle is found, it identifies the starting city of the first detected cycle.
  
- **No Circular Trip Found:**
  - If no circular trip is found, the `findCircularStartingCity` function returns `null`.

## Contributing

Contributions to the Travel Agency Trip Restorer project are welcome. Please follow the [contribution guidelines](CONTRIBUTING.md) for more details.
