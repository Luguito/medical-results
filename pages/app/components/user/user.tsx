import { UserLoggedContainer, ProfileImgContainer, UserName } from './user.styled';
// Logo image
import Image from 'next/image';
// import logo from '../../../../assets/logo.png';
import User from '../../../../assets/userNotFound.jpeg'
import Logo from '../../../../assets/Logo_fondo_azul.svg';
// Hook
import { useLoggedUser } from '../../hooks/useLoggedUser';
// Interface
import { IUser } from './user.interface';

export const UserLoggedComponent = () => {
    const user: IUser = useLoggedUser();

    return (
        <>
            <UserLoggedContainer>
                <div style={{ width: '9em' }}>
                    <Image src={Logo} height="40px" width="45px" layout="responsive" style={{ borderRadius: '50%' }}></Image>
                </div>
                <ProfileImgContainer>
                    {/* <img src='/userNotFound.jpeg' width="200px" /> */}
                    <Image src={User} height="40px" width="45px" layout="responsive" style={{ borderRadius: '50%' }}></Image>
                </ProfileImgContainer>
                <UserName>{user.firstName}</UserName>
            </UserLoggedContainer>
        </>
    )
}

export default UserLoggedComponent;