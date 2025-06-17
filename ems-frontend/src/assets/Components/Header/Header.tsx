import type { User } from "../../../types/auth";

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-50">
      <div className="text-xl font-bold tracking-wide">Employee Management</div>
      <div className="flex items-center">
        <span className="mr-2">Welcome, {user.name}</span>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Header;
