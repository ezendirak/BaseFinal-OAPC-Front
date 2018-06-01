
import { Injectable } from '@angular/core';

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class ApiUrlConfigService {

  public _loginURL           = '/api/login';
  public _whoamiURL          = '/api/whoami';
  public _refreshURL         = '/api/refresh';
  public _change_passwordURL = '/api/change-password';

  public _userallURL         = '/api/user/all';

  public _getNotesURL        = '/api/v1/notes/';
  public _getNotesPageURL    = '/api/v1/notes_page/';
  public _getNotesCountURL   = '/api/v1/notes_count/';
  public _getNoteURL         = '/api/v1/notes/';
  public _postNoteURL        = '/api/v1/notes/';
  public _putNoteURL         = '/api/v1/notes/';
  public _deleteNoteURL      = '/api/v1/notes/';

  public _getRegistresURL        = '/api/v4/registres/';
  public _getRegistresPageURL     = '/api/v4/registres_page/';

  public _getRegistresPageFiltratURL = '/api/v4/registresFiltrat/';
  public _getRegistresCountURL   = '/api/v4/registres_count/';
  public _getRegistresCountURLFiltrat   = '/api/v4/registres_countFiltrat/';
  
  public _getRegistresPEPPageFiltratURL = '/api/v5/registresPEPFiltrat/';
  public _getRegistresPEPCountURL   = '/api/v5/registresPEP_count/';

  public _getRegistreURL         = '/api/v4/registres/';
  public _postRegistreURL        = '/api/v4/registres/';
  public _postRegistreFromExcelURL        = '/api/v4/fromExcelRegistres/';

  public _downloadToExcel   = 'api/v4/downloadToExcel/';

  public _putRegistreURL         = '/api/v4/registres/';
  public _deleteRegistreURL      = '/api/v4/registres/';
  public _resultatFiltrat         = '/api/v4/filtro/';

  public _periodesDisponibles   = 'api/v4/periodesDisponibles/';
  public _periodesTotals        =  'api/v4/periodesTotals/';
  public _periodesByProd   = 'api/v4/periodesByProd/';
  public _periodesByProductes   = 'api/v4/periByProductes/';

  public _usersByCodiEmp   = 'api/v5/usersByCodiEmp/';

  public _getProductesURL        = '/api/v3/pdu/productes/';
  public _getProductesModalURL        = '/api/v3/pdu/productesModal/';
  public _getProductesModalByUserNameURL        = '/api/v3/pdu/productesModalByUserName/';
  public _getProductesModalByTypeURL        = '/api/v3/productesModalByType/';
  public _getCombosProd          = '/api/v3/pdu/combos/';
  public _getCombosProdModalToAdd         = '/api/v3/pdu/ModalCombosToAdd/';
  public _getAllCombos          = '/api/v3/pduCombos/';
  public _getAllNamesCombos          = '/api/v3/pduNamedCombos/';
  public _provaTest             = '/api/v3/pdu/PROPDU/';
  public _allFam             = '/api/v3/pdu/FAMPDU/';

  
  public _getCombosProdColorCarn     = '/api/v3/pdu/colorcarn/';
  public _getCombosProdQualitat      = '/api/v3/pdu/qualitat/';
  public _getCombosProdVarietat      = '/api/v3/pdu/varietat/';
  public _getCombosProdCalibre       = '/api/v3/pdu/calibre/';


  public _atributsProd                = 'api/v5/atributsProd/';
  public _atributsProdFiltrat                = 'api/v5/atributsProdFiltrat/';

  public _getAtributsProd_countFiltrat  = '/api/v5/atributsProd_countFiltrat';

  public _putRegNoComPer         = '/api/v5/regNoComPer/';

  public _putGestioProducteURL         = '/api/v5/gestioProducte/';
  public _putGestioEmpressaURL         = '/api/v5/gestioEmpressa/';
  public _putGestioPeriodeURL         = '/api/v5/gestioPeriode/';
  public _putGestioPepURL         = '/api/v5/gestioPep/';

  public _deleteGestioEmpressaURL = '/api/v5/deleteEmpresa/'

  public _empressesFiltrat                = 'api/v5/empressesFiltrat/';

  public _empresses_countFiltrat  = '/api/v5/empresses_countFiltrat';

  public _getEmpresesByProd        = '/api/v5/empresesByProd/';
  public _getEmpresesByUserId        = '/api/v5/empresesByUserId/';

  public _periodesFiltrat                = 'api/v5/periodesFiltrat/';

  public _periodes_countFiltrat  = '/api/v5/periodes_countFiltrat';

  public _allEmpresses             = '/api/v5/allEmpresses/';
  public _getProductesModal        = '/api/v5/productesModal/';
  public _getProductesModalNom        = '/api/v5/nomProductesModal/';
  public _postNewAtribut             = '/api/v3/newAtribut/';

  public _postNewPeriodes             = '/api/v5/newPeriodes/';
  public _postNewEmp             = '/api/v5/newEmp/';

  constructor() 
  { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

}
