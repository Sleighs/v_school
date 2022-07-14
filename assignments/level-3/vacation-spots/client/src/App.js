import './App.css';
import Card from './components/Card';

function App() {
  let vacationSpots = [
    {
      place: "Meridian, Idaho",
      price: 40,
      timeToGo: "Spring"
    },{
      place: "Cancun",
      price: 900,
      timeToGo: "Winter"
    },{
      place: "China",
      price: 1200,
      timeToGo: "Fall"
    },{
      place: "Russia",
      price: 1100,
      timeToGo: "Summer"
    },{
      place: "Lebanon",
      price: 400,
      timeToGo: "Spring"
    }
  ]

  return (
    <div className="App">
      {vacationSpots.map((item, index) => 
        <Card 
          place={item.place} 
          price={item.price} 
          timeToGo={item.timeToGo}
          key={index}
        />
      )}
    </div>
  );
}

export default App;
