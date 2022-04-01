import { UserLoggedContainer, ProfileImgContainer, UserName } from './user.styled';

export const UserLoggedComponent = () => {
    //  Create a hook to get the information about user logged
    return (
        <>
            <UserLoggedContainer>
                <ProfileImgContainer>
                    <img src="" alt="" />
                </ProfileImgContainer>
                <UserName>Peter Parker</UserName>
            </UserLoggedContainer>
        </>
    )
}

export default UserLoggedComponent;