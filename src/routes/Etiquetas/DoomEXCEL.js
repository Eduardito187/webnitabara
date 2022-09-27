import React from "react";
import Workbook from "react-excel-workbook";

const DoomEXCEL = ({ filename, worksheets }) => {
  return (
    <div className="excel-export-container" style={{marginLeft:'5px'}}>
      <Workbook
        filename={filename}
        element={
        <button className="download-excel-button">
          <span style={{fontWeight:'bold',marginRight:'5px'}}>Exportar</span>
          <img src={"https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_excel-512.png"} style={{width:'25px',height:'25px'}} alt=""/>
        </button>}>
        {worksheets.map(({ name, columns, data }) => {
          return (
            <Workbook.Sheet name={name} data={data}>
              {columns.map(({ label, value }) => {
                return <Workbook.Column label={label} value={value} />;
              })}
            </Workbook.Sheet>
          );
        })}
      </Workbook>
    </div>
  );
};

export default DoomEXCEL;

DoomEXCEL.defaultProps = {
  filename: "",
  worksheets: []
};
