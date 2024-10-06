import React from 'react'


const Home = () => {

  const onButtonClick = () => {
    
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value= "Login"
        />
      </div>
    </div>
  )
}

export default Home