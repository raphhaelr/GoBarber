import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard</Text>

      <Button style={{ marginTop: '100%' }} onPress={signOut}>
        Logout
      </Button>
    </View>
  );
};

export default Dashboard;
