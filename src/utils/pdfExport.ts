import jsPDF from 'jspdf';
import { documentationService, DocSection } from '@/lib/supabase-documentation';

// Define interfaces for PDF generation
interface PDFSection {
  title: string;
  content: string;
  type: string;
  data?: any;
}

// Enhanced PDF export that properly renders documentation content as text
export const exportDocumentationToPDF = async () => {
  try {
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                  background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                  z-index: 9999; text-align: center;">
        <div style="font-size: 16px; margin-bottom: 10px;">Génération du PDF en cours...</div>
        <div style="width: 200px; height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden;">
          <div style="width: 100%; height: 100%; background: #3b82f6; animation: loading 2s ease-in-out infinite;"></div>
        </div>
      </div>
      <style>
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      </style>
    `;
    document.body.appendChild(loadingDiv);

    // Fetch all published documentation sections directly from Supabase
    const sections = await documentationService.getPublishedSections();
    
    if (sections.length === 0) {
      throw new Error('Aucune section de documentation disponible');
    }

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let currentY = margin;
    
    // Add metadata
    pdf.setProperties({
      title: 'Documentation Gaia - Projet de Reforestation Intelligente',
      subject: 'Documentation technique du projet Gaia',
      author: 'Lycée Saint-Joseph Dijon',
      creator: 'Gaia Documentation System',
      producer: 'Gaia PDF Export'
    });

    // Add cover page
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Documentation Gaia', margin, 50);
    
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Projet de Reforestation Intelligente', margin, 70);
    
    pdf.setFontSize(14);
    pdf.text('Guide complet du projet avec IA, IoT et surveillance par drones', margin, 90);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'italic');
    pdf.text('Lycée Saint-Joseph Dijon', margin, 120);
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, margin, 135);
    
    // Add table of contents
    pdf.addPage();
    currentY = margin;
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Table des matières', margin, currentY);
    currentY += 15;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    sections.forEach((section, index) => {
      pdf.text(`${index + 1}. ${section.title}`, margin + 5, currentY);
      currentY += 8;
    });

    // Process each section
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      pdf.addPage();
      currentY = margin;
      
      // Section title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${i + 1}. ${section.title}`, margin, currentY);
      currentY += 15;
      
      // Section content
      currentY = await renderSectionContent(pdf, section, margin, currentY, contentWidth, pageHeight);
    }

    // Remove loading indicator
    document.body.removeChild(loadingDiv);

    // Save the PDF
    const fileName = `Documentation_Gaia_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Remove loading indicator if it exists
    const loadingDiv = document.querySelector('[style*="z-index: 9999"]');
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
    
    // Show error message
    alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    return false;
  }
};

// Helper function to render section content
async function renderSectionContent(
  pdf: jsPDF, 
  section: DocSection, 
  margin: number, 
  startY: number, 
  contentWidth: number, 
  pageHeight: number
): Promise<number> {
  let currentY = startY;
  const lineHeight = 6;
  const bottomMargin = 20;

  // Function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (currentY + requiredSpace > pageHeight - bottomMargin) {
      pdf.addPage();
      currentY = margin;
    }
  };

  // Function to add text with proper line wrapping
  const addWrappedText = (text: string, fontSize: number = 12, fontStyle: string = 'normal') => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);
    
    const lines = pdf.splitTextToSize(text, contentWidth);
    const requiredHeight = lines.length * lineHeight;
    
    checkNewPage(requiredHeight);
    
    lines.forEach((line: string) => {
      pdf.text(line, margin, currentY);
      currentY += lineHeight;
    });
    
    currentY += 3; // Add small spacing after text
  };

  // Render content based on section type
  switch (section.type) {
    case 'text':
    case 'rich':
      // Convert markdown-like content to plain text for PDF
      const cleanContent = cleanMarkdownForPDF(section.content);
      addWrappedText(cleanContent);
      break;

    case 'accordion':
      if (section.data?.items) {
        section.data.items.forEach((item: any) => {
          addWrappedText(item.title, 14, 'bold');
          addWrappedText(item.content);
          currentY += 5;
        });
      }
      break;

    case 'table':
      if (section.data?.headers && section.data?.rows) {
        // Table header
        addWrappedText(section.data.headers.join(' | '), 12, 'bold');
        addWrappedText('─'.repeat(50), 10);
        
        // Table rows
        section.data.rows.forEach((row: string[]) => {
          addWrappedText(row.join(' | '));
        });
      }
      break;

    case 'callout':
      if (section.data?.callouts) {
        section.data.callouts.forEach((callout: any) => {
          const prefix = callout.type === 'warning' ? '⚠️ ' : 
                        callout.type === 'success' ? '✅ ' : 'ℹ️ ';
          addWrappedText(`${prefix}${callout.title}`, 12, 'bold');
          addWrappedText(callout.content);
          currentY += 5;
        });
      }
      break;

    case 'checklist':
      if (section.data?.items) {
        section.data.items.forEach((item: any) => {
          const checkbox = item.completed ? '☑️' : '☐';
          addWrappedText(`${checkbox} ${item.text}`);
        });
      }
      break;

    default:
      addWrappedText(section.content);
  }

  return currentY;
}

// Helper function to clean markdown content for PDF
function cleanMarkdownForPDF(content: string): string {
  return content
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Convert markdown headers to plain text
    .replace(/#{1,6}\s*/g, '')
    // Convert bold/italic markers
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // Convert lists
    .replace(/^- /gm, '• ')
    .replace(/^[0-9]+\. /gm, '• ')
    // Remove code blocks
    .replace(/`(.*?)`/g, '$1')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}