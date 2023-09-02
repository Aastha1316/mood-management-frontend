import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Button,
  CardFooter,
  Image,
  Flex,
  CardHeader,
  StackDivider,
  Box,
  Progress,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setMood } from "../../Redux-store/moodSlice";
import { useHttpsClient } from "../../Shared/Hooks/http-hook";
import { useEffect, useState } from "react";
import { useRef } from "react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const moodDumps = useSelector((state) => state.mood.moodDumps);
  const { isLoading, error, sendRequest, clearError } = useHttpsClient();
  const currentUserId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [image, setImage] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const[errorFound,setErrorFound]=useState("");
  const pickerRef = useRef();
  useEffect(() => {
    const fetchUserById = async () => {
      const response = await sendRequest(
        `http://localhost:8080/api/user`,
        "GET",
        null,
        { Authorization: "Bearer " + token }
      );
      console.log(response);
      setUserData(response);
    };
    fetchUserById();
  }, [userData]);
  const handleSubmit = async () => {
    try {
      const formData = new FormData()// new instance of class FormData
      formData.append("name",newName)//append name to newName
      formData.append("bio",newBio)
      formData.append("image",image)
      const response = await sendRequest(
        `${ import.meta.env.VITE_BACKEND_URL}/user/updateProfile`,
        "PUT",
      formData,
        {  Authorization: "Bearer " + token }
      );
      setIsEditMode(false);
      setUserData({ ...userData, name: newName, bio: newBio });
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = () => {
    setIsEditMode(true);
    setNewName(userData.name);
    setNewBio(userData.bio);
  };
  const handleCancelEdit = () => {
    setIsEditMode(false);
  };
  const pickedHandler = (event) => {
    let pickedfile;
    const MIME_TYPE_MAP = {
      "image/png": "png",
      "image/jpeg": "jpeg",
      "image/jpg": "jpg",
    };
    if (event.target.files && event.target.files.length == 1) {
      pickedfile = event.target.files[0];
      const mimetype = pickedfile.type;
      if (MIME_TYPE_MAP[mimetype]) {
        setErrorFound(null);
      } else {
        setErrorFound("please provide valid image type");
        return;
      }
      setImage(pickedfile);
    } else {
      setPrevUrl();
    }
  };
  const pickImageHandler = () => {
    pickerRef.current.click();
  };
  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPrevUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  return (
    <Flex direction={"column"} width={"100%"} marginTop={"50px"}>
      <Card
        height={"400px"}
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        {isEditMode ? (
          <>
            {prevUrl && (
              <Image
                height={"250px"}
                width={"200px"}
                marginTop={"70px"}
                marginLeft={"50px"}
                src={prevUrl}
                alt="Caffe Latte"
              />
            )}
            <Input
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={pickedHandler}
              display="none"
              ref={pickerRef}
              name="image"
            />
            <Button onClick={pickImageHandler}>Add Image</Button>
          </>
        ) : (
          <Image
            height={"250px"}
            width={"200px"}
            marginTop={"70px"}
            marginLeft={"50px"}
            src={"http://localhost:8080/"+(userData.image && userData.image.replace(/\\/g,"/"))}
            alt="Caffe Latte"
          />
        )}

        <Stack>
          <CardBody>
            {isEditMode ? (
              <>
                <Input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <Input
                  type="text"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                />
              </>
            ) : (
              <Flex direction={"column"} alignItems={"flex-start"}>
                <Heading size="md" marginTop={"40px"}>
                  {userData.name}
                </Heading>

                <p>{userData.bio}</p>
                <Text py="2" textA>
                  Current mood
                </Text>
                <p>{userData.mood}</p>
                <Text py="2">Reason</Text>
                <p>{userData.reason}</p>
              </Flex>
            )}
          </CardBody>

          <CardFooter>
            {isEditMode ? (
              <>
                <Button onClick={handleSubmit}>Save</Button>
                <Button onClick={handleCancelEdit}>Cancel</Button>{" "}
              </>
            ) : (
              <Button onClick={handleEdit}>Edit</Button>
            )}
          </CardFooter>
        </Stack>
      </Card>
      <Flex direction={"row"} marginTop={"50px"}>
        <Card width={"700px"}>
          <CardHeader>
            <Heading size="md">Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {userData.movies && (
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Movies
                  </Heading>
                  {userData.movies.map((movie, index) => (
                    <Text pt="2" fontSize="sm" key={index}>
                      {movie}
                    </Text>
                  ))}
                </Box>
              )}
              {userData.books && (
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Books
                  </Heading>
                  {userData.books.map((book, index) => (
                    <Text pt="2" fontSize="sm" key={index}>
                      {book}
                    </Text>
                  ))}
                </Box>
              )}
            </Stack>
          </CardBody>
        </Card>
        <Card width={"550px"}>
          <CardHeader>
            <Heading size="md">Mood Statistics</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={5}>
              {userData.moodData &&
                userData.moodData.map((data) => (
                  <>
                    <h2 style={{ textAlign: "left" }}>{data.mood}</h2>
                    <Progress
                      colorScheme="teal"
                      size="md"
                      value={(data.count / userData.totalMood) * 100}
                    />
                  </>
                ))}
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};
export default ProfilePage;
