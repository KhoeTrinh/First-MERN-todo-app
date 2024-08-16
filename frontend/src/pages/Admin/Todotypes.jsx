import { useState } from 'react';
import {
    useCreateTodotypeMutation,
    useUpdateTodotypeMutation,
    useDeleteTodotypeMutation,
    useFetchTodotypesQuery,
} from '../../redux/api/todotypesSlice';
import todotypeForm from '../../components/todotypeForm';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const Todotypes = () => {
    const { data: todotypes } = useFetchTodotypesQuery();

    const [name, setName] = useState('');
    const [selectedTodotype, setSelectedTodotype] = useState('');
    const [updatingName, setUpdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState('');

    return <div>Todotypes</div>;
};

export default Todotypes;
