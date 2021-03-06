import { determineStem as englishDetermineStem } from "../morphology/english/determineStem";
import { determineStem as germanDetermineStem } from "../morphology/german/determineStem";

/**
 * Collects all functions for determining a stem per language and returns this collection to a Researcher
 *
 * @returns {Object} Forms to be searched for keyword-based assessments for all available languages.
 */
export default function() {
	return {
		en: englishDetermineStem,
		de: germanDetermineStem,
	};
}
