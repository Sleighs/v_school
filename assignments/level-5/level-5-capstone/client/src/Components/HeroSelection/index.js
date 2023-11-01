import React, { useContext, useEffect, useState } from "react";
import './style.css';

import heroPics from "../../Assets/overwatch-icons";
import { useNavigate } from "react-router-dom";

export default function HeroSelection(props) {
  const [highlightedHero, setHighlightedHero] = useState(null);

  const navigate = useNavigate();

  const getHeroData = (e, name) => {
    navigate('/heroes/' + name)
  }

  useEffect(()=>{
    // Create elements for each hero to select and view matchups 
    var tableRowEle = document.querySelectorAll('.hero-selection__table-row-data');

    var imgAna = document.createElement('img');
    var imgAshe = document.createElement('img');
    var imgBaptiste = document.createElement('img');
    var imgBastion = document.createElement('img');
    var imgBrigitte = document.createElement('img');
    var imgDva = document.createElement('img');
    var imgDoomfist = document.createElement('img');
    var imgEcho = document.createElement('img');
    var imgGenji = document.createElement('img');
    var imgHanzo = document.createElement('img');
    var imgJunkrat = document.createElement('img');
    var imgJunkerQueen = document.createElement('img');
    var imgKiriko = document.createElement('img');
    var imgLucio = document.createElement('img');
    var imgCassidy = document.createElement('img');
    var imgMei = document.createElement('img');
    var imgMercy = document.createElement('img');
    var imgMoira = document.createElement('img');
    var imgOrisa = document.createElement('img');
    var imgPharah = document.createElement('img');
    var imgReaper = document.createElement('img');
    var imgReinhardt = document.createElement('img');
    var imgRoadhog = document.createElement('img');
    var imgSigma = document.createElement('img');
    var imgSojourn = document.createElement('img');
    var imgSoldier76 = document.createElement('img');
    var imgSombra = document.createElement('img');
    var imgSymmetra = document.createElement('img');
    var imgTorbjorn = document.createElement('img');
    var imgTracer = document.createElement('img');
    var imgWidowmaker = document.createElement('img');
    var imgWinston = document.createElement('img');
    var imgWreckingBall = document.createElement('img');
    var imgZarya = document.createElement('img');
    var imgZenyatta = document.createElement('img');

    // Clear container
    tableRowEle[0].innerHTML = '';
    tableRowEle[1].innerHTML = '';
    tableRowEle[2].innerHTML = '';

    // Add classname to img elements
    imgDva.classList.add('hero-profile__hero-thumbnail');
    imgJunkerQueen.classList.add('hero-profile__hero-thumbnail');
    imgOrisa.classList.add('hero-profile__hero-thumbnail');
    imgReinhardt.classList.add('hero-profile__hero-thumbnail');
    imgRoadhog.classList.add('hero-profile__hero-thumbnail');
    imgSigma.classList.add('hero-profile__hero-thumbnail');
    imgWinston.classList.add('hero-profile__hero-thumbnail');
    imgWreckingBall.classList.add('hero-profile__hero-thumbnail');
    imgZarya.classList.add('hero-profile__hero-thumbnail');
    
    imgAshe.classList.add('hero-profile__hero-thumbnail');
    imgBastion.classList.add('hero-profile__hero-thumbnail');
    imgDoomfist.classList.add('hero-profile__hero-thumbnail');
    imgEcho.classList.add('hero-profile__hero-thumbnail');
    imgGenji.classList.add('hero-profile__hero-thumbnail');
    imgHanzo.classList.add('hero-profile__hero-thumbnail');
    imgJunkrat.classList.add('hero-profile__hero-thumbnail');
    imgCassidy.classList.add('hero-profile__hero-thumbnail');
    imgMei.classList.add('hero-profile__hero-thumbnail');
    imgPharah.classList.add('hero-profile__hero-thumbnail');
    imgReaper.classList.add('hero-profile__hero-thumbnail');
    imgSojourn.classList.add('hero-profile__hero-thumbnail');
    imgSoldier76.classList.add('hero-profile__hero-thumbnail');
    imgSombra.classList.add('hero-profile__hero-thumbnail');
    imgSymmetra.classList.add('hero-profile__hero-thumbnail');
    imgTorbjorn.classList.add('hero-profile__hero-thumbnail');
    imgTracer.classList.add('hero-profile__hero-thumbnail');
    imgWidowmaker.classList.add('hero-profile__hero-thumbnail');

    imgAna.classList.add('hero-profile__hero-thumbnail');
    imgBaptiste.classList.add('hero-profile__hero-thumbnail');
    imgBrigitte.classList.add('hero-profile__hero-thumbnail');
    imgKiriko.classList.add('hero-profile__hero-thumbnail');
    imgLucio.classList.add('hero-profile__hero-thumbnail');
    imgMercy.classList.add('hero-profile__hero-thumbnail');
    imgMoira.classList.add('hero-profile__hero-thumbnail');
    imgZenyatta.classList.add('hero-profile__hero-thumbnail');

    // Add source to image elements
    imgAna.src = heroPics.Ana;
    imgAshe.src = heroPics.Ashe;
    imgBaptiste.src = heroPics.Baptiste;
    imgBastion.src = heroPics.Bastion;
    imgBrigitte.src = heroPics.Brigitte;
    imgDva.src = heroPics.Dva;
    imgDoomfist.src = heroPics.Doomfist;
    imgEcho.src = heroPics.Echo;
    imgGenji.src = heroPics.Genji;
    imgHanzo.src = heroPics.Hanzo;
    imgJunkrat.src = heroPics.Junkrat;
    imgJunkerQueen.src = heroPics.JunkerQueen;
    imgKiriko.src = heroPics.Kiriko;
    imgLucio.src = heroPics.Lucio;
    imgCassidy.src = heroPics.McCree;
    imgMei.src = heroPics.Mei;
    imgMercy.src = heroPics.Mercy;
    imgMoira.src = heroPics.Moira;
    imgOrisa.src = heroPics.Orisa;
    imgPharah.src = heroPics.Pharah;
    imgReaper.src = heroPics.Reaper;
    imgReinhardt.src = heroPics.Reinhardt;
    imgRoadhog.src = heroPics.Roadhog;
    imgSigma.src = heroPics.Sigma;
    imgSojourn.src = heroPics.Sojourn;
    imgSoldier76.src = heroPics.Soldier76;
    imgSombra.src = heroPics.Sombra;
    imgSymmetra.src = heroPics.Symmetra;
    imgTorbjorn.src = heroPics.Torbjorn;
    imgTracer.src = heroPics.Tracer;
    imgWidowmaker.src = heroPics.Widowmaker;
    imgWinston.src = heroPics.Winston;
    imgWreckingBall.src = heroPics.WreckingBall;
    imgZarya.src = heroPics.Zarya;
    imgZenyatta.src = heroPics.Zenyatta;

    imgAna.setAttribute('title', 'Ana');
    imgAshe.setAttribute('title', 'Ashe');
    imgBaptiste.setAttribute('title', 'Baptiste');
    imgBastion.setAttribute('title', 'Bastion');
    imgBrigitte.setAttribute('title', 'Brigitte');
    imgDva.setAttribute('title', 'Dva');
    imgDoomfist.setAttribute('title', 'Doomfist');
    imgEcho.setAttribute('title', 'Echo');
    imgGenji.setAttribute('title', 'Genji');
    imgHanzo.setAttribute('title', 'Hanzo');
    imgJunkrat.setAttribute('title', 'Junkrat');
    imgJunkerQueen.setAttribute('title', 'JunkerQueen');
    imgKiriko.setAttribute('title', 'Kiriko');
    imgLucio.setAttribute('title', 'Lucio');
    imgCassidy.setAttribute('title', 'Cassidy');
    imgMei.setAttribute('title', 'Mei');
    imgMercy.setAttribute('title', 'Mercy');
    imgMoira.setAttribute('title', 'Moira');
    imgOrisa.setAttribute('title', 'Orisa');
    imgPharah.setAttribute('title', 'Pharah');
    imgReaper.setAttribute('title', 'Reaper');
    imgReinhardt.setAttribute('title', 'Reinhardt');
    imgRoadhog.setAttribute('title', 'Roadhog');
    imgSigma.setAttribute('title', 'Sigma');
    imgSojourn.setAttribute('title', 'Sojourn');
    imgSoldier76.setAttribute('title', 'Soldier76');
    imgSombra.setAttribute('title', 'Sombra');
    imgSymmetra.setAttribute('title', 'Symmetra');
    imgTorbjorn.setAttribute('title', 'Torbjorn');
    imgTracer.setAttribute('title', 'Tracer');
    imgWidowmaker.setAttribute('title', 'Widowmaker');
    imgWinston.setAttribute('title', 'Winston');
    imgWreckingBall.setAttribute('title', 'WreckingBall');
    imgZarya.setAttribute('title', 'Zarya');
    imgZenyatta.setAttribute('title', 'Zenyatta');

    // Add onclick to image elements
    imgAna.onclick = (e)=>{getHeroData(e, 'Ana')};
    imgAshe.onclick = (e)=>{getHeroData(e, 'Ashe')};
    imgBaptiste.onclick = (e)=>{getHeroData(e, 'Baptiste')};
    imgBastion.onclick = (e)=>{getHeroData(e, 'Bastion')};
    imgBrigitte.onclick = (e)=>{getHeroData(e, 'Brigitte')};
    imgDva.onclick = (e)=>{getHeroData(e, 'Dva')};
    imgDoomfist.onclick = (e)=>{getHeroData(e, 'Doomfist')};
    imgEcho.onclick = (e)=>{getHeroData(e, 'Echo')};
    imgGenji.onclick = (e)=>{getHeroData(e, 'Genji')};
    imgHanzo.onclick = (e)=>{getHeroData(e, 'Hanzo')};
    imgJunkrat.onclick = (e)=>{getHeroData(e, 'Junkrat')};
    imgJunkerQueen.onclick = (e)=>{getHeroData(e, 'JunkerQueen')};
    imgKiriko.onclick = (e)=>{getHeroData(e, 'Kiriko')};
    imgLucio.onclick = (e)=>{getHeroData(e, 'Lucio')};
    imgCassidy.onclick = (e)=>{getHeroData(e, 'Cassidy')};
    imgMei.onclick = (e)=>{getHeroData(e, 'Mei')};
    imgMercy.onclick = (e)=>{getHeroData(e, 'Mercy')};
    imgMoira.onclick = (e)=>{getHeroData(e, 'Moira')};
    imgOrisa.onclick = (e)=>{getHeroData(e, 'Orisa')};
    imgPharah.onclick = (e)=>{getHeroData(e, 'Pharah')};
    imgReaper.onclick = (e)=>{getHeroData(e, 'Reaper')};
    imgReinhardt.onclick = (e)=>{getHeroData(e, 'Reinhardt')};
    imgRoadhog.onclick = (e)=>{getHeroData(e, 'Roadhog')};
    imgSigma.onclick = (e)=>{getHeroData(e, 'Sigma')};
    imgSojourn.onclick = (e)=>{getHeroData(e, 'Sojourn')};
    imgSoldier76.onclick = (e)=>{getHeroData(e, 'Soldier76')};
    imgSombra.onclick = (e)=>{getHeroData(e, 'Sombra')};
    imgSymmetra.onclick = (e)=>{getHeroData(e, 'Symmetra')};
    imgTorbjorn.onclick = (e)=>{getHeroData(e, 'Torbjorn')}; //Torbjörn
    imgTracer.onclick = (e)=>{getHeroData(e, 'Tracer')};
    imgWidowmaker.onclick = (e)=>{getHeroData(e, 'Widowmaker')};
    imgWinston.onclick = (e)=>{getHeroData(e, 'Winston')};
    imgWreckingBall.onclick = (e)=>{getHeroData(e, 'WreckingBall')};
    imgZarya.onclick = (e)=>{getHeroData(e, 'Zarya')};
    imgZenyatta.onclick = (e)=>{getHeroData(e, 'Zenyatta')};

    // Add image elements to container
    tableRowEle[0].appendChild(imgDva);
    tableRowEle[0].appendChild(imgJunkerQueen);
    tableRowEle[0].appendChild(imgOrisa);
    tableRowEle[0].appendChild(imgReinhardt);
    tableRowEle[0].appendChild(imgRoadhog);
    tableRowEle[0].appendChild(imgSigma);
    tableRowEle[0].appendChild(imgWinston);
    tableRowEle[0].appendChild(imgWreckingBall);
    tableRowEle[0].appendChild(imgZarya);

    tableRowEle[1].appendChild(imgAshe);
    tableRowEle[1].appendChild(imgBastion);
    tableRowEle[1].appendChild(imgDoomfist);
    tableRowEle[1].appendChild(imgEcho);
    tableRowEle[1].appendChild(imgGenji);
    tableRowEle[1].appendChild(imgHanzo);
    tableRowEle[1].appendChild(imgJunkrat);
    tableRowEle[1].appendChild(imgCassidy);
    tableRowEle[1].appendChild(imgMei);
    tableRowEle[1].appendChild(imgPharah);
    tableRowEle[1].appendChild(imgReaper);
    tableRowEle[1].appendChild(imgSojourn);
    tableRowEle[1].appendChild(imgSoldier76);
    tableRowEle[1].appendChild(imgSombra);
    tableRowEle[1].appendChild(imgSymmetra);
    tableRowEle[1].appendChild(imgTorbjorn);
    tableRowEle[1].appendChild(imgTracer);
    tableRowEle[1].appendChild(imgWidowmaker);

    tableRowEle[2].appendChild(imgAna);
    tableRowEle[2].appendChild(imgBaptiste);
    tableRowEle[2].appendChild(imgBrigitte);
    tableRowEle[2].appendChild(imgKiriko);
    tableRowEle[2].appendChild(imgLucio);
    tableRowEle[2].appendChild(imgMercy);
    tableRowEle[2].appendChild(imgMoira);
    tableRowEle[2].appendChild(imgZenyatta);

    var elements = document.querySelectorAll(`.hero-profile__hero-thumbnail`)
    elements.forEach(item => item.classList.remove('icon-highlight'))

    if (highlightedHero){
      var updateEle = document.querySelectorAll(`.hero-profile__hero-thumbnail[title=${highlightedHero}]`)
      updateEle[0].classList.add('icon-highlight')
    }
  });

  return (
    <div className="hero-selection">      
      <table className="hero-selection__table">
        <tr className="hero-selection__table-row">
          <td className="hero-selection__table-row-head">Tank</td>
          <td className="hero-selection__table-row-data"></td>
        </tr>
        <tr className="hero-selection__table-row">
          <td className="hero-selection__table-row-head">Damage</td>
          <td className="hero-selection__table-row-data"></td>
        </tr>
        <tr className="hero-selection__table-row">
          <td className="hero-selection__table-row-head">Support</td>
          <td className="hero-selection__table-row-data"></td>
        </tr>
      </table>

      <div id="hero-profile__hero-select" style={{display: 'none',}}>
        <label 
          for="hero-select" 
          id="choose-hero-text" 
        >
          {'Choose a hero: '}
        </label>
        <select 
          name="hero-selection" 
          id="hero-selection" 
          onChange={(event)=>{
            getHeroData(event.target.value);
          }}
        >
            <option value="Ana">Ana</option>
            <option value="Ashe">Ashe</option>
            <option value="Baptiste">Baptiste</option>
            <option value="Bastion">Bastion</option>
            <option value="Brigitte">Brigitte</option>
            <option value="Dva">D.Va</option>
            <option value="Doomfist">Doomfist</option>
            <option value="Echo">Echo</option>
            <option value="Genji">Genji</option>
            <option value="Hanzo">Hanzo</option>
            <option value="Junker Queen">Junker Queen</option>
            <option value="Junkrat">Junkrat</option>
            <option value="Kiriko">Kiriko</option>
            <option value="Lucio">Lucio</option>
            <option value="Cassidy">{"Cassidy (McCree)"}</option>
            <option value="Mei">Mei</option>
            <option value="Mercy">Mercy</option>
            <option value="Moira">Moira</option>
            <option value="Orisa">Orisa</option>
            <option value="Pharah">Pharah</option>
            <option value="Reaper">Reaper</option>
            <option value="Reinhardt">Reinhardt</option>
            <option value="Roadhog">Roadhog</option>
            <option value="Sigma">Sigma</option>
            <option value="Sojourn">Sojourn</option>
            <option value="Soldier76">Soldier: 76</option>
            <option value="Sombra">Sombra</option>
            <option value="Symmetra">Symmetra</option>
            <option value="Torbjorn">Torbjorn</option>
            <option value="Tracer">Tracer</option>
            <option value="Widowmaker">Widowmaker</option>
            <option value="Winston">Winston</option>
            <option value="WreckingBall">Wrecking Ball</option>
            <option value="Zarya">Zarya</option>
            <option value="Zenyatta">Zenyatta</option>
        </select>
      </div>
    </div>
  );
}