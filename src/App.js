import logo from './logo.svg';
import './App.css';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [value, setValue] = useState({})
  const googleProvider = new GoogleAuthProvider()
  const gitHubProvider = new GithubAuthProvider()
  const handleLoginButtonGoogle =()=>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;
      setValue(user)
    })
    .catch(error =>{
      console.error('error :', error)
    })
  }
  const handleLogOutButton = () =>{
    signOut(auth).then(() => {
      setValue({})
    }).catch((error) => {
     setValue({})
    });
  }

  const handleGitHubSignInButton = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result =>{
      const user = result.user;
      setValue(user)
      console.log(user)
    })
    .catch(error =>{
      console.error('error :', error)
    })
  }

  return (
    <div className="App">

     { value.uid?
     <button onClick={handleLogOutButton}>Sign out</button> :
      <>
        <button onClick={handleLoginButtonGoogle}>Sign in With Google</button>
        <button onClick={handleGitHubSignInButton}>Sign In with GitHub</button>
      </>

      }
      
      {value.uid && <div>
       <h1> user name: {value.displayName}</h1>
       <p> email: {value.email}</p>
       <img src={value.photoURL} alt=""/>
      </div>}
    </div>
  );
}

export default App;
