import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState<any>({message: "...Carregando"});

  useEffect(() => {
    fetch("http://localhost:4000/api")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });

  }, []);

  //setData("...Consultando a API");

  return (
    <div>
      <h1>
        {data.message}
      </h1>
    </div>
  );
}

export default App;
