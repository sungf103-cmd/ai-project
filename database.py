import mysql.connector
import config

def getDatabaseConnection():
    """ MySQL 데이터베이스 연결을 생성하고 반환합니다. """
    appConfig = config.getAppConfig()
    try:
        connection = mysql.connector.connect(
            host=appConfig["mysqlHost"],
            user=appConfig["mysqlUser"],
            password=appConfig["mysqlPassword"],
            database=appConfig["mysqlDatabase"]
        )
        return connection
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

def executeQuery(query, params=None):
    """ SQL 쿼리를 실행합니다. (INSERT, UPDATE, DELETE) """
    dbConnection = getDatabaseConnection()
    if dbConnection is None:
        return {"success": False, "message": "Database connection failed"}
    
    try:
        cursor = dbConnection.cursor(dictionary=True)
        cursor.execute(query, params)
        dbConnection.commit()
        cursor.close()
        dbConnection.close()
        return {"success": True, "message": "Query executed successfully"}
    except Exception as e:
        if dbConnection:
            dbConnection.close()
        return {"success": False, "message": str(e)}

def fetchAll(query, params=None):
    """ SQL 쿼리 결과를 모두 가져옵니다. (SELECT) """
    dbConnection = getDatabaseConnection()
    if dbConnection is None:
        return []
    
    try:
        cursor = dbConnection.cursor(dictionary=True)
        cursor.execute(query, params)
        resultList = cursor.fetchall()
        
        # 가이드라인에 따른 반복문 형식 사용 (리스트 컴프리헨션 금지)
        finalResult = []
        for i in range(0, len(resultList)):
            finalResult.append(resultList[i])
            
        cursor.close()
        dbConnection.close()
        return finalResult
    except Exception as e:
        if dbConnection:
            dbConnection.close()
        print(f"Fetch error: {e}")
        return []
