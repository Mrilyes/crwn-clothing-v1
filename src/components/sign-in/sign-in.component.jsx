import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import Button , {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {
  signInWithGooglePopup,
  SignInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';


import {SignInContainer , ButtonsContainer} from './sign-in.styles.jsx';


const defaultFormFields = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };


  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      await SignInAuthUserWithEmailAndPassword(email , password);
      resetFormFields();

    }  catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          resetFormFields();
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          resetFormFields();
          break;
        default:
          console.log(error);
      }
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (

    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>

        <Button type='submit'>  Sign In </Button>
        <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick = {SignInWithGoogle}> Google Sign In </Button>
 
        </ButtonsContainer>
      </form>
    </SignInContainer>

  );
};

export default SignIn;