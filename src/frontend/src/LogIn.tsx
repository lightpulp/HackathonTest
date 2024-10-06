import { useState } from 'react';

function LogIn_Button() {
  return (

  );
}

export default function LogIn(event: any) {
  return (
    <div>
      
      <form action="#" onSubmit={LogIn}>
        <label htmlFor="userName">Enter your Username: &nbsp;</label>
        <input id="userName" alt="name" type="text" />
        <label htmlFor="userPassword">Enter your Password: &nbsp;</label>
        <input id="name" alt="password" type="password" />
        <button type="submit">LogIn</button>
      </form>
      
    </div>
  );
}


export default LogIn;
