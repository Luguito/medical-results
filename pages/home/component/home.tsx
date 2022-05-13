
import { ContainerLanding, ContainerCars, Cards, ImgContainer, Imglab, Imgdiag, ButtonLink, TextContent, Text, ButtonContainer } from './home.styled';
import Link from 'next/link'


export const Home = () => {
    return (
        <ContainerLanding>
            <ContainerCars>
                <Cards>
                    <ImgContainer>
                        <Imglab></Imglab>
                    </ImgContainer>
                    <TextContent>
                        <Text>
                            Consulte los resultados de examenes <br />
                            diagnósticos de laboratorio realizados <br />
                            en LaCardio
                        </Text>
                    </TextContent>
                    <ButtonContainer>
                        <Link href='/login'>
                            <ButtonLink>Laboratorios</ButtonLink>
                        </Link>
                    </ButtonContainer>
                </Cards>
                <Cards>
                    <ImgContainer>
                        <Imgdiag></Imgdiag>
                    </ImgContainer>
                    <TextContent>
                        <Text>
                            Consulte aquí los resultados de <br />
                            sus imágenes diagnósticas<br />
                        </Text>
                    </TextContent>
                    <ButtonContainer>
                        <ButtonLink>Imagenes diagnosticas</ButtonLink>
                    </ButtonContainer>
                </Cards>
            </ContainerCars>
        </ContainerLanding>
    )
}