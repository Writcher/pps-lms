export type fetchedObservations = {
    id: number;
    content: string;
    created_at: Date;
};

export type projectObservationTableProps = {
    project_id: number;
};

export type projectObservationFormData = {
    loadMoreDisabled: boolean;
    observations: fetchedObservations[];
    modalOpenCreate: boolean;
    page: number;
};

export type createProjectObservationModalProps = {
    open: boolean;
    handleClose: () => void;
    project_id: number;
};

export type createProjectObservationFormData = {
    content: string;
};

export type createProjectObservationData = {
    content: string;
    project_id: number;
};

export type createProjectObservationQuery = createProjectObservationData;

export type deleteObservationData = {
    id: number
};

export type  deleteObservationQuery = deleteObservationData;