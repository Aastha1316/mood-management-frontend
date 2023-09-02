import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setMood } from "../../Redux-store/moodSlice";
import { useHttpsClient } from "../../Shared/Hooks/http-hook";

const MoodPage = () => {
  const moods = [
    "Happy 😄",
    "Excited 🎉",
    "Sad 😢",
    "Angry 😡",
    "Relaxed 😌",
    "Confused 😕",
    "Energetic 💪",
    "In Love 😍",
    "Anxious 😬",
    "Bored 😑",
  ];
  const currentUserId =useSelector((state)=>state.auth.userId)
  const token = useSelector((state)=>state.auth.token)
  const [reason, setReason] = useState("");
  const [selectMood, setSelectMood] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const btnRef = React.useRef();
  const { isLoading, sendRequest, error, clearError } = useHttpsClient();

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleMoodChange = (event) => {
    setSelectMood(event.target.value);
  };

  const handleSave = async () => {
    try {
      clearError();

      const responseData = await sendRequest(
        `${ import.meta.env.VITE_BACKEND_URL}/mood`,
        "POST",
        JSON.stringify({
          mood: selectMood,
          reason: reason,
        }),
        { "Content-Type": "application/json",Authorization:"Bearer "+token }
      );
      if (!error) {
        const payload = {
          mood: selectMood,
          reason: reason,
        };
        dispatch(setMood(payload));
        navigate("/explore");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box textAlign="center">
      <Heading as="h1" marginBottom={6}>
        What's your mood?
      </Heading>
      <Flex justifyContent="center" flexDirection="column">
        <Select
          placeholder="Select mood"
          marginTop={4}
          maxWidth="300px"
          onChange={handleMoodChange}
        >
          {moods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </Select>
        <Input
          marginTop={100}
          width={"50%"}
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={handleReasonChange}
        />

        <Button
          ref={btnRef}
          colorScheme="teal"
          onClick={handleSave}
          marginTop={40}
          maxWidth="120px"
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default MoodPage;
