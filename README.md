# The Sixth Sense - Word Puzzle Game 🧩

An interactive word puzzle game where players guess missing words from sentences, collect letters to form an anagram, and solve the final 5-letter word. Features community puzzle submissions, dark mode, and a trophy system!

**Live Demo:** https://datavisuals.github.io/sixth-sense-puzzle/

![The Sixth Sense Game](https://img.shields.io/badge/Status-Live-brightgreen) ![Firebase](https://img.shields.io/badge/Firebase-Enabled-orange) ![License](https://img.shields.io/badge/License-MIT-blue)

## 🎮 How to Play

1. **Choose a puzzle** - Play the daily puzzle or select from 20+ built-in and community puzzles
2. **Guess missing words** - Each sentence has one missing word related to one of the five senses
3. **Collect letters** - One letter from each correct word forms an anagram
4. **Solve the final word** - Rearrange the 5 collected letters to guess the final word
5. **Earn trophies** - Gold (0 clues), Silver (1 clue), or Bronze (2+ clues)

## ✨ Features

### 🎯 Game Mechanics
- **20 Built-in Puzzles** organized by difficulty (Easy, Medium, Hard)
- **Daily Puzzle Rotation** - Same puzzle for all players each day
- **Clue System** - Get hints for missing words (affects trophy tier)
- **Timer** - Track your completion time
- **Trophy System** - Earn gold, silver, or bronze based on clue usage

### 👥 Community Features
- **Submit Puzzles** - Create and share your own puzzles with everyone
- **Community Database** - Powered by Firebase Firestore
- **Approval System** - Manual moderation ensures quality puzzles
- **Play Tracking** - See which community puzzles are most popular

### 🎨 User Experience
- **Dark Mode** - Toggle between light and dark themes
- **Mobile Responsive** - Optimized for phones, tablets, and desktop
- **User Statistics** - Track trophies earned, streak, and fastest time
- **Font Awesome Icons** - Professional, consistent iconography
- **Bootstrap UI** - Modern, polished interface

### 📊 Player Stats (Persistent via Cookies)
- 🏆 **Trophy Count** - Gold, Silver, Bronze trophies earned
- 🔥 **Day Streak** - Consecutive days played
- ⚡ **Best Time** - Fastest puzzle completion

## 🚀 Technology Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Bootstrap 5.3.2, Custom CSS Variables
- **Icons:** Font Awesome 6.5.1
- **Database:** Firebase Firestore (community puzzles)
- **Authentication:** Firebase Anonymous Auth
- **Hosting:** GitHub Pages (Static)
- **Storage:** Cookies (user stats), LocalStorage (puzzle data)

## 🔧 Setup & Installation

### Play the Game (No Setup Required)
Just visit: https://datavisuals.github.io/sixth-sense-puzzle/

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/DataVisuals/sixth-sense-puzzle.git
   cd sixth-sense-puzzle
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html  # macOS
   # or
   start index.html  # Windows
   ```

That's it! The game works entirely client-side.

### Enable Firebase Community Features (Optional)

To enable community puzzle submissions, you'll need to set up Firebase:

1. Follow the detailed guide in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
2. Create a Firebase project (free tier)
3. Enable Firestore Database and Anonymous Authentication
4. Configure security rules
5. Replace the Firebase config in `index.html`

**Note:** The game works perfectly without Firebase - it just won't have community puzzle submissions.

## 📝 Creating Puzzles

### As a Player
1. Click **"Create Puzzle"**
2. Enter a puzzle name and theme
3. Write 5 sentences with `___` as placeholders
4. Specify the missing word for each sentence
5. Choose which letter position contributes to the final word
6. Enter the final 5-letter word (must be an anagram of collected letters)
7. (Optional) Check "Submit to Community Database" to share with everyone

### Puzzle Requirements
- ✅ Exactly 5 sentences
- ✅ Each sentence relates to one of the five senses (see, hear, smell, taste, touch)
- ✅ Each missing word contributes one letter
- ✅ The 5 collected letters form a valid 5-letter English word

### Example Puzzle
**Name:** Beach Day
**Final Word:** SHORE

1. "The warm **sand** feels soft to touch" → **S**
2. "Colorful **shells** can be seen scattered" → s**H**ells
3. "The sparkling **ocean** can be seen" → **O**cean
4. "The salty **breeze** can be smelled" → b**R**eeze
5. "I can hear **waves** crashing" → wav**E**s

Letters: S, H, O, R, E → **SHORE** ✓

## 🏗️ Project Structure

```
sixth-sense-puzzle/
├── index.html              # Main game file (all-in-one)
├── README.md              # This file
├── FIREBASE_SETUP.md      # Firebase configuration guide
└── .git/                  # Git repository
```

## 🔒 Security

### Firebase Security
- **Public API Keys:** Firebase web API keys are designed to be public
- **Security Rules:** All access control enforced server-side via Firestore Rules
- **Anonymous Auth:** Rate limiting and spam prevention
- **Validation:** Server-side puzzle format validation
- **Manual Approval:** Puzzles start as "pending" and require approval

### Data Privacy
- **No Personal Data:** Anonymous authentication only
- **Cookies:** Used for theme preference and user stats (local only)
- **LocalStorage:** Temporary puzzle data (never sent to server)

## 📈 Firebase Free Tier Limits

The free tier is very generous for this use case:
- **Storage:** 1 GB (~2 million puzzles)
- **Reads:** 50,000/day (~50,000 players/day)
- **Writes:** 20,000/day (~20,000 submissions/day)

You'll only pay if you exceed these limits, and costs are minimal ($1-5/month for moderate overages).

## 🎯 Future Enhancements

Potential features to add:
- [ ] Admin panel for bulk puzzle approval
- [ ] Upvote/downvote system for community puzzles
- [ ] Difficulty ratings from player feedback
- [ ] Leaderboards (fastest times, most puzzles solved)
- [ ] Puzzle categories/tags for filtering
- [ ] Social sharing (share your completion time)
- [ ] Multiplayer mode (race against friends)
- [ ] Puzzle editor with live preview

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Submit Puzzles
Use the in-game "Create Puzzle" feature and check "Submit to Community Database"

### Report Bugs
Open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and device info

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see below for details.

```
MIT License

Copyright (c) 2025 The Sixth Sense Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Built with ❤️ using Claude Code
- Icons by [Font Awesome](https://fontawesome.com/)
- Styled with [Bootstrap](https://getbootstrap.com/)
- Powered by [Firebase](https://firebase.google.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/DataVisuals/sixth-sense-puzzle/issues)
- **Documentation:** See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for Firebase setup

## 🌟 Star History

If you enjoy this game, please consider giving it a star on GitHub! ⭐

---

**Play Now:** https://datavisuals.github.io/sixth-sense-puzzle/

Made with 🧩 by the community
