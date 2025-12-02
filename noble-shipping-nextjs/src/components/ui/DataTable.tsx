'use client';

import { useEffect, useRef } from 'react';

interface DataTableProps {
  data: any[];
  columns: {
    title: string;
    data: string;
    render?: (data: any, type: string, row: any) => string;
  }[];
  options?: any;
}

export default function DataTable({ data, columns, options = {} }: DataTableProps) {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && tableRef.current) {
      // Load jQuery and DataTables
      const loadDataTables = async () => {
        if (!window.jQuery) {
          const script = document.createElement('script');
          script.src = '/plugins/jquery/jquery.min.js';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
        }

        if (!window.jQuery.fn.DataTable) {
          const script = document.createElement('script');
          script.src = '/plugins/datatables/jquery.dataTables.min.js';
          document.head.appendChild(script);
          await new Promise(resolve => script.onload = resolve);
          
          // Load DataTables Buttons extension
          const buttonsScript = document.createElement('script');
          buttonsScript.src = '/plugins/datatables-buttons/js/dataTables.buttons.min.js';
          document.head.appendChild(buttonsScript);
          await new Promise(resolve => buttonsScript.onload = resolve);
          
          const buttonsHtml5Script = document.createElement('script');
          buttonsHtml5Script.src = '/plugins/datatables-buttons/js/buttons.html5.min.js';
          document.head.appendChild(buttonsHtml5Script);
          await new Promise(resolve => buttonsHtml5Script.onload = resolve);
          
          const buttonsPrintScript = document.createElement('script');
          buttonsPrintScript.src = '/plugins/datatables-buttons/js/buttons.print.min.js';
          document.head.appendChild(buttonsPrintScript);
          await new Promise(resolve => buttonsPrintScript.onload = resolve);
        }

        // Initialize DataTable
        window.jQuery(tableRef.current).DataTable({
          data: data,
          columns: columns,
          dom: 'Bfrtip',
          buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
          ],
          responsive: true,
          pageLength: 25,
          ...options
        });
      };

      loadDataTables();
    }

    return () => {
      if (typeof window !== 'undefined' && window.jQuery && window.jQuery.fn && window.jQuery.fn.DataTable && tableRef.current) {
        const table = window.jQuery(tableRef.current).DataTable();
        table.destroy();
      }
    };
  }, [data, columns, options]);

  return (
    <div className="table-responsive">
      <table ref={tableRef} className="table table-striped table-bordered">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render 
                    ? column.render(row[column.data], 'display', row)
                    : row[column.data]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}