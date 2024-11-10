
import { useEffect, useState } from "react";

export default function UpgradeButton({ buyUpgrade }) {

    const [upgrade, setUpgrade] = useState()
 
    return (
      <>
        <button id="buyUpgradeBtn" onClick={buyUpgrade}>Buy Upgrade</button>;
      </>
    ) 
    
  }