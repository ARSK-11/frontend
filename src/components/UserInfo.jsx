import { User } from 'lucide-react';

const UserInfo = ({ user, description }) => {
  return (
    <div className="flex items-center justify-center space-x-3 mb-6">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        {user?.image_url ? (
          <img src={user.image_url} alt="Profile" className="w-12 h-12 rounded-full" />
        ) : (
          <User className="w-6 h-6 text-blue-600" />
        )}
      </div>
      <div className="text-left">
        <h5 className="font-medium text-gray-900 text-sm">{user?.email}</h5>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default UserInfo;
