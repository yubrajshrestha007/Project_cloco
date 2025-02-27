import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { UserIcon, Mail, MapPin, Settings, Edit, Save, X, ArrowRight, Loader2, User as UserAvatar } from 'lucide-react';
import { User } from '../../interface';

interface ProfileCardProps {
  profile: User | null;
  username: string;
  email: string;
  address: string;
  isAdmin: boolean;
  editMode: boolean;
  error: { [key: string]: string } | null;
  isLoading: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelEdit: () => void;
  onUpdateProfile: () => void;
  onEditMode: () => void;
}

const ProfileCard = ({
  profile,
  username,
  email,
  address,
  isAdmin,
  editMode,
  error,
  isLoading,
  onInputChange,
  onCancelEdit,
  onUpdateProfile,
  onEditMode,
}: ProfileCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto border-none">
        <CardContent className="flex flex-col justify-center items-center p-12">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="text-muted-foreground mt-4">Loading your profile...</p>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <UserAvatar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Unable to load profile. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800 transition-all duration-200">
      <CardHeader className="relative p-0">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-900" />
        <div className="absolute -bottom-12  inset-x-0 flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-indigo-400 dark:bg-purple-700 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Settings className="text-white h-5 w-5 opacity-70 hover:opacity-100 cursor-pointer" />
        </div>
      </CardHeader>

      <CardContent className="pt-16 px-6 pb-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{username}</h2>
          {isAdmin && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mt-1">
              Administrator
            </span>
          )}
        </div>

        {editMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onInputChange}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                {error?.username && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error.username}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                {error?.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error.email}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={onInputChange}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                {error?.address && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error.address}</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-colors">
                <UserIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{username}</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-colors">
                <Mail className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100 break-all">{email}</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 transition-colors">
                <MapPin className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{address || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-700">
        {editMode ? (
          <div className="flex justify-end space-x-3 w-full">
            <button
              onClick={onCancelEdit}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={onUpdateProfile}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            {isAdmin && (
              <a
                href="/admin"
                className="mb-3 sm:mb-0 group inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin Dashboard
                <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </a>
            )}
            <button
              onClick={onEditMode}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all hover:shadow-md"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;