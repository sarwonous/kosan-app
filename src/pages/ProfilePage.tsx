import Header from '@/components/app/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        console.log('User logged out');
        navigate('/');
    };

    return (
        <div className="p-4 space-y-6 max-w-4xl mx-auto">
            <Header title="Profile">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Dashboard
            </Button>
            </Header>
            <div className="grid gap-6">
                <Card className="shadow-none">
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Profile</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">User Information</h2>
                            <p className="text-gray-700 mb-1">Name: John Doe</p>
                            <p className="text-gray-700">Email: john.doe@example.com</p>
                            {/* Add more user information as needed */}
                        </div>
                    </CardContent>
                </Card>
                <Button 
                    onClick={handleLogout} 
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default ProfilePage;