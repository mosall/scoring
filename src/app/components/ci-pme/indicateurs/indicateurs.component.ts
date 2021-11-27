import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {IndicateursService} from "../../../services/indicateurs.service";
import {IdentificationService} from "../../../services/identification.service";
import {AuthService} from "../../../services/auth.service";
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
      file: {nomPiece: '', file: ''}
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
      file: {nomPiece: '', file: ''}
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
      file: {nomPiece: '', file: ''}
    }
  ];
  reponsesIndicateur: any = [];
  listRatio: any = [];

  fileToAdd: any = [];
  fileList: any = [null, null, null];
  formData = new FormData();

  constructor(private indicateursService: IndicateursService, private authService: AuthService,
              private identificationService: IdentificationService) { }

  ngOnInit(): void {
    this.getListYear();
    this.getEntreprise();

    this.authService.getUserInfos().subscribe(
      data => {
        sessionStorage.setItem('connectedUserData', JSON.stringify(data));
      }
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
      caf: this.indicateurs[year].indicateurs[7].value,
      caCapitauxPropres: this.indicateurs[year].indicateurs[8].value,
      dfTotalRessources: this.indicateurs[year].indicateurs[9].value,
      djDettesFournisseurs: this.indicateurs[year].indicateurs[10].value,
      raAchats: this.indicateurs[year].indicateurs[11].value,
      xdExcedentBrutExploit: this.indicateurs[year].indicateurs[12].value,
      rmChargesFinancieres: this.indicateurs[year].indicateurs[13].value,
    }

    if(this.entreprise.indicateurAjoute){
      // @ts-ignore
      payload.id = this.reponsesIndicateur[year].id;
    }

    if(this.connectedUser?.entrepriseId){
      this.indicateursService.saveIndicateurs(payload).subscribe(
        data => {
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

  getIndicateurs(){
    this.indicateursService.getIndicateurs(this.entreprise?.id).subscribe(
      data => {
        // @ts-ignore
        data.sort((a: any, b: any) => a.annee < b.annee);
        this.reponsesIndicateur = data;
        // @ts-ignore
        this.financialYear = data[0]?.annee;
        [0,1,2].forEach(i => this.setIndicateur(i, data));
        console.log(this.indicateurs)
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
          this.indicateurs[index].file = {nomPiece: data.name, file: data};
        }
        else {
          // @ts-ignore
          this.indicateurs[index].file = {nomPiece: '', file: ''};
        }
      }
    )
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

  triggerClick(){
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.click();
  }

  addFileToList(index: any){
    const fileInput = document.getElementById('file') as HTMLInputElement;
    // @ts-ignore
    const fileInputValue = fileInput.files[0];

    /*// @ts-ignore
    let existing = this.fileList.find(file => {
      return file != null ? file.file.name == fileInputValue.name : undefined;
    });

    if (existing != undefined){
      this.errorMsgBox('Ce fichier a été déjà ajouté.');
      return;
    }*/

    // @ts-ignore
    let existing = this.indicateurs[index].file.nomPiece == null ? undefined : (this.indicateurs[index].file.nomPiece == fileInputValue.name ? this.indicateurs[index].file : undefined);

    if (existing != undefined){
      this.errorMsgBox('Ce fichier a été déjà ajouté.');
      return;
    }

    /*this.fileList.splice(index, 1);
    this.fileList.splice(index, 0, {file: fileInputValue});*/
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
    this.indicateursService.saveIndicateurFile(this.indicateurs[index].id, formData).subscribe(
      data => {
        console.log('ok');
      },
      error => {
        console.log('nok')
      }
    );

    // this.fileList[index] = [];
  }

  showFile(){}

  deleteFile(idFile: any){
    console.log(idFile);
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
        /*this.ecourrier.deleteFile(this.idCourrier, idFile, [
          (resp) => {
            console.log(resp);
            this.getMail();
          },
          (err) => {
            this.errorMsgAlert(err.error);
          }
        ]);*/
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


  successMsgBox(msg: any){
    Swal.fire({
      icon: 'success',
      text: msg,
      showConfirmButton: false,
      timer: 5000
    }).then(
      ()=> window.location.reload()
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
