"use client"

import { projectScholarFormData, projectScholarTableProps } from "@/app/lib/dtos/scholar";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React from "react";
import AddScholarModal from "./addscholarmodal";
import RemoveScholarModal from "./removescholarmodal";

export default function ProjectScholarTable({ project_id, laboratory_id, scholars, refetch }: projectScholarTableProps) {
    const { watch, setValue } = useForm<projectScholarFormData>({
        defaultValues: {
            //modals
            modalOpenCreate: false,
            modalOpenDelete: false,
            //selected row
            selectedRowId: '',
            selectedRowName: "",
            //expanded row
            expandedRowId: null,
        }
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
    let scholar_ids: number[];
    if (scholars) {
        scholar_ids = scholars.map(scholar => scholar.id);
    } else {
        scholar_ids = [];
    };
        //selected row
    const selectedRowId = watch("selectedRowId");
    const selectedRowName = watch("selectedRowName");
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
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row gap-4">
                <div className='flex text-gray-700 items-center justify-center font-bold text-xl md:text-2xl mb-2'>
                    Becarios Asignados
                </div>
                <div className="flex grow" />
                <div className="flex mr-2">
                    <Button variant="contained" color="success" disableElevation endIcon={<AddIcon/>} onClick={handleOpenCreateModal}>AÑADIR</Button>
                </div>
            </div>
            <div className="flex flex-grow h-full w-full overflow-y-auto custom-scrollbar pr-2">
                <TableContainer>
                    <Table stickyHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    width="40%"
                                >
                                    <div className="text-gray-700 font-medium md:font-bold text-[17px] md:text-lg">
                                        Nombre
                                    </div>
                                </TableCell>
                                <TableCell 
                                    align="center"
                                    width="30%"
                                >
                                    <div className="text-gray-700 font-medium md:font-bold text-[17px] md:text-lg">
                                        Legajo
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
                        <TableBody>
                            {scholars && scholars.length > 0 ? (
                                scholars.map(row => (
                                    <React.Fragment key={row.id}>
                                        <TableRow 
                                            onClick={() => toggleRowExpansion(row.id)}
                                            className={`cursor-pointer ${expandedRowId === row.id ? 'bg-gradient-to-r from-transparent to-transparent via-gray-200' : ''}`}
                                        >
                                            <TableCell align="left" size="small" width="40%">
                                                <div className="text-gray-700 font-medium text-[15px] md:text-[17px]">
                                                    {row.name}
                                                </div>
                                            </TableCell>
                                            <TableCell align="center" size="small" width="30%">
                                                <div className="text-gray-700 font-medium text-[15px] md:text-[17px]">
                                                    {row.file}
                                                </div>
                                            </TableCell>
                                            <TableCell align="right" size="small" width="30%">
                                                <div className="flex flex-row justify-end gap-5 text-gray-700 mr-8">
                                                    <IconButton color="error" onClick={() => handleOpenDeleteModal(row.id, row.name)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        {expandedRowId === row.id && (
                                            <TableRow className="bg-gradient-to-r from-transparent to-transparent via-gray-200">
                                                <TableCell colSpan={3} size="small">
                                                    <div className="flex flex-col w-full">
                                                        <div className="flex gap-1 text-gray-700 font-medium md:text-[17px]">
                                                            <strong>Email: </strong>{row.email}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <div className="text-gray-700 font-medium text-[15px] md:text-[17px]">
                                            No hay becarios asignados
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <AddScholarModal
                open={modalOpenCreate}
                handleClose={handleCloseCreateModal}
                laboratory_id={laboratory_id}
                project_id={project_id}
                scholar_ids={scholar_ids}
            />
            <RemoveScholarModal
                open={modalOpenDelete}
                handleClose={handleCloseDeleteModal}
                project_id={project_id}
                scholar_id={selectedRowId as number}
                scholarname={selectedRowName}
            />
        </div>
    );
};