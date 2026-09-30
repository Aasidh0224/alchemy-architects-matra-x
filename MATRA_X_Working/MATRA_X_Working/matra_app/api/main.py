from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import csv, io, re, os, json
from difflib import SequenceMatcher

app=FastAPI(title='MATRA-X API',version='0.1.0')

class MatchRequest(BaseModel):
    a: Dict[str,Any]
    b: Dict[str,Any]

def norm(s): return re.sub(r'[^a-z0-9]+',' ',str(s).lower()).strip()

def hybrid(a,b):
    ta=norm(a.get('description',''));tb=norm(b.get('description',''))
    lexical=SequenceMatcher(None,ta,tb).ratio()
    attrs=['category','uom','size','dimension','material_grade','standard']
    matched=sum(bool(a.get(k)) and bool(b.get(k)) and norm(a.get(k))==norm(b.get(k)) for k in attrs)
    conflicts=[k for k in attrs if a.get(k) and b.get(k) and norm(a.get(k))!=norm(b.get(k))]
    score=0.5*lexical+0.5*(matched/max(1,len(attrs)))
    if conflicts: score*=0.65
    return {'score':round(score*100,2),'lexical_similarity':round(lexical*100,2),'attribute_match_count':matched,'conflicts':conflicts,'decision':'TECHNICAL_REVIEW' if conflicts else ('MATCH_CANDIDATE' if score>=.72 else 'UNRELATED')}

@app.get('/api/health')
def health(): return {'status':'ok','service':'MATRA-X','llm_provider':os.getenv('MATRA_LLM_PROVIDER','demo')}

@app.post('/api/match')
def match(req:MatchRequest): return hybrid(req.a,req.b)

@app.post('/api/ingest')
async def ingest(file:UploadFile=File(...)):
    raw=await file.read(); text=raw.decode('utf-8',errors='replace'); rows=list(csv.DictReader(io.StringIO(text))); return {'filename':file.filename,'rows':len(rows),'preview':rows[:25]}

@app.post('/api/harmonize')
def harmonize(materials:List[Dict[str,Any]]):
    out=[]
    for i in range(min(len(materials),50)):
        for j in range(i+1,min(len(materials),50)):
            r=hybrid(materials[i],materials[j])
            if r['score']>=72: out.append({'a':i,'b':j,**r})
    out.sort(key=lambda x:x['score'],reverse=True)
    return {'candidates':out[:100]}

@app.get('/api/providers')
def providers():
    return {'openai':{'model_env':'OPENAI_MODEL','key_env':'OPENAI_API_KEY'},'gemini':{'model_env':'GEMINI_MODEL','key_env':'GEMINI_API_KEY'},'anthropic':{'model_env':'ANTHROPIC_MODEL','key_env':'ANTHROPIC_API_KEY'}}
