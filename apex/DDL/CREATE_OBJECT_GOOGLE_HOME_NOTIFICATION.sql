CREATE TABLE  "T_GOOGLE_HOME_NOTIFICATION" 
   (	"T_MESSAGE" VARCHAR2(255) NOT NULL ENABLE, 
	"T_GOOGLE_HOME_IP_ADDRESS" VARCHAR2(255) NOT NULL ENABLE, 
	"T_CREATE_DATE" TIMESTAMP (6) WITH TIME ZONE
   )
/
CREATE TABLE  "T_NOTIFICATION_HISTORY" 
   (	"T_TIME" TIMESTAMP (6) WITH TIME ZONE NOT NULL ENABLE, 
	"T_GOOGLE_HOME_NAME" VARCHAR2(255), 
	"T_MESSAGE" VARCHAR2(255)
   )
/
CREATE TABLE  "T_GOOGLE_HOME_MASTER" 
   (	"T_GOOGLE_HOME_MASTER_ID" VARCHAR2(30), 
	"T_GOOGLE_HOME_NAME" VARCHAR2(255), 
	"T_GOOGLE_HOME_IP_ADDRESS" VARCHAR2(30), 
	 CONSTRAINT "T_GOOGLE_HOME_MASTER_PK" PRIMARY KEY ("T_GOOGLE_HOME_MASTER_ID")
  USING INDEX  ENABLE
   )
/
CREATE OR REPLACE EDITIONABLE PACKAGE  "PKG_RECEIPT_NOTIFICATION_APP" as
    
    --来客名記録
    procedure fnc_RecordGuestReciption
    (
        strGuestName          IN VARCHAR2,
        strGoogleHomeId       IN VARCHAR2
    );

end;
/
CREATE OR REPLACE EDITIONABLE PACKAGE BODY  "PKG_RECEIPT_NOTIFICATION_APP" IS

    --来客名記録
    procedure fnc_RecordGuestReciption
    (
        strGuestName in VARCHAR2,
        strGoogleHomeId in VARCHAR2
    )
    is
        strGoogleHomeIpAddress    T_GOOGLE_HOME_MASTER.T_GOOGLE_HOME_IP_ADDRESS%TYPE; 
        strGoogleHomeName         T_GOOGLE_HOME_MASTER.T_GOOGLE_HOME_NAME%TYPE; 
        strMessage                T_GOOGLE_HOME_NOTIFICATION.T_MESSAGE%TYPE; 
    begin

        --↓ GoogleHomeの情報を取得しておく -------------------------------------------------------------------- 
        BEGIN 

            SELECT 
                T_GOOGLE_HOME_IP_ADDRESS,
                T_GOOGLE_HOME_NAME
                INTO
                strGoogleHomeIpAddress,
                strGoogleHomeName
            FROM 
                T_GOOGLE_HOME_MASTER 
            WHERE 
                T_GOOGLE_HOME_MASTER_ID = strGoogleHomeId; 

        EXCEPTION 
            WHEN NO_DATA_FOUND THEN 
                strGoogleHomeIpAddress := ''; 
        END; 
        --↑ GoogleHomeの情報を取得しておく -------------------------------------------------------------------- 

        --メッセージを作成
        strMessage := 'お知らせです。' || strGuestName || 'さまが到着されました';

        --↓ GoogleHome通知用テーブルにINSERT -----------------------------------------------------------------
        INSERT INTO
            T_GOOGLE_HOME_NOTIFICATION
            (
                T_MESSAGE,
                T_GOOGLE_HOME_IP_ADDRESS,
                T_CREATE_DATE
            )
        VALUES
            (
                strMessage,
                strGoogleHomeIpAddress,
                systimestamp at time zone 'Asia/Tokyo'
            );
        --↑ GoogleHome通知用テーブルにINSERT -----------------------------------------------------------------

        --↓ 通知履歴にINSERT -----------------------------------------------------------------
        INSERT INTO
            T_NOTIFICATION_HISTORY
            (
                T_TIME,
                T_GOOGLE_HOME_NAME,
                T_MESSAGE
            )
        VALUES
            (
                systimestamp at time zone 'Asia/Tokyo',
                strGoogleHomeName,
                strMessage
            );
        --↑ 通知履歴にINSERT -----------------------------------------------------------------

    end fnc_RecordGuestReciption;

END PKG_RECEIPT_NOTIFICATION_APP;
/

