import React from "react";
import axios from "axios";

function App() {

  axios.get('/users', {
    responseType: 'json'
  })
  .then(function(res) {
    console.log(res)
  })

  return (
    <div>
      Hello, World
    </div>
  )
}

export default App