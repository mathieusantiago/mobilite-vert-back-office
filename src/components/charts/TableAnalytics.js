import React from 'react';
import DataTable from "react-data-table-component";

const TableAnalytics = (props) => {
    const paginationComponentOptions = {
        rowsPerPageText: "Select nombre par page",
        rangeSeparatorText: "sur",
        selectAllRowsItem: false,
        selectAllRowsItemText: "Todos",
    };

    const columns = [
        {
            name: props.col1,
            selector: (row) => `${row[0]}`,
            center: true,
            sortable: false,
            wrap: true,
        },
        {
            name:  props.col2,
            selector: (row) => row[1],
            center: true,
            sortable: true,
        },
    
    ];
    return (
        <div>
            <DataTable
                pagination
                columns={columns}
                data={props.dataPageAnalitics}
                dense={false}
                responsive={true}
                striped
                paginationComponentOptions={paginationComponentOptions}
            />
        </div>
    );
};

export default TableAnalytics;