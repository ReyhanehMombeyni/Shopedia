import React from 'react'

import { client } from '../lib/axios'
import Login from './Login';

export const loader= async () => {
  const res= await client.get("products");  
  return res.data.data;
}

const Home = () => {

  return (
    <div>
      <Login />
    </div>
  )
}

export default Home