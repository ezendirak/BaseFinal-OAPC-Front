
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

  public _getRegistreURL         = '/api/v4/registres/';
  public _postRegistreURL        = '/api/v4/registres/';
  public _putRegistreURL         = '/api/v4/registres/';
  public _deleteRegistreURL      = '/api/v4/registres/';
  public _resultatFiltrat         = '/api/v4/filtro/';

  public _getProductesURL        = '/api/v3/pdu/productes/';
  public _getProductesModalURL        = '/api/v3/pdu/productesModal/';
  public _getCombosProd          = '/api/v3/pdu/combos/';
  public _getAllCombos          = '/api/v3/pduCombos/';
  
  public _getCombosProdColorCarn     = '/api/v3/pdu/colorcarn/';
  public _getCombosProdQualitat      = '/api/v3/pdu/qualitat/';
  public _getCombosProdVarietat      = '/api/v3/pdu/varietat/';
  public _getCombosProdCalibre       = '/api/v3/pdu/calibre/';


  constructor() 
  { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

}
