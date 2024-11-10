import { useState , useEffect} from 'react'
import './index.css'
import TimerClean from './components/timer-clean'
import TimerDirty from './components/timer-dirty';
import UpgradeButton from './components/upgrade'

function App() {

  const [cookies, setCookies] = useState(0)
  const [cps, setCps] = useState(1);
  const [upgrade, setUpgrade] = useState([])
  const [cantBuy, setCantBuy] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // the callback function inside setCookies gets the CURRENT value of the state variable
      // and returns a value that is the current + 1
      setCookies((current) => current + cps);
    }, 1000);
    return () => clearInterval(interval);
  }, [cps]);
  

  function incrementCookies() {
    setCookies(cookies + 1);
  }

  const upgradeIcons = [
    "https://png.pngtree.com/png-clipart/20230823/original/pngtree-mouse-cursor-symbol-arrow-click-pointer-illustration-isolated-picture-image_8204921.png",
    "https://static.vecteezy.com/system/resources/previews/030/690/551/large_2x/oven-2d-cartoon-illustraton-on-white-background-high-quali-free-photo.jpg",
    "https://ih1.redbubble.net/image.5513187762.5247/st,small,507x507-pad,600x600,f8f8f8.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvptaQ6ufRqLxnFO7VW-Ucxj7gQvxUZic9ag&s",
    "https://thumbs.dreamstime.com/b/cookies-factory-conceptual-vintage-illustration-poster-greeting-holiday-christmas-new-year-computer-graphics-159760414.jpg",
    "https://media.istockphoto.com/id/1185242051/vector/wholemeal-flour-flat-vector-illustration.jpg?s=612x612&w=0&k=20&c=bPv8EhNtNMkuWd3mhdKs9uCSeBQJ4_v7EkxkUZlmd0U=",
    "https://img.freepik.com/premium-photo/time-machine-2d-cartoon-vector-illustration-white-back_889056-29259.jpg?w=360"

]
      
  useEffect( () => {
      const getUpgrade = async () => {
        const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades")
        const data = await response.json()
        // console.log(data)
        
        // setUpgrade(data)
        const dataWithIcons = data.map((item, index) => (
          {...item, icons: upgradeIcons[index] || null }
        ))
        setUpgrade(dataWithIcons)
      }
      console.log(upgrade)
      getUpgrade()
  }, [])

  function restart(){
    setCookies(0)
    setCps(1)
  }

  function buyUpgrade({addCPS, cost}) {
    if (cookies > cost) {
      setCps(cps + addCPS)
      setCantBuy(false)
      setCookies(cookies - cost)
    } else {
      setCantBuy(true)
    };}

  return (
    <>
    <header>
      <h1>Welcome to Cookie Clicker! </h1>
    </header>
    <main>

      <div id='cookieDiv'>
        <button id='cookieBtn' onClick={incrementCookies}>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/048/380/078/small_2x/chocolate-chip-cookie-on-transparent-background-png.png" />
        </button>
        <p>Cookies: {cookies} </p>
        <p>CPS (Cookies Per Second): {cps}</p>
        <div className='options'>
            <UpgradeButton />
            <button onClick={restart} id='restartBtn'>Restart</button>
        </div>
        
     </div>
      
      <div id='upgradeDiv'>
        <h2>Upgrades</h2>
        {upgrade.map((eachItem) =>{
          return (
            <div className='upgrade' key={eachItem.id}>
              <h3>  {eachItem.name}</h3>
              <img onClick={()=>buyUpgrade({addCPS:eachItem.increase, cost:eachItem.cost})} src={eachItem.icons} />
              {/* {cantBuy ? <>
                {setTimeout(() => {
                  <h3>Sorry you cant buy</h3>
                }, 3000)}
              </> 
              : <h3></h3> } */}
              <h3> Cost : {eachItem.cost} </h3>
              <h3> {eachItem.increase} Cookies per second </h3>
            </div>
            )
        })}
      </div>

    </main>
     
        

    {/* <button onClick={showUpgrade} className='upgradeBtn' >
    <img width={120} src='../../src/assets/upgrade-button.jpg' /> {upgrade ? "abc" : "btn"
          }
    </button> */}
    </>
  )
}

export default App
