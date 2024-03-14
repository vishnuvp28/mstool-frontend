import { Home } from '@mui/icons-material';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PDFGenerator = ({ data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button className="bttn" onClick={handlePrint}>Download PDF</button>
      <div style={{ display: 'none' }}>
        <Home ref={componentRef} data={data} />
      </div>
    </div>
  );
};

export default PDFGenerator;