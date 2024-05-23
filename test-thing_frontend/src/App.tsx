import './App.css'
import Axios from 'axios';
import { useState } from 'react';

function App() {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [message, setMessage] = useState<string>('Test Thing 1 2 3 ...');
  const [text, setText] = useState<string>('Test Thing 1 2 3 ...');

  const testTrigger = () => {
    Axios.get('https://test-thing-app.azurewebsites.net/api/test_trigger', {
      params: {
        name
      }
    }).then((response) => {
      if(response.status === 200){
        setMessage(response.data);
      }
    });
  };

  const fakeBrowse = () => {
    Axios.get('https://test-thing-app.azurewebsites.net/api/fake_browse', {
      params: {
        category
      }
    }).then((response) => {
      if(response.status === 200){
        setText(response.data);
      }
    });
  };

  return (
    <>
      <div className='w-100'>
        <div className='test-emoji'>🧪</div>
        <h1>Test Thing</h1>
      </div>
      <br />
      <input placeholder='Name' onChange={(event) => setName(event.target.value)} value={name} className='test-input' />
      <div className="card">
        <button onClick={ testTrigger }>
          Get
        </button>
        <p>
          { message }
        </p>
      </div>
      <br />
      <input placeholder='Category' onChange={(event) => setCategory(event.target.value)} value={category} className='test-input' />
      <div className="card">
        <button onClick={ fakeBrowse }>
          Get
        </button>
        <p>
          { text }
        </p>
      </div>
    </>
  )
}

export default App
