class Mikrowelle {

  constructor(leistungWatt = 750) {
    this.leistungWatt = leistungWatt;
    this.istOffen = false;
    this.speisenListe = [];
  }

  aufmachen() {
    this.istOffen = true;
    document.getElementById("mikrowelleStatus").innerText = "offen"
  }

  schliessen() {
    this.istOffen = false;
    document.getElementById("mikrowelleStatus").innerText = "geschlossen"
  }

  speiseHinzufuegen(speise) {
  if (document.getElementById("dishName").value=="") {
    alert("kein name");
    return;
  }
  if (document.getElementById("dishWeight").value<1) {
    alert("gewicht darf nicht unter 1 liegen");
    return;
  }
  if (document.getElementById("dishTemp").value=="") {
    alert("temperatur darf nicht unter 1 liegen");
    return;
  }
  if (mikrowelle.istOffen==false) {
    alert("die mikrowelle ist zu");
    return;
  }
  for (let x in speise) {
    let element = document.createElement("div");
    document.getElementById("dishList").appendChild(element);
    element.innerText = speise[x];
    element.classList.add(Object.values(speise), x);
  }
  this.speisenListe.push(speise);
  }

  speiseEntnehmen(nummer) {
  if (mikrowelle.istOffen==false) {
    alert("die mikrowelle ist zu");
    return;
  }
  let speise = mikrowelle.speisenListe.findIndex(x => x.name == document.getElementById("removeDish").value);
  if (speise==-1) {
    alert("keine speise mit diesem namen");
    return;
  }
  for (let i = 0; i < 3; i++) {
    let element= document.getElementsByClassName(Object.values(mikrowelle.speisenListe[speise]));
    document.getElementById("dishList").removeChild(element[0]);
  }
  this.speisenListe.splice(this.speisenListe.findIndex(x => x.name == nummer), 1);
  }

  leistungEinstellen(leistung) {
  if (leistung<1) {
    alert("watt darf nicht unter 1 liegen");
    return;
  }
  document.getElementById("mikrowelleWatt").innerText = leistung;
  this.leistungWatt = leistung;
  }

  erwaermen(zeitsekunden) {
  if (mikrowelle.speisenListe.length==0) {
    alert("keine speisen in der mikrowelle");
    return;
  }
  if (mikrowelle.istOffen==true) {
    alert("die mikrowelle ist offen");
    return;
  }
  if (zeitsekunden<1) {
    alert("zeit darf nicht unter 1 liegen");
    return;
  }
    this.speisenListe.forEach((speise, index) => {
      speise.erhitzen(zeitsekunden, this.leistungWatt, index);
    });
  }
}


class Speise {
  constructor(masseG, temperaturCelsius, name) {
    this.name = name;
    this.masseG = masseG;
    this.temperaturCelsius = temperaturCelsius;
  }

  erhitzen(zeitsekunden, leistungWatt, index) {
    this.temperaturCelsius = Number(this.temperaturCelsius)+(Number(leistungWatt) * Number(zeitsekunden))/(Number(this.masseG)/1000 * 4190)
    console.log(this.temperaturCelsius) ; // T = Q/(m*c) mit: m= masseGramm*1000; c = 4190j / kgK; Q = leistungWatt * zeitsekunden
    document.querySelectorAll(".temperaturCelsius")[index].innerText = this.temperaturCelsius;
  }

  essen() {
    mikrowelle.speisenListe.splice(mikrowelle.speisenListe.findIndex(x => x.name == document.getElementById("storeDish").value), 1);
  }

  aufbewahren() {
    mikrowelle.speisenListe.splice(mikrowelle.speisenListe.findIndex(x => x.name == document.getElementById("storeDish").value), 1);
  }
}

mikrowelle = new Mikrowelle;
console.log(mikrowelle)

function SpeiseEssen() {
  let index = mikrowelle.speisenListe.findIndex(x => x.name == document.getElementById("eatDish").value)
  let speise = mikrowelle.speisenListe[index]
  if (mikrowelle.istOffen==false) {
    alert("die mikrowelle ist zu");
    return;
  }
  if (mikrowelle.speisenListe.length==0) {
    alert("nichts zu essen");
    return;
  }
  if (index==-1) {
    alert("keine speise mit diesem namen");
    return;
  }
  for (let i = 0; i < 3; i++) {
    let element= document.getElementsByClassName(Object.values(mikrowelle.speisenListe[index]));
    document.getElementById("dishList").removeChild(element[0]);
  }
  speise.essen();
}

function SpeiseAufbewahren() {
  let index = mikrowelle.speisenListe.findIndex(x => x.name == document.getElementById("storeDish").value)
  let speise = mikrowelle.speisenListe[index]
  if (mikrowelle.istOffen==false) {
    alert("die mikrowelle ist zu");
    return;
  }
  if (mikrowelle.speisenListe.length==0) {
    alert("nichts zum aufbewahren");
    return;
  }
  if (index==-1) {
    alert("keine speise mit diesem namen");
    return;
  }
  for (let i = 0; i < 3; i++) {
    let element= document.getElementsByClassName(Object.values(mikrowelle.speisenListe[index]));
    document.getElementById("dishList").removeChild(element[0]);
  }
  speise.aufbewahren()
}
