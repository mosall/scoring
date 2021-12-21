import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {IndicateursService} from "../../../services/indicateurs.service";
import {IdentificationService} from "../../../services/identification.service";
import {AuthService} from "../../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import { DemandeService } from 'src/app/services/demande.service';

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

  constructor(private indicateursService: IndicateursService,
              private sanitizer: DomSanitizer,
              private authService: AuthService,
              private identificationService: IdentificationService,
              private demandeService: DemandeService
  ) { }

  ngOnInit(): void {
    this.getListYear();
    this.getEntreprise();

    this.authService.getUserInfos().subscribe(
      (data: any) => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
        this.getDemandeEnCours(data?.entrepriseId)
      }
    );
  }

  getDemandeEnCours(idEntreprise: any){
    this.demandeService.getDemandeOuverte(idEntreprise).subscribe(
      (data: any) => this.demande = data,
      err => console.log(err)      
    );
  }

  getListYear(){
    const currentYear = new Date().getFullYear();
    for (let i = currentYear-1; i >= currentYear-5; i--){
      this.listYear.push(i);
    }
  }

  saveIndicateur(year: any){
    let payload = {
      annee: this.financialYear - year,
      entreprise: this.connectedUser?.entrepriseId,
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

    if(this.entreprise.indicateurAjoute){
      // @ts-ignore
      payload.id = this.reponsesIndicateur[year].id;
    }

    if(this.connectedUser?.entrepriseId){
      this.indicateursService.saveIndicateurs(payload).subscribe(
        data => {
          // @ts-ignore
          this.indicateurs[year].id = data.id;
          if (this.indicateurs[year].file.file != '' && !this.indicateurs[year].hasFile){
            this.saveFiles(year);
          }

          if(year != 0){
            $('.nav-tabs > .nav-item > .active').parent().next('li').find('a').trigger('click');
          }
          else {
            this.successMsgBox('Indicateurs enregistrés avec succès !');
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
    if (this.connectedUser?.entrepriseId != null){
      this.identificationService.getEntreprise(this.connectedUser?.entrepriseId).subscribe(
        data => {
          // @ts-ignore
          this.entreprise = data;
          if(this.entreprise?.indicateurAjoute){
            this.getIndicateurs();
            this.getRatio();
          }
        }
      )
    }
  }

  getIndicateurs(){
    this.indicateursService.getIndicateurs(this.entreprise?.id).subscribe(
      data => {
        // @ts-ignore
        data.sort((a: any, b: any) => a.annee < b.annee);
        this.reponsesIndicateur = data;
        // @ts-ignore
        this.financialYear = data[0]?.annee;
        this.disableYear = this.financialYear != null;
        [0,1,2].forEach(i => this.setIndicateur(i, data));
        // console.log(this.reponsesIndicateur)
      }
    )
  }

  setIndicateur(index: any, data: any){
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
        // @ts-ignore
        if (data.length != 0){
          // @ts-ignore
          this.indicateurs[index].file = {nomPiece: data[0].nomPiece, file: data};
          this.indicateurs[index].hasFile = true;
        }
        else {
          // @ts-ignore
          this.indicateurs[index].file = {nomPiece: '', file: ''};
          this.indicateurs[index].hasFile = false;
        }
      }
    );
  }

  getRatio(){
    this.indicateursService.getRatio(this.entreprise?.id).subscribe(
      data => {
        // @ts-ignore
        data.listValeurRatioDTO.sort((a: any, b: any) => a.idRatio > b.idRatio);
        this.listRatio = data;
      }
    )
  }

  nextAndPreviousCtrl(){
    $('.previous-btn').click(() => {
      $('.nav-tabs > .nav-item > .active').parent().prev('li').find('a').trigger('click');
    });
  }

  triggerClick(index: any){
    const fileInput = document.getElementById('file'+index) as HTMLInputElement;
    fileInput.click();
  }

  addFileToList(index: any){
    const fileInput = document.getElementById('file'+index) as HTMLInputElement;
    // @ts-ignore
    const fileInputValue = fileInput.files[0];

    // @ts-ignore
    let existing = this.indicateurs[index].file.nomPiece == null ? undefined : (this.indicateurs[index].file.nomPiece == fileInputValue.name ? this.indicateurs[index].file : undefined);

    if (existing != undefined){
      this.errorMsgBox('Ce fichier a été déjà ajouté.');
      return;
    }

    // @ts-ignore
    this.indicateurs[index].file = {nomPiece: fileInputValue.name, file: fileInputValue};
    console.log(this.indicateurs[index].file);
  }

  deleteFileToFileList(id: any, index: any){
    // tslint:disable-next-line:triple-equals
    // @ts-ignore
    this.fileList.splice(index, 1);
  }

  saveFiles(index: any){
    const formData = new FormData();
    formData.append('files', this.indicateurs[index].file.file, this.indicateurs[index].file.nomPiece);
    if (this.indicateurs[index].id != null){
      this.indicateursService.saveIndicateurFile(this.indicateurs[index].id, formData).subscribe(
        data => {
          this.successMsgBox('Le fichier a été enregistré !')
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

  showFile(file: any){
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
    const idFile = file.id;
    console.log(file)
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
        this.indicateursService.deleteIndicateurFile(file.indicateur.id, idFile).subscribe(
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
        this.successMsgBox('Votre demande de scoring a été bien envoyée.');
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
      ()=> {
        if (!msg.startsWith('Le')){
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

}
