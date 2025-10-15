const fs = require('fs');
const puzzles = JSON.parse(fs.readFileSync('all-344-new-puzzles.json', 'utf8'));

console.log('=== Final Validation of All 344 New Puzzles ===\n');

let passed = 0;
let failed = 0;

puzzles.forEach((p, index) => {
    let valid = true;

    if (!p.name || !p.theme || !p.sentences || !p.words || !p.positions || !p.finalWord) {
        valid = false;
    }
    if (p.sentences && p.sentences.length !== 5) valid = false;
    if (p.words && p.words.length !== 5) valid = false;
    if (p.positions && p.positions.length !== 5) valid = false;
    if (p.finalWord && p.finalWord.length !== 5) valid = false;

    if (valid && p.words && p.positions && p.finalWord) {
        const collected = p.words.map((w, i) => w[p.positions[i]].toUpperCase()).join('');
        const sorted1 = collected.split('').sort().join('');
        const sorted2 = p.finalWord.toUpperCase().split('').sort().join('');
        if (sorted1 !== sorted2) {
            console.log(`❌ Puzzle ${index + 1} (${p.name}): ${collected} vs ${p.finalWord}`);
            valid = false;
        }
    }

    if (valid) {
        passed++;
    } else {
        failed++;
    }
});

console.log(`\nTotal Puzzles: ${puzzles.length}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Success Rate: ${((passed / puzzles.length) * 100).toFixed(1)}%`);

if (passed === puzzles.length) {
    console.log('\n🎉 ALL 344 NEW PUZZLES ARE VALID! 🎉');
    console.log('\nReady to add to database!');
} else {
    console.log(`\n⚠️  ${failed} puzzles still need fixing`);
}
