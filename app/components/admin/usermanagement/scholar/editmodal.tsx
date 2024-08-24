"use client"

import React, { FormEvent, useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Scolarshiptype, Usercareer, GetScholar } from '@/app/lib/definitions';
import { Alert, MenuItem } from '@mui/material';

interface EditModalProps {
    open: boolean;
    handleClose: () => void;
    usercareers: Usercareer[];
    scholarships: Scolarshiptype[];
    row: GetScholar;
}

export default function EditScholarModal({ open, handleClose, row, usercareers, scholarships }: EditModalProps) {
    
    const [error, setError] = useState("");

    // Resetea el error cuando el modal se cierra
    useEffect(() => {
        if (!open) {
            setError("");
        }
    }, [open]);

    const [userCareer, setUserCareer] = useState<number | ''>('');
    const [scholarship, setScholarship] = useState<number | ''>('');
    const [careerLevel, setCareerLevel] = useState<number | ''>('');
    const [userName, setUserName] = useState<string | ''>('');
    const [userDni, setUserDni] = useState<string | ''>('');
    const [userFile, setUserFile] = useState<string | ''>('');
    const [userAddress, setUserAddress] = useState<string | ''>('');
    const [userPhone, setUserPhone] = useState<string | ''>('');

    useEffect(() => {
        if (row) {
            setCareerLevel(row.careerlevel ?? '');
            setScholarship(row.scholarshiptype_id ?? '');
            setUserCareer(row.usercareer_id ?? '');
            setUserName(row.name ?? '');
            setUserDni(row.dni ?? '');
            setUserFile(row.file ?? '');
            setUserAddress(row.address ?? '');
            setUserPhone(row.phone ?? '');
        }
    }, [row]);

    const handleCareerLevelChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCareerLevel(event.target.value as number | '');
    };
    const handleScholarshipChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setScholarship(event.target.value as number | '');
    };
    const handleUserCareerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUserCareer(event.target.value as number | '');
    };
    const handleUserNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUserName(event.target.value as string | '');
    };
    const handleUserDniChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUserDni(event.target.value as string | '');
    };
    const handleUserFileChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUserFile(event.target.value as string | '');
    };
    const handleUserAddressChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUserAddress(event.target.value as string | '');
    };
    const handleUserPhoneChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUserPhone(event.target.value as string | '');
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get("name") as string;
            const file = formData.get("file") as string;
            const dni = formData.get("dni") as string;
            const careerstring = formData.get("career");
            const careerlevelstring = formData.get("careerlevel");
            const address = formData.get("address") as string;
            const phone = formData.get("phone") as string;
            const scholarshipstring = formData.get("scholarship"); 

            const id = row.id as number;
            const scholarshiptype_id = scholarshipstring ? parseInt(scholarshipstring as string, 10) : undefined;
            const usercareer_id = careerstring ? parseInt(careerstring as string, 10) : undefined;
            const careerlevel = careerlevelstring ? parseInt(careerlevelstring as string, 10) : undefined;

            const response = await fetch("/api/admin/usermanagement/scholar", {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    name,
                    file,
                    dni,
                    address,
                    phone,
                    careerlevel,
                    scholarshiptype_id,
                    usercareer_id,
                })
            })

            if (response.status === 200) {
                handleClose();
            } else {
                const result = await response.json();
                setError(result.error || "Error desconocido");
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
                        handleClose(); //solo cierra si la rason no es un click en el fondo
                    }
                }}
                PaperProps={{ 
                    component: 'form',
                    onSubmit: handleSubmit,
                    onClick: handleDialogClick //que no lo cieren clicks adentro del modal
                }} 
            >
                <div className='flex flex-col m-2 md:w-[500px]'>
                    <DialogTitle>
                        <div className='text-gray-700 items-center font-medium text-2xl md:text-3xl mb-2'>
                            Editar Becario con ID {row?.id}: {row?.name}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                    <div className='flex flex-col w-full items-center justify-center pt-4 gap-4'>
                        <div className='flex w-full'>
                            <TextField id="name" name="name" label="Nombre y Apellido" helperText="Ingrese Nombre y Apellido" type="text" variant="outlined" color="warning" fullWidth required value={userName} onChange={handleUserNameChange}/>
                        </div>
                        <div className='md:flex md:gap-4 w-full'>
                            <div className='flex w-full mb-4 md:mb-0 md:w-4/5'>
                                <TextField id="dni" name="dni" label="DNI" helperText="Ingrese DNI" type="text" variant="outlined" color="warning" fullWidth required value={userDni} onChange={handleUserDniChange}/>
                            </div>                    
                            <div className='flex w-full md:w-2/6'>
                                <TextField id="file" name="file" label="Legajo" helperText="Ingrese Legajo" type="text" variant="outlined" color="warning" fullWidth required value={userFile} onChange={handleUserFileChange}/>
                            </div>
                        </div>
                        <div className='md:flex md:gap-4 w-full'>
                            <div className='flex w-full mb-4 md:mb-0 md:w-4/5'>
                                <TextField id="career" name="career" label="Carrera" helperText="Seleccionar Carrera" type="text" variant="outlined" color="warning" select fullWidth required value={userCareer} onChange={handleUserCareerChange}>
                                    {usercareers.map(usercareer => (
                                        <MenuItem key={usercareer.id} value={usercareer.id}>{usercareer.name}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='flex w-full md:w-2/6'>
                                <TextField id="careerlevel" name="careerlevel" label="Año" helperText="Año de Cursado" type="text" variant="outlined" color="warning" select fullWidth required value={careerLevel} onChange={handleCareerLevelChange}>
                                    <MenuItem key={1} value={1}>Primero</MenuItem>
                                    <MenuItem key={2} value={2}>Segundo</MenuItem>
                                    <MenuItem key={3} value={3}>Tercero</MenuItem>
                                    <MenuItem key={4} value={4}>Cuarto</MenuItem>
                                    <MenuItem key={5} value={5}>Quinto</MenuItem>
                                    <MenuItem key={6} value={6}>Sexto</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <TextField id="scholarship" name="scholarship" label="Beca" helperText="Selecciona la Beca Correspondiente" type="text" variant="outlined" color="warning" select fullWidth required value={scholarship} onChange={handleScholarshipChange}> 
                                {scholarships.map(scholarship => (
                                    <MenuItem key={scholarship.id} value={scholarship.id}>{scholarship.name}</MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className='flex w-full'>
                            <TextField id="address" name="address" label="Dirección" helperText="Ingrese Dirección" type="text" variant="outlined" color="warning" fullWidth required value={userAddress} onChange={handleUserAddressChange}/>
                        </div>
                        <div className='flex w-full'>
                            <TextField id="phone" name="phone" label="Teléfono" helperText="Ingrese Teléfono" type="text" variant="outlined" color="warning" fullWidth required value={userPhone} onChange={handleUserPhoneChange}/>
                        </div>
                        {error && <Alert severity="error">{error}</Alert>}
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