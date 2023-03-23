import { useState } from 'react'

const get_image = async () => {
  const image = await fetch("https://dog.ceo/api/breeds/image/random")
  const json_obj = await image.json();
  return json_obj.message;
}

export default function DogPics () {
  const [image, setImage] = useState('https://images.dog.ceo/breeds/spaniel-cocker/n02102318_4172.jpg');

  const refresh_image = async (e) => {
    e.preventDefault();
    setImage(await get_image());
  };
  
  return (
    <div className='dog-pics'>
      <img src={image} />
      <button onClick={refresh_image}>🐶</button>
    </div>
  )
}
