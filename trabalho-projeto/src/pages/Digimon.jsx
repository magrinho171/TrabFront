import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import './Digimons.css';
import { Card, CardBody, CardFooter, Text, Image, SimpleGrid, Container, Box } from '@chakra-ui/react'




const Digimon = () => {
    const [digimonData, setDigimonData] = useState()
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const axiosDigimonData = useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://digimon-api.vercel.app/api/digimon')
            setDigimonData(data)
            setTotalItems(data.length);
            
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        axiosDigimonData()
    }, [])

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = digimonData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
                {currentItems.map((digimon, index )=> (
                    <SimpleGrid>
                        <Container key={index}>
                            <Card border='2px' borderColor='black.200' className="cardSize" maxW='sm'>
                                <Box key={index}>
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
                <div>
                    <ul>
                        {Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index}>
                            <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                        </li>
                        ))}
                    </ul>
                </div>
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