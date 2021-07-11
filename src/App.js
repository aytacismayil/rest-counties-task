import React ,{useEffect , useState} from 'react';
import './App.css';
import { Table, Button, Dropdown } from "react-bootstrap";


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getDatas()
  }, [])

  const getDatas = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await res.json()
    setItems(data)
  }
  
  const searchData = async term => {
      if(term === '') return
      const res = await fetch(`https://restcountries.eu/rest/v2/name/${term}`)
      const data = await res.json()
      setItems(data)
  }

  const filterByRegion = async region => {
    if(region === 'all') {
      const res = await fetch('https://restcountries.eu/rest/v2/all')
      const data = await res.json()
      setItems(data)
    }else{
      const res = await fetch(`https://restcountries.eu/rest/v2/region/${region}`)
      const data = await res.json()
      setItems(data)
    } 

}
  const sortStraight = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await res.json()
    const sortedData = data.sort((a,b) => a.name > b.name ? 1 : -1)
    setItems(sortedData)
  }

  const sortReverse = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await res.json()
    const sortedData = data.sort((a,b) => a.name < b.name ? 1 : -1)
    setItems(sortedData)
  }

  const deleteCountryfromList = async name => {
    const newData = items.filter(item => item.name !== name);
    setItems(newData)
  }

  return (
  <div className="container">
    <div className="d-flex justify-content-between pt-5 pb-4">
    <div class="col-auto">
      <input className="form-control" type="text" placeholder="Search..."
          onChange={(term) => searchData(term.target.value)}
      />
    </div>
      <div className="d-flex">
        <div>
        <button onClick={() => sortStraight()} className="btn btn-success m-1 mt-0">A-Z</button>
        <button onClick={() => sortReverse()} className="btn btn-success m-1 mt-0">Z-A</button>
        </div>
      
      <div class="col-auto">
      <select className="form-select d-inline" onChange={val => filterByRegion(val.target.value)}>
        <option value="all">Filter by Region</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
      </div>
     
      </div>
      
    </div>
     <Table className="table" id="customers">
       <thead>
          <tr>
                <th>Country</th>
                <th>Region</th>
                <th>NativeName</th>
                <th>flag</th>
                <th>Delete</th>
          </tr>
         
       </thead>
        <tbody>
            {items.map(item => (         
                <tr key={item.name}>
                    <td> {item.name}</td>
                    <td>{item.region}</td>
                    <td>{item.nativeName}</td>
                    <td><img style={{width: "30px"}} src={item.flag}/></td>
                    <td><Button variant="danger" onClick={() => deleteCountryfromList(item.name)}>Delete</Button></td>
                </tr>
            ))}
        </tbody>

    </Table>
  </div>

    );
  }


export default App;