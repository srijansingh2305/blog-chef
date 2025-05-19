/**
 * Utility module for profanity filtering.
 * Uses the 'bad-words' package to detect profanity in text.
 */

import Filter from 'bad-words';

// Create a filter instance
const filter = new Filter();

/**
 * Checks if the given text contains profanity.
 * @param {String} text - Text to check.
 * @returns {Boolean} True if profane, false otherwise.
 */
export default (text) => filter.isProfane(text);
