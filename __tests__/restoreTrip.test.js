const restoreTrip = require('../restoreTrip');

describe('restoreTrip function', () => {

    it('should return an empty string for invalid input format', () => {
        const invalidInput = 'not an array';

        console.error = jest.fn(); // Mock console.error
        const result = restoreTrip(invalidInput);
        expect(result).toBe('');
        expect(console.error).toHaveBeenCalledWith('Error: Invalid input format!');
    });

    it('should return an empty string for empty input array', () => {
        const emptyInput = [];

        console.error = jest.fn();
        const result = restoreTrip(emptyInput);
        expect(result).toBe('');
        expect(console.error).toHaveBeenCalledWith('Error: Invalid input format!');
    });

    it('should return an empty string for input with missing source/destination', () => {
        const invalidInput = [
            { source: 'CityA', destination: 'CityB' },
            { destination: 'CityC' },
            { source: 'CityD' },
        ];

        console.error = jest.fn();
        const result = restoreTrip(invalidInput);
        expect(result).toBe('');
        expect(console.error).toHaveBeenCalledWith('Error: Invalid input format!');
    });

    it('should return an empty string for empty input array', () => {
        const emptyInput = [];

        console.error = jest.fn();
        const result = restoreTrip(emptyInput);
        expect(result).toBe('');
        expect(console.error).toHaveBeenCalledWith('Error: Invalid input format!');
    });

    it('should handle an empty tickets array', () => {
        const result = restoreTrip([]);
        expect(result).toBe('');
    });

    it('should handle case sensitivity in city names', () => {
        const tickets = [
            { source: 'CityA', destination: 'CityB' },
            { source: 'citya', destination: 'CityC' },
        ];

        const result = restoreTrip(tickets);
        // should avoid citya here
        expect(result).toBe('CityA, CityB');
    });

    test('should handle a circular trip', () => {
        const tickets = [
            { source: 'A', destination: 'B' },
            { source: 'B', destination: 'C' },
            { source: 'C', destination: 'A' },
        ];

        const result = restoreTrip(tickets);
        expect(result).toBe('A, B, C, A');
    });

    it('should restore trip correctly', () => {
        const tickets = [
            { source: 'Amsterdam', destination: 'Berlin' },
            { source: 'Paris', destination: 'London' },
            { source: 'London', destination: 'Amsterdam' },
        ];

        const result = restoreTrip(tickets);
        expect(result).toBe('Paris, London, Amsterdam, Berlin');
    });


    it('should handle a single-ticket trip', () => {
        const tickets = [
            { source: 'New York', destination: 'Los Angeles' },
        ];

        const result = restoreTrip(tickets);
        expect(result).toBe('New York, Los Angeles');
    });

    it('should handle duplicate tickets', () => {
        const tickets = [
            { source: 'Tokyo', destination: 'Osaka' },
            { source: 'Osaka', destination: 'Kyoto' },
            { source: 'Tokyo', destination: 'Osaka' },
        ];

        const result = restoreTrip(tickets);
        expect(result).toBe('Tokyo, Osaka, Kyoto');
    });

    it('should handle trips with multiple segments', () => {
        const tickets = [
            { source: 'A', destination: 'B' },
            { source: 'B', destination: 'C' },
            { source: 'C', destination: 'D' },
        ];

        const result = restoreTrip(tickets);
        expect(result).toBe('A, B, C, D');
    });

    it('should handle trips with missing intermediate cities', () => {
        const tickets = [
            { source: 'X', destination: 'Y' },
            { source: 'Y', destination: 'Z' },
            { source: 'X', destination: 'Z' },
        ];

        const result = restoreTrip(tickets);
        expect(result).toBe('X, Y, Z');
    });

    it('should handle tickets in random order', () => {
        const tickets = [
            { source: 'L', destination: 'M' },
            { source: 'D', destination: 'E' },
            { source: 'M', destination: 'N' },
            { source: 'A', destination: 'B' },
            { source: 'N', destination: 'O' },
            { source: 'B', destination: 'C' },
            { source: 'E', destination: 'F' },
            { source: 'F', destination: 'L' },
            { source: 'C', destination: 'D' },
            { source: 'O', destination: 'P' },

        ];

        const result = restoreTrip(tickets);
        expect(result).toBe('A, B, C, D, E, F, L, M, N, O, P');
    });

});