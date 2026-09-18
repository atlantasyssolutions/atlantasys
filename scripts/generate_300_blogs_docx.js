const fs = require('fs');
const path = require('path');
const docx = require('docx');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  PageBreak,
  ExternalHyperlink
} = docx;

// Color Palette
const COLOR_NAVY = '1E3A8A';       // Atlanta Deep Blue
const COLOR_DARK = '0F172A';       // Dark Slate (Headings)
const COLOR_BODY = '334155';       // Slate Body Text
const COLOR_MUTED = '64748B';      // Muted Subtext
const COLOR_BG_HEADER = '1E3A8A';  // Table Header Background
const COLOR_BG_ZEBRA = 'F8FAFC';   // Alternate Table Row
const COLOR_BG_CARD = 'F1F5F9';    // Metadata & Spec Card Background
const COLOR_BORDER = 'CBD5E1';     // Subtle Border
const COLOR_TEAL = '0284C7';       // Accent Blue / Cyan
const COLOR_GREEN = '15803D';      // Accent Green Gain
const COLOR_LINK = '0369A1';       // Hyperlink Blue

const blogDir = path.join(__dirname, '..', 'content', 'blogs');
const allFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md')).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

console.log(`Found ${allFiles.length} blog markdown files to process.`);

// Tokenize and convert inline markdown (bold, italics, code, links) to Docx runs
function parseInlineRuns(text, options = {}) {
  const font = options.font || 'Segoe UI';
  const size = options.size || 21; // 10.5 pt
  const color = options.color || COLOR_BODY;

  const tokens = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: text.substring(lastIndex, match.index) });
    }
    const m = match[0];
    if (m.startsWith('**') && m.endsWith('**')) {
      tokens.push({ type: 'bold', value: m.slice(2, -2) });
    } else if (m.startsWith('*') && m.endsWith('*')) {
      tokens.push({ type: 'italic', value: m.slice(1, -1) });
    } else if (m.startsWith('`') && m.endsWith('`')) {
      tokens.push({ type: 'code', value: m.slice(1, -1) });
    } else if (m.startsWith('[')) {
      const lm = m.match(/\[(.*?)\]\((.*?)\)/);
      if (lm) tokens.push({ type: 'link', text: lm[1], url: lm[2] });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.substring(lastIndex) });
  }

  const runs = [];
  for (const t of tokens) {
    if (t.type === 'text') {
      runs.push(new TextRun({ text: t.value, font, size, color }));
    } else if (t.type === 'bold') {
      runs.push(new TextRun({ text: t.value, bold: true, font, size, color: COLOR_DARK }));
    } else if (t.type === 'italic') {
      runs.push(new TextRun({ text: t.value, italics: true, font, size, color }));
    } else if (t.type === 'code') {
      runs.push(new TextRun({ text: t.value, font: 'Consolas', size: 19, color: COLOR_TEAL }));
    } else if (t.type === 'link') {
      let url = t.url;
      if (url.startsWith('/')) url = 'https://www.atlantasys.com' + url;
      runs.push(new ExternalHyperlink({
        children: [
          new TextRun({
            text: t.text,
            font,
            size,
            color: COLOR_LINK,
            underline: { type: 'single' }
          })
        ],
        link: url
      }));
    }
  }
  return runs.length > 0 ? runs : [new TextRun({ text: '', font, size })];
}

// Parse single blog file
function parseBlog(content, filename) {
  const lines = content.split('\r\n').join('\n').split('\n');
  const titleLine = lines.find(l => l.startsWith('# '));
  const title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : '';

  // Parse header metadata (before first '## ')
  const metadata = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.startsWith('## ')) break;
    const match = l.match(/^\*\s*\*\*([^*]+)\*\*:\s*(.*)$/);
    if (match) {
      metadata[match[1].trim()] = match[2].trim().replace(/^`|`$/g, '');
    }
  }

  // Parse all content sections
  const sections = [];
  let currentSec = null;
  for (; i < lines.length; i++) {
    const l = lines[i];
    const trimmed = l.trim();
    if (trimmed.startsWith('## ')) {
      if (currentSec) sections.push(currentSec);
      currentSec = { title: trimmed.replace(/^##\s+/, '').trim(), rawLines: [] };
    } else if (currentSec) {
      currentSec.rawLines.push(l);
    }
  }
  if (currentSec) sections.push(currentSec);

  return { filename, title, metadata, sections };
}

// Metadata Card Table
function buildMetadataTable(meta) {
  const borderNone = {
    top: { style: BorderStyle.NONE },
    bottom: { style: BorderStyle.NONE },
    left: { style: BorderStyle.NONE },
    right: { style: BorderStyle.NONE }
  };

  const rows = [
    [
      { label: 'Category:', value: meta['Category'] || 'Enterprise Fleet Telematics' },
      { label: 'Hardware Model:', value: meta['Hardware Model'] || 'Commercial Hardware' }
    ],
    [
      { label: 'Location:', value: `${meta['City'] || 'Global'}, ${meta['Country'] || ''} (${meta['Geo Region'] || 'Global'})` },
      { label: 'Author:', value: `${meta['Author'] || 'Atlanta Systems Digital Team'} | ${meta['Published Date'] || '2026'}` }
    ],
    [
      { label: 'Estimated Read:', value: meta['Estimated Read Time'] || '10 min read' },
      { label: 'SEO Keywords:', value: meta['SEO Keywords'] || 'Fleet IoT, Telematics' }
    ],
    [
      { label: 'Article Slug:', value: meta['Slug'] || '' },
      { label: 'Target Market:', value: `${meta['City Slug'] || ''} (${meta['Geo Region'] || 'Regional Enterprise'})` }
    ]
  ];

  const tableRows = rows.map(r => {
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          borders: borderNone,
          shading: { fill: COLOR_BG_CARD, type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 140, right: 140 },
          children: [
            new Paragraph({
              spacing: { after: 20, line: 240 },
              children: [
                new TextRun({ text: r[0].label + ' ', bold: true, size: 17, color: COLOR_NAVY, font: 'Segoe UI' }),
                new TextRun({ text: r[0].value, size: 17, color: COLOR_BODY, font: 'Segoe UI' })
              ]
            })
          ]
        }),
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          borders: borderNone,
          shading: { fill: COLOR_BG_CARD, type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 140, right: 140 },
          children: [
            new Paragraph({
              spacing: { after: 20, line: 240 },
              children: [
                new TextRun({ text: r[1].label + ' ', bold: true, size: 17, color: COLOR_NAVY, font: 'Segoe UI' }),
                new TextRun({ text: r[1].value, size: 17, color: COLOR_BODY, font: 'Segoe UI' })
              ]
            })
          ]
        })
      ]
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows
  });
}

// Hardware Architecture Specification Card
function buildArchitectureCard(rawLines) {
  const specItems = [];
  rawLines.forEach(l => {
    const m = l.match(/\|\s*\[(.*?)\]\s*->\s*(.*?)\s*\|/);
    if (m) {
      specItems.push({ label: m[1].trim(), spec: m[2].trim() });
    }
  });

  if (specItems.length === 0) return null;

  const tableBorders = {
    top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    insideVertical: { style: BorderStyle.NONE }
  };

  const headerRow = new TableRow({
    children: [
      new TableCell({
        columnSpan: 2,
        width: { size: 100, type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_NAVY, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 160, right: 160 },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 0 },
            children: [
              new TextRun({
                text: 'ATLANTA SYSTEMS INDUSTRIAL TELEMATICS HARDWARE ARCHITECTURE',
                bold: true,
                size: 18,
                color: 'FFFFFF',
                font: 'Segoe UI'
              })
            ]
          })
        ]
      })
    ]
  });

  const bodyRows = specItems.map((item, idx) => {
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 28, type: WidthType.PERCENTAGE },
          shading: { fill: idx % 2 === 0 ? COLOR_BG_CARD : 'FFFFFF', type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 140, right: 140 },
          children: [
            new Paragraph({
              spacing: { after: 0 },
              children: [
                new TextRun({ text: item.label, bold: true, size: 17, color: COLOR_NAVY, font: 'Segoe UI' })
              ]
            })
          ]
        }),
        new TableCell({
          width: { size: 72, type: WidthType.PERCENTAGE },
          shading: { fill: idx % 2 === 0 ? COLOR_BG_CARD : 'FFFFFF', type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 140, right: 140 },
          children: [
            new Paragraph({
              spacing: { after: 0 },
              children: [
                new TextRun({ text: item.spec, size: 17, color: COLOR_DARK, font: 'Segoe UI' })
              ]
            })
          ]
        })
      ]
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: [headerRow, ...bodyRows]
  });
}

// 4-Column Operational Metric Benchmark Table
function buildMetricsTable(rawLines) {
  const tableLines = rawLines.filter(l => l.trim().startsWith('|') && l.trim().endsWith('|'));
  const headerIdx = tableLines.findIndex(l => l.includes(':---'));
  if (headerIdx <= 0) return null;

  const headerCols = tableLines[headerIdx - 1].split('|').map(c => c.trim()).filter(Boolean);
  const dataRows = [];
  for (let i = headerIdx + 1; i < tableLines.length; i++) {
    const cols = tableLines[i].split('|').map(c => c.trim().replace(/\*\*/g, '')).filter(Boolean);
    if (cols.length >= 4) dataRows.push(cols);
  }

  const tableBorders = {
    top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_NAVY },
    bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
    left: { style: BorderStyle.NONE },
    right: { style: BorderStyle.NONE },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
    insideVertical: { style: BorderStyle.NONE }
  };

  const headerRow = new TableRow({
    children: headerCols.map((col, idx) => {
      const widths = [32, 23, 23, 22];
      return new TableCell({
        width: { size: widths[idx] || 25, type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_NAVY, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [
          new Paragraph({
            spacing: { after: 0 },
            children: [
              new TextRun({ text: col, bold: true, size: 18, color: 'FFFFFF', font: 'Segoe UI' })
            ]
          })
        ]
      });
    })
  });

  const rows = dataRows.map((r, rowIdx) => {
    return new TableRow({
      children: r.map((c, colIdx) => {
        const widths = [32, 23, 23, 22];
        const isGain = colIdx === 3;
        const isMetric = colIdx === 0;
        return new TableCell({
          width: { size: widths[colIdx] || 25, type: WidthType.PERCENTAGE },
          shading: { fill: rowIdx % 2 === 0 ? COLOR_BG_ZEBRA : 'FFFFFF', type: ShadingType.CLEAR },
          margins: { top: 70, bottom: 70, left: 120, right: 120 },
          children: [
            new Paragraph({
              spacing: { after: 0 },
              children: [
                new TextRun({
                  text: c,
                  bold: isMetric || isGain,
                  size: 17,
                  color: isGain ? COLOR_GREEN : (isMetric ? COLOR_DARK : COLOR_BODY),
                  font: 'Segoe UI'
                })
              ]
            })
          ]
        });
      })
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: [headerRow, ...rows]
  });
}

// Convert parsed blog post into Docx document elements
function createArticleElements(blog, articleNumber) {
  const elements = [];

  // Page Break before every article
  elements.push(new Paragraph({
    children: [new PageBreak()]
  }));

  // Article Pre-Header Badge
  const numStr = String(articleNumber).padStart(3, '0');
  const cat = blog.metadata['Category'] || 'Telematics';
  const loc = `${blog.metadata['City'] || 'Global'}, ${blog.metadata['Country'] || ''}`.toUpperCase();

  elements.push(new Paragraph({
    spacing: { before: 80, after: 60 },
    children: [
      new TextRun({
        text: `ARTICLE #${numStr}   •   ${cat.toUpperCase()}   •   ${loc}`,
        bold: true,
        size: 17,
        color: COLOR_TEAL,
        font: 'Segoe UI'
      })
    ]
  }));

  // Title
  elements.push(new Paragraph({
    spacing: { before: 0, after: 140 },
    children: [
      new TextRun({
        text: blog.title,
        bold: true,
        size: 30, // 15pt
        color: COLOR_NAVY,
        font: 'Segoe UI'
      })
    ]
  }));

  // Metadata Card Table
  elements.push(buildMetadataTable(blog.metadata));
  elements.push(new Paragraph({ spacing: { after: 140 } }));

  // Render Sections
  blog.sections.forEach(sec => {
    // Skip Table of Contents section inside the article
    if (sec.title.toLowerCase().includes('table of contents')) return;

    // Section Heading
    elements.push(new Paragraph({
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: sec.title,
          bold: true,
          size: 23, // 11.5pt
          color: COLOR_NAVY,
          font: 'Segoe UI'
        })
      ]
    }));

    // Check if section is Hardware Architecture
    if (sec.title.toLowerCase().includes('hardware engineering')) {
      const proseLines = [];
      let inBox = false;
      const boxLines = [];

      sec.rawLines.forEach(line => {
        if (line.includes('+---')) {
          inBox = !inBox;
          boxLines.push(line);
        } else if (inBox) {
          boxLines.push(line);
        } else {
          proseLines.push(line);
        }
      });

      // Render prose
      proseLines.join('\n').split('\n\n').forEach(para => {
        const trimmed = para.trim().replace(/^---\s*$/, '');
        if (!trimmed) return;
        elements.push(new Paragraph({
          spacing: { line: 260, after: 100 },
          children: parseInlineRuns(trimmed)
        }));
      });

      // Render Architecture Table
      const archTable = buildArchitectureCard(boxLines);
      if (archTable) {
        elements.push(archTable);
        elements.push(new Paragraph({ spacing: { after: 140 } }));
      }
      return;
    }

    // Check if section is Metrics Table
    if (sec.title.toLowerCase().includes('what fleets typically see')) {
      const proseLines = [];
      const tableLines = [];
      sec.rawLines.forEach(line => {
        if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
          tableLines.push(line);
        } else {
          proseLines.push(line);
        }
      });

      // Render prose
      proseLines.join('\n').split('\n\n').forEach(para => {
        const trimmed = para.trim().replace(/^---\s*$/, '');
        if (!trimmed) return;
        elements.push(new Paragraph({
          spacing: { line: 260, after: 100 },
          children: parseInlineRuns(trimmed)
        }));
      });

      // Render Metrics Table
      const metricsTable = buildMetricsTable(tableLines);
      if (metricsTable) {
        elements.push(metricsTable);
        elements.push(new Paragraph({ spacing: { after: 140 } }));
      }
      return;
    }

    // Check if Technical Questions
    if (sec.title.toLowerCase().includes('technical questions')) {
      const rawText = sec.rawLines.join('\n');
      const qBlocks = rawText.split(/(?=###\s+Q\d+:)/g);

      qBlocks.forEach(qb => {
        const lines = qb.trim().split('\n');
        if (lines.length === 0 || !lines[0].trim()) return;

        if (lines[0].startsWith('### ')) {
          const qTitle = lines[0].replace(/^###\s+/, '').trim();
          const answerText = lines.slice(1).join('\n').trim().replace(/^---\s*$/, '');

          elements.push(new Paragraph({
            spacing: { before: 140, after: 50 },
            children: [
              new TextRun({
                text: '•  ' + qTitle,
                bold: true,
                size: 20,
                color: COLOR_NAVY,
                font: 'Segoe UI'
              })
            ]
          }));

          if (answerText) {
            elements.push(new Paragraph({
              spacing: { line: 260, after: 100 },
              indent: { left: 220 },
              children: parseInlineRuns(answerText)
            }));
          }
        } else {
          // Normal prose before Qs
          const trimmed = qb.trim().replace(/^---\s*$/, '');
          if (trimmed) {
            elements.push(new Paragraph({
              spacing: { line: 260, after: 100 },
              children: parseInlineRuns(trimmed)
            }));
          }
        }
      });
      return;
    }

    // Default section (Executive Summary, Operational Challenge, Put Battle-Tested...)
    const paragraphs = sec.rawLines.join('\n').split('\n\n');
    paragraphs.forEach(para => {
      const trimmed = para.trim().replace(/^---\s*$/, '');
      if (!trimmed) return;

      if (trimmed.startsWith('### ')) {
        const subTitle = trimmed.replace(/^###\s+/, '').trim();
        elements.push(new Paragraph({
          spacing: { before: 140, after: 60 },
          children: [
            new TextRun({
              text: subTitle,
              bold: true,
              size: 21,
              color: COLOR_DARK,
              font: 'Segoe UI'
            })
          ]
        }));
      } else if (trimmed.startsWith('* ')) {
        // List items
        const listLines = trimmed.split('\n');
        listLines.forEach(ll => {
          const itemText = ll.replace(/^\*\s+/, '').trim();
          if (!itemText) return;
          elements.push(new Paragraph({
            spacing: { line: 250, after: 50 },
            indent: { left: 220 },
            children: [
              new TextRun({ text: '▪  ', color: COLOR_TEAL, size: 19 }),
              ...parseInlineRuns(itemText)
            ]
          }));
        });
      } else {
        elements.push(new Paragraph({
          spacing: { line: 260, after: 100 },
          children: parseInlineRuns(trimmed)
        }));
      }
    });
  });

  return elements;
}

// Build Front Cover Page & Executive Foreword
function createCoverAndForeword(totalArticles) {
  const elements = [];

  // Top spacing
  elements.push(new Paragraph({ spacing: { before: 800, after: 100 } }));

  // Organization Overline
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: 'ATLANTA SYSTEMS  •  TELEMATICS & IOT ENGINEERING',
        bold: true,
        size: 24,
        color: COLOR_TEAL,
        font: 'Segoe UI'
      })
    ]
  }));

  // Master Title
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    children: [
      new TextRun({
        text: 'GLOBAL TELEMATICS FIELD COMPENDIUM',
        bold: true,
        size: 44, // 22pt
        color: COLOR_NAVY,
        font: 'Segoe UI'
      })
    ]
  }));

  // Subtitle
  elements.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [
      new TextRun({
        text: `The Complete ${totalArticles}-Article Archive of Technical Publications, Edge Diagnostics, Regional Compliance & Industrial Fleet Telematics Architectures`,
        size: 22,
        color: COLOR_MUTED,
        font: 'Segoe UI'
      })
    ]
  }));

  // Decorative metadata box on cover
  const coverTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 12, color: COLOR_NAVY },
      bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR_NAVY },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            shading: { fill: COLOR_BG_CARD, type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: 'Total Publications: ', bold: true, size: 19, color: COLOR_NAVY }),
                  new TextRun({ text: `${totalArticles} Technical Field Studies`, size: 19, color: COLOR_DARK })
                ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: 'Global Footprint: ', bold: true, size: 19, color: COLOR_NAVY }),
                  new TextRun({ text: '27+ Countries, 100+ Freight Corridors', size: 19, color: COLOR_DARK })
                ]
              }),
              new Paragraph({
                spacing: { after: 0 },
                children: [
                  new TextRun({ text: 'Operational Assets: ', bold: true, size: 19, color: COLOR_NAVY }),
                  new TextRun({ text: '1,000,000+ Active Vehicles Deployed', size: 19, color: COLOR_DARK })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            shading: { fill: COLOR_BG_CARD, type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: 'Engineering Org: ', bold: true, size: 19, color: COLOR_NAVY }),
                  new TextRun({ text: 'Atlanta Systems Digital Team', size: 19, color: COLOR_DARK })
                ]
              }),
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: 'Manufacturing Standard: ', bold: true, size: 19, color: COLOR_NAVY }),
                  new TextRun({ text: 'ISO 9001 SMT Certified Facilities', size: 19, color: COLOR_DARK })
                ]
              }),
              new Paragraph({
                spacing: { after: 0 },
                children: [
                  new TextRun({ text: 'Publication Year: ', bold: true, size: 19, color: COLOR_NAVY }),
                  new TextRun({ text: '2026 Enterprise Edition', size: 19, color: COLOR_DARK })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  elements.push(coverTable);
  elements.push(new Paragraph({ spacing: { before: 500, after: 200 } }));

  // Executive Foreword
  elements.push(new Paragraph({
    spacing: { before: 200, after: 120 },
    children: [
      new TextRun({
        text: 'Executive Foreword: 32 Years of Telematics Engineering Excellence',
        bold: true,
        size: 26,
        color: COLOR_NAVY,
        font: 'Segoe UI'
      })
    ]
  }));

  elements.push(new Paragraph({
    spacing: { line: 280, after: 140 },
    children: [
      new TextRun({
        text: 'Over the past three decades, Atlanta Systems has engineered, manufactured, and deployed industrial-grade IoT hardware and telematics gateways that operate in some of the world\'s most demanding environments. This compendium brings together all 300 technical field publications produced by our engineering and security teams, representing exhaustive field deployment blueprints across 27+ countries and over 100 high-density commercial freight corridors.',
        size: 21,
        color: COLOR_BODY,
        font: 'Segoe UI'
      })
    ]
  }));

  elements.push(new Paragraph({
    spacing: { line: 280, after: 140 },
    children: [
      new TextRun({
        text: 'Each publication is designed as a standalone operational guide addressing real-world telemetry challenges: statutory compliance certifications (such as MoRTH AIS-140, FMCSA ELD, EU Smart Tachograph, and Saudi WASAL), anti-siphoning capacitive fuel analytics, heavy-duty CAN-Bus J1939 engine telemetry, dual-SIM failover architectures, AI dual-lens dashcam computer vision, and cold-chain BLE probe integrations.',
        size: 21,
        color: COLOR_BODY,
        font: 'Segoe UI'
      })
    ]
  }));

  return elements;
}

// Build Global Directory / Master Table of Contents Table
function createDirectoryTable(articles) {
  const elements = [];

  elements.push(new Paragraph({
    children: [new PageBreak()]
  }));

  elements.push(new Paragraph({
    spacing: { before: 100, after: 60 },
    children: [
      new TextRun({
        text: 'MASTER DIRECTORY OF PUBLICATIONS',
        bold: true,
        size: 28,
        color: COLOR_NAVY,
        font: 'Segoe UI'
      })
    ]
  }));

  elements.push(new Paragraph({
    spacing: { after: 180 },
    children: [
      new TextRun({
        text: 'Comprehensive index of all 300 technical articles categorized by location, hardware model, and operational category.',
        size: 20,
        color: COLOR_MUTED,
        font: 'Segoe UI'
      })
    ]
  }));

  const headerRow = new TableRow({
    children: [
      { text: '#', width: 8 },
      { text: 'Article Title', width: 44 },
      { text: 'Hardware Model', width: 18 },
      { text: 'Territory / City', width: 15 },
      { text: 'Category', width: 15 }
    ].map(col => {
      return new TableCell({
        width: { size: col.width, type: WidthType.PERCENTAGE },
        shading: { fill: COLOR_NAVY, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 80, right: 80 },
        children: [
          new Paragraph({
            spacing: { after: 0 },
            children: [
              new TextRun({ text: col.text, bold: true, size: 16, color: 'FFFFFF', font: 'Segoe UI' })
            ]
          })
        ]
      });
    })
  });

  const bodyRows = articles.map((art, idx) => {
    const num = String(idx + 1).padStart(3, '0');
    const cols = [
      num,
      art.title,
      art.metadata['Hardware Model'] || 'Atlanta HW',
      `${art.metadata['City'] || ''}, ${art.metadata['Country'] || ''}`,
      art.metadata['Category'] || 'Telematics'
    ];
    const widths = [8, 44, 18, 15, 15];

    return new TableRow({
      children: cols.map((c, colIdx) => {
        return new TableCell({
          width: { size: widths[colIdx], type: WidthType.PERCENTAGE },
          shading: { fill: idx % 2 === 0 ? COLOR_BG_ZEBRA : 'FFFFFF', type: ShadingType.CLEAR },
          margins: { top: 50, bottom: 50, left: 80, right: 80 },
          children: [
            new Paragraph({
              spacing: { after: 0 },
              children: [
                new TextRun({
                  text: c,
                  bold: colIdx === 0,
                  size: 15,
                  color: colIdx === 0 ? COLOR_NAVY : (colIdx === 1 ? COLOR_DARK : COLOR_BODY),
                  font: 'Segoe UI'
                })
              ]
            })
          ]
        });
      })
    });
  });

  const dirTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_NAVY },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: COLOR_BORDER },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: [headerRow, ...bodyRows]
  });

  elements.push(dirTable);
  elements.push(new Paragraph({ spacing: { after: 200 } }));

  return elements;
}

// Running Header & Footer
function createHeader() {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: 'ATLANTA SYSTEMS  |  GLOBAL TELEMATICS FIELD COMPENDIUM (300 ARTICLES)',
            size: 15,
            color: COLOR_MUTED,
            font: 'Segoe UI'
          })
        ]
      })
    ]
  });
}

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 80 },
        children: [
          new TextRun({
            text: 'Confidential & Proprietary  •  Atlanta Systems Pvt. Ltd. (www.atlantasys.com)               Page ',
            size: 15,
            color: COLOR_MUTED,
            font: 'Segoe UI'
          }),
          new TextRun({
            children: [PageNumber.CURRENT],
            size: 15,
            color: COLOR_MUTED,
            font: 'Segoe UI'
          }),
          new TextRun({
            text: ' of ',
            size: 15,
            color: COLOR_MUTED,
            font: 'Segoe UI'
          }),
          new TextRun({
            children: [PageNumber.TOTAL_PAGES],
            size: 15,
            color: COLOR_MUTED,
            font: 'Segoe UI'
          })
        ]
      })
    ]
  });
}

// Main execution function
async function generateMasterDocx() {
  console.log('Reading and parsing all 300 blog files...');
  const startTime = Date.now();

  const articles = allFiles.map((f, idx) => {
    const content = fs.readFileSync(path.join(blogDir, f), 'utf-8');
    return parseBlog(content, f);
  });
  console.log(`Parsed ${articles.length} articles in ${Date.now() - startTime}ms.`);

  console.log('Building document element tree...');
  const docElements = [];

  // 1. Cover Page & Foreword
  docElements.push(...createCoverAndForeword(articles.length));

  // 2. Master Table of Contents / Directory
  docElements.push(...createDirectoryTable(articles));

  // 3. All 300 Articles
  articles.forEach((art, idx) => {
    if ((idx + 1) % 50 === 0 || idx === 0) {
      console.log(`Assembling article ${idx + 1} of ${articles.length}: ${art.title.substring(0, 50)}...`);
    }
    docElements.push(...createArticleElements(art, idx + 1));
  });

  console.log(`Assembled ${docElements.length} total document nodes.`);

  console.log('Instantiating docx Document...');
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Segoe UI', size: 21, color: COLOR_BODY },
          paragraph: { spacing: { line: 260, after: 100 } }
        }
      }
    },
    sections: [{
      headers: { default: createHeader() },
      footers: { default: createFooter() },
      children: docElements
    }]
  });

  console.log('Serializing Word Document buffer via Packer (this may take 15-30 seconds for 300 articles)...');
  const packStartTime = Date.now();
  const buffer = await Packer.toBuffer(doc);
  console.log(`Serialization complete in ${(Date.now() - packStartTime) / 1000}s. Document size: ${(buffer.length / (1024 * 1024)).toFixed(2)} MB.`);

  // Write output files
  const rootOutPath = path.join(__dirname, '..', '..', 'Atlanta_Systems_300_Blogs_Compendium.docx');
  const websiteOutPath = path.join(__dirname, '..', 'Atlanta_Systems_300_Blogs_Compendium.docx');

  fs.writeFileSync(rootOutPath, buffer);
  console.log(`Saved master compendium to root workspace: ${rootOutPath}`);

  fs.writeFileSync(websiteOutPath, buffer);
  console.log(`Saved master compendium to website folder: ${websiteOutPath}`);

  console.log(`All done! Total time: ${(Date.now() - startTime) / 1000}s`);
}

generateMasterDocx().catch(err => {
  console.error('Fatal error generating master docx:', err);
  process.exit(1);
});
