"use client"

import React, { useCallback, useEffect } from "react";
import { FormEvent, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CreateModal from "./createmodal";
import TablePagination from '@mui/material/TablePagination';
import debounce from "lodash.debounce";
import EditModal from "./editmodal";


interface ABMTableProps {
    table: string;
}

export default function ABMTable({ table }: ABMTableProps) {
    const [data, setData] = useState<{ id: number; name: string }[]>([]);

    //busqueda
    const [search, setSearch] = useState("");
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    async function fetchData(searchTerm: string) {
        try {
            const response = await fetch(`/api/admin/paramsmanagement?name=${encodeURIComponent(searchTerm)}&table=${encodeURIComponent(table)}`, {
                method: 'GET',
            });
            const fetchedData = await response.json();
            setData(fetchedData);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("Error desconocido, la cagaste");
            }
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchData = useCallback(
        debounce((searchTerm: string) => fetchData(searchTerm), 300),
        [table]
    );
    useEffect(() => {
        debouncedFetchData(search);
    }, [search, debouncedFetchData]);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    //paginacion
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const paginatedItems = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //modales
        //create
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
    const handleOpenCreateModal = () => setModalOpenCreate(true);
    const handleCloseCreateModal = () => {
        setModalOpenCreate(false);
    };
    useEffect(() => {
        if (!modalOpenCreate) {
            debouncedFetchData(search);
        }
    }, [debouncedFetchData, modalOpenCreate, search]);
        //fila seleccionada
        const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
        const [selectedRowName, setSelectedRowName] = useState<string | null>(null);       
            //edit
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const handleOpenEditModal = (id: number, name: string) => {
        setSelectedRowId(id);
        setSelectedRowName(name);
        setModalOpenEdit(true);
    }
    const handleCloseEditModal = () => {
        setModalOpenEdit(false);
    }
    useEffect(()=> {
        if (!modalOpenEdit) {
            debouncedFetchData(search);
        }
    },[debouncedFetchData, modalOpenEdit, search]);

    return (
        <main className="flex flex-col gap-2 px-6 pb-10 w-full h-full">
            <div className="flex flex-row w-full mb-4">
                <form className="flew items-center justify-start w-2/6" onSubmit={handleSubmit}>
                    <TextField 
                        id="search"
                        name="search"
                        label="Buscar por Nombre"
                        type="search"
                        variant="outlined"
                        color="warning"
                        fullWidth
                        value={search}
                        onChange={handleSearchChange}
                    />
                </form>
                <div className="flex grow" />
                <Button
                    variant="contained"
                    size="large"
                    color="success"
                    disableElevation
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateModal}
                >
                    AÑADIR
                </Button>
            </div>
            <div className="flex flex-col overflow-y-auto h-full">
                <TableContainer>
                    <Table stickyHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" width="40%">
                                    <div className="text-gray-700 font-medium md:font-bold text-lg">
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell align="left" width="40%">
                                </TableCell>
                                <TableCell align="center" width="20%">
                                    <div className="mr-5 text-gray-700 font-medium md:font-bold text-lg">
                                        Acciones
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            {paginatedItems.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center" size="small">
                                        <div className="text-gray-700 font-medium text-lg">
                                            {row.name}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                    </TableCell>
                                    <TableCell align="center" size="small">
                                        <div className="flex flex-row justify-center mr-5 items-center text-gray-700">
                                            <IconButton color="inherit" onClick={() => handleOpenEditModal(row.id, row.name)}>
                                                <EditIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {Array.from({ length: rowsPerPage - paginatedItems.length }).map((_, index) => (
                                <TableRow key={`empty-row-${index}`}>
                                    <TableCell colSpan={3} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="flex justify-end items-end grow overflow-x-hide">
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
            <EditModal
                open={modalOpenEdit}
                handleClose={handleCloseEditModal}
                table={table}
                id={selectedRowId!}        
                name={selectedRowName!}        
            />
            <CreateModal
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                table={table}
            />
        </main>
    );
}