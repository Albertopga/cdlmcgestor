import firebaseApp from './Firebase';
import firebase from 'firebase';
const db = firebase.firestore(firebaseApp);

export async function isUserAdmin(uid) {
  const res = await db.collection('admins').doc(uid).get();
  return res.exists
}