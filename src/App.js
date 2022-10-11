import { useState } from 'react';
import './App.css'
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import particleOptions from './ParticlesOptions';

const API_KEY = '5ef345b6cbf9451f8ab99e665cb1ddce';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
    return container
  }, []);

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {    
    setBox(box);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input)
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "clarifai",
        "app_id": "main"
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": input
                  }
              }
          }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + API_KEY
      },
      body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
      .then(response => response.json())
      .then(result => displayFaceBox(calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
  }

  const onRouteChange = (route) => {
    if(route === 'signout'){
      setIsSignedIn(false);
    } else if(route === 'home') {
      setIsSignedIn(true);
    } 
    setRoute(route);    
  }

  return (
    <div className="App bg-gradient-to-r from-green-400 to-blue-500 h-screen p-4">
      <Particles 
        id="tsparticles"
        className=""
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
      />
      <div className="relative">
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
        {
          route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={onRouteChange} />
            : <Register onRouteChange={onRouteChange} />
          )
        }
      </div>
    </div>
  );
}

export default App;
