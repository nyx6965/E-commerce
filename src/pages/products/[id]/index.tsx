import Footer from "@/components/Footer";
import Navigaton from "@/components/Navigation";
import {
   Box,
   Container,
   Stack,
   Text,
   Image,
   Flex,
   VStack,
   Button,
   Heading,
   SimpleGrid,
   StackDivider,
   useColorModeValue,
   NumberDecrementStepper,
   NumberIncrementStepper,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
   Slider,
   SliderFilledTrack,
   SliderThumb,
   SliderTrack,
   useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";

export default function ProductDetails({ data }: any) {
   const [value, setValue] = React.useState(0);

   const toast = useToast();
   const handleChange = (value: any) => setValue(value);

   const addProduct = async () => {
      try {
         const newData = { ...data, quantity: value };

         const response = await fetch("http://localhost:3000/api/addProducts", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },

            body: JSON.stringify(newData),
         });

         if (response.status == 200) {
            toast({
               title: "Product Added.",
               status: "success",
               isClosable: true,
            });
         }
         if (response.status == 500) {
            toast({
               title: "Server error",
               status: "error",
               isClosable: true,
            });
         }
         return response;
      } catch (error: any) {
         console.log(error);
         toast({
            title: error.message || "Server error",
            status: "error",
            isClosable: true,
         });
      }
   };

   return (
      <>
         <Navigaton />
         <Container maxW={"7xl"}>
            <SimpleGrid
               columns={{ base: 1, lg: 2 }}
               spacing={{ base: 8, md: 10 }}
               py={{ base: 18, md: 24 }}
            >
               <Flex>
                  <Image
                     rounded={"md"}
                     alt={"product image"}
                     src={data.image}
                     fit={"cover"}
                     align={"center"}
                     w={"100%"}
                     h={{ base: "100%", sm: "400px", lg: "500px" }}
                  />
               </Flex>
               <Stack spacing={{ base: 6, md: 10 }}>
                  <Box as={"header"}>
                     <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                     >
                        {data.title}
                     </Heading>
                     <Text
                        color={useColorModeValue("gray.900", "gray.400")}
                        fontWeight={300}
                        fontSize={"2xl"}
                     >
                        £ {data.price}
                     </Text>
                  </Box>

                  <Stack
                     spacing={{ base: 4, sm: 6 }}
                     direction={"column"}
                     divider={
                        <StackDivider
                           borderColor={useColorModeValue(
                              "gray.200",
                              "gray.600"
                           )}
                        />
                     }
                  >
                     <VStack spacing={{ base: 4, sm: 6 }}>
                        <Text
                           color={useColorModeValue("gray.500", "gray.400")}
                           fontSize={"2xl"}
                           fontWeight={"300"}
                        >
                           {data.description}
                        </Text>
                        <Text fontSize={"lg"}>{data.description}</Text>
                     </VStack>
                  </Stack>

                  <Flex>
                     <NumberInput
                        maxW="100px"
                        mr="2rem"
                        value={value}
                        onChange={handleChange}
                     >
                        <NumberInputField />
                        <NumberInputStepper>
                           <NumberIncrementStepper />
                           <NumberDecrementStepper />
                        </NumberInputStepper>
                     </NumberInput>
                     <Slider
                        flex="1"
                        focusThumbOnChange={false}
                        value={value}
                        onChange={handleChange}
                     >
                        <SliderTrack>
                           <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb
                           fontSize="sm"
                           boxSize="32px"
                           // eslint-disable-next-line react/no-children-prop
                           children={value}
                        />
                     </Slider>
                  </Flex>

                  <Button
                     onClick={addProduct}
                     rounded={"none"}
                     w={"full"}
                     mt={8}
                     size={"lg"}
                     py={"7"}
                     bg={useColorModeValue("gray.900", "gray.50")}
                     color={useColorModeValue("white", "gray.900")}
                     textTransform={"uppercase"}
                     _hover={{
                        transform: "translateY(2px)",
                        boxShadow: "lg",
                     }}
                  >
                     Add to cart
                  </Button>
               </Stack>
            </SimpleGrid>
         </Container>
         <Footer />
      </>
   );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
   const response = await fetch(
      `https://fakestoreapi.com/products/${context.params.id}`
   );
   const data = await response.json();

   return {
      props: {
         data: data,
      },
   };
};
