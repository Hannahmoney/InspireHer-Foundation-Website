from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import time

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://appuser:apppassword@db:5432/appdb"
)

# Retry connection (this is the fix)
for i in range(10):
    try:
        engine = create_engine(DATABASE_URL)
        conn = engine.connect()
        conn.close()
        print("✅ Database connected")
        break
    except Exception as e:
        print("⏳ Waiting for database...")
        time.sleep(2)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()