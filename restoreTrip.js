/**
 * Restores a trip order based on an array of tickets containing source and destination information.
 * @param {Array} tickets - An array of objects representing tickets with 'source' and 'destination' properties.
 * @returns {string} - A comma-separated string representing the restored trip order.
 */

function restoreTrip(tickets) {
    // Input validation and error handling...
    if (!isValidTicketsArray(tickets)) {
        console.error("Error: Invalid input format!");
        return '';
    }

    // Building an adjacency list representing city connections.
    const cityGraph = buildCityAdjacencyList(tickets);

    // Finding the starting city for the trip.
    const startingCity = findStartingCity(cityGraph);

    // Error handling if starting city is not found.
    if (!startingCity) {
        console.error("Error: Unable to find starting city!");
        return '';
    }

    // Reconstructing the trip based on the adjacency list and starting city.
    const trip = reconstructTrip(cityGraph, startingCity);

    // Formatting the trip as a string.
    const result = formatTripAsString(trip);

    return result;
}

function isValidTicketsArray(tickets) {
    return Array.isArray(tickets) && tickets.length > 0 && tickets.every(ticket => isValidTicket(ticket));
}

function isValidTicket(ticket) {
    return ticket && ticket.hasOwnProperty('source') && ticket.hasOwnProperty('destination');
}

function findStartingCity(cityGraph) {
    for (const city of cityGraph.keys()) {
        const destinations = Array.from(cityGraph.values()).flat();
        if (!destinations.includes(city)) {
            return city;
        }
    }

    return findCircularStartingCity(cityGraph)
}

/**
 * Finds a circular starting city in a directed graph represented by an adjacency list.
 * This function uses depth-first search (DFS) to detect cycles and identifies the starting
 * city of the first detected cycle, if any.
 *
 * @param {Map} cityGraph - An adjacency list representing city connections.
 * @returns {string|null} - The circular starting city if found, otherwise null.
 */
function findCircularStartingCity(cityGraph) {
    const visitedCities = new Set();
    const inRecursionStack = new Set();
    let startingCity = null;

    function dfs(city) {
        visitedCities.add(city);
        inRecursionStack.add(city);

        const neighbors = cityGraph.get(city) || [];

        for (const neighbor of neighbors) {
            if (!visitedCities.has(neighbor)) {
                if (dfs(neighbor)) {
                    return true; // Cycle detected
                }
            } else if (inRecursionStack.has(neighbor)) {
                startingCity = neighbor;
                return true; // Cycle detected
            }
        }

        inRecursionStack.delete(city);
        return false;
    }

    for (const city of cityGraph.keys()) {
        if (!visitedCities.has(city)) {
            if (dfs(city)) {
                return startingCity;
            }
        }
    }

    return null; // No circular trip found
}


function buildCityAdjacencyList(tickets) {
    const cityGraph = new Map();

    for (const { source, destination } of tickets) {
        if (!cityGraph.has(source)) {
            cityGraph.set(source, []);
        }
        cityGraph.get(source).push(destination);
    }

    return cityGraph;
}

function reconstructTrip(cityGraph, startingCity) {
    const trip = [];
    let currentCity = startingCity;

    while (currentCity) {
        trip.push(currentCity);
        const nextCities = cityGraph.get(currentCity);

        if (nextCities && nextCities.length > 0) {
            currentCity = nextCities.shift();
        } else {
            currentCity = null;
        }
    }

    return trip;
}

function formatTripAsString(trip) {
    return trip.join(', ');
}

// Developer Note: The provided module exports the 'restoreTrip' function as the main export.
module.exports = restoreTrip;
