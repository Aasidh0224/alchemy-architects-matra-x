from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
app=FastAPI(title='MATRA-X | Alchemy Architects')
HTML=Path(__file__).with_name('index.html').read_text(encoding='utf-8')
@app.get('/', response_class=HTMLResponse)
def home(): return HTML
@app.get('/api/health')
def health(): return {'status':'ok','service':'MATRA-X','mode':'static-demo'}
