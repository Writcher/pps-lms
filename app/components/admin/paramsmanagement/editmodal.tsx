import React, { FormEvent } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

interface EditModalProps {
    open: boolean;
    handleClose: () => void;
    table: string;
    id: number;
    name: string;
}

export default function EditModal({ open, handleClose, table, id, name }: EditModalProps) {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name") as string;

            const response = await fetch("/api/admin/paramsmanagement", {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    id,
                    table
                })
            })

            if (response.status === 200) {
                handleClose();
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Error desconocido, la cagaste");
            }
        }
    };

    //evita que se cierre si sse clickea el background
    const handleDialogClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
            <Dialog 
                open={open} 
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
                maxWidth={false}
                fullWidth
                PaperProps={{ 
                    component: 'form',
                    onSubmit: handleSubmit,
                    onClick: handleDialogClick,
                    style: { width: '600px', maxWidth: 'none' }
                }} 
            >
                <div className='flex flex-col m-2'>
                    <DialogTitle>
                        <div className='text-gray-700 items-center font-medium text-2xl md:text-3xl mb-2'>
                            Editar  
                            {(() => {
                                switch (table) {
                                    case "supplytype":
                                        return " Tipo de Insumo ";
                                    case "projecttype":
                                        return " Tipo de Proyecto ";
                                    case "supplystatus":
                                        return " Estado de Insumo ";
                                    case "projectstatus":
                                        return " Estado de Proyecto ";
                                    case "scholarshiptype":
                                        return " Tipo de Beca ";
                                    case "grade":
                                        return " Calificación ";
                                    default:
                                        return "";
                                }
                            })()}
                            con ID {id}: {name}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                            <TextField id="name" name="name" label="Nombre" helperText="Nombre de Nuevo Tipo" type="text" variant="outlined" color="warning" fullWidth required/>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='flex flex-row m-4 hidden md:block'>
                            <div className='flex flex-row gap-4'>
                                <Button variant="contained" size="large" color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                                <Button variant="contained" size="large" color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                            </div>
                        </div>
                        <div className='flex flex-row m-3 block md:hidden'>
                            <div className='flex flex-row justify-center gap-1'>
                                <Button variant="contained"  color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                                <Button variant="contained"  color="success" disableElevation endIcon={<SaveIcon />} type="submit">GUARDAR</Button>
                            </div>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
    );
}