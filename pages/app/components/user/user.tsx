import { UserLoggedContainer, ProfileImgContainer, UserName } from './user.styled';
// Logo image
import Image from 'next/image';
import logo from '../../../../assets/logo.png';
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
                    {/* <Image src={logo} height="20px" width="35px" layout="responsive"></Image> */}
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