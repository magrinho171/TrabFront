import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import './Digimons.css';
import { Card, CardBody, CardFooter, Text, Image, SimpleGrid, Container, Box } from '@chakra-ui/react'




const Digimon = () => {
    const [digimonData, setDigimonData] = useState()
    const [loading, setLoading] = useState(true)

    const axiosDigimonData = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://digimon-api.vercel.app/api/digimon')
            setDigimonData(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        axiosDigimonData()
    }, [])

    const getDigimonData = () => {
        if (loading) {
            return (
                <div>
                    <h2>Carregando...</h2>
                </div>
            )
        }
        return (
            <Box className="container">
                {digimonData.map(digimon => (
                    <SimpleGrid>
                        <Container >
                            <Card border='2px' borderColor='black.200' className="cardSize" maxW='sm'>
                                <Box >
                                <CardBody>
                                    <Image className="imgTamanho" src={digimon.img} alt="Imagens Digimon"/>
                                    <Text>{digimon.name}</Text>
                                </CardBody>
                                    <CardFooter>
                                        <Text>{digimon.level}</Text>
                                    </CardFooter>
                                </Box>
                            </Card>
                        </Container>
                    </SimpleGrid>
                ))}
               
            </Box>
        )
    }

    return (
        <div>
            <div>
                {getDigimonData()}
            </div>
        </div>
    );
}

export default Digimon;

//<img className='imgTamanho'src={digimon.img} alt="Imagens Digimon"/>
//<h4>{digimon.name}</h4>
//<h4>{digimon.level}</h4>