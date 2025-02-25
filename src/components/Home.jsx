import React from 'react'

import { client } from '../lib/axios'
import Login from './Login';
import SignUp from './SignUp';

export const loader= async () => {
  const res= await client.get("products");  
  return res.data.data;
}

const Home = () => {

  return (
    <div>
      Home
    </div>
  )
}

export default Home