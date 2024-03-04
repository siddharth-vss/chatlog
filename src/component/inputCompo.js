/* eslint-disable no-undef */
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Menu,IconButton, MenuButton, MenuItem, MenuList,  FormLabel, Input, FormControl } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useAppContext } from "../context/appContext";


const InputCompo = ({setLoading,fetchMessages}) => {
  const {
    selectedChat,
    sp,
  } = useAppContext();
    const toast = useToast()
    // console.log(selectedChat);
    // const [Pic, setPic] = useState("");


    const sendPic =async (Pic)=>{
        const { data } = await sp.post("/messages", {
            content: `<img src=${Pic} />`,
            chatId: selectedChat,
          });
          fetchMessages();
          console.log(data);

    }

    const postDetails = (pics) => {
        setLoading(true);
        console.log("starting post");
        if(pics === undefined){
          toast({
           title: `Please select Image`,
           status: "warning",
           position: 'top',
           duration:5000,
           isClosable: true,
         })
         return;
        }
     
       if(pics.type === "image/jpg" ||pics.type === "image/jpeg" ||pics.type === "image/png"  ){
         let Data= new FormData();
         Data.append("file", pics);
         Data.append("upload_preset","chat-app");
         Data.append("cloud_name","dabh5hsuk");
         fetch("https://api.cloudinary.com/v1_1/dabh5hsuk/image/upload",{
           method:"POST",
           body:Data
         }).then((res)=> res.json())
         .then( Data =>{ 
          console.log("object created successfully!");
          //  setPic();
          //  console.log(Pic);
           sendPic(Data.url.toString());
           
           setLoading(false);
         })
         .catch((err) =>{
           setLoading(false);
           
         })
     
       }else{
         toast({
           title: `Please select Image`,
           status: "warning",
           position: 'top',
           duration:5000,
           isClosable: true,
         })
         setLoading(false);
         return;
       }
     
       }
  return (
    <>
      <Menu
      
      >
  <MenuButton
  style={{
    position:"relative",
    left:window.innerWidth<445 ? "10px":"2%",
    top:"-2px",
  }}
    // eslint-disable-next-line no-undef
    as={IconButton}
    aria-label='Options'
    icon={<HamburgerIcon />}
    variant='outline'
  />
  <MenuList>
     {/* command='⌘T' */}
    <MenuItem icon={<i className='fa fa-photo' style={{fontSize:"20px"}} ></i>} as="label" htmlFor='file'>Send Image
<input type="file" id='file' accepaccept="image/*" onChange={(e) => { postDetails(e.target.files[0]) }} />
    </MenuItem>
    
  </MenuList>
</Menu>
    </>
  )
}

export default InputCompo
