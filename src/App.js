import React, { useEffect,useState , useRef} from 'react';
import logo from './logo.svg';
import './App.css';

const Auto = () => {
  const [display,setDisplay] = useState(false);
  const [option, setOption]  = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef (null);

  useEffect(() => {
    const pokemon = []
    const promises = new Array(20)
    .fill()
    .map((v,i) => 
    fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`))
    Promise.all(promises).then(pokemonArr => {
      return pokemonArr.map(value => value.json()
      .then(({name, sprites:{front_default:sprite}}) =>
      pokemon.push({name, sprite})
      ))
    })
    setOption(pokemon);
  }, [])

  useEffect ((poke) => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  const handleClickOutside = event => {
    const {current : wrap } = wrapperRef
    if (wrap && !wrap.contains(event.target)){
      setDisplay(false);
    }
  }

  const setPokeDex = poke => {
    setSearch(poke)
    setDisplay(false)
  }
  return (
    <div ref={wrapperRef} className="flex-container flex-colomn pos-rel">
      <input id="auto" onClick={()=> setDisplay(!display)}
       placeholder="type search"
       value = { search }
       onChange={(event) => setSearch(event.target.value)}/>
      {
        display && (
          <div className="autoContainer">
            {
              option.filter(({name})=> name.indexOf(search.toLocaleLowerCase()) > -1).map((v,i) => {
                return <div onClick={ () => setPokeDex(v.name)} 
                className="option" 
                key= {i}
                tabIndex="0"> 
                  <span>{v.name }</span>
                  <img src= { v.sprite} alt="pokemon" />
                </div>
              }) 
            }
          </div>
        )
      }
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <h1>Custom auto complete React</h1>
      <div className="logo"></div>
      <div className="auto-container">
        <Auto/>
        </div>
    </div>
  );
}

export default App;
