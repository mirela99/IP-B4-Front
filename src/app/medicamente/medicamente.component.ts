import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

interface ATC {
  value: string;
  viewValue: string;
}

interface ATCGroup {
  disabled?: boolean;
  name: string;
  category: ATC[];
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-medicamente',
  templateUrl: './medicamente.component.html',
  styleUrls: ['./medicamente.component.css']

})
export class MedicamenteComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
  }
  item: any;
  test: any;
  bun: any;
  parsat: string;
  result: Object;
  response: object[];
  atcControl = new FormControl();
  atcGroups: ATCGroup[] = [
    {
      name: 'A.Tractul digestiv si metabolism',
      category: [
        {value: 'A01', viewValue: 'Produse pentru cavitatea bucala'},
        {value: 'A02', viewValue: 'Antiacide, antiflatuente'},
        {value: 'A03', viewValue: 'Antispastice si stimulente peristaltice'},
        {value: 'A04', viewValue: 'Antiemetice'},
        {value: 'A05', viewValue: 'Homeopate'},
        {value: 'A06', viewValue: 'Laxative'},
        {value: 'A07', viewValue: 'Antidiareice,antiinflamatoare, sntiinfectiioase intentinale'},
        {value: 'A08', viewValue: 'Medicatia obezitatii'},
        {value: 'A09', viewValue: 'Alte produse, inclusiv enzime digestive'},
        {value: 'A10', viewValue: 'Terapie Antidiabetica'},
        {value: 'A11', viewValue: 'Vitamine'},
        {value: 'A12', viewValue: 'Substante minerale'},
        {value: 'A13', viewValue: 'Tonice'},
        {value: 'A14', viewValue: 'Anabolice sistemice'},
        {value: 'A16', viewValue: 'Tract digestiv si metabolism'}
      ]
    },
    {
      name: 'B.Sange si organe hematopoietice',
      category: [
        {value: 'B01', viewValue: 'Anticoagulante'},
        {value: 'B02', viewValue: 'Antihemoragice'},
        {value: 'B03', viewValue: 'Antianemice'},
        {value: 'B04', viewValue: 'Hipolipemiante'},
        {value: 'B05', viewValue: 'Substituenti de plasa si solutii perfuzabile'},
        {value: 'B06', viewValue: 'Alte produse hematologice'}
      ]
    },
    {
      name: 'C.Sistem cardiovascular',
      category: [
        {value: 'C01', viewValue: 'Terapia cordului'},
        {value: 'C02', viewValue: 'Antihipertensive'},
        {value: 'C05', viewValue: 'Vasoprotectoare'}
      ]
    },
    {
      name: 'D.Preparate dermatologice',
      category: [
        {value: 'D02', viewValue: 'Emoliente si protectoare'},
        {value: 'D08', viewValue: 'Antiseptice si dezinfectante'},
        {value: 'D09', viewValue: 'Pansamente cu medicamente'},
        {value: 'D10', viewValue: 'Preparate antiacneice'},
        {value: 'D11', viewValue: 'Alte preparate de uz dermatologic'}
      ]
    },
    {
      name: 'G.Aparatul genito-urinar si hormonii sexuali',
      category: [
        {value: 'G01', viewValue: 'Antiinfectioase si antiseptice ginecologice'},
        {value: 'G02', viewValue: 'Alte preparate ginecologice'},
        {value: 'G04', viewValue: 'Medicatia aparatului urinar'}
      ]
    },
    {
      name: 'H.Preparate hormonale sistemice(exclusiv hormoni sexuali)',
      category: [
        {value: 'H01', viewValue: 'Hormoni hipofizari si hipotalamici'},
        {value: 'H03', viewValue: 'Terapia tiroidei'},
        {value: 'H04', viewValue: 'Hormoni pancreatici'}
      ]
    },
    {
      name: 'J.Antiinfectioase de uz sistemic',
      category: [
        {value: 'J01', viewValue: 'Antibiotice'},
        {value: 'J02', viewValue: 'Antimicotice'},
        {value: 'J05', viewValue: 'Antivirale de uz sistemic'},
        {value: 'J07', viewValue: 'Vaccinuri'}
      ]
    },
    {
      name: 'M.Sistemul muscular-scheletic',
      category: [
        {value: 'M01', viewValue: 'Antinflamatoare si antireumatice'},
        {value: 'M02', viewValue: 'Leziuni musculare'},
        {value: 'M05', viewValue: 'Tratamentul afectiunilor oasoase'},
        {value: 'M06', viewValue: 'Alte medicammente pentru afectiunile sistemului musculo-scheletic'}
      ]
    },
    {
      name: 'N.Sistemul nervos',
      category: [
        {value: 'N01', viewValue: 'Anestezice'},
        {value: 'N03', viewValue: 'Antiepileptice'},
        {value: 'N07', viewValue: 'Alte preparate cu actiuni asupra sistemului nervos'}
      ]
    },
    {
      name: 'R.Aparat respirator',
      category: [
        {value: 'R01', viewValue: 'Preparate nazale'},
        {value: 'R03', viewValue: 'Antiasmatice'},
        {value: 'R05', viewValue: 'Tratamentul tusei'},
        {value: 'R07', viewValue: 'Alte preparate pentru tratamentul aparatului respirator'}
      ]
    },
    {
      name: 'S.Organe sensitive',
      category: [
        {value: 'S01', viewValue: 'Produse oftalmologice'},
        {value: 'S02', viewValue: 'Preparate pentru urechi'},
      ]
    },


  ];
  popularitate: any;
  ordonare: any;
  subst: string;
  tip: any;
  categorie: any;
  categorieCautata: string;
  tipCautat: string;
  popularitateSortare: string;
  codATC: string;
  medicamente: any;
  codAles: any;
  substanta: any;
  ordonareSortare: string;
  filtru = {
    stare: '',
    categorie: '',
    popularitate: '',
    codATC: '',
    substanta: '',
    ordine: ''
  };

  vector = [{
    stare: 'aaaaaa',
    categorie: '',
    popularitate: '',
    codATC: '',
    substanta: '',
    ordine: ''
  }, {
    stare: 'aaaaaaaa',
    categorie: '',
    popularitate: '',
    codATC: '',
    substanta: '',
    ordine: ''
  }];
  i: any;
  med: any;
  key: any;
  private _parsatArray: any;

  get parsatArray(): any {
    return this._parsatArray;
  }

  medicamenteLista = [];
  public get results() {
    return this.result;
  }
  public get parsatG()
  {
    return this.parsat;
  }
  /*    this.response = [...data];*/
  /*
  search() {
    this.filtruMedicamente();
    const json = JSON.stringify(this.filtru);
    console.log(json);
    console.log(this.subst);
    //  console.log('test ' + this.response);
    return this.httpClient.post( 'https://medicationteam.herokuapp.com/medicamente/filter',
      {
        stare: this.filtru.stare,
        categorie: this.filtru.categorie,
        codAtc: this.filtru.codATC,
        popularitate: this.filtru.popularitate,
        substanta: this.filtru.substanta,
        ordine: this.filtru.ordine
      }).subscribe(data => {
      console.log(data);
    });

  }
   */
  preiaRezultate2() {
    this.filtruMedicamente();
    const params = new HttpParams().set('stare', this.filtru.stare)
      .set('categorie', this.filtru.categorie)
      .set('codATC', this.filtru.codATC)
      .set('popularitate', this.filtru.popularitate)
      .set('substanta', this.substanta)
      .set('ordine', this.filtru.ordine);
    this.httpClient.get<any>('https://medicationteam.herokuapp.com/medicamente/filter', {params})
      .subscribe(returnedStuff => {
        this.parsat = returnedStuff;
        if(this.parsat!=='Setati filtrele pentru a afisa medicamente!'){
        console.log('parsat');
        console.log(this.parsat);
        this._parsatArray = Object.keys(this.parsat).map(i => this.parsat[i]);
        console.log(this._parsatArray);
        for (this.med in this._parsatArray ) {
          console.log(this._parsatArray[this.med]._id);
  }}
    else this._parsatArray =this.parsat;});
  }
  /*
  preiaRezultate2()
  {
    return (this.httpClient.get('https://medicationteam.herokuapp.com/medicamente/filter_by_name/sanosan'))
      .subscribe((returnedStuff) => {
        console.log(returnedStuff);
      });
  }*/
  ngOnInit(): void {
    this.preiaRezultate2();
  }

  filtruMedicamente() {
    this.codAles = this.atcControl.value;
    if (this.tip === 'sirop') {
      this.tipCautat = 'sirop';
    }
    if (this.tip === 'comprimate') {
      this.tipCautat = 'comprimate';
    }
    if (this.tip === 'injectabil') {
      this.tipCautat = 'injectabil';
    }
    if (this.tip === 'crema') {
      this.tipCautat = 'crema';
    }
    if (this.tip === 'picaturi') {
      this.tipCautat = 'picaturi';
    }
    if (this.tip === 'plic cu pulbere') {
      this.tipCautat = 'plic cu pulbere';
    }
    if (this.tip === 'perfuzia') {
      this.tipCautat = 'perfuzie';
    }


    if (this.categorie === 'reteta') {
      this.categorieCautata = 'reteta';
    }
    if (this.categorie === 'reteta restrictiva') {
      this.categorieCautata = 'reteta restrictiva';
    }
    if (this.categorie === 'reteta speciala') {
      this.categorieCautata = 'reteta speciala';
    }
    if (this.categorie === 'fara prescriptie') {
      this.categorieCautata = 'fara prescriptie';
    }

    if (this.popularitate === 'cunoscute') {
      this.popularitateSortare = '0';
    }
    if (this.popularitate === 'necunoscute') {
      this.popularitateSortare = '1';
    }

    if (this.ordonare === '1') {
      this.ordonareSortare = '1';
    }
    if (this.ordonare === '0') {
      this.ordonareSortare = '0';
    }

    if (this.substanta === 'Paracetamol') {
      this.subst = 'paracetamol';
    }
    if (this.substanta === 'Codeina') {
      this.subst = 'codeina';
    }
    if (this.substanta === 'Butamirat') {
      this.subst = 'butamirat';
    }
    if (this.substanta === 'Oxeladină') {
      this.subst = 'oxeladină';
    }
    this.filtru.categorie = this.categorieCautata;
    this.filtru.stare = this.tipCautat;
    this.filtru.popularitate = this.popularitateSortare;
    this.filtru.codATC = this.codAles;
    this.filtru.substanta = this.subst;
    this.filtru.ordine = this.ordonareSortare;
  }

}


