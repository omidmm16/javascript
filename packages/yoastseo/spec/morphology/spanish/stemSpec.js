import stem from "../../../src/morphology/spanish/stem";
import getMorphologyData from "../../specHelpers/getMorphologyData";

const morphologyDataES = getMorphologyData( "es" ).es;

const wordsToStem = [
	// // Input a word that ends in -s but is not a plural.
	// [ "caos", "caos" ],
	// [ "gas", "gas" ],
	// // Input a word that ends with a clitic pronoun and is on the list of words that end like pronouns suffixes but are not verbs.
	// [ "anime", "anim" ],
	// [ "abuela", "abuel" ],
	// // Input a word that ends with a clitic pronoun and is a verb.
	// [ "abofarse", "abof" ],
	// [ "mirame", "mir" ],
	// // Input a word that does not ends with a clitic pronoun and is on the exceptions full forms list.
	// [ "sacratísimo", "sagrad" ],
	// [ "veamos", "ver" ],
	// // Input a word that looks like a diminutive but is not.
	// [ "acólito", "acolit" ],
	// [ "amalecitas", "amalecit" ],
	// // Input a word that is on the diminutive exceptions list.
	// [ "reicito", "rey" ],
	// [ "lucecita", "luz" ],
	// // Input a word that is a canonical diminutive.
	// [ "puertecita", "puert" ],
	// [ "ventita", "vent" ],
	// // Input a word that ends in a suffix preceded by uy.
	// [ "excluyendo", "exclu" ],
	// [ "atribuyes", "atribu" ],
	// // Input a word that undergoes stem modification changes.
	// [ "recuerdan", "record" ],
	// [ "comienzo", "comenz" ],
	// // Input a word that ends in a common verb suffix.
	// [ "saltaron", "salt" ],
	// [ "revocares", "revoc" ],
	// // Input a word that ends in -os, -s, -a, -o, -á, -í,-ó, -é, -e.
	// [ "agostinas", "agostin" ],
	// [ "boboré", "bobor" ],
	// // Input a word that is on the stems that belong together list.
	// [ "dollar", "dolar" ],
	// [ "chalets", "chale" ],
	// // Input a word that ends in -en, -es, -éis, -emos and is not preceded by gu.
	// [ "valéis", "val" ],
	// [ "dirigen", "dirig" ],
	// // Input a word that ends in -en, -es, -éis, -emos and is preceded by gu.
	// [ "distinguen", "distingu" ],
	// [ "alarguemos", "alarg" ],
	// // Input a word that looks like a verb form byt it's not.
	// [ "cabalgada", "cabalgad" ],
	// [ "abacerías", "abaceri" ],
	// // Input a word that looks like a verb form and is on the list of stems that belong together.
	// [ "san", "san" ],
	// [ "virgen", "virgen" ],
	// // Input a word that ends in -í, either a verb or a noun.
	// [ "entendí", "entend" ],
	// [ "marroquí", "marroqu" ],
	// // Input an adverb that ends in -mente.
	// [ "actualmente", "actual" ],
	// [ "aparentemente", "aparent" ],
	// // Input a word that ends in -ísimo, -ísima, ísimos, -ísimas and is preceded by bil.
	// [ "notabilísimo", "notabl" ],
	// [ "respetabilísimas", "respetabl" ],
	// // Input a word that ends in -ísimo, -ísima, ísimos, -ísimas and is preceded by qu, gu.
	// [ "riquísimo", "ric" ],
	// [ "amiguísimas", "amig" ],
	// // Input a word that ends in -ísimo, -ísima, ísimos, -ísimas and is preceded by c.
	// [ "felicísimo", "feliz" ],
	// [ "velocísimas", "veloz" ],
	// // Input a word that ends in -ísimo, -ísima, ísimos, -ísimas and is preceded by i.
	// [ "friísimo", "fri" ],
	// [ "impiísima", "impi" ],
	// // Input a word that ends in -ísimo, -ísima, ísimos, -ísimas and is preceded by -b, -d, -f, -g, -h, -i, -l, -m, -n, -p, -q, -r, -s, -t, -v, -z, -x, -y, -w, -k, -j, -u.
	// [ "rapidísimo", "rapid" ],
	// [ "generalísimas", "general" ],
	// // Input a word that ends in -érrimo, -érrima, -érrimos, érrimas.
	// [ "genialérrima", "genial" ],
	// [ "tristérrimo", "trist" ],
	// // Exceptions in superlatives.
	// [ "habilísima", "habil" ],
	// [ "majérrimo", "majérrim" ],
	// [ "cérrimo", "cérrim" ],
	// [ "gérrimo", "gérrim" ],
	// [ "torísimo", "torísim" ],
	// [ "físima", "físim" ],
	// [ "dísima", "dísim" ],
	// // Exceptions in irregular verbs.
	// [ "]
	// [ "sé", "sab" ],
	// [ "quepa", "cab" ],
	// [ "dijimos", "dec" ],
	// [ "hecho", "hac" ],
	// [ "trajere", "tra" ],
	// [ "haya", "hac" ],
	// [ "yerran", "ergu" ],
];

describe( "Test for stemming Spanish words", () => {
	it( "stems Spanish words", () => {
		wordsToStem.forEach( wordToStem => expect( stem( morphologyDataES, wordToStem[ 0 ] ) ).toBe( wordToStem[ 1 ] ) );
	} );
} );
