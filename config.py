import os
from dotenv import load_dotenv

load_dotenv()

def getAppConfig():
    """ 애플리케이션의 전체 설정을 로드하여 반환합니다. """
    configDict = {
        "useModel": os.getenv("USE_MODEL", "OLLAMA"),
        "ollamaModel": os.getenv("OLLAMA_MODEL", "gemma4:e2b"),
        "ollamaBaseUrl": os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
        "openaiApiKey": os.getenv("OPENAI_API_KEY"),
        "mysqlHost": os.getenv("MYSQL_HOST", "localhost"),
        "mysqlUser": os.getenv("MYSQL_USER", "root"),
        "mysqlPassword": os.getenv("MYSQL_PASSWORD", ""),
        "mysqlDatabase": os.getenv("MYSQL_DATABASE", "ai_project_db")
    }
    return configDict
