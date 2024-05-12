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
      {showData.map((show: any) => (
        <Card
          key={show.id}
          image={show.image} 
          title={show.title}
          seasons={show.seasons}
          genres={show.genres}
          description={show.description}
        />
      ))}
    </>
  )
}

export default App;