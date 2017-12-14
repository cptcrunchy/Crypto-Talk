
/**
 * This Class definition make use of requireJS to provide a clean and simple way to split JavaScript class definitions
 * into separate files and avoid global namespace pollution.  http://requirejs.org/
 */
define('validators/TestMetaInfo',[],function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    

    /**
     * Naming constructor with capital letter to differentiate with regular functions
     */
    function TestMetaInfo(testplanId, name, message, type, severity, recommendation) {
        // This first guard ensures that the callee has invoked our Class' constructor function
        // with the `new` keyword - failure to do this will result in the `this` keyword referring 
        // to the callee's scope (typically the window global) which will result in the following fields
        // (testplanId, msg, name, type, severity) leaking into the global namespace and not being set on this object.
        if (!(this instanceof TestMetaInfo)) {
            throw new TypeError("TestMetaInfo constructor cannot be called as a function.");
        }
        //TestPlanId e.g. 1.6.5a traces back to actual test case definition
        this.testplanId = testplanId;
        //test execution message
        this.message = message;
        if (recommendation) {
            //recommendation
            this.recommendation = recommendation;
        }
        //test name e.g. validateThreeWordInvocationName
        this.name = name;
        //Test type : functional, security
        this.type = type;
        //WARNING, ERROR
        this.severity = severity;
    }

    /**
     * All methods added to a Class' prototype are public (visible); they are able to 
     * access the properties and methods of the TestMetaInfo class via the `this` keyword.
     */
    TestMetaInfo.prototype = {
            /**
             * Whenever you replace an Object's Prototype, you need to repoint
             * the base Constructor back at the original constructor Function, 
             * otherwise `instanceof` calls will fail.
             */
            constructor: TestMetaInfo,

            getTestPlanId: function () {
                return this.testplanId;
            },

            getMessage: function () {
                return this.message;
            },

            getRecommendation: function () {
                return this.recommendation;    
            },

            getName: function () {
                return this.name;
            },

            getType: function () {
                return this.type;
            },

            getSeverity: function () {
                return this.severity;
            },

            toString: function() {
                return "[testplanId:" + this.testplanId + ",message:" + this.message + ",name:"
                + this.name + ",type:" + this.type + ",severity:" + this.severity + "]";
            }
    };

    // As mentioned up top, requireJS needs us to return a value - in this files case, we will return
    // a reference to the constructor function.
    return TestMetaInfo;
});

/**
 * This Class definition make use of requireJS to provide a clean and simple way to split JavaScript class definitions
 * into separate files and avoid global namespace pollution.  http://requirejs.org/
 */
define('validators/TestResult',[],function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    

    /**
     * Naming constructor with capital letter to differentiate with regular functions
     */
    function TestResult(testMetaInfo, status, details) {
        // This first guard ensures that the callee has invoked our Class' constructor function
        // with the `new` keyword - failure to do this will result in the `this` keyword referring 
        // to the callee's scope (typically the window global) which will result in the following fields
        // (testplanId, msg, name, type, severity) leaking into the global namespace and not being set on this object.
        if (!(this instanceof TestResult)) {
            throw new TypeError("TestResult constructor cannot be called as a function.");
        }
        //testMetaInfo : TestPlanId e.g. 1.6.5a traces back to actual test case definition
        this.testMetaInfo = testMetaInfo;
        //test status
        this.status = status;
        //Detailed message
        this.details = details;
    }

    /**
     * All methods added to a Class' prototype are public (visible); they are able to 
     * access the properties and methods of the TestResult class via the `this` keyword.
     */
    TestResult.prototype = {
            /**
             * Whenever you replace an Object's Prototype, you need to repoint
             * the base Constructor back at the original constructor Function, 
             * otherwise `instanceof` calls will fail.
             */
            constructor: TestResult,

            getTestMetaInfo: function () {
                return this.testMetaInfo;
            },

            getStatus: function () {
                return this.status;
            },

            getDetails: function () {
                return this.details;
            },

            toString: function() {
                return "[testMetaInfo:" + this.testMetaInfo.toString() + ",status:" + this.status + ",details:" + this.details + "]";
            }
    };

    //As mentioned up top, requireJS needs us to return a value - in this files case, we will return
    //a reference to the constructor function.
    return TestResult;
});
/**
 * This Class definition make use of requireJS to provide a clean and simple way to split JavaScript class definitions
 * into separate files and avoid global namespace pollution.  http://requirejs.org/
 */
define('validators/Status',[],function () {
	return {
        PASS: "PASS",
        FAIL: "FAIL",
        UNDEFINED : "UNDEFINED"
    }
});
/**
 * This Class definition make use of requireJS to provide a clean and simple way to split JavaScript class definitions
 * into separate files and avoid global namespace pollution.  http://requirejs.org/
 */
define('validators/Severity',[],function () {
	return {
        ERROR: "ERROR",
        WARNING: "WARNING"
    }
});
/**
 * Translation keys definition
 */
define('validators/TranslationKeys',[],function () {
    return {
        INVOCATION_NAME_VALIDATE_WORD_COUNT_SHORT_MSG : "INVOCATION_NAME_VALIDATE_WORD_COUNT_SHORT_MSG",
        INVOCATION_NAME_VALIDATE_WORD_COUNT_DETAIL_MSG : "INVOCATION_NAME_VALIDATE_WORD_COUNT_DETAIL_MSG",
        INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_SHORT_MSG : "INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_SHORT_MSG",
        INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_DETAILED_MSG : "INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_DETAILED_MSG",
        INVOCATION_NAME_VALIDATE_RESERVED_WORDS_SHORT_MSG : "INVOCATION_NAME_VALIDATE_RESERVED_WORDS_SHORT_MSG",
        INVOCATION_NAME_VALIDATE_RESERVED_WORDS_DETAILED_MSG : "INVOCATION_NAME_VALIDATE_RESERVED_WORDS_DETAILED_MSG",
        INVOCATION_NAME_VALIDATE_LENGTH_SHORT_MSG : "INVOCATION_NAME_VALIDATE_LENGTH_SHORT_MSG",
        INVOCATION_NAME_VALIDATE_LENGTH_DETAILED_MSG : "INVOCATION_NAME_VALIDATE_LENGTH_DETAILED_MSG",

        EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_AND_INVOCATION_NAME_SHORT_MSG : "EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_AND_INVOCATION_NAME_SHORT_MSG",
        EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_AND_INVOCATION_NAME_DETAILED_MSG : "EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_AND_INVOCATION_NAME_DETAILED_MSG",
        EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_SHORT_MSG : "EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_SHORT_MSG",
        EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_DETAILED_MSG : "EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_DETAILED_MSG",

        EXAMPLE_PHRASE_VALIDATE_EMOTICONS_AND_SYMBOLS_SHORT_MSG : "EXAMPLE_PHRASE_VALIDATE_EMOTICONS_AND_SYMBOLS_SHORT_MSG",
        EXAMPLE_PHRASE_VALIDATE_EMOTICONS_AND_SYMBOLS_DETAILED_MSG : "EXAMPLE_PHRASE_VALIDATE_EMOTICONS_AND_SYMBOLS_DETAILED_MSG",
        EXAMPLE_PHRASE_RECOMMENDATION_MSG : "EXAMPLE_PHRASE_RECOMMENDATION_MSG",
        
        EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_SHORT_MSG : "EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_SHORT_MSG",
        EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_DETAILED_MSG : "EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_DETAILED_MSG"
    }
});
define('validators/Translation_en',["validators/TranslationKeys"], function (TranslationKeys) {
	var translations = {
			INVOCATION_NAME_VALIDATE_WORD_COUNT_SHORT_MSG : "Should be shorter than or equal to 3 words",
			INVOCATION_NAME_VALIDATE_WORD_COUNT_DETAIL_MSG : "",
			INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_SHORT_MSG : "No numeric, special characters, or punctuation. Note that possessive apostrophes & periods used in abbreviations are allowed.",
			INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_DETAILED_MSG : "The 'Invocation Name' provided doesn't meet our guidelines. Please ensure that it doesn't contain digits, symbols or punctuation marks other than the possessive apostrophes (e.g., Mary’s Skill), or periods in abbreviations (e.g., A.B.C). To represent numbers, consider spelling them out(e.g., Nineteen Eighty Four).",
			INVOCATION_NAME_VALIDATE_RESERVED_WORDS_SHORT_MSG : "Does not contain ‘Alexa’, 'Echo' or ‘Amazon’",
			INVOCATION_NAME_VALIDATE_RESERVED_WORDS_DETAILED_MSG : "The 'Invocation Name' provided doesn't meet our guidelines. Please ensure that it doesn't contain the words 'Alexa', 'Echo' or 'Amazon'.",
			INVOCATION_NAME_VALIDATE_LENGTH_SHORT_MSG : "Should be between 2 - 50 characters",
			INVOCATION_NAME_VALIDATE_LENGTH_DETAILED_MSG : "The 'Invocation Name' provided doesn't meet our guidelines. Please ensure that it has at least 2 characters and at most 50 characters, forming a legitimate word that can be spoken by the user.",
			EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_AND_INVOCATION_NAME_SHORT_MSG : "First Example Phrase should include the wake word ‘Alexa’",
			EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_AND_INVOCATION_NAME_DETAILED_MSG : "The 'Example Phrase' provided doesn't meet our guidelines. Please ensure that the first phrase contains the wake word 'Alexa' and invocation name. Example: 'Alexa, ask Greeter to say hello world'.",
			EXAMPLE_PHRASE_VALIDATE_EMOTICONS_AND_SYMBOLS_SHORT_MSG : "Free of emoticons, special characters, or symbols",
			EXAMPLE_PHRASE_VALIDATE_EMOTICONS_AND_SYMBOLS_DETAILED_MSG : "The 'Example Phrase' provided doesn't meet our guidelines. Please ensure that it doesn't contain any emoticons, special characters, symbols, or grammatical errors.",
			EXAMPLE_PHRASE_RECOMMENDATION_MSG : "Include your invocation name in your phrases. For example, 'Alexa, ask Greeter to say hello world'",
			EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_SHORT_MSG : "Include your invocation name in your phrases. For example, 'Alexa, ask Greeter to say hello world'",
			EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_DETAILED_MSG : "Include your invocation name in your phrases. For example, 'Alexa, ask Greeter to say hello world'",
			EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_SHORT_MSG : "Include your sample utterances in your example phrases. For example, 'Alexa, ask Greeter to say hello world'",
			EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_DETAILED_MSG : "Include your sample utterances in your example phrases. For example, 'Alexa, ask Greeter to say hello world'"
	};

	var get = function(key) {
		return translations[key];
	};

	return {
		get : get
	};
});

/**
 * This Class definition make use of requireJS to provide a clean and simple way to split JavaScript class definitions
 * into separate files and avoid global namespace pollution.  http://requirejs.org/
 */
define('validators/LocalizedMessageResolver',["validators/Translation_en"], function (EnglishTranslation) {
    
    var translator = EnglishTranslation;

    var init = function(locale) {
        if (locale) {
            if (locale === "en") {
                translator = EnglishTranslation;
            }
        } 
    };

    var get = function(key) {
        return translator.get(key);
    };

    return {
        init : init,
        get : get
    };
});
/**
 * Constant definition
 */
define('validators/Constants',[],function () {
    return {
        INVOCATION_NAME_VALIDATE_WORD_COUNT_TEST_PLAN_ID : "1.6.5a",
        INVOCATION_NAME_VALIDATE_WORD_COUNT_TEST_NAME : "validateWordCount",

        INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_TEST_PLAN_ID : "1.6.5c",
        INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_TEST_NAME : "validateAlphabetsAndSpaces",

        INVOCATION_NAME_VALIDATE_RESERVED_WORDS_TEST_PLAN_ID : "1.6.5f",
        INVOCATION_NAME_VALIDATE_RESERVED_WORDS_TEST_NAME : "validateReservedWords",

        INVOCATION_NAME_VALIDATE_LENGTH_TEST_PLAN_ID : "1.6.5g",
        INVOCATION_NAME_VALIDATE_LENGTH_TEST_NAME : "validateLength",

        EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_INVOCATION_NAME_TEST_PLAN_ID : "1.6.8a",
        EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_INVOCATION_NAME_TEST_NAME : "validateWakeWordWithInvocationName",

        EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_TEST_PLAN_ID : "1.6.8c",
        EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_TEST_NAME : "validateInvocationName",

        EXAMPLE_PHRASE_VALIDATE_EMOTICONS_TEST_PLAN_ID : "1.6.8b",
        EXAMPLE_PHRASE_VALIDATE_EMOTICONS_TEST_NAME : "validateEmoticonsAndSymbols",

        EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_TEST_PLAN_ID : "1.7",
        EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_TEST_NAME : "validateExamplePhraseWithInteractionModel",
        
        TEST_TYPE_FUNCTIONAL : "functional",
        TEST_TYPE_SLU : "slu"
    }
});

define('validators/invocationNameValidator',["validators/TestMetaInfo", "validators/TestResult", "validators/Status", "validators/Severity", "validators/LocalizedMessageResolver", "validators/TranslationKeys", "validators/Constants"],
        function(TestMetaInfo, TestResult, Status, Severity, LocalizedMessageResolver, TranslationKeys, Constants) {

    var validateWordCountTest;
    var validateAlphabetsAndSpacesTest;
    var validateReservedWordsTest;
    var validateLengthTest;

    var init = function(locale) {
        LocalizedMessageResolver.init(locale);
       
        validateWordCountTest = new TestMetaInfo(Constants.INVOCATION_NAME_VALIDATE_WORD_COUNT_TEST_PLAN_ID,
                Constants.INVOCATION_NAME_VALIDATE_WORD_COUNT_TEST_NAME,
                LocalizedMessageResolver.get(TranslationKeys.INVOCATION_NAME_VALIDATE_WORD_COUNT_SHORT_MSG),
                Constants.TEST_TYPE_FUNCTIONAL,
                Severity.WARNING);

        validateAlphabetsAndSpacesTest =  new TestMetaInfo(Constants.INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_TEST_PLAN_ID,
                Constants.INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_TEST_NAME,
                LocalizedMessageResolver.get(TranslationKeys.INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_SHORT_MSG),
                Constants.TEST_TYPE_FUNCTIONAL,
                Severity.ERROR);
        validateReservedWordsTest = new TestMetaInfo(Constants.INVOCATION_NAME_VALIDATE_RESERVED_WORDS_TEST_PLAN_ID,
                Constants.INVOCATION_NAME_VALIDATE_RESERVED_WORDS_TEST_NAME,
                LocalizedMessageResolver.get(TranslationKeys.INVOCATION_NAME_VALIDATE_RESERVED_WORDS_SHORT_MSG),
                Constants.TEST_TYPE_FUNCTIONAL,
                Severity.ERROR);
        validateLengthTest = new TestMetaInfo(Constants.INVOCATION_NAME_VALIDATE_LENGTH_TEST_PLAN_ID,
                Constants.INVOCATION_NAME_VALIDATE_LENGTH_TEST_NAME,
                LocalizedMessageResolver.get(TranslationKeys.INVOCATION_NAME_VALIDATE_LENGTH_SHORT_MSG),
                Constants.TEST_TYPE_FUNCTIONAL,
                Severity.ERROR);
    };

    /**
     * function to validate word count
     * @param invocationName
     */

    var validateWordCount = function (invocationName) {
        if (!invocationName) {
            return new TestResult(validateWordCountTest, Status.UNDEFINED);
        }

        try {
            var str = invocationName.trim();
            var matches = str.match(/[a-z']+/gi); //matches the front and the back
            if ( matches) {
                matches = matches.map( function(f) {return f.length;});
                var count = 1;

                matches.reduce( function(prev, current) {
                    if ( prev !== 1 || current !== 1) {
                         count += 1;
                    }
                    return current;
                });

                if (count > 3) {
                    return new TestResult(validateWordCountTest, Status.FAIL,
                            LocalizedMessageResolver.get(TranslationKeys.INVOCATION_NAME_VALIDATE_WORD_COUNT_DETAIL_MSG));
                }
            }
            return new TestResult(validateWordCountTest,Status.PASS);
        } catch (err) {
            return new TestResult(validateWordCountTest, Status.UNDEFINED);
        }
    };

    /**
     * validates valid chars allowed in the invocation name
     * i.e. only alphabets, spaces, apostrephe and periods
     */
    var validateAlphabetsAndSpaces = function (invocationName) {
        if (!invocationName) {
            return new TestResult(validateAlphabetsAndSpacesTest, Status.UNDEFINED);
        }
        try {
            var regex =/[^a-zA-Z\s\.\']/;
            if (regex.test(invocationName)) {
                return new TestResult(validateAlphabetsAndSpacesTest, Status.FAIL,
                        LocalizedMessageResolver.get(TranslationKeys.INVOCATION_NAME_VALIDATE_ALPHABETS_AND_SPACES_DETAILED_MSG));
            }
            return new TestResult(validateAlphabetsAndSpacesTest,Status.PASS);
        } catch (err) {
            return new TestResult(validateAlphabetsAndSpacesTest, Status.UNDEFINED);
        }
    };

    /**
     * invocation name must have atleast 2 charcters and at most 50 characters.
     */
    var validateLength = function (invocationName) {
         if (!invocationName) {
             return new TestResult(validateLengthTest, Status.UNDEFINED);
         }
         try {
             if (invocationName.length < 2 || invocationName.length > 50) {
                 return new TestResult(validateLengthTest, Status.FAIL,
                         LocalizedMessageResolver.get(TranslationKeys.INVOCATION_NAME_VALIDATE_LENGTH_DETAILED_MSG));
             }
             return new TestResult(validateLengthTest, Status.PASS);
         } catch (err) {
             return new TestResult(validateLengthTest, Status.UNDEFINED);
         }
    };

    /**
     * validates Alexa, Amazon, Echo, Ask, Tell, Talk to, Open, Launch, Start, Resume, Run, Load, Begin and Play words does not come in the invocation name
     */
    var validateReservedWords = function(invocationName) {
        if (!invocationName) {
            return new TestResult(validateReservedWordsTest, Status.UNDEFINED);
        }
        try {
            var regex =  new RegExp("(\\w*\\s+|^)(Alexa|Amazon|Echo|Ask|Tell|Talk to|Open|Launch|Start|Resume|Run|Load|Begin|Play)(\\s+\\w*|$)", "i");

            if (regex.test(invocationName)) {
                return new TestResult(validateReservedWordsTest, Status.FAIL,
                        LocalizedMessageResolver.get(TranslationKeys.INVOCATION_NAME_VALIDATE_RESERVED_WORDS_DETAILED_MSG));
            }
            return new TestResult(validateReservedWordsTest,Status.PASS);
        } catch (err) {
            return new TestResult(validateReservedWordsTest, Status.UNDEFINED);
        }
    };

    return {
        validateWordCount : validateWordCount,
        validateLength : validateLength,
        validateAlphabetsAndSpaces : validateAlphabetsAndSpaces,
        validateReservedWords : validateReservedWords,
        init : init
    };
});

define('validators/examplePhraseValidator',["validators/TestMetaInfo", "validators/TestResult", "validators/Status", "validators/Severity",
        "validators/LocalizedMessageResolver", "validators/TranslationKeys", "validators/Constants"],
        function(TestMetaInfo, TestResult, Status, Severity, LocalizedMessageResolver, TranslationKeys, Constants) {

    var validateWakeWordWithInvocationNameTest;
    var validateInvocationNameTest;
    var validateEmoticonsAndSymbolsTest;
    var validateExamplePhraseWithInteractionModelTest;
    
    var init = function(locale) {
        LocalizedMessageResolver.init(locale);
        validateWakeWordWithInvocationNameTest = new TestMetaInfo(
                Constants.EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_INVOCATION_NAME_TEST_PLAN_ID,
                Constants.EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_INVOCATION_NAME_TEST_NAME,
                LocalizedMessageResolver.get(TranslationKeys.EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_AND_INVOCATION_NAME_SHORT_MSG),
                Constants.TEST_TYPE_FUNCTIONAL,
                Severity.ERROR);

        validateInvocationNameTest = new TestMetaInfo(
                Constants.EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_TEST_PLAN_ID,
                Constants.EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_TEST_NAME,
                LocalizedMessageResolver.get(TranslationKeys.EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_SHORT_MSG),
                Constants.TEST_TYPE_FUNCTIONAL,
                Severity.WARNING,
                LocalizedMessageResolver.get(TranslationKeys.EXAMPLE_PHRASE_RECOMMENDATION_MSG));

        validateEmoticonsAndSymbolsTest =  new TestMetaInfo(
                Constants.EXAMPLE_PHRASE_VALIDATE_EMOTICONS_TEST_PLAN_ID,
                Constants.EXAMPLE_PHRASE_VALIDATE_EMOTICONS_TEST_NAME,
                LocalizedMessageResolver.get(TranslationKeys.EXAMPLE_PHRASE_VALIDATE_EMOTICONS_AND_SYMBOLS_SHORT_MSG),
                Constants.TEST_TYPE_FUNCTIONAL,
                Severity.ERROR);

        validateExamplePhraseWithInteractionModelTest = new TestMetaInfo(
                Constants.EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_TEST_PLAN_ID,
                Constants.EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_TEST_NAME,
                LocalizedMessageResolver.get(TranslationKeys.EXAMPLE_PHRASE_VALIDATE_INTERACTION_MODEL_SHORT_MSG),
                Constants.TEST_TYPE_SLU,
                Severity.WARNING);
    };

    //remove the quotes in the beginning and the end
    function trimQuotes( str) {
        if (str) {
            str = str.replace(/(^\"|^'|\'$|\"$)/gi, "");
        }
        return str;
    }

    var validateWakeWordWithInvocationName = function (examplePhrase, invocationName) {
        if (!examplePhrase || !invocationName) {
            return new TestResult(validateWakeWordWithInvocationNameTest, Status.UNDEFINED);
        }
        examplePhrase = trimQuotes(examplePhrase);
        var regex =  new RegExp( "^(Alexa|Amazon|Echo)\\W.*", "i");
        if ( !regex.test( examplePhrase)) {
            return new TestResult(validateWakeWordWithInvocationNameTest, Status.FAIL,
                    LocalizedMessageResolver.get(TranslationKeys.EXAMPLE_PHRASE_VALIDATE_WAKE_WORD_AND_INVOCATION_NAME_DETAILED_MSG));   
        }
        return new TestResult(validateWakeWordWithInvocationNameTest, Status.PASS);
    };

    var validateInvocationName = function (examplePhrase, invocationName) {
        if (!examplePhrase || !invocationName) {
            return new TestResult(validateInvocationNameTest, Status.UNDEFINED);
        }

        invocationName = invocationName.replace(/\s+/gi, ' ').trim(); //clean up
        examplePhrase = examplePhrase.replace(/\s+/gi, ' ').trim();
        examplePhrase = examplePhrase.replace( /(Alexa|Amazon|Echo)[\,\s]+/gi, '');
        examplePhrase = trimQuotes(examplePhrase);

        var regex = new RegExp("(\\W|^)" + invocationName + "(\\W$|$|\\W.*$)", "gi");
        if ( !regex.test( examplePhrase)) {
            return new TestResult(validateInvocationNameTest, Status.FAIL,
                    LocalizedMessageResolver.get(TranslationKeys.EXAMPLE_PHRASE_VALIDATE_INVOCATION_NAME_DETAILED_MSG));
        }
        return new TestResult(validateInvocationNameTest, Status.PASS);
    };

    var validateEmoticonsAndSymbols = function (examplePhrase) {
        if (!examplePhrase) {
            return new TestResult(validateEmoticonsAndSymbolsTest, Status.UNDEFINED);
        }

        //All emoticons has either ':' or '<' or '>', so not allowing these characters
//        if (examplePhrase.match(/[:<>~!@#$%^&*\(\)\{\}\[\]\"\\\/-_=+]/)) {
//    if (examplePhrase.match(/[:<>]/) || examplePhrase.match(/[~!@#$%^&*\(\)\{\}\[\]\"\|\\\-_=+\/;\?]/)) {
        var regex = /[^a-zA-Z\s\.0-9\?!'\.\,\"\-\|\:\;\%\&\$\#\(\)\+\<\>\/\@]/;
        if (regex.test(examplePhrase)) {
            return new TestResult(validateEmoticonsAndSymbolsTest, Status.FAIL,
                    LocalizedMessageResolver.get(TranslationKeys.EXAMPLE_PHRASE_VALIDATE_EMOTICONS_AND_SYMBOLS_DETAILED_MSG));
        }
        return new TestResult(validateEmoticonsAndSymbolsTest, Status.PASS);
    };

    //retuns the slotType based on slotId and intentId using intent schema
    function getSlotTypeFromIntentSchema( slotId, intentId, intentSchema) {
        var intents = intentSchema ? intentSchema.intents: null;
        var nIntents = intents ? intents.length : 0;
        for ( var i = 0; i < nIntents; i++) {
            var intent = intents[i];
            if ( intent && intentId === intent.intent) {
                var slot = intent.slots.find( function( slot){ return slotId === slot.name; });
                if ( slot) {
                    return slot.type;
                }
            }    
        }
        return null;
    }
    
    //amazon defined intents and utterances
    var AMAZON_INTENTS = 
    [
        {
            "name":"AMAZON.CancelIntent",
            "utterances":[ "cancel", "never mind", "forget it"]
        }, 
        {
            "name":"AMAZON.HelpIntent",
            "utterances":[ "help", "help me", "can you help me"]
        }, 
        {
            "name":"AMAZON.NextIntent",
            "utterances":[ "next", "skip", "skip forward"]
        }, 
        {
            "name":"AMAZON.NoIntent",
            "utterances":[ "no", "no thanks"]
        },
        {
            "name":"AMAZON.PauseIntent",
            "utterances":[ "pause", "pause that"]
        },
        {
            "name":"AMAZON.PreviousIntent",
            "utterances":[ "go back", "skip back", "back up"]
        },
        {
            "name":"AMAZON.RepeatIntent",
            "utterances":[ "repeat", "say that again", "repeat that"]
        },
        {
            "name":"AMAZON.ResumeIntent",
            "utterances":[ "resume", "continue", "keep going"]
        },
        {
            "name":"AMAZON.StartOverIntent",
            "utterances":[ "start over", "restart", "start again"]
        },
        {
            "name":"AMAZON.StopIntent",
            "utterances":[ "stop", "off", "shut up"]
        },
        {
            "name":"AMAZON.YesIntent",
            "utterances":[ "yes", "yes please", "sure"]
        }
    ];

    function getStringRepresentationForIntForEnglish( val) {
        switch ( val) {
            case 1: return 'one';
            case 2: return 'two';
            case 3: return 'three';
            case 4: return 'four';
            case 5: return 'five';
            case 6: return 'six';
            case 7: return 'seven';
            case 8: return 'eight';
            case 9: return 'nine';
            case 10: return 'ten';
            default: return null;
        }
    }    
    
    var PUNCTUATION_REGEXP = new RegExp( '[ \\.\\,\\?\\!\\-\\:]+', 'gi'); //used for identifying common punctuations and removing them
    var APOSTROPHE_REGEXP = new RegExp( '[\']+', 'gi'); //used for identifying common punctuations and removing them

    //returns the string representation for a integer between 1 and 10 otherwise returns a null
    function getStringRepresentationForInt( val, locale) {
        if ( !locale || locale == 'en') {
            return getStringRepresentationForIntForEnglish( val);
        } 
        console.log("Need to handle other languages");
        return null;   
    }    
    
    //returns true if the slot value is present in the slots
    function isSlotPresent( slotValue, slotType, slots, locale) {
        var slot = slots.find( function(n) { return slotType === n.name; } );
        if ( slot && slot.entries) {
            slotValue = slotValue.toLowerCase().trim();
            if ( slot.entries != null) {
                var entries = slot.entries.replace(/[\[\]]/g, '').split(',');  
                entries = entries.filter( function( n) { return n; }) //remove empty entries
                            .map( function( n) { return n.toLowerCase().trim();});

                var fnd = entries.find( function(n) { return n === slotValue; });
                if ( fnd) {
                    return true;
                } else {
                   //check if the entries are numbers. If yes, convert them to string
                    if ( !isNaN( Number( entries[0]))) {
                        var fnd = entries.find( function( n) {
                            var number = Number( n);
                            if ( !isNaN(number )) {
                                var numberString = getStringRepresentationForInt( number);
                                if ( numberString && numberString.toLowerCase() === slotValue.toLowerCase()) {
                                    return true;
                                }
                            }
                            return false; 
                        });
                        return fnd != null;
                    }
                }
            }
        }                     //returns true if one of the value matches
        return false;                 
    }  
    
    function fetchUtterancesForAmazonIntentsUsed( intentSchema, locale) {
        var utterances = intentSchema.intents.reduce( function(total, intent,index, arr) {
            var amazonIntent = AMAZON_INTENTS.find( function( amazonIntent) { return amazonIntent.name === intent.intent; } );
            if ( amazonIntent) {
                total = total.concat( amazonIntent.utterances);
            }
            return total;
        },[]);
        return utterances;
    }
    
    function getSlotValues( slotType, slots) {
        var slot = slots.find( function( slot) {
            return slot.name === slotType;
        });
        if ( slot) {
            var slotString = slot.entries
                                .replace(/[\[\]]/g, '')
                                .toLowerCase(); //remove hypens along with 
            var slotValues = slotString.split(',').map( function( slotVal) { 
                return slotVal.replace( PUNCTUATION_REGEXP, ' ') //replace punctuations with ws
                                .replace( APOSTROPHE_REGEXP, '') //remove apostrophes
                                .trim();
            });
            if ( slotValues.length > 0 && !isNaN( Number( slotValues[0]))) {
                //add string representation for numercial values
                var nSlotValues = slotValues.length;
                for ( var i = 0; i < nSlotValues; i++) {
                    var number = Number( slotValues[i]);
                    if ( !isNaN(number )) {
                        var numberString = getStringRepresentationForInt( number);
                        if ( numberString) {
                            slotValues.push( numberString);
                        }
                    }
                }
            } 
            return slotValues;
        }
        return []; //empty array   
    }
    
    //from https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/supported-phrases-to-begin-a-conversation
    var CONNECTING_WORDS = ['by','from', 'in', 'using', 'with', 'to', 'about', 'for', 'if', 'whether', 'that', 'and'];
    var CONNECTING_WORDS_REGEX = '(' + CONNECTING_WORDS.join('|') + ')';
    
    var CONNECTING_WORDS_END = ['by', 'from', 'in', 'using', 'with'];
    var CONNECTING_WORDS_END_REGEX = '(' + CONNECTING_WORDS_END.join('|') + ')';
    
    var NUMBERS_TEXT_EN = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
                            'zero', 'oh', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
                            'hundred', 'thousand', 'million', 'billion', 'trillion', 'zillion',
                            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                            '\\.', '\\-', '\\,', 'and', '\\s' ];
    var NUMBERS_TEXT_REGEX_EN = '(' + NUMBERS_TEXT_EN.join('|') + ')';

    var US_STATES = [ 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 
                    'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
                    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
                    'New Jersey', 'NewJersey', 'New Mexico', 'New York', 'NewYork', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 
                    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
                    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    var US_STATES_REGEX = '(' + US_STATES.join('|') + ')';

    //returns regex correponding to AMAZON_SLOT_TYPES. Returns null for unhandled slot type
    function getSlotRegexForAmazonSlots( slotType, favorPrecisonOverRecall) {
        if ( slotType === 'AMAZON.NUMBER' || slotType == 'AMAZON.FOUR_DIGIT_NUMBER') {
            return NUMBERS_TEXT_REGEX_EN + '+';
        }
        if ( slotType === 'AMAZON.US_FIRST_NAME') {
            return '([a-z0-9\.\,]*\s?)';
        }
        if ( slotType === 'AMAZON.US_STATE') {
            return US_STATES_REGEX;
        }
        if ( favorPrecisonOverRecall) {
            //will try to match a generic string if precision is required
            return '.*?'    
        } else {
            if ( slotType === 'AMAZON.US_CITY') {
                //return '([\\w|&]+\\W?){1,3}'; //ampersand might be present in a location e.g, Clark & Addison
                return '\\w+'; //matches only single word city name
            } else {
                return null;
            }
       }
    }
    
    //returns a utterance matching example from filtetedUtterances. The intentSchema and Slots are required to match the slot values
    //returns null if matching utterance is not found 
    function findMatchingUtterance( example, filteredUtterances, intentSchema, slots) {
        var favorPrecisonOverRecall = false; //flag to control whether precision should be favoured over recall
        
        var matchedUtterance = filteredUtterances.find( function( filteredUtterance, index, array) {
            //splits in intentId and rest of the string. The sample utterances are of the form 'IntentId utterance' 
            var match = filteredUtterance.match(/(.*?)\s+(.*)/); //the first is non greedy as we need to split by first ws
            if ( !match || match.length != 3) {
                //unable to split the sample utterance as IntentId and phrase
                console.log("unable to split filtered utterance as intentId and phrase: " + filteredUtterance);
                return false;
            } 
            var intentId = match[1];
            var filteredUtterance = match[2];
            filteredUtterance = filteredUtterance
                            .replace( PUNCTUATION_REGEXP, ' ') //replace punctuations ans ws with single ws 
                            .replace( APOSTROPHE_REGEXP, '') //remove the apostrope 
                            .trim(); //replace multiple ws with single ws 
        
            var slotId = null;
            //replacing single curly braces with double curly to avoid clash with single curly used for putting count in regex
            filteredUtterance = filteredUtterance.replace(/\{/gi, '{{');
            filteredUtterance = filteredUtterance.replace(/\}/gi, '}}');
            
            while ( (slotId = filteredUtterance.match( /\{\{.*?\}\}/i)) != null) {
                slotId = slotId[0].replace(/[\{\{\}\}]/gi, '').trim(); //removing {} and whitespaces
                var slotExpression = null; 
                if ( slotId.indexOf('|') != -1) { //handling AMAZON.LITERAL
                    slotExpression = slotId.split('|')[0]; //the second part consists of SlotId
                } else {
                    var slotType = getSlotTypeFromIntentSchema( slotId, intentId, intentSchema);
                    if ( slotType) {
                        if ( slotType.match(/AMAZON\..*/gi)) {
                            slotExpression = getSlotRegexForAmazonSlots( slotType, favorPrecisonOverRecall);    
                        } else {
                            var slotValues = getSlotValues( slotType, slots);
                            slotExpression = '(' + slotValues.join('|') + ')';
                        }
                    }   
                }
                if ( slotExpression != null) {
                    var regex = new RegExp( '\{\{.*?\}\}', 'i');
                    filteredUtterance = filteredUtterance.replace( regex, slotExpression);
                }else {
                    //unable to get the slotExpression, setting filteredUtterance to null and breaking out of loop
                    filteredUtterance = null;
                    break;
                }
            }
            //taking care of connecting words
            if ( filteredUtterance) {
                filteredUtterance = '^' + CONNECTING_WORDS_REGEX + '?\\s?' + filteredUtterance + '$'; //adding beginning and end check
                var exampleMatch = example.match( new RegExp(filteredUtterance, 'i'));
                return exampleMatch != null;
            } else {
                return false;
            }
        });
        return matchedUtterance != null;
    }

    var LAUNCH_PHRASE_EN =  [ '', 'Ask', 'Begin', 'Do', 'Launch', 'Load', 'Open', 'Play', 'Play the game', 'Resume', 'Run', 'Start', 
    'Start playing','Start playing the game', 'Talk to', 'Tell', 'Use']; 
    var LAUNCH_PHRASE_REGEX_EN = '(' + LAUNCH_PHRASE_EN.join('|') + ')';
    
    var WAKE_WORD = ['Alexa', 'Echo', 'Amazon'];
    var WAKE_WORD_REGEX = '(' + WAKE_WORD.join('|') + ')';
    
    //polyfills
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(searchString, position) {
            var subjectString = this.toString();
            if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
    }
    //returns true if transformAbbreviations modifies the string
    function isAbbreviation( inputText) {
        var transformedText = transformAbbreviations( inputText, '');
        return transformedText.length < inputText.length;
    }
    //replaces whitespaces and dots in abbrevations with seperator
    function transformAbbreviations( inputText, seperator) {
        if ( seperator === null) {
            seperator = '';
        }

        var matches = inputText.match(/[a-z']+/gi);
        if ( matches) {
            var reducedVal = matches.reduce( function( prevVal, current){
                if ( prevVal === null) {
                    return { str: current, len: current.length, counter:1}; //first character has been added to string, therefore increasing counter value
                } else {
                    counter = prevVal.counter;
                    var str = prevVal.str;
                    if (( prevVal.len == 1) && current.length == 1) {
                        str = str + seperator + current;
                    } else {
                        if ( counter > 1) { //to handle end of abbreviation 
                            str = str + seperator;
                            if ( !seperator.endsWith(' ')) {
                                str = str + ' ';
                            }
                            str = str + current;        
                        } else {
                            str = str + ' ' + current;
                        }
                    }  
                    counter = (current.length == 1) ? counter + 1 : 0 ; //resetting the abbreviation counter to zero a word with more than one char found
                    return { str: str, len: current.length, counter:counter};   
                }
            }, null);
            
            var retval = reducedVal.str;
            if ( reducedVal.counter > 1) { //to put seperator at end of the abbreviation if it is still running
                retval = retval + seperator;
            }

            return retval.trim(); 
        }
        return inputText;
    }

    //extracts the utterance from the example. It removes the Alexa and the3 invocation name
    function extractUtteranceFromExample( invocationName, examplePhrase) {
        var invocationNameRegex = invocationName;
        if ( isAbbreviation( invocationName)) {
            var ABBREVATION_SEPERATORS = ['', '.', ' ', '. '];
            var invocationNames = ABBREVATION_SEPERATORS.map( function( seperator) {
                return transformAbbreviations( invocationName, seperator);
            });
            invocationNameRegex = '(' + invocationNames.join('|') + ')'
        }

        var utterance = null; 
        var invocationNameAtBeginningRegex = new RegExp( '^' + WAKE_WORD_REGEX +'?' + '\\W*' + LAUNCH_PHRASE_REGEX_EN + '?' + '\\W*' + invocationNameRegex + '\\W*', 'i');
        if ( examplePhrase.match( invocationNameAtBeginningRegex)) {
            utterance = examplePhrase
                .replace( invocationNameAtBeginningRegex, '') //remove string upto and including the first occurrance of launch phrase
                .trim(); 
        } else {
            var invocationNameAtEndRegex = new RegExp( '^' + WAKE_WORD_REGEX +'?' + '\\W*' + '(.*)' + '\\W*' + CONNECTING_WORDS_END_REGEX + '\\W*' + invocationNameRegex, 'i');
            var match = examplePhrase.match( invocationNameAtEndRegex);
            if ( match) {
                utterance = match[2];
                utterance = utterance.trim();
            }
        }
        if ( utterance === null) {
            utterance = examplePhrase;
        }
        return utterance;
    }
   
   
    /**
     * TEST: Example phrase must be exactly modelled on Sample utteran= ces
     * @param examplePhrase
     * @param invocationName
     * @param sampleUtterances
     * @param slots
     * @param locale
     */
    var validateExamplePhraseWithInteractionModel = function (examplePhrase, invocationName, intentSchema, sampleUtterances, slots) {
        // Test related constants --TODO: Move them to validator/constant module
        var EXAMPLE_PHRASE_MODELLED_ON_SAMPLE_UTTERANCES_TEST_PLAN_ID = "1.6.SL7";
        var EXAMPLE_PHRASE_MODELLED_ON_SAMPLE_UTTERANCES_TEST_NAME = "validateExamplePhraseModelledOnUtterances";
        var EXAMPLE_PHRASE_MODELLED_ON_SAMPLE_UTTERANCES_SHORT_DESC = "Example phrases must be exactly modelled on Sample utterances";
        var TEST_TYPE_FUNCTIONAL = "functional";
        var TEST_TYPE_SEVERITY = "WARNING";

        // build common MetaInfo object for TestResult
        var examplePhraseModelledOnUtterancesMetaInfo =  new TestMetaInfo(EXAMPLE_PHRASE_MODELLED_ON_SAMPLE_UTTERANCES_TEST_PLAN_ID,
                EXAMPLE_PHRASE_MODELLED_ON_SAMPLE_UTTERANCES_TEST_NAME,
                EXAMPLE_PHRASE_MODELLED_ON_SAMPLE_UTTERANCES_SHORT_DESC,
                TEST_TYPE_FUNCTIONAL,
                TEST_TYPE_SEVERITY);

        var testResult = Status.PASS; //default test result
        
        var filteredUtterances = sampleUtterances.filter( function(n) { return n; }); //filter out empty utterances
        examplePhrase = trimQuotes( examplePhrase); //remove the quotes
        var example = extractUtteranceFromExample( invocationName, examplePhrase);
        if ( !example) {
            console.log("Launch phrase found: " + examplePhrase);  
        } else {
            //cleanup example phrase
            example = example
                            .replace( PUNCTUATION_REGEXP, ' ') //replace punctuations ans ws with single ws 
                            .replace( APOSTROPHE_REGEXP, '') //remove apostrope 
                            .trim(); //replace multiple ws with single ws 
        
            var matchedUtterance = findMatchingUtterance( example, filteredUtterances, intentSchema, slots);
            if (!matchedUtterance) {
                //check for usage of amazon defined intents
                var amazonUtterances = fetchUtterancesForAmazonIntentsUsed( intentSchema);
                if ( amazonUtterances) {
                    var utteranace = amazonUtterances.find( function( utterance, index, array) { 
                        var utteranceRegex = new RegExp( '^' + CONNECTING_WORDS_REGEX + '?\\s?' + utterance + '$', 'i');
                        return example.match( utteranceRegex) != null; 
                    }); //am using regex to take care of case mismatch                
                    if ( !utteranace) {
                        testResult = Status.FAIL;
                    }
                } else {
                  testResult = Status.FAIL;
                }
            }   
        }
        // Empty example is a valid scenario because Developer may choose to provide 
        // example like "Alexa open ticker" and it is considered as valid scenarios 
  
        // TODO: Remove this code --only for debugging
        var output = "Example: [" + examplePhrase + "] -> [" + example + "] -> [" + testResult +"]";
        console.log("[info]: " + output);

        return new TestResult(examplePhraseModelledOnUtterancesMetaInfo, testResult);
    };
    
    return {
        validateWakeWordWithInvocationName : validateWakeWordWithInvocationName,
        validateEmoticonsAndSymbols : validateEmoticonsAndSymbols,
        validateInvocationName : validateInvocationName,
        validateExamplePhraseWithInteractionModel: validateExamplePhraseWithInteractionModel,
        init : init
    };
});

/**
 * This Class definition make use of requireJS to provide a clean and simple way to split JavaScript class definitions
 * into separate files and avoid global namespace pollution.  http://requirejs.org/
 * 
 * Encapsulates the TestResult objects.
 */
define('validators/TestResultSummary',[],function () {
	// Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
	

	/**
	 * Naming constructor with capital letter to differentiate with regular functions
	 */
	function TestResultSummary() {
		// This first guard ensures that the callee has invoked our Class' constructor function
		// with the `new` keyword - failure to do this will result in the `this` keyword referring 
		// to the callee's scope (typically the window global) which will result in the following fields
		// (testplanId, msg, name, type, severity) leaking into the global namespace and not being set on this object.
		if (!(this instanceof TestResultSummary)) {
			throw new TypeError("TestResultSummary constructor cannot be called as a function.");
		}

		//Array to contain all test results 
		this.testResults = [];
	}

	/**
	 * All methods added to a Class' prototype are public (visible); they are able to 
	 * access the properties and methods of the TestResultSummary class via the `this` keyword.
	 */
	TestResultSummary.prototype = {
			/**
			 * Whenever you replace an Object's Prototype, you need to repoint
			 * the base Constructor back at the original constructor Function, 
			 * otherwise `instanceof` calls will fail.
			 */
			constructor: TestResultSummary,

			/**
			 * function to filter the test results by severity e.g. WARNING, ERROR.
			 * if severity is undefined, it returns all
			 */
			getTestResult: function (severity) {
				if (!severity || this.testResults.length == 0) {
					return this.testResults;
				}
				return this.testResults.filter( function(x) { return x.getTestMetaInfo().getSeverity() === severity; });
			},

			/**
			 * function to add a TestResult to TestResultSummary
			 * returns if testResult is undefined or of some other type
			 */
			addTestResult: function (testResult) {
				if (!testResult) {
					return;
				}
				return this.testResults.push(testResult);
			},

			toString: function() {
				return "[testResultSummary:" + this.testResults.toString() + "]";
			}
	};

	//As mentioned up top, requireJS needs us to return a value - in this files case, we will return
	//a reference to the constructor function.
	return TestResultSummary;
});
/**
 * This Class definition make use of requireJS to provide a clean and simple way to split JavaScript class definitions
 * into separate files and avoid global namespace pollution.  http://requirejs.org/
 */

/**
 * Class to encapsulate the common parameters shared across the validations.
 */
define('validators/CommonTestParams',[],function () {
    // Forces the JavaScript engine into strict mode: http://tinyurl.com/2dondlh
    

    /**
     * Naming constructor with capital letter to differentiate with regular functions
     */
    function CommonTestParams(locale, metricsCallback) {
        // This first guard ensures that the callee has invoked our Class' constructor function
        // with the `new` keyword - failure to do this will result in the `this` keyword referring 
        // to the callee's scope (typically the window global) which will result in the following fields
        // (testplanId, msg, name, type, severity) leaking into the global namespace and not being set on this object.
        if (!(this instanceof CommonTestParams)) {
            throw new TypeError("CommonTestParams constructor cannot be called as a function.");
        }
        this.locale = locale;
        if (metricsCallback) {
            this.metricsCallback = metricsCallback;
        }
    }
    
    /**
     * All methods added to a Class' prototype are public (visible); they are able to 
     * access the properties and methods of the CommonTestParams class via the `this` keyword.
     */
    CommonTestParams.prototype = {
            /**
             * Whenever you replace an Object's Prototype, you need to repoint
             * the base Constructor back at the original constructor Function, 
             * otherwise `instanceof` calls will fail.
             */
            constructor: CommonTestParams,

            getLocale : function () {
                return this.locale;
            },

            getMetricsCallback: function () {
                return this.metricsCallback;
            },

            toString: function() {
                return "[locale:" + this.locale + "]";
            }
    };

    // As mentioned up top, requireJS needs us to return a value - in this files case, we will return
    // a reference to the constructor function.
    return CommonTestParams;
});

/**
 * This Class definition make use of requireJS to provide a clean and simple way to split JavaScript class definitions
 * into separate files and avoid global namespace pollution.  http://requirejs.org/
 */

/**
 * Entry class for the client to call validation on invocation name and example phrase
 */
define('alexaInlineValidator',["validators/invocationNameValidator", "validators/examplePhraseValidator", "validators/TestResultSummary", "validators/CommonTestParams"],
        function(invocationNameValidator, examplePhraseValidator, TestResultSummary, CommonTestParams) {

    var commonParams = new CommonTestParams("en");

    var init = function(locale, metricsCallback) {
        if (locale && metricsCallback) {
            commonParams = new CommonTestParams(locale, metricsCallback);
            return;
        } else if (locale) {
            commonParams = new CommonTestParams(locale);
        } else if (metricsCallback) {
            commonParams = new CommonTestParams("en", metricsCallback);
        }
    };

    /**
     * Common function to get the list of tests for invocation name and example phrase
     */
    var getTestInfo = function(func, index) {
        return func(index);
    };

    /**
     * entry function to validate invocation name
     * @param invocationName
     * @param locale
     * @returns array of TestResult, if invocationName is blank the status of TestResult is undefined
     */
    var validateInvocationName = function (invocationName) {

        var locale  = commonParams.getLocale();
        invocationNameValidator.init(locale);
        if (invocationName) {
            invocationName = invocationName.replace(/\s+/gi, " ").trim();
        }
        var wordCountValidationResult = invocationNameValidator.validateWordCount(invocationName);
        var charsValidationResult = invocationNameValidator.validateAlphabetsAndSpaces(invocationName);
        var reservedWordValidationResult = invocationNameValidator.validateReservedWords(invocationName);
        var lengthValidationResult = invocationNameValidator.validateLength(invocationName);

        var resultSummary = new TestResultSummary();
        resultSummary.addTestResult(charsValidationResult);
        resultSummary.addTestResult(reservedWordValidationResult);
        resultSummary.addTestResult(lengthValidationResult);
        resultSummary.addTestResult(wordCountValidationResult);

        return resultSummary;
    };

    /**
     * Entry function to validate example phrase
     * @param examplePhrase
     * @param invocationName
     * @param index : index for the text box
     * @param locale
     */
    var validateExamplePhrase = function (index, examplePhrase, invocationName, interactionModel) {
        var resultSummary = new TestResultSummary();
        var locale = commonParams.getLocale();
        examplePhraseValidator.init(locale);

        var validateInvocationNameResult;
        if (index == 0 /*&& !examplePhrase*/) {
            resultSummary.addTestResult(examplePhraseValidator.validateWakeWordWithInvocationName(examplePhrase, invocationName));
            validateInvocationNameResult = examplePhraseValidator.validateInvocationName(examplePhrase, invocationName);
        }
        resultSummary.addTestResult(examplePhraseValidator.validateEmoticonsAndSymbols(examplePhrase));
        if (validateInvocationNameResult) {
            resultSummary.addTestResult(validateInvocationNameResult);
        }

        if ( interactionModel) {
            //invoke the slu test if interaction model is available
            resultSummary.addTestResult( examplePhraseValidator.validateExamplePhraseWithInteractionModel( examplePhrase, invocationName, 
                                interactionModel.intentSchema, interactionModel.sampleUtterances, interactionModel.slots));
        }
        return resultSummary;
    };

    return {
        validateInvocationName : validateInvocationName,
        validateExamplePhrase : validateExamplePhrase,
        getTestInfo : getTestInfo,
        init : init
    };
});

require.config({
	paths : {
		validators : "./validators"
	}
});

define('alexaInlineConfig',['alexaInlineValidator'], function(alexaInlineValidator) {
	return alexaInlineValidator;
});
