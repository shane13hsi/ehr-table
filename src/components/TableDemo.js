import React from 'react';
import Table from '../table/Table';

var renderMapUrl =
        (val, row) =>
            <a href={`https://www.google.com/maps?q=${row['LAT']},${row['LON']}`}>
                Google Maps
            </a>;

var tableColumns = [
    {title: 'Name', prop: 'NAME'},
    {title: 'City', prop: 'CITY'},
    {title: 'Street address', prop: 'STREET ADDRESS'},
    {title: 'Phone', prop: 'PHONE NUMBER', defaultContent: '<no phone>'},
    {title: 'Map', render: renderMapUrl, className: 'text-center'}
];

var dataArray = [
    {
        'NAME': 'A1甲',
        'CITY': 'B2乙',
        'STREET ADDRESS': '安化路'
    }
];

let TableDemo = React.createClass({
    render() {
        return (
            <div className='row'>
                <div className='col-md-6'>
                    <Table
                        className={'table table-striped table-bordered table-hover'}
                        columns={tableColumns}
                        keys={['NAME', 'CITY']}
                        dataArray={dataArray}/>
                </div>
            </div>
        );
    }
});

export default TableDemo;
