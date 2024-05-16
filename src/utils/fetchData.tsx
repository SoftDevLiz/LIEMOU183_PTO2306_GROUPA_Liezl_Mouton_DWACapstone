import { useEffect } from "react";

const fetchData = (setState: any) => {
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('https://podcast-api.netlify.app/shows');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setState(jsonData);
          } catch (error: any) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);
}

export default fetchData;