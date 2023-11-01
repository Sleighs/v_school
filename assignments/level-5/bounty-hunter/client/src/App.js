import './App.css';
import { useContext, useEffect } from 'react';
import { BountyForm, BountyList } from './Components';
import { DataContext } from './Contexts/DataContext';

function App() {
  const {getData} = useContext(DataContext);

  var reqCount = 0;

  useEffect(() => {
    getData()
    reqCount = reqCount + 1
    // eslint-disable-line react-hooks/exhaustive-deps
  },[reqCount])
  
  return (
    <div className="App">
      <div className="bountylist-container">
        <h2>Bounties</h2>
        <BountyList /> 
      </div>
      <div className="bountyform-container">
        <h2>Add Bounty</h2>
        <BountyForm />
      </div>  
    </div>
  );
}

export default App;
