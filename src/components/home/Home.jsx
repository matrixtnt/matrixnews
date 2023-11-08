'use client'
import { useRouter } from 'next/router';
import FeatureLayout from '../features-Style/FeatureLayout'
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    // Check if the slug is present in the URL
    if (router.pathname) {
        router.replace(window.location.pathname + window.location.search);
    }
}, []);
  return (
    <>
      <FeatureLayout />
    </>
  )
}

export default Home
