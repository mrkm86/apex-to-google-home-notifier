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
,p_default_workspace_id=>21087084858114131
);
end;
/
begin
wwv_flow_api.remove_restful_service(
 p_id=>wwv_flow_api.id(41573961015843143797)
,p_name=>'google-home-notifier'
);
 
end;
/
prompt --application/restful_services/google_home_notifier
begin
wwv_flow_api.create_restful_module(
 p_id=>wwv_flow_api.id(41573961015843143797)
,p_name=>'google-home-notifier'
,p_uri_prefix=>'google-home-notifier/api/'
,p_parsing_schema=>'HSCDEMO'
,p_items_per_page=>25
,p_status=>'PUBLISHED'
,p_row_version_number=>13
);
wwv_flow_api.create_restful_template(
 p_id=>wwv_flow_api.id(12643241208993810)
,p_module_id=>wwv_flow_api.id(41573961015843143797)
,p_uri_template=>'message'
,p_priority=>0
,p_etag_type=>'HASH'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(12643474342997872)
,p_template_id=>wwv_flow_api.id(12643241208993810)
,p_source_type=>'PLSQL'
,p_format=>'DEFAULT'
,p_method=>'DELETE'
,p_require_https=>'YES'
,p_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'begin',
'    delete',
'    from',
'        T_GOOGLE_HOME_NOTIFICATION;',
'end;'))
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(12643311573995894)
,p_template_id=>wwv_flow_api.id(12643241208993810)
,p_source_type=>'QUERY'
,p_format=>'DEFAULT'
,p_method=>'GET'
,p_require_https=>'YES'
,p_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select',
'T_MESSAGE',
'from',
'T_GOOGLE_HOME_NOTIFICATION'))
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
