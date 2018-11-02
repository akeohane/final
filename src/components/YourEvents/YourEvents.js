import React from "react";
import "./YourEvents.css";

const YourEvents = props => (
<div className="cunt">
{props.events.map(results => (
      <div class="card w-75">
      <div class="card-body">
       <h5 class="card-title">{results.name}</h5>
       <p class="card-text">{results.type}</p>
          {/* <a href={results.web_url} class="btn btn-primary" id="read">Read it!</a> */}
          {/* <button type="button" onClick={()=>props.delArtFunc(results._id)} class="btn btn-secondary delete" id="delete">Delete</button> */}
    </div>
</div>
    ))}
</div>



  );
  
  export default YourEvents;
  