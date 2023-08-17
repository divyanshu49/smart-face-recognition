import './App.css';
import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkInput from './components/ImageLinkInput/ImageLinkInput';
import Rank from './components/Rank/Rank';
import FaceFinder from './components/FaceFinder/FaceFinder';
import ParticlesBg from 'particles-bg';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


const initialState = {
      imageUrl: '',
      input: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id : '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user : {
      id : data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFaceData.left_col * width,
      topRow: clarifaiFaceData.top_row * height,
      rightCol: width - (clarifaiFaceData.right_col * width),
      bottomRow: height - (clarifaiFaceData.bottom_row * height)
    }
  }

  faceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  } 

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({ route: route })
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3030/imageurl', {
      method : 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({ input : this.state.input })
    })
    .then(response => response.json())
    .then(res => {
      if(res && this.state.input.length!==0){
        fetch('http://localhost:3030/image', {
        method : 'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({ id : this.state.user.id })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries : count }));
      })
      .catch(console.log)
      }
      this.faceBox(this.calculateFaceLocation(res))
    })
    .catch(error => console.log('error', error));
  }

  render() {

    const {isSignedIn, route, imageUrl, box} = this.state;

    return (
      <div className="App">
  
        <ParticlesBg className='particles' num={150} type="cobweb" bg={true} />
  
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home' 
        ? <div>
            <Logo />
            <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
            <ImageLinkInput onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceFinder box={box} imageUrl = {imageUrl} />
          </div>
        : (
          route === 'signin' 
          ? <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
