export type fetchedObservations = {
    id: number;
    content: string;
    created_at: Date;
};

export type projectObservationTableProps = {
    scholar_ids: number[];
    project_id: number;
};

export type projectObservationFormData = {
    loadMoreDisabled: boolean;
    observations: fetchedObservations[];
    modalOpenCreate: boolean;
    page: number;
};

export type createProjectObservationModalProps = {
    scholar_ids: number[];
    open: boolean;
    handleClose: () => void;
    project_id: number;
};

export type createProjectObservationFormData = {
    content: string;
};

export type createProjectObservationData = {
    scholar_ids: number[];
    content: string;
    project_id: number;
};

export type createProjectObservationQuery = createProjectObservationData;

export type deleteObservationData = {
    id: number
};

export type  deleteObservationQuery = deleteObservationData;

export type taskObservationTableProps = {
    task_id: number;
    project_id: number;
};

export type taskObservationFormData = projectObservationFormData;

export type createTaskObservationModalProps = {
    open: boolean;
    handleClose: () => void;
    project_id: number;
    task_id: number;
};

export type createTaskObservationFormData = {
    content: string;
};

export type createTaskObservationData = {
    content: string;
    project_id: number;
    task_id: number;
};

export type createTaskObservationQuery = createTaskObservationData;