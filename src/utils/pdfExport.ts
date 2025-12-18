import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

    // Add cover page with branding
    // Add a colored header bar
    pdf.setFillColor(34, 197, 94); // Green color for Gaia branding
    pdf.rect(0, 0, pageWidth, 30, 'F');
    
    // Try to load and add logo
    try {
      const logoImg = new Image();
      logoImg.src = '/logo.png';
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
        setTimeout(() => reject(new Error('Logo load timeout')), 2000);
      });
      
      // Add logo centered at the top
      const logoWidth = 60;
      const logoHeight = 34;
      const logoX = (pageWidth - logoWidth) / 2;
      pdf.addImage(logoImg, 'PNG', logoX, 40, logoWidth, logoHeight);
      currentY = 85;
    } catch (error) {
      console.log('Could not load logo, continuing without it');
      currentY = 50;
    }
    
    // Project title with gradient effect (simulated with color)
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(34, 197, 94); // Green
    pdf.text('PROJET GAIA', pageWidth / 2, currentY, { align: 'center' });
    currentY += 12;
    
    pdf.setFontSize(20);
    pdf.setTextColor(16, 185, 129); // Lighter green
    pdf.text('Documentation Technique', pageWidth / 2, currentY, { align: 'center' });
    currentY += 20;
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(75, 85, 99); // Gray
    pdf.text('Projet de Reforestation Intelligente', pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;
    
    pdf.setFontSize(13);
    pdf.text('avec IA, IoT et surveillance par drones', pageWidth / 2, currentY, { align: 'center' });
    currentY += 30;
    
    // Add decorative line
    pdf.setDrawColor(34, 197, 94);
    pdf.setLineWidth(0.5);
    pdf.line(pageWidth / 2 - 40, currentY, pageWidth / 2 + 40, currentY);
    currentY += 20;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(31, 41, 55); // Dark gray
    pdf.text('Lycée Saint-Joseph Dijon', pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(107, 114, 128); // Medium gray
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`, pageWidth / 2, currentY, { align: 'center' });
    
    // Add footer with project info
    pdf.setFontSize(10);
    pdf.setTextColor(156, 163, 175); // Light gray
    pdf.text('© 2025 Groupe Gaia - Tous droits réservés', pageWidth / 2, pageHeight - 30, { align: 'center' });
    pdf.text('Reforestation intelligente', pageWidth / 2, pageHeight - 22, { align: 'center' });
    
    // Add table of contents with enhanced styling
    pdf.addPage();
    currentY = margin;
    
    // TOC Header with background
    pdf.setFillColor(34, 197, 94);
    pdf.rect(margin - 5, currentY - 8, contentWidth + 10, 15, 'F');
    
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('Table des matières', margin, currentY);
    currentY += 20;
    
    // Reset text color
    pdf.setTextColor(31, 41, 55);
    
    // Add decorative line
    pdf.setDrawColor(34, 197, 94);
    pdf.setLineWidth(0.5);
    pdf.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 10;
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    sections.forEach((section, index) => {
      pdf.setTextColor(34, 197, 94);
      pdf.text(`${index + 1}.`, margin + 5, currentY);
      pdf.setTextColor(31, 41, 55);
      pdf.text(section.title, margin + 15, currentY);
      currentY += 8;
    });

    // Process each section
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      pdf.addPage();
      currentY = margin;
      
      // Section title with enhanced styling
      pdf.setFillColor(34, 197, 94); // Green header background
      pdf.rect(margin - 5, currentY - 8, contentWidth + 10, 15, 'F');
      
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255); // White text
      pdf.text(`${i + 1}. ${section.title}`, margin, currentY);
      currentY += 15;
      
      // Reset text color for content
      pdf.setTextColor(31, 41, 55);
      
      // Section content
      currentY = await renderSectionContent(pdf, section, margin, currentY, contentWidth, pageHeight);
    }
    
    // Add page numbers to all pages except cover (run once after all content is generated)
    const totalPages = pdf.getNumberOfPages();
    for (let pageIndex = 2; pageIndex <= totalPages; pageIndex++) {
      pdf.setPage(pageIndex);
      pdf.setFontSize(9);
      pdf.setTextColor(156, 163, 175);
      pdf.text(
        `Page ${pageIndex - 1}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
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
  const addWrappedText = (text: string, fontSize: number = 12, fontStyle: string = 'normal', color: [number, number, number] = [31, 41, 55]) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);
    pdf.setTextColor(color[0], color[1], color[2]);
    
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
          addWrappedText(item.title, 14, 'bold', [34, 197, 94]); // Green for titles
          addWrappedText(item.content);
          currentY += 5;
        });
      }
      break;

    case 'table':
      if (section.data?.headers && section.data?.rows) {
        // Check if we need a new page before the table
        checkNewPage(30);
        
        // Use jspdf-autotable for proper table rendering
        autoTable(pdf, {
          head: [section.data.headers],
          body: section.data.rows,
          startY: currentY,
          margin: { left: margin, right: margin },
          theme: 'grid',
          styles: {
            fontSize: 10,
            cellPadding: 4,
            lineColor: [200, 200, 200],
            lineWidth: 0.1,
          },
          headStyles: {
            fillColor: [34, 197, 94], // Green color matching Gaia branding
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'left',
          },
          bodyStyles: {
            textColor: [31, 41, 55],
          },
          alternateRowStyles: {
            fillColor: [249, 250, 251], // Light gray for alternate rows
          },
        });
        
        // Update currentY to position after the table
        // Use jspdf-autotable's getLastAutoTable method to get the table info
        const pdfWithAutoTable = pdf as jsPDF & { lastAutoTable?: { finalY: number } };
        currentY = (pdfWithAutoTable.lastAutoTable?.finalY ?? currentY) + 10;
      }
      break;

    case 'callout':
      if (section.data?.callouts) {
        section.data.callouts.forEach((callout: any) => {
          const prefix = callout.type === 'warning' ? '⚠️ ' : 
                        callout.type === 'success' ? '✅ ' : 'ℹ️ ';
          
          // Add colored background for callouts
          checkNewPage(20);
          const calloutColors = {
            warning: [251, 191, 36],  // Yellow
            success: [34, 197, 94],   // Green
            info: [59, 130, 246]      // Blue
          };
          const bgColor = calloutColors[callout.type as keyof typeof calloutColors] || calloutColors.info;
          
          // Calculate the height needed for the callout
          const titleText = `${prefix}${callout.title}`;
          const titleLines = pdf.splitTextToSize(titleText, contentWidth);
          const contentLines = pdf.splitTextToSize(callout.content, contentWidth);
          const calloutHeight = (titleLines.length + contentLines.length) * 6 + 10;
          
          pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
          pdf.setGlobalAlpha(0.1);
          pdf.rect(margin - 5, currentY - 5, contentWidth + 10, calloutHeight, 'F');
          pdf.setGlobalAlpha(1);
          
          addWrappedText(titleText, 12, 'bold', bgColor);
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
