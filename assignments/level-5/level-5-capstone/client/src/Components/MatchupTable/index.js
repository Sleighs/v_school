import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { ThemeContext } from "../../Context/ThemeContext";
import './style.css';

export default function MatchupTable(props) {
  const { heroData } = useContext(DataContext)
  //const { theme } = useContext(ThemeContext)

  const [heroes, setHeroes] = useState(Object.entries(heroData).sort(
    ((a, b) => (a[1].name > b[1].name) ? 1 : -1)
  ));
  
  useEffect(() => {

    // Hero matchup table

    // Suited for interchangeability between games
    
    // Create a table element and a tbody element
    var tableBody = document.getElementById("counter-table__table");
    var tblBody = document.createElement("tbody");
    
    tableBody.innerHTML = '';

    // Create row one
    var row1 = document.createElement("tr");
    var emptyCell = document.createElement("td");
    var emptyCell2 = document.createElement("td");
    row1.appendChild(emptyCell);
    row1.classList.add('counter-table__table-head');

    // Add hero names to row 1
    for (var a = 0; a < heroes.length; a++){
        var heroNameCell = document.createElement("td");
        heroNameCell.innerHTML = heroes[a][1].name;
        heroNameCell.classList.add('create-table__column-head');
        row1.appendChild(heroNameCell);
    }

    row1.appendChild(emptyCell2);
    
    tableBody.appendChild(row1);

    // Create table rows
    for (var b = 0; b < heroes.length; b++){
        var row = document.createElement("tr");
        var rowClass = 'counter-table__row' + b;

        row.classList.add(rowClass);
        
        var rowMatchups = Object.entries(heroes[b][1]['counters']);

        for (var c = -1; c <= heroes.length; c++){
            var cell = document.createElement("td");
            var colClass = 'counter-table__col' + c;
            var hero; 

            cell.classList.add(colClass);

            // Add hero name before matchup values
            if (c > -1 && c < heroes.length){
                if (heroes[c][1].name === "D.Va"){
                    hero = "Dva"
                } else if (heroes[c][1].name === "Soldier: 76"){
                    hero = "Soldier76"
                } else if (heroes[c][1].name === "Junker Queen"){
                    hero = "JunkerQueen"
                } else if (heroes[c][1].name === "Wrecking Ball"){
                    hero = "WreckingBall"
                } else if (heroes[c][1].name === "Torbjörn"){
                    hero = "Torbjorn"
                } else if (heroes[c][1].name === "McCree"){
                    hero = "Cassidy"
                } else {
                    hero = heroes[c][1].name;
                }
            }

            // Create array of matchups for row
            var matchupNames = [];

            for (var d = 0; d < rowMatchups.length; d++){
                matchupNames.push(rowMatchups[d][0]);
            }

            // Create first and last cell
            if ((c === -1) || (c === heroes.length)){
               //cell.innerHTML = heroes[b][1].name; 
               cell.classList.add('counter-table__row-head');

               if (c === heroes.length){
                   cell.classList.add('counter-table__row-head2')
               }
               row.appendChild(cell);

            } else {
                // Check if cell has a matchup and if so add value to cell
                if (matchupNames.includes(hero)){ 
                    var eleVal = rowMatchups[matchupNames.indexOf(hero)][1]
                    
                    cell.innerHTML = eleVal;

                    switch (eleVal){
                        case '++':
                        case '++*':
                            cell.classList.add('counter-table__td-doubleplus');
                            break;
                        case '--':
                        case '--*':
                            cell.classList.add('counter-table__td-doubleminus');
                            break;
                        case '+':
                        case '+*':    
                            cell.classList.add('counter-table__td-plus');
                            break;
                        case '-':
                        case '-*':
                            cell.classList.add('counter-table__td-minus');
                           break;
                    }
                }

                cell.classList.add('counter-table__value');

                /*
                // Add hover effect to each column
                var colCss = '.' + colClass + ':hover{ background-color:' + 'gray' +' }';
                var colStyle = document.createElement('style');

                if (colStyle.styleSheet) {
                    colStyle.styleSheet.cssText = colCss;
                } else {
                    colStyle.appendChild(document.createTextNode(colCss));
                }
                */

                row.appendChild(cell);

                //document.getElementsByClassName(colClass)[0].appendChild(colStyle);
            }
        }

        tableBody.appendChild(row);

        // Add hover effect to each row
        var rowCss = '.' + rowClass + ':hover{ background-color: rgb(208, 208, 208, 1) }';
        var rowStyle = document.createElement('style');

        if (rowStyle.styleSheet) {
            rowStyle.styleSheet.cssText = rowCss;
        } else {
            rowStyle.appendChild(document.createTextNode(rowCss));
        }

        document.getElementsByClassName(rowClass)[0].appendChild(rowStyle);
    }

    // Add a row of names as last row
    var lastRow = document.createElement("tr");
    var emptyCell3 = document.createElement("td");
    lastRow.appendChild(emptyCell3);
    lastRow.classList.add('counter-table__table-foot');

    for (var e = 0; e < heroes.length; e++){
        var heroNameCell = document.createElement("td");
        heroNameCell.innerHTML = heroes[e][1].name;
        heroNameCell.classList.add('create-table__column-head');
        lastRow.appendChild(heroNameCell);
    }

    tableBody.appendChild(lastRow);
  });

  return (
    <>
    {heroData && 
    <div className="counter-table">
        <div className="counter-table__table-container">
            <span className="counter-table__table-y-title">Heroes {/*&#8592; Heroes &#8594;*/}</span>
            <div className="counter-table__table-main">
                <span className="counter-table__table-x-title">Counters {/*&#8592; Counters &#8594;*/}</span>  
                <div id="counter-table__y-list">
                    <span className="counter-table__y-list-name-head"></span>
                    <span className="counter-table__y-list-name">Ana</span>
                    <span className="counter-table__y-list-name">Ashe</span>
                    <span className="counter-table__y-list-name">Baptiste</span>
                    <span className="counter-table__y-list-name">Bastion</span>
                    <span className="counter-table__y-list-name">Brigitte</span>
                    <span className="counter-table__y-list-name">Cassidy</span>
                    <span className="counter-table__y-list-name">D.Va</span>
                    <span className="counter-table__y-list-name">Doomfist</span>
                    <span className="counter-table__y-list-name">Echo</span>
                    <span className="counter-table__y-list-name">Genji</span>
                    <span className="counter-table__y-list-name">Hanzo</span>
                    <span className="counter-table__y-list-name">Junker Queen</span>
                    <span className="counter-table__y-list-name">Junkrat</span>
                    <span className="counter-table__y-list-name">Kiriko</span>
                    <span className="counter-table__y-list-name">Lucio</span>
                    <span className="counter-table__y-list-name">Mei</span>
                    <span className="counter-table__y-list-name">Mercy</span>
                    <span className="counter-table__y-list-name">Moira</span>
                    <span className="counter-table__y-list-name">Orisa</span>
                    <span className="counter-table__y-list-name">Pharah</span>
                    <span className="counter-table__y-list-name">Reaper</span>
                    <span className="counter-table__y-list-name">Reinhardt</span>
                    <span className="counter-table__y-list-name">Roadhog</span>
                    <span className="counter-table__y-list-name">Sigma</span>
                    <span className="counter-table__y-list-name">Sojourn</span>
                    <span className="counter-table__y-list-name">Soldier: 76</span>
                    <span className="counter-table__y-list-name">Sombra</span>
                    <span className="counter-table__y-list-name">Symmetra</span>
                    <span className="counter-table__y-list-name">Torbjorn</span>
                    <span className="counter-table__y-list-name">Tracer</span>
                    <span className="counter-table__y-list-name">Widowmaker</span>
                    <span className="counter-table__y-list-name">Winston</span>
                    <span className="counter-table__y-list-name">Wrecking Ball</span>
                    <span className="counter-table__y-list-name">Zarya</span>
                    <span className="counter-table__y-list-name">Zenyatta</span>
                </div>
                 <table id="counter-table__table" ></table>
            </div>
        </div>
        

        <div className="counter-table__legend">
            <div>
                <div className="counter-table__legend-td">
                    {'++ very strong'}
                </div>
                <div className="counter-table__legend-td">
                    {'-- very weak'}
                </div>
                <div className="counter-table__legend-td">
                    {'+ strong'}
                </div>
                <div className="counter-table__legend-td">
                    {'- weak'}
                </div>
            </div>
        </div>
    </div>
    }
    </>
  );
}