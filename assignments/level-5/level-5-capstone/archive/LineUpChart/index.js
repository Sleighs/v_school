import React, { useContext, useEffect, useRef, useState } from "react";
import heroPics from "../../Assets/overwatch-icons";
import { DataContext } from "../../Context/DataContext";
import { ThemeContext } from "../../Context/ThemeContext";
import './style.css';
import Popup from 'reactjs-popup';
import styled from 'styled-components';


export default function LineUpChart(props) {
  const { heroData,lineUpHeroes, setLineUpHeroes } = useContext(DataContext)
  const { theme } = useContext(ThemeContext)

  const [heroes, setHeroes] = useState(Object.entries(heroData).sort(
    ((a, b) => (a[1].name > b[1].name) ? 1 : -1)
  ));
  const [test, setTest] = useState(0)
  
  useEffect(() => {
    console.log('test', test)
    // Hero matchup table

    // Suited for interchangeability between games

    // Create a table element and a tbody element
    var tableBody = document.getElementById("lineup-table__table");
    var tblBody = document.createElement("lineup-tbody");
    
    tableBody.innerHTML = '';

    // Create row one
    var row1 = document.createElement("tr");
    var emptyCell = document.createElement("td");
    var emptyCell2 = document.createElement("td");
    row1.appendChild(emptyCell);
    row1.classList.add('lineup-table__table-head');

    lineUpHeroes.forEach((hero, i) => {
        var heroNameCell = document.createElement("td");
        heroNameCell.innerHTML = lineUpHeroes[i];
        heroNameCell.classList.add('lineup-table__column-head');
        //row1.appendChild(heroNameCell);
    })

    row1.appendChild(emptyCell2);
    
    tableBody.appendChild(row1);

    // Create table rows
    for (var b = 0; b < heroes.length; b++){
        var row = document.createElement("tr");
        var rowClass = 'lineup-table__row' + b;

        row.classList.add(rowClass);
        
        var rowMatchups = Object.entries(heroes[b][1]['counters']);

        var firstCell = document.createElement("td");
        firstCell.innerHTML = heroes[b][1].name; 
        firstCell.classList.add('lineup-table__row-head');
        row.appendChild(firstCell);

        // Create table columns
            // add cell to row if item exists
        lineUpHeroes.forEach((hero, i) => {
            var cell = document.createElement("td");
            var colClass = 'lineup-table__col' + i;

            cell.classList.add(colClass);

            // Create array of matchups for row
                //Get matchup from rowMatchups of hero using hash table and add value to cell
            
            // Get indexes of counters object
            var hash = {};
            for (var i = 0 ; i < rowMatchups.length; i += 1) {
                hash[rowMatchups[i][0]] = i;
            }

            var val = hero;
            var eleVal = '';

            // If index of hero exists set td value to counter value
            if (hash.hasOwnProperty(val)) {
                eleVal = rowMatchups[hash[val]][1];
            }
            
            cell.innerHTML = eleVal;

            // Add style to value td
            switch(eleVal){
                case '++':
                case '++*':
                    cell.classList.add('lineup-table__td-doubleplus');
                    break;
                case '--':
                case '--*':
                    cell.classList.add('lineup-table__td-doubleminus');
                    break;
                case '+':
                case '+*':    
                    cell.classList.add('lineup-table__td-plus');
                    break;
                case '-':
                case '-*':
                    cell.classList.add('lineup-table__td-minus');
                    break;
            }
            cell.classList.add('lineup-table__value');

            row.appendChild(cell);
        })
        
        // Add empty cell
        var emptyCell3 = document.createElement("td");
        var emptyCell3Class = 'lineup-empty2-col';
        emptyCell3.classList.add(emptyCell3Class);
        row.appendChild(emptyCell3);

        // Add archetype cell
        var archetypeCell = document.createElement("td");
        var archCellClass = 'lineup-table__archetype-col';
        archetypeCell.classList.add(archCellClass);
        archetypeCell.innerText = String(heroes[b][1]['archetype']);
        row.appendChild(archetypeCell);
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
        
        // Run analyzer on hero  
    }

    // Add a row of names as last row
    var lastRow = document.createElement("tr");
    var medianCell = document.createElement("td");
    lastRow.appendChild(medianCell);
    lastRow.classList.add('lineup-table__table-foot');
    
    for (var e = 0; e < heroes.length; e++){
      if (lineUpHeroes.includes(heroes[e][1].name)){  
        var lastHeroNameCell = document.createElement("td");
        lastHeroNameCell.innerHTML = heroes[e][1].name;
        lastHeroNameCell.classList.add('lineup-create-table__column-head');
        //lastRow.appendChild(lastHeroNameCell);
      }
    }

    tableBody.appendChild(lastRow);
  });

  return (
    <>
    {heroData && 
    <div className="lineup-table">
        <hr id="lineup-hr"/>
        
        <h2 id="lineup-table__title" className={`__title ${theme}__title`}>Line Up Analyzer</h2>
        
        <p className="lineup-table__summary">
            {'The chart below shows all of the heroes and how they matchup against other heroes. '}
        </p>

        <div className="hero-lineup-selection">
            {lineUpHeroes.map((item, i) =>
                <div>
                    <HeroLineupSelect lineUpIndex={i} key={i} test={test} setTest={setTest}/>
                    <HeroSelectionPopOut lineUpIndex={i} key={i+5} />
                </div>
            )}
        </div>
        
        <table id="lineup-table__table" ></table>

        <div className="lineup-table__legend">
            <div>
                <div className="lineup-table__legend-td">
                    {'++ very strong'}
                </div>
                <div className="lineup-table__legend-td">
                    {'-- very weak'}
                </div>
                <div className="lineup-table__legend-td">
                    {'+ strong'}
                </div>
                <div className="lineup-table__legend-td">
                    {'- weak'}
                </div>
            </div>
        </div>
    </div>
    }
    </>
  );
}


const HeroLineupSelect = ({lineUpIndex, test, setTest}, props) => {
  const { 
    heroData, 
    lineUpHeroes, 
    setLineUpHeroes 
  } = useContext(DataContext)

  const listToggleRef = useRef()

  const [openHeroList, setOpenHeroList] = useState(false)
  const [picUrl, setPicUrl] = useState(`url(${heroPics[lineUpHeroes[lineUpIndex]]})`)

  useEffect(()=>{
    setTest(prev => prev += 1)

    //setPicUrl(`url(${heroPics[lineUpHeroes[lineUpIndex]]})`)
    
    //console.log(test)

    //console.log('ref',listToggleRef)

    document.addEventListener('mouseup', (e)=>{
        var classes = e.target.classList
        /*if (
            !classes.includes('hero-lineup-select__container')
           || 
           !classes.includes('hero-lineup-select__container-name-text')
        
            ){
            setOpenHeroList(false)
            console.log('mouse up true', e.target)
        }*/

        //hero-lineup-select__container
        //hero-lineup-select__container-name-text

        //console.log({
                //title: 'mouse up', 
            //classes: classes,
            //e.target.classList, 
            //listToggleRef.current.classList,
            //classes.includes('hero-lineup-select__container'),
            //classes.includes('hero-lineup-select__container-name-text')
        //})
    })

  }, [lineUpHeroes, openHeroList])

  const closeModal = () => setOpenHeroList(false);

  /*const StyledPopup = styled(Popup)`
    // use your custom style for ".popup-overlay"
    &-overlay {
        
    }
    // use your custom style for ".popup-content"
    &-content {
        margin-left: 5%;
        background-color: red;
        padding: 5%;
        margin: 0;
        height: 50px;
        width: 50px;
        
    }
`;*/

  return (
    <div 
        className="hero-lineup-select__container"
        style={{
            backgroundImage: picUrl
        }}
        onClick={() => {
            /*if (openHeroList === false){
                //setOpenHeroList(true)
            } else {
                //setOpenHeroList(false)
            } */  
        }}
        ref={listToggleRef}
    >
        <div className="hero-lineup-select__container-name-text">{lineUpHeroes[lineUpIndex]}</div>
        
        {/*openHeroList
            ? <HeroSelectionPopOut 
                lineUpIndex={lineUpIndex} 
                setOpenHeroList={setOpenHeroList}
                setPicUrl={setPicUrl}
            />  
    : <></>*/}

        {/*<StyledPopup 
            open={openHeroList} 
            closeOnDocumentClick 
            onClose={closeModal}
            position="top left"
            offsetX={150}
            offsetY={5}
        >
            Words
        </StyledPopup>*/}
    </div>
  )
}

const HeroSelectionPopOut = ({
    lineUpIndex, 
    //setOpenHeroList
}, props) => {
    const { 
        heroData, 
        lineUpHeroes, 
        setLineUpHeroes 
    } = useContext(DataContext)

    const heroes = Object.entries(heroData)
    const [heroArr, setHeroArr] = useState([])
    const [selectVal, setSelectVal] = useState(lineUpHeroes[lineUpIndex])
    //const closeList = () => setOpenHeroList(false)

    useEffect(() => {
        var newArr = []
        heroes.forEach(item => {
            newArr.push(item[1].name)
        })
        setHeroArr(newArr)
        /*console.log({
            heroes: heroes, 
            heroArr: heroArr
        })*/
    }, [lineUpHeroes])

    return (
        <div className="hero-lineup-select__popout">
            <div className="hero-lineup-select__select-container">
                <select 
                    className="hero-lineup-select__select-input"
                    value={selectVal}
                    onChange={(e) =>{
                        setLineUpHeroes(prev => {
                            var newList = prev
                            newList.splice(lineUpIndex, 1, e.target.value)
                            return newList
                        })
                        setSelectVal(e.target.value)
                        
                        //console.log(e.target.value, lineUpHeroes)
                        //closeList()
                    }}
                >
                    <optgroup label="Tanks">
                        <option value="Dva">D.Va</option>
                        <option value="Doomfist">Doomfist</option>
                        <option value="JunkerQueen">Junker Queen</option>
                        <option value="Orisa">Orisa</option>
                        <option value="Reinhardt">Reinhardt</option>
                        <option value="Roadhog">Roadhog</option>
                        <option value="Sigma">Sigma</option>
                        <option value="WreckingBall">Wrecking Ball</option>
                        <option value="Zarya">Zarya</option>
                    </optgroup>
                    <optgroup label="Damage">
                        <option value="Ashe">Ashe</option>
                        <option value="Cassidy">Cassidy/McCree</option>
                        <option value="Genji">Genji</option>
                        <option value="Hanzo">Hanzo</option>
                        <option value="Junkrat">Junkrat</option>
                        <option value="Torbjorn">Torbjorn</option>
                        <option value="Tracer">Tracer</option>
                        <option value="Soldier76">Soldier: 76</option>
                        <option value="Symmetra">Symmetra</option>
                        <option value="Widowmaker">Widowmaker</option>
                    </optgroup>
                    <optgroup label="Support">
                        <option value="Ana">Ana</option>
                        <option value="Baptiste">Baptiste</option>
                        <option value="Brigitte">Brigitte</option>
                        <option value="Kiriko">Kiriko</option>
                        <option value="Lucio">Lucio</option>
                        <option value="Mercy">Mercy</option>
                        <option value="Moira">Moira</option>
                        <option value="Zenyatta">Zenyatta</option>
                    </optgroup>
                </select>    
            </div>

            {/*heroArr.map((item, i) => 
                <div className="hero-lineup-select__popout-name" 
                    key={i} 
                    style={{
                        background: (i % 2 ? 'white' : 'lightgray')
                    }}
                    onClick={()=>{
                        setLineUpHeroes(prev => {
                            var newList = prev
                            newList.splice(lineUpIndex, 1, item)
                            return newList
                        })
                        console.log(item, lineUpHeroes)
                        closeList()
                    }}
                >
                    <span className="hero-lineup-select__popout-text">{item}</span>
                </div>
                )*/}
        </div>
    )
}