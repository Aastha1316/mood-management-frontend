import {Tab,TabList,TabPanels,TabPanel,Tabs,Heading, Center,Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    SimpleGrid,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
   Box,
   Spinner,
   Link,
    Image
    } from '@chakra-ui/react';
    import { useState,useEffect } from 'react';
    import { useSelector } from 'react-redux';
import { useHttpsClient } from '../../Shared/Hooks/http-hook';
import { useNavigate,Link as RouterLink } from "react-router-dom";


   

const RecommendationPage=()=>{
  
  const currentUserId = useSelector((state)=>state.auth.userId);
  const token = useSelector((state)=>state.auth.token);

  const [books,setBooks] = useState("");

  const [movies, setMovies] = useState("");
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [spotifyToken , setSpotifyToken] = useState("");
  const [songs, setSongs] = useState("");
  const {isLoading,error,sendRequest,clearError}= useHttpsClient();
  const[userMood,setUserMood]=useState([])
  
  useEffect(()=>{
    const fetchMood =async()=>{
      clearError();
       try{
        const response = await sendRequest(`${ import.meta.env.VITE_BACKEND_URL}/mood/${currentUserId}`,"GET",null,{Authorization:"Bearer "+token});
         if(!error){
        setUserMood(response);
        
        
         }
         
       } 
       catch(error){
        console.log(error);
       }
    }
    

    const fetchAccessToken =async()=>{
      try{
     const authParameters={
      method:"POST",
      headers:{
        "Content-Type":"Application/x-www-form-urlencoded"
      },
      body:`grant_type=client_credentials&client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&client_secret=${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`

     }
     const spotifyAccessToken = await fetch("https://accounts.spotify.com/api/token",authParameters)
     const spotifyData = await spotifyAccessToken.json();
    setSpotifyToken(spotifyData.access_token)


      }catch(error){
     console.log(error)

      }
    }
    fetchMood();
    //fetchBooks();
    // fetchMovies();
    fetchAccessToken();
  },[]);

useEffect(()=>{
  const encodeMood=encodeURI(userMood.mood);

  const fetchMovies = async () => {
    try {
      setIsLoadingMovies(true);
     
      if(userMood.mood){
        
      const res = await sendRequest(`${ import.meta.env.VITE_BACKEND_URL}/collection/getmovie?mood=${encodeMood}`,"GET",null,{Authorization:"Bearer "+token});
      console.log(res);
      const fetchMovieRequest = res.map((response)=>sendRequest("https://api.themoviedb.org/3/movie/"+response.movieId+"?api_key="+import.meta.env.VITE_TMDB_API_KEY,'GET',null

      ));
      const fetchMovieData = await Promise.all(fetchMovieRequest)
      setMovies(fetchMovieData);
      console.log(fetchMovieData);
      }
    
      setIsLoadingMovies(false);
    } catch (error) {
      setIsLoadingMovies(false);
      console.log(error);
    }
  };
  const fetchBooks =async()=>{
    try{
      
      if(userMood.mood){
        
        const res = await sendRequest(`${ import.meta.env.VITE_BACKEND_URL}/collection/getbook?mood=${encodeMood}`,"GET",null,{Authorization:"Bearer "+token});
        console.log(res);
        const fetchBookRequest = res.map((response)=>sendRequest("https://www.googleapis.com/books/v1/volumes/"+response.bookId+"?key="+import.meta.env.VITE_BOOKS_API_KEY,'GET',null));
        const fetchBookData = await Promise.all(fetchBookRequest)
      setBooks(fetchBookData);
      console.log(fetchBookData);


      }

    }catch (error) {
      
      console.log(error);
  }
}
;

  fetchMovies();
  fetchBooks();


},[userMood])

   useEffect(()=>{
  const fetchSong = async()=>{
    if(spotifyToken){
    const serachParameter ={
      method:"GET",
      headers:{"Content-Type":"Application/json","Authorization":"Bearer "+spotifyToken}
      
    }
    const response= await fetch("https://api.spotify.com/v1/search?q=genre:happy&type=track",serachParameter)
  const songsData = await response.json();
  console.log(songsData);
  setSongs(songsData.tracks);
  }
  }
  fetchSong();
   },[spotifyToken]
   )
  
    const updateBooks =async(title)=>{
      const updatedBooks = {books:title };
      try{
      
    const response= await sendRequest( `${ import.meta.env.VITE_BACKEND_URL}/user/movies&books`,"PUT",JSON.stringify(updatedBooks), { "Content-Type": "application/json" ,Authorization:"Bearer "+token })
    
    }
    catch(error){
      console.log(error);
     
    }
    
  }
  const updateMovies =async(title)=>{
    const updatedMovies = {movies:title };
    try{
    
  const response= await sendRequest( `${ import.meta.env.VITE_BACKEND_URL}/user/movies&books`,"PUT",JSON.stringify(updatedMovies), { "Content-Type": "application/json" ,Authorization:"Bearer "+token })
  
  }
  catch(error){
    console.log(error);
   
  }
  
}

   
  
  
    

return(
    <div>
        <Heading marginLeft={30} marginTop={'5%'} textAlign={'center'} fontFamily={'Lobster,cursive'} fontWeight={50}>
            For Your {userMood.mood} Mood  </Heading>

<Tabs>
  <TabList justifyContent={'center'} marginTop={10} style={{ gap: '90px' }}>
    <Tab fontFamily={'sans-serif'} fontWeight={'bold'} fontSize={'xl'}>
      Books
    </Tab>
    <Tab fontFamily={'sans-serif'} fontWeight={'bold'} fontSize={'xl'}>
      Movies
    </Tab>
    <Tab fontFamily={'sans-serif'} fontWeight={'bold'} fontSize={'xl'}>
      Music
    </Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
     
      <SimpleGrid spacing={9} columns={6} marginTop={20}>
        { books && books.map((book, index) => (
          <Card key={index}>
            <CardHeader>
              <Heading size='md'>{book.volumeInfo.title && book.volumeInfo.title}</Heading>
            </CardHeader>
            <CardBody>
            {book.volumeInfo.imageLinks &&  <Image
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title && book.volumeInfo.title}
                style={{ maxWidth: '100%', height: 'auto' }}
              />}
            </CardBody>
            <CardFooter>
              <Link href={book.volumeInfo.previewLink} isExternal>
              <Button onClick={() => updateBooks(book.volumeInfo.title)}>View here</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

    </TabPanel>
    <TabPanel>
     
    <SimpleGrid spacing={6} columns={6} marginTop={20}>
    { movies && movies.map((movie, index) => (

  <Card key={index} >
    <CardHeader>
      <Heading size='md'>{movie.title && movie.title}</Heading>
    </CardHeader>
    <CardBody >
     <Image
                src={movie.poster_path && `https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title && movie.title}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
               
                
    </CardBody>
    <CardFooter>
      <Link href={`https://www.themoviedb.org/movie/${movie.id}`} isExternal>
      <Button onClick={() => updateMovies(movie.title)}>View here</Button>
      </Link>
    </CardFooter>
  </Card>
    ))}
    </SimpleGrid>
     
    </TabPanel>
    <TabPanel>
    <Accordion defaultIndex={[0]} allowMultiple>
      {songs && songs.items.map((song,index)=>(

    
  <AccordionItem key={index}>
   
    <h2>
      <AccordionButton>

        <Box as="span" flex='1' textAlign='left'>
         {song.name}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     <video controls name="media">
      <source  src={song.preview_url} 
     type="audio/mpeg"/>
     {/* https://p.scdn.co/mp3-preview/c95dbfe98b78c21ff4bb9dd4ab9e5af44fafe49e?cid=d722df2dcbbd4a84b4dad7980a0580fb" */}


     </video>
    </AccordionPanel>
  </AccordionItem>
      ))}
 </Accordion>

    </TabPanel>
  </TabPanels>
</Tabs>
{userMood&&userMood.role==="admin"&&
<Link as={RouterLink} to="/addpage"> 
<Button>Add</Button>-
      </Link>}


</div>
)
}
export default RecommendationPage;
