import { UserLoggedContainer, ProfileImgContainer, UserName } from './user.styled';
// Logo image
import Image from 'next/image';
import logo from '../../../../assets/logo.png';

export const UserLoggedComponent = () => {
    //  Create a hook to get the information about user logged
    return (
        <>
            <UserLoggedContainer>
                <div>
                    {/* <Image src={logo} height="20px" width="35px" layout="responsive"></Image> */}
                </div>
                <ProfileImgContainer>
                    <img src="" alt="" />
                </ProfileImgContainer>
                <UserName>Peter Parker</UserName>
            </UserLoggedContainer>
        </>
    )
}

export default UserLoggedComponent;