// React
import { useState } from "react";
import PropTypes from 'prop-types';

// Handling Dates
import { format } from 'fecha';

// Tremor
import { DateRangePicker } from "@tremor/react";
import { TextInput } from '@tremor/react';
import { Badge, Col, ColGrid } from "@tremor/react";
import { Card, Flex, Icon, Block, BadgeDelta, Text, Metric } from "@tremor/react";

// Heroicons
import { DocumentTextIcon, CurrencyDollarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'

// MUI Components

import { Button, Modal, TextField, Box, Typography,  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';

import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';

// From Tables
import { EnhancedTableHead } from "../../../components/tables";
import { getComparator } from "../../../components/tables";
import { stableSort } from "../../../components/tables";


function createInvoice(id, date, customer, amount, status) {
    return {
        id,
        date,
        customer,
        amount,
        status,
    };
}

const invoicesheadCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'id',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'date',
    },
    {
        id: 'customer',
        numeric: true,
        disablePadding: false,
        label: 'customer',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'amount',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'status',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'actions',
    }
];

export const invoices = [
    createInvoice("0001", new Date(2023, 1, 27), 'Anika Visser', 349.99, ['paid', 'green']),
    createInvoice("0002", new Date(2023, 2, 14), 'John Doe', 199.99, ['sent', 'blue']),
    createInvoice("0003", new Date(2023, 3, 2), 'Jane Smith', 449.99, ['paid', 'green']),
    createInvoice("0004", new Date(2023, 4, 18), 'Bob Johnson', 599.99, ['past due', 'red']),
    createInvoice("0005", new Date(2023, 5, 4), 'Emily Davis', 299.99, ['draft', 'fuchsia']),
    createInvoice("0006", new Date(2023, 6, 21), 'Michael Brown', 399.99, ['sent', 'blue']),
    createInvoice("0007", new Date(2023, 7, 8), 'Sarah Miller', 249.99, ['paid', 'green']),
    createInvoice("0008", new Date(2023, 8, 25), 'David Garcia', 549.99, ['past due', 'red']),
    createInvoice("0009", new Date(2023, 9, 11), 'Jessica Rodriguez', 699.99, ['paid', 'green']),
    createInvoice("0010", new Date(2023, 10, 28), 'Mark Wilson', 199.99, ['sent', 'blue']),
    createInvoice("0011", new Date(2023, 11, 14), 'Paul Moore', 749.99, ['paid', 'green']),
    createInvoice("0012", new Date(2023, 12, 1), 'Ashley Taylor', 399.99, ['paid', 'green']),
    createInvoice("0013", new Date(2023, 1, 18), 'Christopher Anderson', 499.99, ['paid', 'green']),
    createInvoice("0014", new Date(2023, 2, 4), 'Matthew Thomas', 599.99, ['paid', 'green']),
    createInvoice("0015", new Date(2023, 3, 21), 'Joshua Hernandez', 699.99, ['past due', 'red']),
    createInvoice("0016", new Date(2023, 4, 7), 'Daniel Moore', 799.99, ['paid', 'green']),
    createInvoice("0017", new Date(2023, 5, 24), 'William Martin', 199.99, ['paid', 'green']),
    createInvoice("0018", new Date(2023, 6, 10), 'Jacob Garcia', 499.99, ['paid', 'green']),
    createInvoice("0019", new Date(2023, 7, 27), 'Nicholas Martinez', 599.99, ['paid', 'green']),
    createInvoice("0020", new Date(2023, 8, 13), 'Andrew Robinson', 699.99, ['paid', 'green']),
];

export function EnhancedTableToolbar(props) {
    const { numSelected, OnBulkDelete, OnSearch, OnDateFilter } = props;
  
    return (
        <>
            <Toolbar
                sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                    ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Invoices
                    </Typography>
                )}
                <div className="inventory-topbar">
                    
                </div>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={() => OnBulkDelete()}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
            <div style={{ padding: 20, background: 'rgb(248, 249, 250)' }}>
                <ColGrid numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2">
                    <Col numColSpan={1} numColSpanLg={2}>
                        <TextInput
                            icon={ SearchIcon }
                            placeholder="Search..."
                            onChange={(event) => OnSearch(event)}
                        />
                    </Col>
                    <Col>
                        <DateRangePicker 
                            enableDropdown={true} 
                            maxWidth="max-w-lg"
                            placeholder="Select Date..."
                            enableYearPagination={true}
                            onValueChange={(event) => OnDateFilter(event)}
                        />
                    </Col>
                </ColGrid>
            </div>
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
  
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const Invoices = () => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    //const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [ data, setData] = useState(invoices);
    const [open, setOpen] = useState(false); // State for modal visibility

    const handleNew = () => {
        setOpen(true); //Open Modal
    }

    const handleClose = () => {
        setOpen(false); // Close Modal
    };

    const handleEdit = (row) => {

    }

    const handleDateFilter = (range) => {
        const [startDate, endDate] = range;

        const filteredResults = endDate === null ? 
            invoices.filter(item => item.date === startDate)
            : 
            invoices.filter(item => item.date >= startDate && item.date <= endDate)

        setData(filteredResults);
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = [...new Set([
            ...data.filter(invoice => format(invoice.date, 'dddd MMMM Do, YYYY').toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter(invoice => invoice.id.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter(invoice => invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter(invoice => invoice.amount.toString().toLowerCase().includes(searchTerm.toLowerCase())),
            ...data.filter(invoice => invoice.status[0].toLowerCase().includes(searchTerm.toLowerCase())),
        ])];
        //const filteredResults = data.filter(item => item.customer.toLowerCase().includes(searchTerm.toLowerCase()));
        setData( searchTerm === '' ? invoices : filteredResults);
    }

    const handleDeleteItem = (id) => {
        const new_data = data.slice().filter(object => object.id !== id);
        const new_selected = selected.filter(item => item !== id); 
        setSelected(new_selected);
        setData(new_data);
    }

    const handleDeleteBulk = () => {
        const filteredData = data.filter(object => !selected.includes(object.id));
        setData(filteredData);
        setSelected([]);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const sum = (type) => {
        if(type === 'amount') {
            let sum = 0;
            data.forEach(item => {
                if(item.status[0] === 'paid'){
                    sum += item.amount;
                }
            });
            return sum;
        } else if(type === 'average') {
            let amounts = [];
            let sum = 0;
            data.forEach(item => {
                if(item.status[0] === 'paid'){ 
                    amounts.push(item.amount);
                    sum += item.amount;
                }
            });
            
            let average = sum / amounts.length;
            let roundedNumber = average.toFixed(2);

            return roundedNumber;
        }
    }

    const insights = [
        {
            id: 'kje',
            title: 'Total Invoices',
            metric: data.length,
            progress: 15.9,
            delta: '13.2%',
            icon : DocumentTextIcon,
            color: 'cyan',
            type: 'number',
            deltaType: 'moderateIncrease',
        },
        {
            id: 'ajser3',
            title: 'Total Amount',
            metric: sum('amount'),
            progress: 36.5,
            delta: '23.9%',
            icon : CurrencyDollarIcon,
            color: 'emerald',
            type: 'currency',
            deltaType: 'increase',
        },
        {
            id: 'jser4',
            title: 'Average Invoice Amount',
            metric: sum('average'),
            progress: 53.6,
            delta: '10.1%',
            icon: ShoppingCartIcon,
            color: 'blue',
            type: 'currency',
            deltaType: 'moderateDecrease',
        },
    ];

    const valueFormatter = (number) => (
        `KSH ${Intl.NumberFormat('en').format(number).toString()}`
    );

    return (
        <>
        
            <section>
                    
                <div className="container invoices-header" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col">
                            <h1>Invoices</h1>
                        </div>
                        <div className="col text-sm-start text-md-end text-lg-end text-xl-end text-xxl-end">
                            <Button 
                                onClick={handleNew}
                                variant="contained" 
                                startIcon={<AddIcon />}
                                /* style={{
                                    marginTop: 5,
                                }} */
                            >
                                New Invoice
                            </Button>
                        </div>
                    </div>
                </div>
{/*  --------Implement Modal---------- */}
<Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Invoice
        </Typography>
        <TextField
            autoFocus
            margin="dense"
            id="id"
            label="ID"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            id="date"
            label="Date"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            id="customer"
            label="Customer"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
        />
        <TextField
            margin="dense"
            id="status"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
        />
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Save</Button>
    </Box>
</Modal>
{/*  --------End Modal---------- */}
                <div className="container invoices-insights" style={{ marginTop: 50 }}>
                    <ColGrid numColsMd={ 2 } numColsLg={ 3 } marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
                    { insights.map((item) => (
                        <Card key={ item.id }>
                            <Flex alignItems="items-center">
                                <div style={{ marginRight: 20 }}>
                                    <Icon
                                        icon={item.icon}
                                        color={item.color}
                                        variant="solid"
                                        tooltip="Sum of Sales"
                                        size="lg"
                                    />
                                </div>
                                <Block truncate={ true }>
                                    <Text>{ item.title }</Text>
                                    <Metric truncate={ true }>
                                        {
                                            item.type === 'currency' ?
                                            valueFormatter(item.metric)
                                            : item.metric 
                                        }
                                    </Metric>
                                </Block>
                                
                                <BadgeDelta deltaType={ item.deltaType } text={ item.delta } />
                            </Flex>
                            {/* <Flex marginTop="mt-4" spaceX="space-x-2">
                                <Text truncate={ true }>{ `${item.progress}% (${item.metric})` }</Text>
                            </Flex> */}
                        </Card>
                    )) }
                    </ColGrid>
                </div>

                <div className='container invoices-table' style={{ marginTop: 50 }}>
                    <Box sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            <EnhancedTableToolbar  
                                numSelected={selected.length}
                                OnBulkDelete={handleDeleteBulk}
                                OnSearch={handleSearch}
                                OnDateFilter={handleDateFilter}
                            />
                            <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                /* size={dense ? 'small' : 'medium'} */
                                size='medium'
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={data.length}
                                    headCells={invoicesheadCells}
                                />
                                <TableBody>
                                {stableSort(data, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                #{row.id}
                                            </TableCell>
                                            <TableCell align="right">{format(row.date, 'dddd MMMM Do, YYYY')}</TableCell>
                                            <TableCell align="right">{row.customer}</TableCell>
                                            <TableCell align="right">KSH{row.amount}</TableCell>
                                            <TableCell align="left">
                                                <Badge
                                                    text={row.status[0]}
                                                    color={row.status[1]}
                                                    size="md"
                                                    icon={undefined}
                                                    tooltip=""
                                                    marginTop="mt-0" 
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton 
                                                    onClick={() => handleDeleteItem(row.id)} 
                                                    color="primary" 
                                                    aria-label="Delete Product" 
                                                    component="label"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton 
                                                    onClick={() => handleEdit(row)}
                                                    color="primary" 
                                                    aria-label="Update Product" 
                                                    component="label"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                        /* height: (dense ? 33 : 53) * emptyRows, */
                                    }}
                                    >
                                    <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </div>

            </section>
        
        </>
    );
};

export default Invoices;