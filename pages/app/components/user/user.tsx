import { UserLoggedContainer, ProfileImgContainer, UserName } from './user.styled';
// Logo image
// Hook
import { useLoggedUser } from '../../hooks/useLoggedUser';
// Interface
import { IUser } from './user.interface';

export const UserLoggedComponent = () => {
    const user: IUser = useLoggedUser();

    return (
        <>
            <UserLoggedContainer>
                <div>
                    <img src="/logo.png"  width="200px" style={{marginLeft: '-46px'}} />
                </div>
                <ProfileImgContainer>
                    <img src="" alt="" />
                </ProfileImgContainer>
                <UserName>{user.firstName}</UserName>
            </UserLoggedContainer>
        </>
    )
}

export default UserLoggedComponent;