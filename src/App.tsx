import { useEffect, useState } from "react";
import Card from "./components/Card"
import Hero from "./components/Hero"

const App: React.FC<{}> = () => {
  const [showData, setShowData] = useState<any>([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('https://podcast-api.netlify.app/shows')
          const jsonData = await response.json();
          setShowData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData();
    }, [])



  return (
    <>
    <Hero />
      <Card />
    </>
  )
}

export default App;