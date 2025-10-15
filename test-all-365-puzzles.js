#!/usr/bin/env node

/**
 * Comprehensive Puzzle Validation Test Suite
 *
 * Tests all 365 puzzles in the database by extracting them from index.html
 *
 * Validates:
 * 1. All required fields are present
 * 2. Letter positions are valid (not out of bounds)
 * 3. Collected letters form a valid anagram of the final word
 * 4. Sentences contain the placeholder ___
 * 5. Final word is exactly 5 letters
 */

const fs = require('fs');

// Extract puzzle database from index.html
function extractPuzzleDatabase() {
    const htmlContent = fs.readFileSync('index.html', 'utf8');

    // Find the puzzleDatabase array
    const startMarker = 'let puzzleDatabase = [';
    const startIndex = htmlContent.indexOf(startMarker);

    if (startIndex === -1) {
        console.error('❌ Could not find puzzleDatabase in index.html');
        process.exit(1);
    }

    // Find the closing bracket
    let bracketCount = 0;
    let foundStart = false;
    let endIndex = startIndex + startMarker.length;

    for (let i = startIndex + startMarker.length; i < htmlContent.length; i++) {
        const char = htmlContent[i];
        if (char === '[') {
            bracketCount++;
            foundStart = true;
        } else if (char === ']') {
            bracketCount--;
            if (foundStart && bracketCount === -1) {
                endIndex = i;
                break;
            }
        }
    }

    // Extract the array content
    const arrayContent = htmlContent.substring(startIndex + startMarker.length - 1, endIndex + 1);

    // Use eval to parse the JavaScript array (safe in this context as we control the source)
    try {
        const puzzleDatabase = eval('(' + arrayContent + ')');
        return puzzleDatabase;
    } catch (error) {
        console.error('❌ Failed to parse puzzle database:', error.message);
        process.exit(1);
    }
}

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

    let puzzlePassed = true;
    const puzzleErrors = [];

    // Test 1: Check all required fields
    totalTests++;
    if (!puzzle.name || !puzzle.theme || !puzzle.sentences || !puzzle.words || !puzzle.positions || !puzzle.finalWord) {
        puzzleErrors.push('❌ Missing required fields');
        puzzlePassed = false;
        failedTests++;
    } else {
        passedTests++;
    }

    // Test 2: Check array lengths
    totalTests++;
    if (puzzle.sentences.length !== 5 || puzzle.words.length !== 5 || puzzle.positions.length !== 5) {
        puzzleErrors.push(`❌ Invalid array lengths (sentences: ${puzzle.sentences.length}, words: ${puzzle.words.length}, positions: ${puzzle.positions.length})`);
        puzzlePassed = false;
        failedTests++;
    } else {
        passedTests++;
    }

    // Test 3: Check final word length
    totalTests++;
    if (puzzle.finalWord.length !== 5) {
        puzzleErrors.push(`❌ Final word "${puzzle.finalWord}" is not 5 letters (${puzzle.finalWord.length})`);
        puzzlePassed = false;
        failedTests++;
    } else {
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
        passedTests++;
    }

    // Only log details for failed puzzles
    if (!puzzlePassed) {
        log(`\n❌ ${puzzleName} (Puzzle #${index + 1}):`, 'red');
        puzzleErrors.forEach(error => log(`   ${error}`, 'red'));
        errors.push({ puzzle: puzzleName, index: index + 1, errors: puzzleErrors });
    } else {
        // Show progress every 50 puzzles
        if ((index + 1) % 50 === 0) {
            log(`✓ Validated ${index + 1} puzzles...`, 'green');
        }
    }

    return puzzlePassed;
}

// Main test runner
function runTests() {
    log('='.repeat(80), 'blue');
    log('COMPREHENSIVE PUZZLE VALIDATION TEST SUITE - ALL 365 PUZZLES', 'blue');
    log('='.repeat(80), 'blue');

    // Extract puzzles from index.html
    log('\n📖 Extracting puzzle database from index.html...', 'cyan');
    const puzzleDatabase = extractPuzzleDatabase();

    log(`✓ Found ${puzzleDatabase.length} puzzles in database\n`, 'green');

    if (puzzleDatabase.length !== 365) {
        log(`⚠️  WARNING: Expected 365 puzzles, but found ${puzzleDatabase.length}`, 'yellow');
    }

    log('🧪 Running validation tests...\n', 'cyan');

    puzzleDatabase.forEach((puzzle, index) => {
        validatePuzzle(puzzle, index);
    });

    // Final summary
    log('\n' + '='.repeat(80), 'blue');
    log('TEST SUMMARY', 'blue');
    log('='.repeat(80), 'blue');
    log(`\nTotal Puzzles Tested: ${puzzleDatabase.length}`, 'yellow');
    log(`Total Tests Run: ${totalTests}`, 'yellow');
    log(`Passed: ${passedTests}`, 'green');
    log(`Failed: ${failedTests}`, failedTests > 0 ? 'red' : 'green');
    log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 'cyan');

    if (errors.length > 0) {
        log(`\nPuzzles with Errors: ${errors.length}`, 'red');
        log('\n' + '='.repeat(80), 'red');
        log('FAILED PUZZLES DETAILS', 'red');
        log('='.repeat(80), 'red');
        errors.forEach(({ puzzle, index, errors: puzzleErrors }) => {
            log(`\nPuzzle #${index}: ${puzzle}`, 'yellow');
            puzzleErrors.forEach(error => log(`  ${error}`, 'red'));
        });
        log('\n' + '='.repeat(80), 'red');
    } else {
        log('\n' + '🎉'.repeat(40), 'green');
        log('ALL 365 PUZZLES PASSED VALIDATION!', 'green');
        log('🎉'.repeat(40) + '\n', 'green');
    }

    // Exit with appropriate code
    process.exit(errors.length > 0 ? 1 : 0);
}

// Run the tests
runTests();
