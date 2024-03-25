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

  function handleShowAddFriend(){
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend){
    setFriends((friends) => [...friends, friend]);
    //setShowAddFriend(false);
  }

  return(
    <div className="app">
     <div>
       <FriendsList friends = {friends}/>
       {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}

       <button onClick={handleShowAddFriend}> 
        {showAddFriend ? "Close" : "Add friend"} 
       </button>
     </div>  

      <FormSplitBill/>   
    </div>    
  );
}

function FriendsList({friends}){
  //const friends = initialFriends;

  return(
      <ul>
          {friends.map((friend) =>(
              <Friend friend={friend} key={friend.id}/>
          ))}
      </ul>
  );
}

function Friend({friend}) {
  return(
    <li>
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

      <button >Select</button>

    </li>
  );
}


function FormAddFriend (onAddFriend){
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

function FormSplitBill (){
  return(
    <form className="form-split-bill">
      <h2> Split a bill with X</h2>

      <label>Bill value</label>
      <input type="text"/>

      <label>Your expense</label>
      <input type="text"/>

      <label>X's expense</label>
      <input type="text" disabled/>

      <label>who is paying the bill</label>
      <select>
        <option value="user">you</option>
        <option value="friend">X</option>
      </select>
      

      <button>Split bill</button>
    </form>
  );
}import { useState } from "react";


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

  function handleShowAddFriend(){
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend){
    setFriends((friends) => [...friends, friend]);
    //setShowAddFriend(false);
  }

  return(
    <div className="app">
     <div>
       <FriendsList friends = {friends}/>
       {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}

       <button onClick={handleShowAddFriend}> 
        {showAddFriend ? "Close" : "Add friend"} 
       </button>
     </div>  

      <FormSplitBill/>   
    </div>    
  );
}

function FriendsList({friends}){
  //const friends = initialFriends;

  return(
      <ul>
          {friends.map((friend) =>(
              <Friend friend={friend} key={friend.id}/>
          ))}
      </ul>
  );
}

function Friend({friend}) {
  return(
    <li>
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

      <button >Select</button>

    </li>
  );
}


function FormAddFriend (onAddFriend){
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

function FormSplitBill (){
  return(
    <form className="form-split-bill">
      <h2> Split a bill with X</h2>

      <label>Bill value</label>
      <input type="text"/>

      <label>Your expense</label>
      <input type="text"/>

      <label>X's expense</label>
      <input type="text" disabled/>

      <label>who is paying the bill</label>
      <select>
        <option value="user">you</option>
        <option value="friend">X</option>
      </select>
      

      <button>Split bill</button>
    </form>
  );
}