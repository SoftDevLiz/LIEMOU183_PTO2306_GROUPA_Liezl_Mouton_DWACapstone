import { useEffect, useState } from "react";
import Card from "./components/Card"
import Hero from "./components/Hero"

const App: React.FC<{}> = () => {
  const [showData, setShowData] = useState<any>([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('https://podcast-api.netlify.app/shows');
          const jsonData = await response.json();
          setShowData(jsonData);
          console.log(showData)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData();
    }, [])

  return (
    <>
      <Hero />
      {showData.length > 0 && (
        <Card
        image={showData[0].image} 
        title={showData[0].title}
        seasons={showData[0].seasons}
        genres={showData[0].genres}
        description={showData[0].description}
        />
      )}
    </>
  )
}

export default App;