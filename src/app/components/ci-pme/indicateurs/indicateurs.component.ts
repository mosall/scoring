import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {IndicateursService} from "../../../services/indicateurs.service";
import {IdentificationService} from "../../../services/identification.service";
import {AuthService} from "../../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CiPmeService} from "../../../services/ci-pme.service";
import { DemandeService } from 'src/app/services/demande.service';
import { ActivatedRoute } from '@angular/router';
import {CurrencyMaskInputMode} from "ngx-currency";

declare var $: any;
@Component({
  selector: 'app-indicateurs',
  templateUrl: './indicateurs.component.html',
  styleUrls: ['./indicateurs.component.css']
})
export class IndicateursComponent implements OnInit {
  connectedUser:any = JSON.parse(<string>sessionStorage.getItem('connectedUserData'));
  entreprise: any = [];
  listYear: any = [];
  financialYear: any = null;
  indicateurs = [
    {
      id: null,
      indicateurs: [
        {code: 'BK', nom: 'Actif circulant', source: 'Bilan actif', value: ''},
        {code: 'BT', nom: 'Trésorerie actif', source: 'Bilan actif', value: ''},
        {code: 'BI', nom: 'Créances clients', source: 'Bilan actif', value: ''},
        {code: 'DP', nom: 'Passif circulant', source: 'Bilan passif', value: ''},
        {code: 'DT', nom: 'Trésorerie passif', source: 'Bilan passif', value: ''},
        {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: ''},
        {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: ''},
        {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: ''},
        {code: 'DA', nom: 'Emprunts et dettes financières diverses', source: 'Bilan passif', value: ''},
        {code: 'DB', nom: 'Dettes de location et acquisitions', source: 'Bilan passif', value: ''},
        {code: 'XI', nom: 'Résultat net', source: 'Compte de résultat', value: ''},
        {code: 'XB', nom: 'Chiffres d\'affaires', source: 'Compte de résultat', value: ''},
        {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: ''},
        {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: ''},
        {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: ''},
        {code: 'TK', nom: 'Revenus financiers', source: 'Compte de résultat', value: ''},
        {code: 'TL', nom: 'Reprises de provisions et dépréciations financières', source: 'Compte de résultat', value: ''},
        {code: 'TM', nom: 'Transfert de charges financières', source: 'Compte de résultat', value: ''},
        {code: 'RQ', nom: 'Participations des travailleurs', source: 'Compte de résultat', value: ''},
        {code: 'RS', nom: 'Impôt sur le résultat', source: 'Compte de résultat', value: ''},
      ],
      file: {nomPiece: '', file: ''},
      files: [{nomPiece: '', file: '', isSaved: false}],
      hasFile: false
    },
    {
      id: null,
      indicateurs: [
        {code: 'BK', nom: 'Actif circulant', source: 'Bilan actif', value: ''},
        {code: 'BT', nom: 'Trésorerie actif', source: 'Bilan actif', value: ''},
        {code: 'BI', nom: 'Créances clients', source: 'Bilan actif', value: ''},
        {code: 'DP', nom: 'Passif circulant', source: 'Bilan passif', value: ''},
        {code: 'DT', nom: 'Trésorerie passif', source: 'Bilan passif', value: ''},
        {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: ''},
        {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: ''},
        {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: ''},
        {code: 'DA', nom: 'Emprunts et dettes financières diverses', source: 'Bilan passif', value: ''},
        {code: 'DB', nom: 'Dettes de location et acquisitions', source: 'Bilan passif', value: ''},
        {code: 'XI', nom: 'Résultat net', source: 'Compte de résultat', value: ''},
        {code: 'XB', nom: 'Chiffres d\'affaires', source: 'Compte de résultat', value: ''},
        {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: ''},
        {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: ''},
        {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: ''},
        {code: 'TK', nom: 'Revenus financiers', source: 'Compte de résultat', value: ''},
        {code: 'TL', nom: 'Reprises de provisions et dépréciations financières', source: 'Compte de résultat', value: ''},
        {code: 'TM', nom: 'Transfert de charges financières', source: 'Compte de résultat', value: ''},
        {code: 'RQ', nom: 'Participations des travailleurs', source: 'Compte de résultat', value: ''},
        {code: 'RS', nom: 'Impôt sur le résultat', source: 'Compte de résultat', value: ''},
      ],
      file: {nomPiece: '', file: ''},
      files: [{nomPiece: '', file: '', isSaved: false}],
      hasFile: false
    },
    {
      id: null,
      indicateurs: [
        {code: 'BK', nom: 'Actif circulant', source: 'Bilan actif', value: ''},
        {code: 'BT', nom: 'Trésorerie actif', source: 'Bilan actif', value: ''},
        {code: 'BI', nom: 'Créances clients', source: 'Bilan actif', value: ''},
        {code: 'DP', nom: 'Passif circulant', source: 'Bilan passif', value: ''},
        {code: 'DT', nom: 'Trésorerie passif', source: 'Bilan passif', value: ''},
        {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: ''},
        {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: ''},
        {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: ''},
        {code: 'DA', nom: 'Emprunts et dettes financières diverses', source: 'Bilan passif', value: ''},
        {code: 'DB', nom: 'Dettes de location et acquisitions', source: 'Bilan passif', value: ''},
        {code: 'XI', nom: 'Résultat net', source: 'Compte de résultat', value: ''},
        {code: 'XB', nom: 'Chiffres d\'affaires', source: 'Compte de résultat', value: ''},
        {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: ''},
        {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: ''},
        {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: ''},
        {code: 'TK', nom: 'Revenus financiers', source: 'Compte de résultat', value: ''},
        {code: 'TL', nom: 'Reprises de provisions et dépréciations financières', source: 'Compte de résultat', value: ''},
        {code: 'TM', nom: 'Transfert de charges financières', source: 'Compte de résultat', value: ''},
        {code: 'RQ', nom: 'Participations des travailleurs', source: 'Compte de résultat', value: ''},
        {code: 'RS', nom: 'Impôt sur le résultat', source: 'Compte de résultat', value: ''},
      ],
      file: {nomPiece: '', file: ''},
      files: [{nomPiece: '', file: '', isSaved: false}],
      hasFile: false
    }
  ];
  reponsesIndicateur: any = [];
  listRatio: any = [];
  fileToAdd: any = [];
  fileToShow: any = {name: '', ext: '', src: '', href: ''};
  fileList: any = [null, null, null];
  formData = new FormData();
  disableYear = false;
  demande: any;

  ratioEnabled = false;
  demandeNonCloturee: any = [];
  idEntreprise: any;

  inputOptionsCurrency = {
    prefix: ' ',
    suffix: ' F CFA',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    inputMode: CurrencyMaskInputMode.NATURAL
  };

  constructor(private indicateursService: IndicateursService,
              private sanitizer: DomSanitizer,
              private authService: AuthService, private ciPmeService: CiPmeService,
              private identificationService: IdentificationService,
              private demandeService: DemandeService,
              private activatedRoute: ActivatedRoute
              ) { }


  ngOnInit(): void {
    // this.getListYear();

    this.authService.getUserInfos().subscribe(
      (data: any) => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
        if(data?.profil?.code == 'ROLE_EXP_PME'){
          this.idEntreprise = this.activatedRoute.snapshot.paramMap.get('idEntreprise');
          this.getEntreprise();
        }
        else if(data?.profil?.code == 'ROLE_ENTR'){
          this.idEntreprise = data?.entrepriseId;
          this.getEntreprise();
          // this.getDemandeEnCours(this.idEntreprise);
        }
      }
    );
  }

  getDemandeEnCours(idEntreprise: any){
    this.demandeService.getDemandeOuverte(idEntreprise).subscribe(
      (data: any) => {
        this.demande = data;
        // console.log('Demande indicateur ::', data);

        if(this.demande?.indicateurAjoute){
            this.getIndicateurs();
            if([3, 5].includes(this.demande?.status)){
              // this.getRatio();
            }
          }
      },
      err => console.log(err)
    );
  }

  getListYear(){
    let currentYear = new Date().getFullYear();
    const  currentMonth: number = new Date().getMonth() + 1;
    if(currentMonth < 3){
      currentYear--;
    }
    for (let i = currentYear; i >= currentYear-2; i--){
      if(this.entreprise.annee <= i){
        this.listYear.push(i);
      }
    }
  }

  saveIndicateur(year: any){
    let payload = {
      annee: this.financialYear - year,
      derniereAnnee: this.financialYear,
      entreprise: this.idEntreprise,
      idDemande: this.demandeNonCloturee?.id,
      bkActifCirculant: this.indicateurs[year].indicateurs[0].value,
      btTresorerieActif: this.indicateurs[year].indicateurs[1].value,
      dpPassifCirculant: this.indicateurs[year].indicateurs[2].value,
      dtTresoreriePassif: this.indicateurs[year].indicateurs[3].value,
      xiResultatNet: this.indicateurs[year].indicateurs[4].value,
      xbChiffresDaffaires: this.indicateurs[year].indicateurs[5].value,
      biCreanceClient: this.indicateurs[year].indicateurs[6].value,
      caCapitauxPropres: this.indicateurs[year].indicateurs[7].value,
      dfTotalRessources: this.indicateurs[year].indicateurs[8].value,
      djDettesFournisseurs: this.indicateurs[year].indicateurs[9].value,
      raAchats: this.indicateurs[year].indicateurs[10].value,
      xdExcedentBrutExploit: this.indicateurs[year].indicateurs[11].value,
      rmChargesFinancieres: this.indicateurs[year].indicateurs[12].value,
      daEmpruntsDettes: this.indicateurs[year].indicateurs[13].value,
      dbDettesAcquisitions: this.indicateurs[year].indicateurs[14].value,
      tkRevenusFinanciers: this.indicateurs[year].indicateurs[15].value,
      tlReprisesDepreciations: this.indicateurs[year].indicateurs[16].value,
      tmTransfertCharges: this.indicateurs[year].indicateurs[17].value,
      rqParticipations: this.indicateurs[year].indicateurs[18].value,
      rsImpot: this.indicateurs[year].indicateurs[19].value,
    }

    if(this.demandeNonCloturee?.indicateurAjoute && this.reponsesIndicateur[year]){
      // @ts-ignore
      payload.id = this.reponsesIndicateur[year].id;
    }

    if(this.idEntreprise){
      this.indicateursService.saveIndicateurs(payload).subscribe(
        data => {
          // @ts-ignore
          this.indicateurs[year].id = data.id;

          if (this.indicateurs[year].files.length != 0 && !this.indicateurs[year].hasFile){
            this.saveFiles(year);
          }

          this.successMsgBox('Indicateurs enregistrés avec succès !');

          if(year != 0){
            $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
          }
          else {
            if (this.indicateurs[year].files.length == 0 && this.indicateurs[year].hasFile == false){
              window.location.reload();
            }
          }
        },
        error => {
          this.errorMsgBox(error.error);
        }
      );
    }
    else {
      this.errorMsgBox('Veuillez identifier l\'entreprise avant d\'enregistrer les indicateurs.')
    }
  }

  getEntreprise(){
    if (this.idEntreprise != null){
      this.identificationService.getEntreprise(this.idEntreprise).subscribe(
        data => {
          // @ts-ignore
          this.entreprise = data;
          this.ciPmeService.getDemandeNonCloturer(this.entreprise?.id).subscribe(
            data => {
              this.demandeNonCloturee = data;
              this.demande = data;
              this.ratioEnabled = this.demandeNonCloturee?.indicateurAjoute && [3, 5].includes(this.demandeNonCloturee.status);

              // console.log("Non cloture :: ", data);

              if(this.demandeNonCloturee?.indicateurAjoute){
                this.getIndicateurs();
                if ([3, 5].includes(this.demandeNonCloturee?.status)){
                  // this.getRatio();
                }
              }
            }
          );
          this.getListYear();
        }
      )
    }
  }

  getRatio(){
    if ([3, 5].includes(this.demandeNonCloturee?.status)){
      this.indicateursService.getRatio(this.demandeNonCloturee?.id).subscribe(
        data => {
          // @ts-ignore
          data.listValeurRatioDTO.sort((a: any, b: any) => a.idRatio > b.idRatio);
          this.listRatio = data;
          $('#ratioModal').modal('show');
        }
      );
    }
  }

  calculRatio(){
    this.indicateursService.calculRatio(this.demandeNonCloturee?.id).subscribe(
      data => {
        // @ts-ignore
        data.listValeurRatioDTO.sort((a: any, b: any) => a.idRatio > b.idRatio);
        this.listRatio = data;
        $('#ratioModal').modal('show');
      }
    );
  }

  getIndicateurs(){
    this.indicateursService.getIndicateurs(this.demandeNonCloturee?.id).subscribe(
      data => {
        // @ts-ignore
        if(data[0] != null){
          // @ts-ignore
          this.financialYear = data[0]?.derniereAnnee;
        }

        // @ts-ignore
        let indicateur0 = data.find(indidcateur => indidcateur.annee == this.financialYear);
        // @ts-ignore
        let indicateur1 = data.find(indidcateur => indidcateur.annee == this.financialYear - 1);
        // @ts-ignore
        let indicateur2 = data.find(indidcateur => indidcateur.annee == this.financialYear - 2);

        this.reponsesIndicateur = [];

        this.reponsesIndicateur.push(indicateur0 ? indicateur0 : null);
        this.reponsesIndicateur.push(indicateur1 ? indicateur1 : null);
        this.reponsesIndicateur.push(indicateur2 ? indicateur2 : null);

        this.disableYear = this.financialYear != null;
        [0,1,2].forEach(i => this.setIndicateur(i, this.reponsesIndicateur));
      }
    )
  }

  setIndicateur(index: any, data: any){
    this.indicateurs[index].files = [];
    this.indicateurs[index].hasFile = false;

    if (data[index] != null){
      this.indicateurs[index].id = data[index].id;
      this.indicateurs[index].indicateurs = [
        {code: 'BK', nom: 'Actif circulant', source: 'Bilan actif', value: data[index]?.bkActifCirculant},
        {code: 'BT', nom: 'Trésorerie actif', source: 'Bilan actif', value: data[index]?.btTresorerieActif},
        {code: 'BI', nom: 'Créances clients', source: 'Bilan actif', value: data[index]?.biCreanceClient},
        {code: 'DP', nom: 'Passif circulant', source: 'Bilan passif', value: data[index]?.dpPassifCirculant},
        {code: 'DT', nom: 'Trésorerie passif', source: 'Bilan passif', value: data[index]?.dtTresoreriePassif},
        {code: 'CA', nom: 'Capitaux propres', source: 'Bilan passif', value: data[index]?.caCapitauxPropres},
        {code: 'DF', nom: 'Total ressources', source: 'Bilan passif', value: data[index]?.dfTotalResources},
        {code: 'DJ', nom: 'Dettes fournisseurs', source: 'Bilan passif', value: data[index]?.djDettesFournisseurs},
        {code: 'DA', nom: 'Emprunts et dettes financières diverses', source: 'Bilan passif', value: data[index]?.daEmpruntsDettes},
        {code: 'DB', nom: 'Dettes de location et acquisitions', source: 'Bilan passif', value: data[index]?.dbDettesAcquisitions},
        {code: 'XI', nom: 'Résultat net', source: 'Compte de résultat', value: data[index]?.xiResultatNet},
        {code: 'XB', nom: 'Chiffres d\'affaires', source: 'Compte de résultat', value: data[index]?.xbChiffresDaffaires},
        {code: 'RA', nom: 'Achats', source: 'Compte de résultat', value: data[index]?.raAchats},
        {code: 'XD', nom: 'Excédents brut d\'exploitation', source: 'Compte de résultat', value: data[index]?.xdExcedentBrutExploit},
        {code: 'RM', nom: 'Charges financières', source: 'Compte de résultat', value: data[index]?.rmChargesFinancieres},
        {code: 'TK', nom: 'Revenus financiers', source: 'Compte de résultat', value: data[index]?.tkRevenusFinanciers},
        {code: 'TL', nom: 'Reprises de provisions et dépréciations financières', source: 'Compte de résultat', value: data[index]?.tlReprisesDepreciations},
        {code: 'TM', nom: 'Transfert de charges financières', source: 'Compte de résultat', value: data[index]?.tmTransfertCharges},
        {code: 'RQ', nom: 'Participations des travailleurs', source: 'Compte de résultat', value: data[index]?.rqParticipations},
        {code: 'RS', nom: 'Impôt sur le résultat', source: 'Compte de résultat', value: data[index]?.rsImpot},
      ];
      this.indicateursService.getIndicateurFiles(this.indicateurs[index]?.id).subscribe(
        data => {
          this.indicateurs[index].files = [];
          // @ts-ignore
          if (data.length != 0){
            // @ts-ignore
            for(let file of data){
              // @ts-ignore
              this.indicateurs[index].files.push({nomPiece: file.nomPiece, file, isSaved: true});
            }
            this.indicateurs[index].hasFile = true;
          }
          else {
            this.indicateurs[index].files = [];
            this.indicateurs[index].hasFile = false;
          }
        }
      );
    }
  }

  nextAndPreviousCtrl(){
      $('.nav-tabs > .nav-item > .active').parent().prev('li').find('a').trigger('click');
  }

  triggerClick(index: any){
    const fileInput = document.getElementById('file'+index) as HTMLInputElement;
    fileInput.click();
  }

  addFileToList(index: any){
    const fileInput = document.getElementById('file'+index) as HTMLInputElement;
    // @ts-ignore
    const fileInputValue = fileInput.files[0];

    let existFile = 0;

    for(let file of this.indicateurs[index].files){
      // @ts-ignore
      if(file.nomPiece == this.formatFilename(fileInputValue.name)) {
        existFile++;
      }
    }

    if(existFile != 0){
      this.errorMsgBox('Le nom du fichier exite déja.');
      return;
    }

    // @ts-ignore
    this.indicateurs[index].files.push({nomPiece: this.formatFilename(fileInputValue.name), file: fileInputValue, isSaved: false});
  }

  deleteFileToFileList(index: any, file: any){
    // @ts-ignore
    const fileIndex = this.indicateurs[index].files.indexOf(this.indicateurs[index].files.find(f => f.nomPiece == file.nomPiece));
    this.indicateurs[index].files.splice(fileIndex, 1);
  }

  saveFiles(index: any){
    if (this.indicateurs[index].files.length != 0){
      const formData = new FormData();
      for (let file of this.indicateurs[index].files){
        // @ts-ignore
        if(!file.isSaved){
          if (file.nomPiece != ''){
            formData.append('files', file.file, file.nomPiece);
          }
        }
      }

      if (this.indicateurs[index].id != null){
        this.indicateursService.saveIndicateurFile(this.indicateurs[index].id, formData).subscribe(
          data => {
            index == 0 ? this.successMsgBox2('Fichier(s) enregistré(s) !', true) : this.successMsgBox2('Fichier(s) enregistré(s) !');
            this.getIndicateurs();
          },
          error => {
            this.errorMsgBox('Enregistrement fichier échoué, veuillez réesssayer !')
          }
        );
      }
      else {
        this.errorMsgBox('Veuillez d\'abord enregistrer les indicateurs.')
      }
    }
    else {
      this.errorMsgBox('Veuillez sélectionner un fichier.')
    }
  }

  showFile(file: any){
    console.log(file)
    this.fileToShow.name  =  file.nomPiece;
    this.fileToShow.ext   =  file.nomPiece.split('.')[1];
    this.fileToShow.href   =  <string>this.createDownloadFileLink(file.contenu, file.nomPiece.split('.')[1]);

    if (file.nomPiece.split('.')[1] == 'pdf'){
      this.fileToShow.src = 'data:application/pdf;base64,' + file.contenu + '#toolbar=0&navpanes=0&scrollbar=0';
    }else{
      if (['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF'].includes(file.nomPiece.split('.')[1])){
        this.fileToShow.src = 'data:image/' + file.nomPiece.split('.')[1] + ';base64,' + file.contenu;
      }
    }

    if (['pdf', 'png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF'].includes(file.nomPiece.split('.')[1])){
      $('#fileModal').modal('show');
    }
  }

  escapeUnsafeURL(url: any){
    return  this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  downloadFile(data: any) {
    this.fileToShow.name  =  data.nomPiece;
    this.fileToShow.ext   =  data.nomPiece.split('.')[1];
    this.fileToShow.href  = <string>this.createDownloadFileLink(data.contenu, data.nomPiece.split('.')[1]);
  }

  createDownloadFileLink(byte: any, extension: any){
    let blob: any = null;
    if (['pdf', 'doc', 'docx', 'xslx'].includes(extension)){
      blob = new Blob([this.base64ToArrayBuffer(byte)], {type: 'application/' + extension});
    }else{
      blob = new Blob([this.base64ToArrayBuffer(byte)], {type: 'image/' + extension});
    }

    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }

  base64ToArrayBuffer(base64: any) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  deleteFile(file: any){
    Swal.fire({
      title: 'Suppression',
      text: 'Êtes vous sûr de vouloir supprimer le fichier ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#006a25',
      cancelButtonColor: '#f78300',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // tslint:disable-next-line:triple-equals
        this.indicateursService.deleteIndicateurFile(file.file.indicateur.id, file.file.id).subscribe(
          (resp) => {
            Swal.fire({
              icon: 'success',
              text: 'Fichier supprimé !',
              showConfirmButton: false,
              timer: 5000
            }).then(
              ()=> this.getIndicateurs()
            );
          },
          (err) => {
            this.errorMsgBox(err.error);
          }
        );
      }
    });
  }

  editFileName(idFile: any, fileName: any){
    (async () => {
      const { value: text } = await Swal.fire({
        title: '<strong style="font-size: 20px; text-align: left !important">Renommer le fichier joint sélectionné</strong>',
        html:
          '<fieldset style="border-color: rgba(0,0,0,.6) ;border-radius: 4px; text-align: left">\n' +
          '<legend style="font-size: 11px; color: rgba(0,0,0,.6)">Nom actuel du fichier</legend>\n' +
          '<span style="color: rgba(0,0,0,.7); font-size: 13px; ">' + fileName + '</span>' +
          '  </fieldset>',
        input: 'text',
        inputPlaceholder: 'Nouveau nom du fichier',
        showCloseButton: true,
        inputAttributes: {autocapitalize: 'off'},
        showCancelButton: true,
        confirmButtonColor: '#013baf',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Valider',
        cancelButtonText: 'Annuler',
        preConfirm: (newFileName) => {
          // tslint:disable-next-line:triple-equals
          if (newFileName.length == 0){
            Swal.showValidationMessage(
              `Veuillez saisir le nouveau nom.`
            );
          }
        }
      });

      // @ts-ignore
      /*if (text){
        this.ecourrier.updateFileName(idFile, text).subscribe(
          (resp) => {
            this.showSuccess = true;
            this.getMail();
            setTimeout(() => {
              this.showSuccess = false;
            }, 1000);
          },
          (err) => {
            this.errorMsgAlert(err.error);
          }
        );
      }*/
    }) ();
  }

  sendDemande(){
    this.demandeService.sendDemande(this.demande?.id).subscribe(
      data => {
        this.successMsgBox2('Votre demande de scoring a été bien envoyée.', true);
        // window.location.reload();
      },
      err => console.log(err)
    );
  }

  roundValue(numb: any){
    return Math.round((numb + Number.EPSILON) * 10) / 10;
  }

  successMsgBox(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(
      ()=> {}
    );
  }

  successMsgBox2(msg: any, reload: boolean = false){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(
      ()=> {
        if(reload){
          window.location.reload();
        }
      }
    );
  }

  errorMsgBox(msg: any){
    Swal.fire({
      icon: 'warning',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    });
  }

  emptyFiles(index: any){
    let isEmpty = true;
    const length = this.indicateurs[index].files.length;

    if(length == 0){
      isEmpty = true;
    }
    else if(length == 1){
      isEmpty = this.indicateurs[index].files[0].nomPiece == '';
    }
    else {
      isEmpty = false;
    }

    return isEmpty;
  }

  formatFilename(filename: any){
    return filename.replace(/[#_-]/g,' ');
  }

  nextTab(year: number){
    if(year != 0){
      $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
    }
  }

}
