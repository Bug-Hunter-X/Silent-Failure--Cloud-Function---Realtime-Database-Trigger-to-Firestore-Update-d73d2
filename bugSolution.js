```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const rtdb = admin.database();

exports.updateFirestoreOnRtdbChange = functions.database.ref('/path/to/data/{pushId}').onWrite(async (change, context) => {
  const newValue = change.after.val();
  const pushId = context.params.pushId;
  try {
    // Use set() with merge: true to update existing documents
    await db.collection('firestoreCollection').doc(pushId).set(newValue, {merge: true});
    console.log('Firestore document updated successfully:', pushId);
  } catch (error) {
    console.error('Error updating Firestore document:', error, 'Push ID:', pushId, 'New Value:', newValue);
    // Consider adding more robust error handling, such as retry mechanisms
    // and alerting systems for critical failures
  }
});
```