// Wait for the window to load
// document.addEventListener('DOMContentLoaded', () => {
//     // The code output
//     const dataEl = document.querySelector( ".data pre" ).innerHTML;
//     // The parent rankings element
//     const tableEl = document.querySelector( ".league-table" );
//     // The table headers
//     const tableHeaderEl = document.querySelector( "#league-standings .header" );
//     // Parse JSON for the code output
//     const dataJSON = JSON.parse( dataEl );
//     // Print a little note in the console
//     console.log( "Data from the front end", dataJSON );
    
//     // All the teams 
//     let teams = dataJSON.data.response[ 0 ].league.standings[ 0 ];
//     // The league logo
//     let leagueLogoURL = dataJSON.data.response[ 0 ].league.logo;
//     // Apply the league logo as a background image inline style
//     tableHeaderEl.style.backgroundImage = `url( ${ leagueLogoURL } )`;
    
//     // Loop through the teams
//     teams.forEach( ( team, index ) => {
//       // Make a div for each team
//       const teamDiv = document.createElement( "div" );
//       // Set up the columns for match results
//       const { played, win, draw, lose, goals } = team.all;
  
//       // Add a class to the parent rankings element
//       teamDiv.classList.add( "team" );
//       // Insert the following markup and data in the parent element
//       teamDiv.innerHTML = `
//         <div class="position">
//           ${ index + 1 }
//         </div>
//         <div class="team-logo">
//           <img src="${ team.team.logo }" />
//         </div>
//         <div class="team-name">${ team.team.name }</div>
//         <div class="stats">
//           <div class="games-played">${ played }</div>
//           <div class="games-won">${ win }</div>
//           <div class="games-drawn">${ draw }</div>
//           <div class="games-lost">${ lose }</div>
//           <div class="goals-for">${ goals.for }</div>
//           <div class="goals-against">${ goals.against }</div>
//           <div class="points">${ team.points }</div>
//         </div>
//         <div class="form-history"></div>
//       `;
      
//       // Stringify the last five match results for a team
//       const form = team.form.split( "" );
      
//       // Loop through the match results
//       form.forEach( ( result ) => {
//         // Make a div for each result
//         const resultEl = document.createElement( "div" );
//         // Add a class to the div
//         resultEl.classList.add( "result" );
//         // Evaluate the results
//         resultEl.innerText = result;
//         // If the result a win
//         if ( result === "W" ) {
//           resultEl.classList.add( "win" );
//         // If the result is a draw
//         } else if ( result === "D" ) {
//           resultEl.classList.add( "draw" );
//         // If the result is a loss
//         } else {
//           resultEl.classList.add( "lost" );
//         }
//         // Append the results to the column
//         teamDiv.querySelector( ".form-history" ).append( resultEl );
//       });
  
//       tableEl.append( teamDiv );
//     });
//   });