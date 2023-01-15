import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


export function loginWithGoogle(){
    const provider = new GoogleAuthProvider();
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('After Login ', user);
    localStorage.userinfo = JSON.stringify({uid : user.uid, name: user.displayName});
    document.querySelector('#userinfo').innerText = JSON.parse(localStorage.userinfo).name;
    document.getElementById('login').style.display="none";
    document.getElementById('usericon').style.display="block";
    // ...
  }).catch((err) => {
    console.log('Login Error ', err);
  });
}
