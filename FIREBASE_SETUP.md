# Firebase Setup Guide for The Sixth Sense Puzzle Game

This guide will help you set up Firebase to enable community puzzle submissions.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "sixth-sense-puzzle")
4. Disable Google Analytics (optional, not needed for this project)
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Give it a nickname (e.g., "Sixth Sense Game")
3. **DO NOT** check "Set up Firebase Hosting" (we're using GitHub Pages)
4. Click **"Register app"**
5. You'll see your Firebase configuration object - **COPY THIS**

## Step 3: Add Firebase Config to Your Code

1. Open `index.html`
2. Find the Firebase configuration section (around line 1118)
3. Replace the placeholder values with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxx",  // Replace this
    authDomain: "your-project.firebaseapp.com",  // Replace this
    projectId: "your-project-id",  // Replace this
    storageBucket: "your-project.appspot.com",  // Replace this
    messagingSenderId: "123456789",  // Replace this
    appId: "1:123456789:web:xxxxxxxxxxxxx"  // Replace this
};
```

## Step 4: Enable Firestore Database

1. In Firebase Console, go to **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll add security rules next)
4. Choose a location (select the one closest to your users)
5. Click **"Enable"**

## Step 5: Set Up Security Rules

1. In Firestore Database, click on the **"Rules"** tab
2. Replace the default rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Puzzles collection
    match /puzzles/{puzzleId} {
      // Anyone can read approved puzzles
      allow read: if resource.data.status == 'approved';

      // Authenticated users can create puzzles (with validation)
      allow create: if request.auth != null
                    && request.resource.data.sentences.size() == 5
                    && request.resource.data.words.size() == 5
                    && request.resource.data.positions.size() == 5
                    && request.resource.data.finalWord.size() == 5
                    && request.resource.data.status == 'pending'
                    && request.resource.data.plays == 0;

      // Only allow incrementing plays field
      allow update: if request.auth != null
                    && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['plays'])
                    && request.resource.data.plays == resource.data.plays + 1;

      // No deletes allowed (except by admin in console)
      allow delete: if false;
    }
  }
}
```

3. Click **"Publish"**

## Step 6: Enable Anonymous Authentication

1. Go to **"Authentication"** in the left menu
2. Click **"Get started"**
3. Click on the **"Sign-in method"** tab
4. Click **"Anonymous"**
5. Toggle it to **"Enabled"**
6. Click **"Save"**

## Step 7: Test Your Setup

1. Commit and push your changes to GitHub:
   ```bash
   git add index.html
   git commit -m "Add Firebase configuration"
   git push
   ```

2. Wait a few minutes for GitHub Pages to update

3. Visit your game and try creating a puzzle with the "Submit to Community" checkbox checked

4. Check Firebase Console > Firestore Database to see your puzzle appear with status "pending"

## Step 8: Approve Puzzles (Manual Moderation)

To approve puzzles and make them visible:

1. Go to **Firestore Database** in Firebase Console
2. Click on the **"puzzles"** collection
3. Click on a puzzle document
4. Find the `status` field
5. Click the field value and change it from `"pending"` to `"approved"`
6. Click **"Update"**

The puzzle will now appear in everyone's puzzle selector and daily rotation!

## Security Notes

✅ **Safe to commit to GitHub:**
- Firebase API keys
- Project IDs
- All configuration values

🔒 **Security is enforced by:**
- Firestore Security Rules (server-side, cannot be bypassed)
- Anonymous authentication (rate limiting)
- Field validation in rules
- Manual approval process

## Troubleshooting

**Problem:** "Firebase is not configured" message appears
- **Solution:** Make sure you replaced ALL placeholder values in firebaseConfig

**Problem:** Can't submit puzzles
- **Solution:** Check that Anonymous Authentication is enabled

**Problem:** Puzzles not appearing
- **Solution:** Check that you approved them (changed status to "approved") in Firebase Console

**Problem:** Security rules errors
- **Solution:** Make sure you published the rules exactly as shown above

## Optional: Advanced Features

### Add Admin Panel (Future Enhancement)
You could create a separate admin page to:
- View pending puzzles
- Approve/reject with one click
- See statistics
- Ban spam users

### Add Upvoting
Users could vote on their favorite puzzles, and popular ones appear more often.

### Add Categories/Tags
Allow filtering puzzles by difficulty or theme.

## Cost Estimate

With the free tier:
- **Storage:** Can hold ~2 million puzzles
- **Reads:** ~50,000 players per day
- **Writes:** ~20,000 submissions per day

You'll only pay if you exceed these limits, and costs are very low (typically $1-5/month for moderate overages).

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Pricing](https://firebase.google.com/pricing)
