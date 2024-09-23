"use client"

import { scholarTableProps, fetchedScholar, fetchScholarData, scholarFormData } from "@/app/lib/dtos/scholar";
import { fetchTableData } from "@/app/services/admin/usermanagement/scholar.service";
import CreateScholarModal from "./createmodal";
import EditScholarModal from "./editmodal";
import DeleteScholarModal from "./deletemodal";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from "lodash.debounce";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import '@/app/components/globals.css';

export default function ABMScholarTable({ usercareers, scholarships, laboratory_id }: scholarTableProps ) {
    const { watch, setValue, getValues } = useForm<scholarFormData>({
        defaultValues: {
            //filters
            filterAnchor: null,
            activeFilters: {},
            search: "",
            normalsearch: "",
            showSearchForm: true,
            scholarshipTypeFilter: 0,
            showScholarshipTypeFilter: false,
            userCareerFilter: 0,
            showUserCareerFilter: false,
            //pagination
            page: 0,
            rowsPerPage: 10,
            //modals
            modalOpenCreate: false,
            modalOpenDelete: false,
            modalOpenEdit: false,
            //selected row
            selectedRowId: 0,
            selectedRowName: "",
            selectedRow: null,
            //expanded row
            expandedRowId: null,
            //sort by column
            sortDirection: "ASC",
            sortColumn: "u.name"
        }
    });
    //filters
    const filterAnchor = watch("filterAnchor") as any;
    const filterMenuOpen = Boolean(filterAnchor);
    const activeFilters = watch("activeFilters") as { [key: string ]: any };
    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setValue("filterAnchor", event.currentTarget);
    };
    const handleFilterClose = () => {
        setValue("filterAnchor", null);
    };
    const handleClearFilters = () => {
            //reset values
        setValue("search", "");
        setValue("normalsearch", "");
        setValue("scholarshipTypeFilter", 0);
        setValue("userCareerFilter", 0);
            //reset default filter show
        setValue("showSearchForm", true);
        setValue("showScholarshipTypeFilter", false);
        setValue("showUserCareerFilter", false);
            //reset active filters and close
        setValue("activeFilters", {});
        handleFilterClose();
    };
        //search
    const search = watch("search") as string;
    const normalsearch = watch("normalsearch") as string;
    const showSearchForm = watch("showSearchForm") as boolean;
    const handleSearchFilterSelect = () => {
        setValue("showSearchForm", true);
        setValue("showScholarshipTypeFilter", false);
        setValue("showUserCareerFilter", false);
        handleFilterClose();
    };
    const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("normalsearch", event.target.value);
        handleSearch(event.target.value);
        const currentFilters = getValues("activeFilters");
        setValue("activeFilters", {
            ...currentFilters,
            search: event.target.value,
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(debounce((searchTerm: string) => {
        setValue("search", searchTerm);
    }, 500), []);
        //scholarshiptype filter
    const scholarshiptype_id = watch("scholarshipTypeFilter") as number;
    const showScholarshipTypeFilter = watch("showScholarshipTypeFilter") as boolean;
    const handleScholarshipTypeFilterSelect = () => {
        setValue("showScholarshipTypeFilter", true);
        setValue("showSearchForm", false);
        setValue("showUserCareerFilter", false);
        handleFilterClose();
    };
    const handleScholarshipTypeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const scholarshiptypevalue = Number(event.target.value);
        setValue("scholarshipTypeFilter", scholarshiptypevalue);
        const currentFilters = getValues("activeFilters");
        setValue("activeFilters", {
            ...currentFilters,
            scholarship: event.target.value,
        });
    };
    const getScholarshipNameById = (id: number) => {
        const scholarship = scholarships.find(sch => sch.id === id);
        return scholarship ? scholarship.name : 'Desconocida';
    };
        //usercareer filter
    const usercareer_id = watch("userCareerFilter") as number;
    const showUserCareerFilter = watch("showUserCareerFilter") as boolean;
    const handleUserCareerFilterSelect = () => {
        setValue("showUserCareerFilter", true);
        setValue("showScholarshipTypeFilter", false);
        setValue("showSearchForm", false);
        handleFilterClose();
    };
    const handleUserCareerFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const usercareervalue = Number(event.target.value)
        setValue("userCareerFilter", usercareervalue);
        const currentFilters = getValues("activeFilters");
        setValue("activeFilters", {
            ...currentFilters,
            career: event.target.value,
        });
    };
    const getCareerNameById = (id: number) => {
        const career = usercareers.find(sch => sch.id === id);
        return career ? career.name : 'Desconocida';
    };
    //sort by column
    const sortDirection = watch("sortDirection");
    const sortColumn = watch("sortColumn");
    const handleSort = (column: string) => {
        const newDirection = sortColumn === column && sortDirection === 'ASC' ? 'DESC' : 'ASC';
        setValue("sortColumn", column);
        setValue("sortDirection", newDirection);
    };
    //pagination
    const page = watch("page");
    const rowsPerPage = watch("rowsPerPage")
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setValue("page", newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue("rowsPerPage", parseInt(event.target.value, 10));
        setValue("page", 0);
    };
    //fetch
    const params = {
        search: search,
        scholarshiptype_id: scholarshiptype_id,
        usercareer_id: usercareer_id,
        laboratory_id: laboratory_id,
        sortColumn: sortColumn,
        sortDirection: sortDirection,
        page: page, 
        rowsPerPage: rowsPerPage
    } as fetchScholarData;
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['tableData', search, usercareer_id , scholarshiptype_id, sortColumn, sortDirection, page, rowsPerPage ],
        queryFn: () => fetchTableData(params),
        refetchOnWindowFocus: false
    });
    //expanded row
    const expandedRowId = watch("expandedRowId");
    const toggleRowExpansion = (id: number) => {
        setValue("expandedRowId", expandedRowId === id ? null : id);
    };
    //modales
        //create
    const modalOpenCreate = watch("modalOpenCreate");
    const handleOpenCreateModal = () => setValue("modalOpenCreate", true);
    const handleCloseCreateModal = () => {
        setValue("modalOpenCreate", false);
        refetch();
    };
        //selected row
    const selectedRowId = watch("selectedRowId");
    const selectedRowName = watch("selectedRowName");
    const selectedRow = watch("selectedRow");
        //delete
    const modalOpenDelete = watch("modalOpenDelete");
    const handleOpenDeleteModal = (id: number, name: string) => {
        setValue("selectedRowId", id);
        setValue("selectedRowName", name);
        setValue("modalOpenDelete", true);
    };
    const handleCloseDeleteModal = () => {
        setValue("modalOpenDelete", false);
        refetch();
    };
        //edit
    const modalOpenEdit = watch("modalOpenEdit");
    const handleOpenEditModal = (row: fetchedScholar) => {
        setValue("selectedRow", row);
        setValue("modalOpenEdit", true);
    };
    const handleCloseEditModal = () => {
        setValue("modalOpenEdit", false);
        refetch();
    };
    return (
        <main className="flex flex-col gap-2 w-full h-full">
            <div className="flex flex-col md:flex-row justify-center text-gray-700">
                <div className="flex flex-row gap-2 h-14">
                    <ButtonGroup variant="outlined" color="inherit">
                        <Button 
                            variant="outlined" 
                            color="inherit"
                            disableElevation 
                            endIcon={<FilterAltIcon />}
                            onClick={handleFilterClick} 
                        >
                            Filtros
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="error"
                            disableElevation 
                            onClick={handleClearFilters}
                        >
                            <FilterAltOffIcon/>
                        </Button>
                    </ButtonGroup>
                    <div className="flex grow"/>
                    <div className="flex block md:hidden">
                        <Button
                            variant="contained"
                            color="success"
                            disableElevation
                            endIcon={<AddIcon />}
                            onClick={handleOpenCreateModal}
                        >
                            Añadir
                        </Button>
                    </div>
                </div>
                <Menu
                    anchorEl={filterAnchor}
                    open={filterMenuOpen}
                    onClose={handleFilterClose}
                >
                    <MenuItem onClick={handleSearchFilterSelect}>Buscar por Nombre</MenuItem>
                    <MenuItem onClick={handleScholarshipTypeFilterSelect}>Filtrar por Beca</MenuItem>
                    <MenuItem onClick={handleUserCareerFilterSelect}>Filtrar por Carrera</MenuItem>
                </Menu>
                <form className="flex items-center justify-start mt-4 md:mt-0 md:w-2/6">
                    {showSearchForm && (
                        <TextField 
                            id="search"
                            name="search"
                            label="Buscar por Nombre"
                            type="search"
                            variant="outlined"
                            color="warning"
                            fullWidth
                            value={normalsearch}
                            onChange={handleSearchFilterChange}
                        />
                    )}
                    {showScholarshipTypeFilter && (
                        <TextField 
                            id="scholarship" 
                            name="scholarship" 
                            label="Filtrar por Beca" 
                            type="text" 
                            variant="outlined" 
                            color="warning"
                            select 
                            fullWidth 
                            value={scholarshiptype_id} 
                            onChange={handleScholarshipTypeFilterChange}
                        > 
                            {scholarships.map(scholarshipprop => (
                                <MenuItem key={scholarshipprop.id} value={scholarshipprop.id}>{scholarshipprop.name}</MenuItem>
                            ))}
                        </TextField>
                    )}
                    {showUserCareerFilter && (
                        <TextField 
                            id="career" 
                            name="career" 
                            label="Filtrar por Carrera"
                            type="text"
                            variant="outlined"
                            color="warning"
                            select 
                            fullWidth
                            value={usercareer_id} 
                            onChange={handleUserCareerFilterChange}
                        >
                            {usercareers.map(usercareerprop => (
                                <MenuItem key={usercareerprop.id} value={usercareerprop.id}>{usercareerprop.name}</MenuItem>
                            ))}
                        </TextField>
                    )}
                </form>
                <div className="flex grow" />
                <div className="md:flex hidden md:block">
                    <Button
                        variant="contained"
                        color="success"
                        disableElevation
                        startIcon={<AddIcon />}
                        onClick={handleOpenCreateModal}
                    >
                        Añadir
                    </Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
                {Object.entries(activeFilters).map(([key, value]) => (
                    value && (
                        <span key={key} className="border border-gray-700 p-2 rounded text-xs text-gray-700 md:text-sm">
                            {key === "search" && `Nombre: ${value}`}
                            {key === "scholarship" && `Beca: ${getScholarshipNameById(value as number)}`}
                            {key === "career" && `Carrera: ${getCareerNameById(value as number)}`}
                        </span>
                    )
                ))}
            </div>
            <div className="flex flex-grow custom-scrollbar overflow-y-auto">
                <TableContainer>
                    <Table stickyHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    onClick={() => handleSort('u.name')}
                                    style={{ cursor: 'pointer' }}
                                    width="40%"
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'u.name' ? (sortDirection === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell 
                                    align="center"
                                    onClick={() => handleSort('u.userstatus_id')}
                                    style={{ cursor: 'pointer' }}
                                    width="30%"
                                >
                                    <div className={`text-gray-700 font-medium md:font-bold text-[17px] md:text-lg ${sortColumn === 'u.userstatus_id' ? (sortDirection === 'ASC' ? 'text-orange-500' : 'text-red-500') : ''}`}>
                                        Estado
                                    </div>
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    width="30%"
                                >
                                    <div className="mr-4 text-gray-700 font-medium md:font-bold text-[17px] md:text-lg">
                                        Acciones
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        {isLoading ? (
                            <TableBody>
                                {Array.from({ length: rowsPerPage }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left" size="small" width="40%">
                                            <div className="flex items-center justify-start">
                                                <Skeleton variant="text" width={300} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" size="small" width="30%">
                                            <div className="flex items-center justify-center">
                                                <Skeleton variant="text" width={200} />
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" size="small" width="30%">
                                            <div className="flex items-center gap-6 mr-5 justify-end">
                                                <Skeleton variant="circular" width={25} height={25} />
                                                <Skeleton variant="circular" width={25} height={25} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            <TableBody>
                                {data && data.scholars && data.scholars.length > 0 ? (
                                    data.scholars.map((row: any) => (
                                        <React.Fragment key={row.id}>
                                            <TableRow 
                                                onClick={() => toggleRowExpansion(row.id)}
                                                className={`cursor-pointer ${expandedRowId === row.id ? 'bg-gradient-to-r from-transparent to-transparent via-gray-100' : ''}`}
                                            >
                                                <TableCell align="left" size="small" width="40%">
                                                    <div className="text-gray-700 font-medium text-[15px] md:text-lg">
                                                        {row.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center" size="small" width="30%">
                                                    <div className={`
                                                        md:max-w-[50%] flex justify-center items-center mx-auto text-center  text-white font-medium text-[15px] md:text-lg py-2 px-2 rounded-3xl
                                                        ${row.userstatus === 'Activo' ? 'bg-green-600' : ''}
                                                        ${row.userstatus === 'Inactivo' ? 'bg-red-500' : ''}
                                                        ${row.userstatus === 'Pendiente' ? 'bg-yellow-500' : ''}
                                                    `}>
                                                        {row.userstatus}
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right" size="small" width="30%">
                                                    <div className="flex flex-row justify-end gap-5 text-gray-700">
                                                        <IconButton color="inherit" onClick={() => handleOpenEditModal(row)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleOpenDeleteModal(row.id, row.name)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            {expandedRowId === row.id && (
                                                <TableRow className="bg-gradient-to-r from-transparent to-transparent via-gray-100">
                                                    <TableCell colSpan={3}>
                                                        <div className="flex flex-col w-full">
                                                            <div className="flex gap-1 text-gray-700 font-medium md:text-[17px]">
                                                                <strong>Beca: </strong>{row.scholarshiptype}
                                                            </div>
                                                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                                <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>DNI: </strong>{row.dni}
                                                                </div>
                                                                <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>Legajo: </strong>{row.file}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                                <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>Carrera: </strong>{row.usercareer}
                                                                </div>
                                                                <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>Año de Cursado: </strong>{row.careerlevel}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                                <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>Email: </strong>{row.email}
                                                                </div>
                                                                <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>Telefono: </strong>{row.phone}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                                <div className="text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>Dirección: </strong>{row.address}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                                                                <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>Fecha de Creación: </strong>
                                                                    {new Date(row.created_at).toLocaleDateString('es-AR', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}
                                                                </div>
                                                                <div className="flex gap-1 md:w-3/6 text-gray-700 font-medium md:text-[17px]">
                                                                    <strong>Fecha de Inhabilitación: </strong>
                                                                    {row.dropped_at ? 
                                                                        new Date(row.dropped_at).toLocaleDateString('es-AR', {
                                                                            year: 'numeric',
                                                                            month: 'long',
                                                                            day: 'numeric'
                                                                        })
                                                                    : ''}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" />
                                    </TableRow>
                                )}
                                {Array.from({ length: rowsPerPage - (data?.scholars?.length || 0) }).map((_, index) => (
                                    <TableRow key={`empty-row-${index}`}>
                                        <TableCell colSpan={3} />
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
            </div>
            <div className="flex justify-end items-end overflow-x-hide">
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={data?.totalScholars || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            <CreateScholarModal
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                usercareers={usercareers}
                scholarships={scholarships}
                laboratory_id={laboratory_id}
            />
            <EditScholarModal
                open={modalOpenEdit}
                handleClose={handleCloseEditModal}
                usercareers={usercareers}
                scholarships={scholarships}
                row={selectedRow!}
            />
            <DeleteScholarModal
                open={modalOpenDelete}
                handleClose={handleCloseDeleteModal}
                id={selectedRowId!}
                name={selectedRowName!}
            />
        </main>
    );
};