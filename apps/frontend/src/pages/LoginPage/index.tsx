import React from 'react';
import LoginForm from '../../components/organisms/LoginForm';
import AuthLayout from '../../templates/AuthLayout';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;