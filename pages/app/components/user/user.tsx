import { UserLoggedContainer, ProfileImgContainer, UserName, UserProperties } from './user.styled';
// Logo image
import Image from 'next/image';
// import logo from '../../../../assets/logo.png';
import User from '../../../../assets/userNotFound.jpeg'
// Hook
import { useLoggedUser } from '../../hooks/useLoggedUser';
// Interface
import { IUser } from './user.interface';

export const UserLoggedComponent = () => {
    const user: IUser = useLoggedUser();

    return (
        <>
            <UserLoggedContainer>
                <ProfileImgContainer>
                    <Image src={User} height="30px" width="32px" layout="responsive" style={{ borderRadius: '50%' }}></Image>
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