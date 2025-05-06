import React from 'react';
import UserProfileForm from '../../components/organisms/UserProfileForm';
import MainLayout from '../../templates/MainLayout';

const ProfilePage: React.FC = () => {
  return (
    <MainLayout>
      <UserProfileForm />
    </MainLayout>
  );
};

export default ProfilePage;