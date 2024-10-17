import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import storage from "@/lib/storage";
import useAuth from "@/hooks/use-auth";

const Header = ({
    title,
    children,
}: {
        title: string;
        children: React.ReactNode;
    }) => {
    const navigate = useNavigate();
    const auth = useAuth({
        loggedIn: storage.get('token') ? true : false,
        token: storage.get('token'),
    })

    const logout = () => {
        storage.del('token');
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold sm:text-3xl">
                {title}
            </h1>
            <div className="flex items-center gap-4">
                {children}
                {auth.user.isSuccess && (
                    <Button variant="outline" onClick={() => logout()}>
                    Logout
                    </Button>
                )}
                {!auth.user.isSuccess && (
                    <Button variant="outline" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Header;