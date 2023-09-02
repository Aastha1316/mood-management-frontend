 
 import { Image,Box,Flex, HStack, VStack, SimpleGrid} from '@chakra-ui/react';
 import { FaFacebookF ,FaInstagram,FaEnvelope} from "react-icons/fa";
 import {Link} from 'react-router-dom';


 const LandingPage=()=>{
    return (
        <HStack width={'100%'} >
            <VStack width={'100%'} height={'100%'}>
            <Flex direction={'row'} justifyContent={'space-around'} alignItems={'center'} width={'100%'}>
         <Flex direction={'column'} paddingRight={'300px'} alignItems={'center'} justifyContent={'space-between'}> <h1 style={{ textAlign: 'left'  , fontFamily:'Cinzel ,serif',fontSize:'80px' }} >MoodGo</h1>
          <p style={{fontFamily:'Red Hat Display , sans-serif', fontSize:'20px', fontWeight:'normal'}}>At MoodGo, connect with the world of books, movies, and songs that fit your feelings, whether it’s the thrill of adventure or the comfort of romance. Our curated recommendations provide you with endless possibilities to indulge in or escape reality.</p>
          <Box marginTop={'30px'}

  as={Link}
  p={4}
  color='white'
  fontWeight='bold'
  borderRadius='100px'
  bgGradient='linear(to-r, teal.500, green.500)'
 width={'50%'}
  to="/login"
>
  Get Started
</Box>
          </Flex>
      <Flex direction={'column'}>  <Box boxSize='200px' objectFit={'cover'} marginTop={'100px'}marginLeft={'200px'}>
    <Image src='https://rachelcorbett.com.au/wp-content/uploads/2016/11/Why-headphones-are-important-for-a-podcast.jpg' alt='Dan Abramov' />
    
  </Box>

  <Box boxSize='340px'  objectFit={'cover'} marginTop={'-50px'}   >
  <Image src='https://media.istockphoto.com/id/1209780511/vector/cute-girl-reading-a-book-in-the-garden-nature-landscape-background-summer-holidays.jpg?s=612x612&w=0&k=20&c=XnHAAK7SvLmfmwl7DT4CC9nuNAEWPwqMxWZt0HXJmFE=' alt='Dan Abramov' />
</Box>
<Box boxSize='200px' objectFit={'cover'} marginTop={'-50px'} marginLeft={'200px'}>
  <Image src='https://us.123rf.com/450wm/dmitrymoi/dmitrymoi1611/dmitrymoi161100015/67671823-movie-night-home-cinema-watching-cartoon-vector-illustration-red-sofa-web-banner-popcorn-cola.jpg?ver=6' alt='Dan Abramov' />
</Box>
</Flex>

</Flex>
<Flex direction={'row'} alignItems={'flex-start'} gap={8} marginLeft={'10px'} width={'100%'}>
  <Flex direction={'column'} alignItems={'flex-start'}>
    <h1>300</h1>
    <h2>Book Options</h2>
  </Flex>
  <Flex direction={'column'} alignItems={'flex-start'}>
    <h1>200</h1>
    <h2>Movie Selections</h2>
  </Flex>
  <Flex direction={'column'} alignItems={'flex-start'}>
    <h1>500</h1>
    <h2>Song Choices</h2>
  </Flex>
</Flex>
<Flex  backgroundColor={'#B9EDDD'}>
<Flex direction={'column'} alignItems={'flex-start'} width={'100%'} fontFamily={'Yeseva One , cursive'} marginTop={30} maxWidth={'100%'} backgroundColor={'#B9EDDD'} paddingBottom={'100px'} paddingTop={'50px'} >

    <h1 style={{ marginLeft:'100px',marginTop:'10px' ,fontFamily: 'Yeseva One , cursive',fontSize:'40px',color:'#213555'}}>MoodGo Features</h1>
    <SimpleGrid columns={3} spacing={10} marginTop={30} >
        <Flex direction={'column'}><h2 style={{   fontFamily: 'Yeseva One , cursive',fontSize:'20px',color:'#213555' }}>Book Recommendations</h2>
        <p>Find books that match your mood and dive into new worlds</p></Flex>
        <Flex direction={'column'}><h2 style={{fontSize:'20px',color:'#213555'}}>Movie Suggestions</h2>
        <p>Discover movies that resonate with your emotions, whether you’re in for a laugh or a cry</p></Flex>
        <Flex direction={'column'}><h2 style={{fontSize:'20px',color:'#213555'}}>Song Selections</h2>
        <p>Explore songs that fuel your feelings, from uplifting tunes to soulful melodies.</p></Flex>
        <Flex direction={'column'}><h2 style={{fontSize:'20px',color:'#213555'}}>Easy Navigation</h2>
        <p>Quickly find what you’re looking for with our user-friendly layout.</p></Flex>
        <Flex direction={'column'}><h2 style={{fontSize:'20px',color:'#213555'}}>Personalized Matches</h2>
        <p>Experience highly personalized recommendations based on your unique mood.</p></Flex>
        <Flex direction={'column'}><h2 style={{fontSize:'20px',color:'#213555'}}>Book Recommendations</h2>
        <p>Find books that match your mood and dive into new worlds</p></Flex>
    </SimpleGrid>
    
</Flex>
</Flex>

<Box marginTop={70} >
    <Image src='https://img.freepik.com/premium-photo/happiness-girl-adult-beautiful-female-model-happy-mood-cheerful-cheerful-girl-beautiful-happy-woman_548821-9317.jpg' width={'100%'} style={{ background: 'linear-gradient(to right, rgba(0, 0, 255, 0.6), rgba(0, 0, 255, 0.8))' , opacity:'50%',
    width:'1500px' , margin:'0 auto', height:'500px' }}/>
    <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                <h3 style={{ color: 'black', textAlign: 'center' , justifyContent:'center' ,marginTop:'-400px',marginLeft:'700px', fontFamily:'Monoton, cursive', fontSize:'30px', color:'black',width:'100%'}}>"Life is 10% what happens to you & 90% how you respond to it"</h3>
              </div>
   
    </Box>
    <Flex direction={'row'} marginTop={'50px'} justifyContent={'space-around'} >
        <FaFacebookF size={'25px'}/>
        <FaInstagram size={'25px'}/>
        <FaEnvelope size={'25px'} style={{marginLeft:'10px'}}/>
      
    </Flex>
    <p style={{marginBottom:'40px'}}> © copyright 2023 MoodGo</p>


</VStack>
</HStack>






    );

 }
 export default LandingPage;