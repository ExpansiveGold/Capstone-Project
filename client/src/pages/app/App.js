import React from "react";
import axios from "axios";
import './App.css';

function App() {

  axios.get('/admin/users', {
    responseType: 'json'
  })
  .then(function(res) {
    console.log(res, '^^^^^^^^^^^^^^^^^^^ Front end Axios ^^^^^^^^^^^^^^^^^^^^^')
  })

  return (
    <div>
      Chess
    </div>
  )
}

export default App