from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'reports'
OUT.mkdir(exist_ok=True)

styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='H1X',parent=styles['Heading1'],fontSize=17,leading=21,textColor=colors.HexColor('#12314a'),spaceBefore=10,spaceAfter=7))
styles.add(ParagraphStyle(name='H2X',parent=styles['Heading2'],fontSize=12,leading=15,textColor=colors.HexColor('#0b6474'),spaceBefore=8,spaceAfter=5))
styles.add(ParagraphStyle(name='BX',parent=styles['BodyText'],fontSize=9.2,leading=13,textColor=colors.HexColor('#26384a'),spaceAfter=5))

def esc(s): return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

def build(src,dst):
    lines=Path(src).read_text(encoding='utf-8').splitlines()
    story=[]
    for line in lines:
        if line.startswith('# '): story.append(Paragraph(esc(line[2:]),styles['H1X']))
        elif line.startswith('## '): story.append(Paragraph(esc(line[3:]),styles['H1X']))
        elif line.startswith('### '): story.append(Paragraph(esc(line[4:]),styles['H2X']))
        elif line.startswith('- '): story.append(Paragraph('• '+esc(line[2:]),styles['BX']))
        elif line.strip()=='': story.append(Spacer(1,3))
        elif line.startswith('|'):
            cells=[c.strip() for c in line.strip('|').split('|')]
            if not all(set(c) <= set('-: ') for c in cells):
                t=Table([[Paragraph(esc(c),styles['BX']) for c in cells]])
                t.setStyle(TableStyle([('GRID',(0,0),(-1,-1),0.3,colors.HexColor('#cbd6df')),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#f5f8fb')),('VALIGN',(0,0),(-1,-1),'TOP')]))
                story.append(t)
        else: story.append(Paragraph(esc(line),styles['BX']))
    doc=SimpleDocTemplate(str(dst),pagesize=A4,leftMargin=36,rightMargin=36,topMargin=36,bottomMargin=32)
    def footer(canvas,d):
        canvas.saveState(); canvas.setFont('Helvetica',7); canvas.setFillColor(colors.HexColor('#738394'))
        canvas.drawString(40,18,'MATRA-X | Alchemy Architects | SIH26099')
        canvas.drawRightString(555,18,f'Page {d.page}'); canvas.restoreState()
    doc.build(story,onFirstPage=footer,onLaterPages=footer)

build(ROOT/'docs/TECHNICAL_REPORT.md',OUT/'MATRA_X_Technical_Report_SIH26099.pdf')
build(ROOT/'docs/USER_MANUAL.md',OUT/'MATRA_X_User_Manual_SIH2026.pdf')
print('PDFs created')