prompt --application/set_environment
set define off verify off feedback off
whenever sqlerror exit sql.sqlcode rollback
--------------------------------------------------------------------------------
--
-- ORACLE Application Express (APEX) export file
--
-- You should run the script connected to SQL*Plus as the Oracle user
-- APEX_180200 or as the owner (parsing schema) of the application.
--
-- NOTE: Calls to apex_application_install override the defaults below.
--
--------------------------------------------------------------------------------
begin
wwv_flow_api.import_begin (
 p_version_yyyy_mm_dd=>'2018.05.24'
,p_default_workspace_id=>17695072528678297
);
end;
/
begin
wwv_flow_api.remove_restful_service(
 p_id=>wwv_flow_api.id(41563068499221118963)
,p_name=>'receiption'
);
 
end;
/
prompt --application/restful_services/receiption
begin
wwv_flow_api.create_restful_module(
 p_id=>wwv_flow_api.id(41563068499221118963)
,p_name=>'receiption'
,p_uri_prefix=>'receiption/api/'
,p_parsing_schema=>'HSCDEVELOP'
,p_items_per_page=>25
,p_status=>'PUBLISHED'
,p_row_version_number=>8
);
wwv_flow_api.create_restful_template(
 p_id=>wwv_flow_api.id(41563073173766118964)
,p_module_id=>wwv_flow_api.id(41563068499221118963)
,p_uri_template=>'receiption?T_GUEST_NAME={strGuestName}&T_GOOGLE_HOME_ID={strGoogleHomeId}'
,p_priority=>0
,p_etag_type=>'HASH'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(12648877402446666)
,p_template_id=>wwv_flow_api.id(41563073173766118964)
,p_source_type=>'QUERY'
,p_format=>'DEFAULT'
,p_method=>'GET'
,p_require_https=>'YES'
,p_source=>'select sysdate from dual'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(41563082615010118967)
,p_template_id=>wwv_flow_api.id(41563073173766118964)
,p_source_type=>'PLSQL'
,p_format=>'DEFAULT'
,p_method=>'PUT'
,p_require_https=>'YES'
,p_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'begin',
'    PKG_RECEIPT_NOTIFICATION_APP.fnc_RecordGuestReciption(:strGuestName, :strGoogleHomeId);',
'end;',
''))
);
end;
/
begin
wwv_flow_api.import_end(p_auto_install_sup_obj => nvl(wwv_flow_application_install.get_auto_install_sup_obj, false));
commit;
end;
/
set verify on feedback on define on
prompt  ...done
