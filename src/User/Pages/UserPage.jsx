import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
  SimpleGrid,
  Text,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import MoodPage from "./MoodPage";
import { initialMood } from "../../Redux-store/moodSlice";
import { useHttpsClient } from "../../Shared/Hooks/http-hook";

const UserPage = () => {
 

  const   allUserMoods = useSelector((state) => state.mood.allUserMoods);
  const token =useSelector((state)=>state.auth.token);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { isLoading, sendRequest, error } = useHttpsClient();
  const currentUserId =useSelector((state)=>state.auth.userId)
  useEffect(() => {
    const fetchUserMood = async () => {
      try {
        if (allUserMoods.length == 0) {
          const response = await sendRequest(`${ import.meta.env.VITE_BACKEND_URL}/mood`,"GET",null,{Authorization:"Bearer "+token});
          console.log(response)
          
       if (!response.find(user=>user["creatorId"]==currentUserId)){
        onOpen()}
          dispatch(initialMood(response));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserMood();
  }, [sendRequest]);

  return (
    <>
      <SimpleGrid spacing={9} columns={3} marginTop={20}>
        {  allUserMoods.map((userMood, index) =>(
          <Card key={index}>
            <CardHeader>
              <Heading size="md">{userMood.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>Mood: {userMood.mood}</Text>
              <Text>Reason: {userMood.reason}</Text>
            </CardBody>
            <CardFooter>
              {userMood.creatorId ==currentUserId && (
                <Button
                  color={"white"}
                  bgGradient="linear(to-r, teal.500, blue.300)"
                  onClick={onOpen}
                >
                  Change Mood
                </Button>
              )}
            </CardFooter>
          </Card>)
        )}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MoodPage />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserPage;
