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
            "I can hear the ___ bubbling",
            "Fresh ___ smells amazing",
            "Sweet ___ tastes delicious",
            "Warm ___ feels comforting to touch"
        ],
        words: ["toast", "kettle", "bread", "honey", "mug"],
        positions: [0, 1, 1, 0, 0], // T, E, R, H, M
        finalWord: "THERM"
    },
    {
        name: "Winter Wonder",
        theme: "winter",
        sentences: [
            "White ___ can be seen falling",
            "I can hear the ___ howling",
            "Cold ___ smells crisp",
            "Frozen ___ tastes icy",
            "Rough ___ feels bumpy to touch"
        ],
        words: ["flakes", "wind", "air", "sleet", "ice"],
        positions: [1, 2, 0, 0, 0], // L, N, A, S, I
        finalWord: "SNAIL"
    },
    {
        name: "City Streets",
        theme: "urban",
        sentences: [
            "Tall ___ can be seen everywhere",
            "I can hear ___ honking",
            "Street ___ smell greasy",
            "Quick ___ taste spicy",
            "Cold ___ feels smooth to touch"
        ],
        words: ["towers", "horns", "foods", "tacos", "steel"],
        positions: [5, 0, 1, 3, 1], // S, H, O, O, T
        finalWord: "SHOOT"
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
            "Rocky ___ can be seen rising",
            "I can hear distant ___ echoing",
            "Thin ___ smells pure",
            "Melted ___ tastes mineral",
            "Jagged ___ feel sharp to touch"
        ],
        words: ["peaks", "birds", "air", "snow", "rocks"],
        positions: [3, 2, 0, 1, 4], // K, R, A, N, S
        finalWord: "RANKS"
    },
    {
        name: "Desert Heat",
        theme: "desert",
        sentences: [
            "Golden ___ can be seen stretching",
            "I can hear the ___ rustling",
            "Hot ___ smells dusty",
            "Dry ___ tastes gritty",
            "Prickly ___ feel rough to touch"
        ],
        words: ["dunes", "wind", "air", "sand", "cacti"],
        positions: [3, 2, 1, 0, 1], // E, N, I, S, A
        finalWord: "ANISE"
    },

    // HARDER PUZZLES
    {
        name: "Ancient Ruins",
        theme: "archaeology",
        sentences: [
            "Weathered ___ can be seen crumbling",
            "I can hear the ___ whistling through",
            "Musty ___ smell of age",
            "Bitter ___ taste on my lips",
            "Worn ___ feel ancient to touch"
        ],
        words: ["stones", "breeze", "tombs", "dust", "relics"],
        positions: [1, 1, 1, 1, 1], // T, R, O, U, E
        finalWord: "OUTER"
    },
    {
        name: "Artisan Workshop",
        theme: "crafts",
        sentences: [
            "Spinning ___ can be seen turning",
            "I can hear the ___ clanging",
            "Fresh ___ smells earthy",
            "Bitter ___ tastes metallic",
            "Rough ___ feels coarse to touch"
        ],
        words: ["wheel", "anvil", "clay", "iron", "twine"],
        positions: [3, 3, 1, 3, 0], // E, I, L, N, T
        finalWord: "INLET"
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
            "Large ___ can be seen docked",
            "I can hear ___ calling",
            "Salty ___ smells fishy",
            "Briny ___ tastes of ocean",
            "Coarse ___ feels rough to touch"
        ],
        words: ["boats", "gulls", "water", "spray", "ropes"],
        positions: [2, 0, 2, 0, 1], // A, G, T, S, O
        finalWord: "GOATS"
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
            "Priceless ___ can be seen displayed",
            "I can hear ___ echoing",
            "Polished ___ smells clean",
            "Stale ___ tastes recycled",
            "Cold ___ feels hard to touch"
        ],
        words: ["relics", "steps", "marble", "air", "glass"],
        positions: [0, 3, 1, 1, 4], // R, P, A, I, S
        finalWord: "PAIRS"
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
