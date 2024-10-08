import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation } from '@tanstack/react-query';
import { deactivateTableData } from '@/app/services/admin/usermanagement/scholar.service';
import { useForm } from 'react-hook-form';
import { deleteModalProps } from '@/app/lib/dtos/scholar';
import CircularProgress from '@mui/material/CircularProgress';

export default function DeleteScholarModal({ open, handleClose, id, name }: deleteModalProps) {
    const { handleSubmit } = useForm();
    const mutation = useMutation({
        mutationFn: () => deactivateTableData(id),
        onSuccess: () => {
            handleClose();
        },
        onError: (error: Error) => {
            console.error("Error al crear el ítem:", error);
        }
    });
    const onSubmit = () => {
        mutation.mutate();
    };
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
                    onSubmit: handleSubmit(onSubmit),
                    onClick: handleDialogClick,
                    style: { width: '600px', maxWidth: 'none' }
                }} 
            >
                <div className='flex flex-col m-2'>
                    <DialogTitle>
                        <div className='text-gray-700 items-center font-medium text-2xl md:text-3xl mb-2'>
                            ¿Desactivar la cuenta de {name}?
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className='flex flex-col w-full pt-4 gap-4'>
                            <div className='text-gray-700 font-medium text-xl mb-2'>
                                Esto inhabilitará la cuenta del becario, ¿Esta seguro?
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className='flex flex-row m-3'>
                            <div className='flex flex-row justify-center gap-4'>
                                <Button variant="contained"  color="error" disableElevation endIcon={<CloseIcon />} onClick={handleClose}>CANCELAR</Button>
                                <Button variant="contained"  color="success" disableElevation endIcon={mutation.isPending ? <CircularProgress color="warning" size={26}/> : <DeleteForeverIcon />} type="submit" disabled={mutation.isPending}>DESHABILITAR</Button>
                            </div>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
    );
};