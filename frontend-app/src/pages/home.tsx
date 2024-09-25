import React, { useEffect } from 'react'
import useApi from '../components/utils/useAPI';
import { ErrorPopUp } from '../components/errorComponents/errorPopup';

export const HomePage: React.FC = () => {
  const { read, loading, response, error } = useApi();
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await read('/api/private'); // Calls the read function to fetch data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading.....</h1>
  }

  if (error) {
    return <ErrorPopUp
      message='Our systems are experiencing heavy traffic now, something went wrong. Please try again later.'
      title='Service Error, Something Went Wrong'
    />
  }

  return (
    <div>{JSON.stringify(response)}</div>
  )
}
