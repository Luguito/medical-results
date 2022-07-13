import { UserLoggedContainer, ProfileImgContainer, UserName, UserProperties, ImageProfile } from './user.styled';
// Logo image
import Image from 'next/image';
// import logo from '../../../../assets/logo.png';
const imageProfile = '/userNotFound.jpeg'
// Hook
import { useLoggedUser } from '../../../../hooks/useLoggedUser';
// Interface
import { IUser } from './user.interface';

export const UserLoggedComponent = () => {
    const user: IUser = useLoggedUser();

    return (
        <>
            <UserLoggedContainer>
                <ProfileImgContainer>
                    <ImageProfile src={imageProfile} />
                </ProfileImgContainer>
                <UserProperties>
                    <UserName>{user?.firstName}</UserName>
                    <UserName>{user?.role === "admin" ? "Administrador" : "Paciente"}</UserName>
                </UserProperties>
            </UserLoggedContainer>
        </>
    )
}

export default UserLoggedComponent;