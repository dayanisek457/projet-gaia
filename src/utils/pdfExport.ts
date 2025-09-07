import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportDocumentationToPDF = async () => {
  try {
    // Navigate to the documentation page if not already there
    if (window.location.pathname !== '/documentation') {
      window.open('/documentation', '_blank');
      return;
    }

    // Wait for page to load completely
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find the main content area
    const contentElement = document.querySelector('.lg\\:col-span-3') as HTMLElement;
    
    if (!contentElement) {
      throw new Error('Documentation content not found');
    }

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

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(contentElement, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      removeContainer: true,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        // Remove any fixed/sticky elements that might interfere
        const clonedElement = clonedDoc.querySelector('.lg\\:col-span-3') as HTMLElement;
        if (clonedElement) {
          // Ensure all content is visible
          clonedElement.style.height = 'auto';
          clonedElement.style.overflow = 'visible';
          
          // Style adjustments for PDF
          const cards = clonedElement.querySelectorAll('.glass');
          cards.forEach(card => {
            (card as HTMLElement).style.background = '#ffffff';
            (card as HTMLElement).style.border = '1px solid #e5e7eb';
          });
        }
      }
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add metadata
    pdf.setProperties({
      title: 'Documentation GAIA - Projet de Reforestation Intelligente',
      subject: 'Documentation technique du projet GAIA',
      author: 'Lycée Saint-Joseph Dijon',
      creator: 'GAIA Documentation System',
      producer: 'GAIA PDF Export'
    });

    let position = 0;

    // Add cover page
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('Documentation GAIA', 20, 30);
    
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'normal');
    pdf.text('Projet de Reforestation Intelligente', 20, 45);
    
    pdf.setFontSize(12);
    pdf.text('Guide complet du projet avec IA, IoT et surveillance par drones', 20, 55);
    
    pdf.setFontSize(10);
    pdf.text('Lycée Saint-Joseph Dijon', 20, 70);
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 20, 80);
    
    // Add first page of content
    pdf.addPage();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Remove loading indicator
    document.body.removeChild(loadingDiv);

    // Save the PDF
    const fileName = `Documentation_GAIA_${new Date().toISOString().split('T')[0]}.pdf`;
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

export const exportDocumentationToPDFFromAnyPage = () => {
  // Open documentation page in new tab and trigger PDF export
  const newWindow = window.open('/documentation', '_blank');
  
  if (newWindow) {
    newWindow.addEventListener('load', () => {
      setTimeout(() => {
        newWindow.postMessage({ action: 'exportPDF' }, '*');
      }, 2000);
    });
  }
};