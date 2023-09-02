import React, { useState } from "react";
import { Select, Input, Box, Center, Button,Text } from "@chakra-ui/react";
import { useHttpsClient } from '../../Shared/Hooks/http-hook';
import { useSelector } from "react-redux";


const AddPage = () => {
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
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [Id,setId] = useState("");
  const[message,setMessage]=useState("");
  const token = useSelector((state)=>state.auth.token);

  const {isLoading,error,sendRequest,clearError}= useHttpsClient();


  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleIdChange = (event) => {
    setId(event.target.value);
  };
 
  
  const handleSave= async()=>{
    setMessage("")
      try{
        console.log(selectedOption);
        if (selectedOption === "Books") {
            const response = await sendRequest(
                `${import.meta.env.VITE_BACKEND_URL}/collection/addbook`,
                "POST",
                JSON.stringify({
                  mood: selectedMood,
                  bookId: Id,
                }),
                {"Content-Type": "application/json", Authorization: "Bearer " + token }
              );
              if(!error){
                setMessage(response.message)
              }
            }
              else if  (selectedOption === "Movies") {
                const response = await sendRequest(
                    `${import.meta.env.VITE_BACKEND_URL}/collection/addmovie`,
                    "POST",
                   JSON.stringify ({
                      mood: selectedMood,
                      movieId:Id,
                    }),
                    {"Content-Type": "application/json", Authorization: "Bearer " + token }
                )
                if(!error){
                    setMessage(response.message)
                  }
              }


            }
        catch (error) {
            console.error("Error saving data:", error);
        }
  }

  return (
    <Center h="100vh"> {/* Center the content vertically */}
      <Box p={20} borderWidth={3} borderRadius="md" boxShadow="md" maxWidth="1000px"> {/* Style the container */}
        <Select
          placeholder="Select mood"
          marginTop={4}
          maxWidth="500px"
          onChange={handleMoodChange}
        >
          {moods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </Select>

        <Select 
        placeholder="Select option"
        marginTop={4}
        onChange={handleOptionChange}
        value={selectedOption}>
  <option value='Movies'>Movies</option>
  <option value='Books'>Books</option>
  <option value='Songs'>Songs</option>
</Select>
       
          <Input
            type="text"
            placeholder="Enter ID"
            marginTop={4}
            onChange={handleIdChange}
            value={Id}
            
          />
           <Button onClick={handleSave} colorScheme="blue" marginTop={4}>
          Save
        </Button>
        <Text>{message}</Text>
              </Box>
    </Center>
  );
};

export default AddPage;
