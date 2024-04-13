// @ts-nocheck
import { getDatabase, ref, set, child, get } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  reload,
  // signOut,
  // onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "./firebase";

// ======================== USER REGISTRATION
export function whenUserRegister(dataForm) {
  const { name, email, password } = dataForm;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      updateProfile(auth.currentUser, { displayName: name });
      const user = userCredentials.user;
      sendEmailVerification(auth.currentUser).then(reload(user));
      toast.info(
        "Please, verify your email to complete registration and login!"
      );
      console.log(auth.currentUser);
      return user;
    })
    .catch(() => toast.error("Email already in use!"));
}

// ======================== USER LOGIN
export function whenUserLogin(dataForm, setShowLogin) {
  const { email, password } = dataForm;
  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      if (res.user.emailVerified) {
        setShowLogin(false);
        toast.success(`Welcome ${res.user.displayName} to LearnLingo`);
        localStorage.setItem('isLogin', 'true'); 
      } else {
        toast.warn("Please, verify Your email!");
      }
    })
    .catch(() => toast.error("Invalid credentials"));
}

// ======================== USER LOGOUT
export function whenLogOut(setIsLogin) {
  auth.signOut();
  setIsLogin(false);
  localStorage.removeItem('isLogin');
}

//========================= GET USER DATA
export function getUserData() {
  const user = auth.currentUser;
  if (user !== null) {
    const userData = {
      name: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
    };
    return userData;
  }
}

//========================= GET ALL TEACHERS FROM REAL-TIME DATABASE
export async function getAllTeachers(teachersPerPage) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, "teachers"));
    const teachers = snapshot.val();
    const firstTeachers = teachers.slice(0, teachersPerPage);
    return firstTeachers;
  } catch (error) {
    console.error(error);
  }
}

//========================= MANAGE TEACHERS IN FAVORITES
// Consolidated Firebase API calls
export async function manageFavorites(action, teachersArray, teacherIdToDelete) {
  const userData = getUserData();
  const userId = userData?.uid;
  const db = getDatabase();

  if (action === 'add' || action === 'update') {
    set(ref(db, `users/${userId}`), { teachers: teachersArray });
  } else if (action === 'get') {
    const snapshot = await get(child(ref(db), `users/${userId}/teachers`));
    return snapshot.val();
  } else if (action === 'delete' && teacherIdToDelete) {
    const snapshot = await get(child(ref(db), `users/${userId}/teachers`));
    const currentFavorites = snapshot.val();
    const updatedFavorites = currentFavorites.filter(teacher => teacher.id !== teacherIdToDelete);
    set(ref(db, `users/${userId}`), { teachers: updatedFavorites });
  }
}