import WordCombination from "../../src/values/WordCombination";
import relevantWords from "../../src/stringProcessing/relevantWords";
import germanFunctionWordsFactory from "../../src/researches/german/functionWords.js";

const getRelevantWords = relevantWords.getRelevantWords;
const germanFunctionWords = germanFunctionWordsFactory().all;

describe( "gets German word combinations", function() {
	it( "returns word combinations", function() {
		const input = "Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren.  Probieren geht über Studieren.";
		const expected = [
			new WordCombination( [ "probieren" ], 48, germanFunctionWords ),
			new WordCombination( [ "studieren" ], 48, germanFunctionWords ),
		];

		// Make sure our words aren't filtered by density.
		spyOn( WordCombination.prototype, "getDensity" ).and.returnValue( 0.01 );

		const words = getRelevantWords( input, "de_DE" );

		words.forEach( function( word ) {
			delete( word._relevantWords );
		} );

		expect( words ).toEqual( expected );
	} );
} );
