import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: './app-recomandaremed',
  templateUrl: './recomandaremed.component.html',
  styleUrls: ['./recomandaremed.component.css'],
})

export class RecomandaremedComponent {
  constructor(private http: HttpClient) {
  }
  url: 'https://medicationteam.herokuapp.com/recomandare_medicament_true';
  bodyPart;
  simptoms = new FormControl();
  forms = new FormControl();
  simptome;
  formatMed;
  simtomsList = [];
  parteaAleasa: string;
  sAles: string[];
  fAleasa: string[];
  formatsMed = ['Picături' ,
    'Gargarisme' ,
    'Loţiune' ,
    'Comprimate'
    , 'Tablete'
    , 'Drajeuri'
    , 'Capsule amilacee' ,
    'Capsule gelatinoase' ,
    'Pomadă' ,
    'Unguent' ,
    'Gel',
    'Cremă' ,
    'Pastă' ];

  parts: any = [
    {
      partName: 'Ureche',
      simtomsList: [
        'Durerea urechilor', 'Diminuarea auzului',
        'Secretii la nivelul urechii',
        'Febră',
        'Dificultatea de a dormi',
        'Sangerare',
        'Senzatie de ureche infundata',
        'Greata',
        'Ameteli',
        'Sunete inexplicabile în una sau ambele urechi care pot fi puternice sau mai puțin',
        'Mică umflătură care este dureroasă la atingere',
        'Piele care se descuamează, solzoasă ',
        'Inflamarea lobului urechii',
      ]
    },
    {
      partName: 'Nas',
      simtomsList: [
        'Dureri frecvente în zona sinusurilor',
        'Dureri de cap comune',
        'Durerea și umflarea feței, a ochilor și a urechilor',
        'Lăcrimare continuă',
        'Scăderea simțului mirosului',
        'Durerea sau amorțirea zonei dinților',
        'Curgerea constantă a nasului',
        'Durerea la atingere',
        'Inroşirea  zonelor învecinate ',
        'Durere în zona ochilor;',
        'Probleme cu urechea  din cauza congestionării căilor nazale;',
        'Amplificarea durerii la aplecare sau atunci când te întinzi;',
        'Sângerări din nas',
        'Sforăit',
        'Miros neplăcut în nas',
        'Febra'
      ]
    },
    {
      partName: 'Cavitatea bucala',
      simtomsList: [
        'Prezenta aftelor',
        'Respiratie urat mirositoare',
        'Herpes',
        'Buze crapate',
        'Aparitia unor placi albicioase ',
        'Modificari ale gustului',
        'Prezenta unui gust metalic',
        'Limba umflata',
        'Linii albe usor proeminente pe suprafata limbii sau in interiorul obrajilor',
        'Leziuni inflamatorii la nivelul colturilor gurii',
        'Inflamare a mucoasei din interiorul gurii, ce se poate dezvolta pe gingii, pe limba, pe buze, pe partea interioara a obrajilor',
        'Sangerari gingivale'
      ]
    },
    {
      partName: 'Ochi',
      simtomsList: ['Senzaţie de iritare şi de nisip în ochi.',
        'Senzaţie de ochii obosiţi ',
        ' Mancarimi si/sau iritatii ale pleoapelor',
        'Prezenta unei mici umflaturi ferme in pleoapa, sunt initial rosii, umflate, si sensibile',
        'Sensibilitate la lumina',
        'Secreţie abundentă care curge lăsând urme lipicioase',
        'Vedere înceţoşată',
        'Lacrimație',
        'Înroşirea ochiului pe o zonă restrânsă',
        'Prezența unui ulcior',
        'Dureri de cap'

      ]
    },
    {
      partName: 'Inima',
      simtomsList: ['Oboseala ',
        'Stres prelungit',
        'Regulat batai ale inimii rapide',
        'O bataie care vine mai repede, in general foarte puternica si resimtita la baza gatului, urmata de o pauza',
        'Ritm complet haotic, neregulat si foarte rapid',
        'Durere in piept',
        'Lipsa de aer',
        'Durere ce dureaza peste 30 de minute si iradiaza spre bratul stang, epigastru (zona stomacului), maxilar sigat, brate',
        'Ameteli',
        'Transpiratie in exces',
        'Buze albastre',
        'Dificultati in respiratie',
        'Tusea ori respirația șuierătoare'

      ]
    },
    {
      partName: 'Ficat',
      simtomsList: ['Abdomen umflat',
        'Pielea palida, decolorata',
        'Ochii ingalbeniti',
        'Urina de culoare inchisa',
        'Scaun deschis la culoare',
        'Mancarimi insuportabile',
        'Starea de greata sau varsaturi fara a avea o cauza cunoscuta',
        'Pierderea apetitului',
        'Scaderea rapida in greutate ',
        'Oboseala cronica',
        'Respiratia urat mirositoare impreuna cu modificari ale mirosului corpului',
        'Constipatia si balona'

      ]
    },
    {
      partName: 'Stomac',
      simtomsList: ['Indigestie',
        'Arsuri si dureri stomacale',
        'Senzatie de greata si voma',
        'Senzatie anormala de satietate dupa masa',
        'Dureri sau arsuri sub stern dupa ce manancam sau atunci cand ne aseaza in pozitie culcat',
        'Disconfortul constant in zona buricului',
        'Durerea ascutita care porneste de la mijlocul abomenului superior si coboara spre partea dreapta, sub coaste',
        'Crampe in partea inferioara a abdomenului',
        'Flatulenta',
        'Diaree',
        'Balonare',
        'Pierdere sau crestere in greutate'

      ]
    },
    {
      partName: 'Rinichi',
      simtomsList: ['Oboseală accentuată',
        'Mâncărimi ale pielii',
        'Inflamații la nivelul picioarelor și al gleznelor',
        'Retenția de apă',
        'Anemie',
        'Dureri in partea de jos a spatelui sau pe lateral',
        'Dificultate in a urina',
        'Lipsa poftei de mâncare',
        'Modificările de aspect ale urinei, prezenta sangelui in urina',
        'Usturimea la urinat',
        'senzația de golire incompletă a vezicii urinare',
        'Frisoane'

      ]
    },
    {
      partName: 'Apendice',
      dsimtomsList: ['Durere in partea din dreapta jos a abdomenului',
        'Greaţă',
        'Varsaturi',
        'Diaree',
        'Constipatie',
        'Pierderea poftei de mancare',
        'Febra de grad scazut',
        'Umflarea abdomenului',
        'Urinari dureroase'

      ]
    },
    {
      partName: 'Splina',
      simtomsList: ['Durere sau senzatia de preaplin in partea superioara stanga a abdomenului, care poate sa radieze spre umarul stang;',
        'Senzatia de preaplin, fara sa mananci sau dupa ce ai mancat doar o cantitate mica de mancare',
        'Anemie',
        'Oboseala',
        'Sangerare usoar',
        'Nu poți mânca o porție întreagă de mâncare',
        'Leșin',
        'Respirație greoaie'

      ]
    },
    {
      partName: 'Colon',
      simtomsList: ['Alternanta episoadelor de diaree si constipatie',
        'Durerea abdominala care dispare prin defecatie',
        'Senzatia de balonare',
        'Nevoie imperioasa, urgenta de defecatie',
        'Senzatia de defecatie incompleta',
        'Greata',
        'Oboseala',
        'Prezenta mucusului in scaun',
        'Gaz excesiv'

      ]
    },
    {
      partName: 'Vezica biliara',
      simtomsList: ['Durere subcostală dreapta',
        'Greaţă sau vărsături',
        'Febra',
        'Frisoane',
        'Durere la nivelul abdomenului atunci cand este atins',
        'Diaree, care poate să includă scaune cu grăsime ',
        'Înnegrirea pielii fără legătură cu expunerea la soare',
        'Balonare și gaze intestinale',
        'Senzație de greutate în abdomen',
        'Ameteala',
        'Icter'
      ]
    },
    {
      partName: 'Vezica urinara',
      simtomsList: [
        'Cresterea frecventei urinare',
        'Nuantele de roz, rosu sau maro in urina',
        'Pierderea involuntara de urina',
        'Inceput ezitant al urinarii ',
        'Senzatia de golire incompleta a vezicii urinare',
        'Durere sau senzație de arsură în timpul urinării'
      ]
    },
    {
      partName: 'Umar',
      dsimtomsList: ['Durere in partea superioara si exterioara a umarului',
        'Durere care este mai puternica atunci cand ridicati bratul, mai ales cand il ridicati deasupra capului',
        'Durere noaptea, care poate afecta somnul',
        'Slabiciune in brat',
        'Lipsa de miscare ',
        'Senzatii de intepaturi (furnicaturi) ',
        'Senzatie de alunecare si revenire a articulatiei in soclul articulatiei'

      ]
    },
    {
      partName: 'Articulatii',
      simtomsList: ['Durere acuta',
        'Durere care impiedica miscarea',
        'Invinetirea zonei ca urmare a unei traume',
        'Umflarea zonei',
        ' zona din jurul articulaţiei este umflată, roşie, sensibilă sau are o temperatură mai ridicată comparativ cu restul corpului'


      ]
    }
  ];
  simptomAles = this.simptoms.value;
  formaAleasa = this.forms.value;
  zonaAleasa = this.bodyPart;
  filtru = {
    simptom: [],
    forma: [],
    zona: ''};

  simtomsChangeAction(i) {
    this.simptome = '';
    const dropDownData = this.parts.find((data: any) => data.partName === i);
    if (dropDownData) {
      this.simtomsList = dropDownData.simtomsList;
      if (this.simtomsList){
        this.simptome = this.simtomsList[0];
      }

    } else {
      this.simtomsList = [];
    }
  }
  aplicareFiltru()
  {
    this.filtru.zona = this.parteaAleasa;
    this.filtru.simptom = this.sAles;
    this.filtru.forma = this.fAleasa;
  }
  cerereMedicament(){
    this.aplicareFiltru();
    const json = JSON.stringify(this.filtru);
    console.log(json);
    return this.http.post<any>(this.url,
      { simptom: this.filtru.simptom, zona_corpului: this.filtru.zona, forma_farmaceutica: this.filtru.forma}).
    subscribe(data => {console.log(data);  } );

  }


}
