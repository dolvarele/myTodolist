import { useState } from "react";


const initialFriends = [
  {
      id: 112344,
      name: "Gabi",
      image: "",
      balance: -7,
  },
  {
      id: 986343,
      name: "Emma",
      image: "",
      balance: 25,
  },
  {
      id: 438750,
      name: "Olivier",
      image: "",
      balance: 0,
  },
];

function button({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

export default function App(){
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend(){
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend){
    setFriends((friends) => [...friends, friend]);
    //setShowAddFriend(false);
  }

  function handleSelection(friend){
    //setSelectedFriend(friend);
    //cur = current = l'actuel et ? signifi "peut ne pas exister"
    setSelectedFriend ((cur) => 
      (cur?.id === friend.id ? null : friend));

      //fermer le box Addfreiend lorsqu'on click sur selectfriend
      setShowAddFriend(false);
    }

    function handleSplitBill(value){
      //console.log(value);
      setFriends((friends) =>
        friends.map((friend) =>
          friend.id === selectedFriend.id
            ?{...friend, balance: friend.balance + value}
            : friend
        )
      );

      setSelectedFriend(null);// to close the billForm
    }

  return(
    <div className="app">
     <div className="sidebar">
       <FriendsList friends = {friends}
        onSelection ={handleSelection}
        selectedFriend={selectedFriend} />

       {showAddFriend && <FormAddFriend onAddFriend ={handleAddFriend}/>}

       <button onClick={handleShowAddFriend}> 
        {showAddFriend ? "Close" : "Add friend"} 
       </button>
     </div>  

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}
        onSplitBill = {handleSplitBill}/>}   
    </div>    
  );
}

function FriendsList({friends, onSelection, selectedFriend }){
  //const friends = initialFriends;

  return(
      <ul>
          {friends.map((friend) =>(
              <Friend friend={friend} key={friend.id}
                onSelection ={onSelection}
                selectedFriend={selectedFriend} />
          ))}
      </ul>
  );
}

function Friend({friend, onSelection, selectedFriend}) {
 
  const isSelected =  selectedFriend?.id === friend.id;
  // selectedFriend?.id signifie que l'id peut ne pas exister
  

  return(
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)} euros
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
         {friend.name} owes you {Math.abs(friend.balance)} euros
        </p>
      )}
      {friend.balance === 0 && 
        <p>
          you and {friend.name} are even
        </p>
      }

      <button onClick={() => onSelection(friend)} >
        {isSelected ? "Close" : "Select"}</button>

    </li>
  );
}


function FormAddFriend ({onAddFriend}){
  const [name, setName] = useState ("");
  const [image, setImage] = useState("mettre un url pour intialiser");


  function handleSubmit(e){
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}? = ${id}`,
      balance:0,
    };

    onAddFriend(newFriend);
    //console.log(newFriend);

    setName("");
    setImage("mettre une ulr par defaut");

  }

  return(
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> friend name</label>
      <input type="text"
        value={name}
        onChange= {(e) => setName(e.target.value)}
      />

      <label> image URL</label>
      <input type="text"
      value={image}
      onChange = {(e) => setImage(e.target.value)}/>

      <button >Add</button>
    </form>
  );
}

function FormSplitBill ({selectedFriend, onSplitBill}){
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
   
  const [whoIsPaying, setWhoIsPaying] = useState("User");

  function handleSubmit (e){
    e.preventDefault();

    if( !bill || !paidByUser) return;
    onSplitBill(whoIsPaying =="user" ? paidByFriend : -paidByUser);
  }

  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2> Split a bill with {selectedFriend.name}</h2>

      <label>Bill value</label>
      <input type="text"
        value={bill}
        onChange ={(e) => setBill(Number(e.target.value))} 
      />

      <label>Your expense</label>
      <input type="text"
        value={paidByUser}
        onChange ={(e) => 
          setPaidByUser(
          Number(e.target.value) > bill ? paidByUser :
          Number(e.target.value))
         } 
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>who is paying the bill</label>
      <select value={whoIsPaying}
      onChange ={(e) => setWhoIsPaying(e.target.value)}> 
        <option value="user">you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      

      <button>Split bill</button>
    </form>
  );
}