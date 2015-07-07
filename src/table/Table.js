import React, {PropTypes as T} from 'react';

const simpleGet = key => data => data[key];
const keyGetter = keys => data => keys.map(key => data[key]);
const isEmpty = value => value === undefined || value === null || value === '';

const getCellValue = ({ prop, defaultContent, render }, row) => {
    let rtv;
    if (!isEmpty(prop) && isEmpty(row[prop])) {
        rtv = defaultContent;
    } else if (render) {
        rtv = render(row[prop], row);
    } else {
        rtv = row[prop];
    }
    return rtv;
};

const getCellClass = ({ prop, className }, row) => {
    let rtv;
    if (!isEmpty(prop) && isEmpty(row[prop])) {
        rtv = 'empty cell';
    } else if (typeof className === 'function') {
        rtv = className(row[prop], row);
    } else {
        rtv = className;
    }
    return rtv;
};

// todo: 监控是否出 bug
let _headers = [];

let Table = React.createClass({

    componentDidMount() {
        // If no width was specified, then set the width that the browser applied
        // initially to avoid recalculating width between pages.
        _headers.forEach(header => {
            let thDom = React.findDOMNode(header);
            if (!thDom.style.width) {
                thDom.style.width = `${thDom.offsetWidth}px`;
            }
        });
    },

    render() {
        let {className, columns, dataArray, keys} = this.props;

        let headers = columns.map((col, idx) => {
            return (
                <th
                    ref={c => _headers[idx] = c}
                    key={idx}
                    style={{width: col.width}}
                    role="columnheader"
                    scope="col">
                    <span>{col.title}</span>
                </th>
            );
        });
        let getKeys = Array.isArray(keys) ? keyGetter(keys) : simpleGet(keys);
        let rows = dataArray.map(row=> {
            return (
                <tr key={getKeys(row)}>
                    {columns.map(
                        (col, i) =>
                            <td key={i} className={getCellClass(col, row)}>
                                {getCellValue(col, row)}
                            </td>
                    )}
                </tr>
            );
        });
        return (
            <table className={className}>
                <thead>
                <tr>
                    {headers}
                </tr>
                </thead>
                <tbody>
                {rows.length > 0 ? rows :
                    <tr>
                        <td colSpan={columns.length} className="text-center">No data</td>
                    </tr>}
                </tbody>
            </table>
        );
    }
});

Table.propTypes = {
    className: T.string,

    columns: T.arrayOf(T.shape({
        title: T.string.isRequired,
        prop: T.oneOfType([
            T.string,
            T.number
        ]),
        render: T.func,
        defaultContent: T.string,
        width: T.oneOfType([
            T.string,
            T.number
        ]),
        className: T.oneOfType([
            T.string,
            T.func
        ])
    })).isRequired,

    dataArray: T.oneOfType([
        T.array,
        T.object
    ]).isRequired,

    keys: T.oneOfType([
        T.arrayOf(T.string),
        T.string
    ])
};

export default Table;
