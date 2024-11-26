import Header from "@/components/app/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/use-auth";
import storage from "@/lib/storage";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user } = useAuth({
    loggedIn: storage.get("token") ? true : false,
    token: storage.get("token"),
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.del("token");
    navigate("/");
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <Header title="Profile">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>
      </Header>
      <div className="flex gap-6 flex-col sm:flex-row">
        <div className="hidden sm:block sm:w-3/12">
          <ul className="space-y-2">
            <li className="p-2 rounded bg-secondary text-primary">
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </div>
        <div className="w-full space-y-6 gap-6 flex-auto">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 space-y-3">
                <p className="text-gray-700">Name: {user.user?.name}</p>
                <p className="text-gray-700">Email: {user.user?.email}</p>
              </div>
              <Button onClick={handleLogout}>Logout</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Wifi Setting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700">Username: <span className="font-semibold">{user.user?.options?.username}</span></p>
                <p className="text-gray-700">Password: <span className="font-semibold">{user.user?.options?.password}</span></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
