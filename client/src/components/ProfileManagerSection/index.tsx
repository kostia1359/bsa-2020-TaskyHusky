import React from 'react';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import ProfileManager from 'components/ProfileManager';
import SecurityManager from 'components/SecurityManager';
import EmailManager from 'components/EmailManager';
import AccountManager from 'components/AccountManager';

interface Props {
	user: UserProfileState;
	editMode: string;
	showManager: (modeToShow: string) => void;
	updateUser: (changedUser: Partial<UserProfileState>) => void;
}

const ProfileManagerSection: React.FC<Props> = (props: Props) => {
	const { user, showManager, updateUser, editMode } = props;
	switch (editMode) {
		case 'profile':
			return <ProfileManager showManager={showManager} updateUser={updateUser} user={user} />;
		case 'email':
			return <EmailManager />;
		case 'security':
			return <SecurityManager />;
		case 'account':
			return <AccountManager />;
		case 'back':
		default:
			return <>{showManager('')}</>;
	}
};

export default ProfileManagerSection;
