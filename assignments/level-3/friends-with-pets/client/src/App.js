import friends from './friends'
import './App.css';

function App() {
  return (
    <div className="App" style={{
      marginTop: '2%',
    }}>
      <div style={{
        color: 'white',
        fontSize: '3em',
        textAlign: 'center',
        margin: '3% auto',
        fontFamily: 'Monaco',
      }}>Friends With Pets</div>
      <FriendList />
    </div>
  );
}

const FriendList = props => {
  return (
    <div className="friend-list__container">
      {friends.map((item, i) => 
        <Friend 
          name={item.name}
          age={item.age}
          pets={item.pets}
          key={i}
        />
      )}
    </div>
  )
}

const Friend = props => {
  const {
    name,
    age,
    pets,
    key
  } = props

  return (
    <div className="friend__container">
      <div>
        <div className="friend__name">{name}</div>
        <div className="friend__age">{age}</div>
      </div> 
      <div className="friend__pets">
        {pets.map((item, i) => 
          <Pet 
            name={item.name} 
            breed={item.breed} 
            key={i}
          />
        )}
      </div>
    </div>
  )
}

const Pet = props => {
  const { name, breed, key} = props

  return (
    <div className="pet__container">
      <div className="pet__name">{name}</div>
      <div className="pet__breed">{breed}</div>
    </div>
  )
}

export default App;
