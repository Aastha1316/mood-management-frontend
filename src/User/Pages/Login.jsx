import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useHttpsClient } from "../../Shared/Hooks/http-hook";
import { useAuth } from "../../Shared/Hooks/auth-hook";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, sendRequest, error, clearError } = useHttpsClient();
  const {login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      clearError();
  
      const responseData = await sendRequest(
     `${ import.meta.env.VITE_BACKEND_URL}/user/login`,
        "POST",
        JSON.stringify({
          email: email,
          password: password,
        }),
        { "Content-Type": "application/json" }
      );
      if (!error) {
        login(
          responseData.userId,
          responseData.token,
           new Date(new Date().getTime()+ 1000 * 60 *60 ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

    
  

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack>
            {error && <Text>{error}</Text>}
            <Button
              bgGradient="linear(to-r, teal.500, blue.300)"
              color={"white"}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
