import React from 'react';
import SignUpForm from '../../components/organisms/SignUpForm';
import AuthLayout from '../../templates/AuthLayout';

const SignUpPage: React.FC = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;