#!/usr/bin/env node

/**
 * Puzzle Validation Test Suite
 *
 * This script validates all puzzles in the database to ensure:
 * 1. All required fields are present
 * 2. Letter positions are valid (not out of bounds)
 * 3. Collected letters form a valid anagram of the final word
 * 4. Sentences contain the placeholder ___
 * 5. Final word is exactly 5 letters
 */

// Puzzle Database (copied from index.html)
const puzzleDatabase = [
    // EASY PUZZLES
    {
        name: "Coastal Escape",
        theme: "beach",
        sentences: [
            "The warm ___ feels soft to touch",
            "Colorful ___ can be seen scattered along the beach",
            "The sparkling ___ can be seen in the distance",
            "The salty ___ can be smelled in the air",
            "I can hear ___ crashing on the rocks"
        ],
        words: ["sand", "shells", "ocean", "breeze", "waves"],
        positions: [0, 1, 0, 1, 3], // S, H, O, R, E
        finalWord: "SHORE"
    },
    {
        name: "Woodland Path",
        theme: "forest",
        sentences: [
            "Tall ___ can be seen towering above",
            "I can hear the ___ chirping",
            "The pine ___ smell fresh",
            "Fresh ___ tastes crisp",
            "I can touch the rough ___"
        ],
        words: ["trees", "birds", "cones", "air", "bark"],
        positions: [0, 2, 0, 0, 3], // T, R, C, A, K
        finalWord: "TRACK"
    },
    {
        name: "Morning Ritual",
        theme: "breakfast",
        sentences: [
            "Golden ___ can be seen on the plate",
            "Warm ___ smells nutty",
            "Sweet ___ tastes fruity",
            "Hot ___ sounds sizzling",
            "Creamy ___ feels smooth to touch"
        ],
        words: ["toast", "oatmeal", "jam", "syrup", "butter"],
        positions: [0, 0, 1, 0, 2], // T, O, A, S, T
        finalWord: "TOAST"
    },
    {
        name: "Winter Wonder",
        theme: "winter",
        sentences: [
            "Wet ___ can be seen falling",
            "The air is ___ and biting",
            "Everything looks ___ white",
            "Chilly ___ blows through",
            "Everything feels ___ to touch"
        ],
        words: ["sleet", "frozen", "cold", "wind", "icy"],
        positions: [0, 5, 1, 0, 2], // S, N, O, W, Y
        finalWord: "SNOWY"
    },
    {
        name: "City Streets",
        theme: "urban",
        sentences: [
            "The busy ___ can be seen everywhere",
            "Crowded ___ echo with noise",
            "Bright ___ illuminate the night",
            "Heavy ___ moves slowly",
            "Paved ___ feel hard underfoot"
        ],
        words: ["mall", "stores", "lights", "traffic", "roads"],
        positions: [0, 4, 4, 1, 1], // M, E, T, R, O
        finalWord: "METRO"
    },

    // MEDIUM PUZZLES
    {
        name: "Drops from Above",
        theme: "rain",
        sentences: [
            "Dark ___ can be seen gathering",
            "I can hear the ___ falling",
            "Wet ___ smells fresh",
            "Cool ___ tastes clean",
            "I can touch the damp ___"
        ],
        words: ["clouds", "rain", "earth", "water", "grass"],
        positions: [0, 0, 0, 1, 3], // C, R, E, A, S
        finalWord: "CARES"
    },
    {
        name: "Evening Embers",
        theme: "camping",
        sentences: [
            "Glowing ___ can be seen dancing",
            "Wood ___ loudly and I can hear it",
            "I can smell the ___ in the air",
            "Roasted ___ taste sweet",
            "I can touch the warm ___"
        ],
        words: ["embers", "crackles", "smoke", "nuts", "stones"],
        positions: [0, 5, 1, 2, 0], // E, L, M, T, S
        finalWord: "MELTS"
    },
    {
        name: "Blooming Grounds",
        theme: "garden",
        sentences: [
            "Colorful ___ can be seen blooming",
            "I can hear the ___ chirping",
            "The fresh ___ smells wonderful",
            "Ripe ___ taste delicious",
            "I can touch the moist ___"
        ],
        words: ["tulips", "robin", "earth", "plums", "soil"],
        positions: [0, 1, 0, 1, 0], // T, O, E, L, S
        finalWord: "STOLE"
    },
    {
        name: "Market Day",
        theme: "market",
        sentences: [
            "Fresh ___ can be seen displayed",
            "I can hear ___ calling out",
            "Ripe ___ smell sweet",
            "Juicy ___ taste tangy",
            "Smooth ___ feel waxy to touch"
        ],
        words: ["apples", "vendors", "berries", "lemon", "pears"],
        positions: [0, 0, 1, 0, 1], // A, V, E, L, E
        finalWord: "LEAVE"
    },
    {
        name: "Alpine Heights",
        theme: "mountain",
        sentences: [
            "High ___ can be seen rising",
            "Tall ___ sway in the wind",
            "Narrow ___ winds upward",
            "Jagged ___ jut out sharply",
            "White ___ covers everything"
        ],
        words: ["peaks", "trees", "trail", "rocks", "snow"],
        positions: [0, 2, 2, 3, 0], // P, E, A, K, S
        finalWord: "PEAKS"
    },
    {
        name: "Desert Heat",
        theme: "desert",
        sentences: [
            "Hot ___ covers everything",
            "Tall ___ provide rare shade",
            "Rolling ___ stretch endlessly",
            "The climate is very ___",
            "Everything feels ___ to touch"
        ],
        words: ["sand", "cacti", "dunes", "arid", "dry"],
        positions: [0, 1, 2, 3, 2], // S, A, N, D, Y
        finalWord: "SANDY"
    },

    // HARDER PUZZLES
    {
        name: "Ancient Ruins",
        theme: "archaeology",
        sentences: [
            "Ancient ___ can be seen crumbling",
            "Clay ___ hold old ashes",
            "The ___ site is being excavated",
            "Many ___ structures remain",
            "Excavation ___ are marked everywhere"
        ],
        words: ["ruins", "urns", "dig", "ancient", "sites"],
        positions: [0, 0, 1, 1, 4], // R, U, I, N, S
        finalWord: "RUINS"
    },
    {
        name: "Artisan Workshop",
        theme: "crafts",
        sentences: [
            "Wet ___ can be molded easily",
            "The artisan will ___ the wood",
            "Beautiful ___ is being created",
            "A sharp ___ cuts precisely",
            "The wooden ___ pounds rhythmically"
        ],
        words: ["clay", "carve", "art", "knife", "mallet"],
        positions: [0, 2, 0, 3, 5], // C, R, A, F, T
        finalWord: "CRAFT"
    },
    {
        name: "Observatory Night",
        theme: "astronomy",
        sentences: [
            "Bright ___ can be seen twinkling",
            "I can hear distant ___ orbiting",
            "Cold ___ smells sterile",
            "The ___ tastes like infinity",
            "The powerful ___ feels smooth to touch"
        ],
        words: ["stars", "planets", "air", "cosmos", "telescope"],
        positions: [0, 0, 0, 0, 1], // S, P, A, C, E
        finalWord: "SPACE"
    },
    {
        name: "Storm Brewing",
        theme: "weather",
        sentences: [
            "Dark ___ can be seen rolling",
            "I can hear ___ rumbling",
            "Charged ___ smells electric",
            "Heavy ___ tastes fresh",
            "Swirling ___ feels damp to touch"
        ],
        words: ["skies", "thunder", "ozone", "rain", "mist"],
        positions: [0, 0, 0, 0, 0], // S, T, O, R, M
        finalWord: "STORM"
    },
    {
        name: "Bakery Morning",
        theme: "bakery",
        sentences: [
            "Fresh ___ can be seen cooling",
            "I can hear the ___ sizzling",
            "Warm ___ smells heavenly",
            "The rich ___ tastes buttery",
            "Soft ___ feels pillowy to touch"
        ],
        words: ["buns", "rolls", "bread", "aroma", "dough"],
        positions: [0, 0, 2, 0, 0], // B, R, E, A, D
        finalWord: "BREAD"
    },
    {
        name: "Harbor View",
        theme: "port",
        sentences: [
            "Ocean ___ crash against the pier",
            "Large ___ are docked nearby",
            "Fishing ___ rest on the deck",
            "The busy ___ bustles with activity",
            "The old ___ extends into the water"
        ],
        words: ["waves", "ships", "boats", "harbor", "wharf"],
        positions: [0, 1, 2, 2, 4], // W, H, A, R, F
        finalWord: "WHARF"
    },
    {
        name: "Autumn Harvest",
        theme: "fall",
        sentences: [
            "Golden ___ can be seen falling",
            "I can hear ___ crunching",
            "Smoky ___ smells earthy",
            "Sweet ___ taste rich",
            "Cool ___ feels crisp to touch"
        ],
        words: ["leaves", "acorns", "piles", "cider", "wind"],
        positions: [0, 0, 3, 0, 3], // L, A, E, C, D
        finalWord: "LACED"
    },
    {
        name: "Museum Halls",
        theme: "museum",
        sentences: [
            "Historical ___ are displayed",
            "A marble ___ stands in the center",
            "This ancient ___ is priceless",
            "The ornate ___ surrounds the painting",
            "The protective ___ keeps items safe"
        ],
        words: ["items", "statue", "relic", "frame", "glass"],
        positions: [0, 1, 1, 3, 4], // I, T, E, M, S
        finalWord: "ITEMS"
    },
    {
        name: "Spice Market",
        theme: "bazaar",
        sentences: [
            "Colorful ___ can be seen piled high",
            "I can hear ___ bargaining",
            "Exotic ___ smell pungent",
            "Spicy ___ taste bold",
            "Rough ___ feels coarse to touch"
        ],
        words: ["spices", "traders", "curry", "chili", "sacks"],
        positions: [0, 0, 2, 0, 1], // S, T, R, C, A
        finalWord: "CARTS"
    },
    {
        name: "Midnight Owl",
        theme: "nocturnal",
        sentences: [
            "The dark ___ can be seen everywhere",
            "I can hear ___ buzzing",
            "The ___ moon can be seen shining",
            "Soft ___ can be heard echoing",
            "Rough ___ feel ancient to touch"
        ],
        words: ["night", "insects", "glowing", "hoots", "trees"],
        positions: [0, 0, 0, 0, 0], // N, I, G, H, T
        finalWord: "NIGHT"
    }
];

// Test Results
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const errors = [];

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function validatePuzzle(puzzle, index) {
    const puzzleName = puzzle.name || `Puzzle ${index + 1}`;
    log(`\nTesting: ${puzzleName}`, 'cyan');

    let puzzlePassed = true;
    const puzzleErrors = [];

    // Test 1: Check all required fields
    totalTests++;
    if (!puzzle.name || !puzzle.theme || !puzzle.sentences || !puzzle.words || !puzzle.positions || !puzzle.finalWord) {
        puzzleErrors.push('❌ Missing required fields');
        puzzlePassed = false;
        failedTests++;
    } else {
        log('  ✓ All required fields present', 'green');
        passedTests++;
    }

    // Test 2: Check array lengths
    totalTests++;
    if (puzzle.sentences.length !== 5 || puzzle.words.length !== 5 || puzzle.positions.length !== 5) {
        puzzleErrors.push(`❌ Invalid array lengths (sentences: ${puzzle.sentences.length}, words: ${puzzle.words.length}, positions: ${puzzle.positions.length})`);
        puzzlePassed = false;
        failedTests++;
    } else {
        log('  ✓ All arrays have 5 elements', 'green');
        passedTests++;
    }

    // Test 3: Check final word length
    totalTests++;
    if (puzzle.finalWord.length !== 5) {
        puzzleErrors.push(`❌ Final word "${puzzle.finalWord}" is not 5 letters (${puzzle.finalWord.length})`);
        puzzlePassed = false;
        failedTests++;
    } else {
        log('  ✓ Final word is 5 letters', 'green');
        passedTests++;
    }

    // Test 4: Check each sentence contains ___
    totalTests++;
    let sentenceCheck = true;
    puzzle.sentences.forEach((sentence, i) => {
        if (!sentence.includes('___')) {
            puzzleErrors.push(`❌ Sentence ${i + 1} missing placeholder: "${sentence}"`);
            sentenceCheck = false;
        }
    });
    if (!sentenceCheck) {
        puzzlePassed = false;
        failedTests++;
    } else {
        log('  ✓ All sentences contain ___', 'green');
        passedTests++;
    }

    // Test 5: Check letter positions are valid
    totalTests++;
    let positionCheck = true;
    puzzle.words.forEach((word, i) => {
        const position = puzzle.positions[i];
        if (position < 0 || position >= word.length) {
            puzzleErrors.push(`❌ Word ${i + 1} "${word}": position ${position} is out of bounds (length: ${word.length})`);
            positionCheck = false;
        }
    });
    if (!positionCheck) {
        puzzlePassed = false;
        failedTests++;
    } else {
        log('  ✓ All letter positions are valid', 'green');
        passedTests++;
    }

    // Test 6: Check collected letters form the final word (anagram)
    totalTests++;
    const collectedLetters = puzzle.words.map((word, idx) =>
        word[puzzle.positions[idx]].toUpperCase()
    ).join('');

    const sortedCollected = collectedLetters.split('').sort().join('');
    const sortedFinal = puzzle.finalWord.toUpperCase().split('').sort().join('');

    if (sortedCollected !== sortedFinal) {
        puzzleErrors.push(`❌ Collected letters "${collectedLetters}" don't form anagram of "${puzzle.finalWord}"`);
        puzzleErrors.push(`   Sorted collected: ${sortedCollected}`);
        puzzleErrors.push(`   Sorted final:     ${sortedFinal}`);
        puzzlePassed = false;
        failedTests++;
    } else {
        log(`  ✓ Collected letters "${collectedLetters}" form "${puzzle.finalWord}"`, 'green');
        passedTests++;
    }

    // Summary for this puzzle
    if (puzzlePassed) {
        log(`\n✅ ${puzzleName}: PASSED`, 'green');
    } else {
        log(`\n❌ ${puzzleName}: FAILED`, 'red');
        puzzleErrors.forEach(error => log(`   ${error}`, 'red'));
        errors.push({ puzzle: puzzleName, errors: puzzleErrors });
    }

    return puzzlePassed;
}

// Main test runner
function runTests() {
    log('='.repeat(60), 'blue');
    log('PUZZLE VALIDATION TEST SUITE', 'blue');
    log('='.repeat(60), 'blue');
    log(`\nTesting ${puzzleDatabase.length} puzzles...\n`, 'yellow');

    puzzleDatabase.forEach((puzzle, index) => {
        validatePuzzle(puzzle, index);
    });

    // Final summary
    log('\n' + '='.repeat(60), 'blue');
    log('TEST SUMMARY', 'blue');
    log('='.repeat(60), 'blue');
    log(`\nTotal Tests: ${totalTests}`, 'yellow');
    log(`Passed: ${passedTests}`, 'green');
    log(`Failed: ${failedTests}`, 'red');
    log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%\n`, 'cyan');

    if (errors.length > 0) {
        log('='.repeat(60), 'red');
        log('FAILED PUZZLES', 'red');
        log('='.repeat(60), 'red');
        errors.forEach(({ puzzle, errors: puzzleErrors }) => {
            log(`\n${puzzle}:`, 'yellow');
            puzzleErrors.forEach(error => log(`  ${error}`, 'red'));
        });
    } else {
        log('🎉 All puzzles passed! 🎉', 'green');
    }

    // Exit with appropriate code
    process.exit(errors.length > 0 ? 1 : 0);
}

// Run the tests
runTests();
