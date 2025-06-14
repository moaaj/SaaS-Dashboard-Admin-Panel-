import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Export data to CSV
export const exportToCSV = (data, filename) => {
  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle special cases
        if (value instanceof Date) {
          return `"${value.toLocaleString()}"`;
        }
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

// Export data to PDF
export const exportToPDF = (data, filename, options = {}) => {
  console.log('Starting PDF export...', { data, filename, options });
  
  try {
    const {
      title = 'Transaction Report',
      subtitle = `Generated on ${new Date().toLocaleString()}`,
      orientation = 'landscape',
      fontSize = 10,
    } = options;

    console.log('Creating PDF document...');
    // Create PDF document
    const doc = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4',
    });

    // Add title and subtitle
    doc.setFontSize(16);
    doc.text(title, 14, 15);
    doc.setFontSize(10);
    doc.text(subtitle, 14, 22);

    console.log('Preparing table data...');
    // Prepare table data
    const headers = Object.keys(data[0]).map(key => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      dataKey: key,
    }));

    const tableData = data.map(row => {
      const formattedRow = {};
      Object.keys(row).forEach(key => {
        const value = row[key];
        if (value instanceof Date) {
          formattedRow[key] = value.toLocaleString();
        } else if (typeof value === 'number' && key === 'amount') {
          formattedRow[key] = `$${value.toFixed(2)}`;
        } else {
          formattedRow[key] = value;
        }
      });
      return formattedRow;
    });

    console.log('Adding table to PDF...');
    // Add table to PDF using autoTable
    autoTable(doc, {
      head: [headers.map(h => h.header)],
      body: tableData.map(row => headers.map(h => row[h.dataKey])),
      startY: 30,
      styles: {
        fontSize,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30 },
    });

    console.log('Adding footer...');
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    console.log('Saving PDF...');
    // Save PDF
    doc.save(`${filename}-${new Date().toISOString().split('T')[0]}.pdf`);
    console.log('PDF export completed successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Format data for export
export const formatDataForExport = (data, type) => {
  console.log('Formatting data for export...', { data, type });
  return data.map(item => {
    const formattedItem = { ...item };
    
    // Format dates
    if (formattedItem.date) {
      formattedItem.date = new Date(formattedItem.date).toLocaleString();
    }
    
    // Format amounts
    if (formattedItem.amount) {
      formattedItem.amount = type === 'pdf' 
        ? `$${Math.abs(formattedItem.amount).toFixed(2)}`
        : formattedItem.amount.toFixed(2);
    }
    
    // Format status
    if (formattedItem.status) {
      formattedItem.status = formattedItem.status.charAt(0).toUpperCase() + 
        formattedItem.status.slice(1);
    }
    
    return formattedItem;
  });
}; 