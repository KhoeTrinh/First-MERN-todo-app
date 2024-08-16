import { useState } from 'react';
import {
    useCreateTodotypeMutation,
    useUpdateTodotypeMutation,
    useDeleteTodotypeMutation,
    useFetchTodotypesQuery,
} from '../../redux/api/todotypesSlice';
import TodotypeForm from '../../components/TodotypeForm';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

const Todotypes = () => {
    const { data: todotypes, refetch } = useFetchTodotypesQuery();

    const [name, setName] = useState('');
    const [selectedTodotype, setSelectedTodotype] = useState('');
    const [updatingName, setUpdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState('');

    const [createTodotype] = useCreateTodotypeMutation();
    const [updateTodotype] = useUpdateTodotypeMutation();
    const [deleteTodotype] = useDeleteTodotypeMutation();

    const handleCreateTodotype = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error('Please enter a Todotype name');
            return;
        }
        try {
            const result = await createTodotype({ name }).unwrap();
            if (result.error) {
                toast.error(result.error);
                return;
            } else {
                setName('');
                refetch();
                toast.success('Todotype created successfully');
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || err.message);
        }
    };

    const handleUpdateTodotype = async (e) => {
        e.preventDefault();

        if (!updatingName) {
            toast.error('Please enter a Todotype name');
            return;
        }

        try {
            const result = await updateTodotype({
                data: { name: updatingName },
                id: selectedTodotype._id,
            }).unwrap();
            if (result.error) {
                toast.error(result.error);
                return;
            } else {
                refetch();
                setModalVisible(false);
                setSelectedTodotype(null);
                setUpdatingName('');
                toast.success('Todotype updated successfully');
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || err.message);
        }
    };

    const handleDeleteTodotype = async (e) => {
        e.preventDefault();

        try {
            const result = await deleteTodotype(selectedTodotype._id);
            if (result.error) {
                toast.error(result.error);
                return;
            } else {
                refetch();
                setModalVisible(false);
                setSelectedTodotype(null);
                toast.success('Todotype deleted successfully');
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || err.message);
        }
    };

    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>
            <div className='md:w-3/4 p-3'>
                <div className='h-12'>Manage Todotypes</div>
                <TodotypeForm
                    value={name}
                    setValue={setName}
                    handleSubmit={handleCreateTodotype}
                />
                <br />
                <hr />
                <div className='flex flex-wrap'>
                    {todotypes?.map((todotype) => (
                        <div key={todotype._id}>
                            <button
                                className='bg-white border border-cyan-500 text-cyan-500 py-2 px-4 rounded-lg m-3 hover:bg-cyan-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50'
                                onClick={() => {
                                    setModalVisible(true);
                                    setSelectedTodotype(todotype);
                                    setUpdatingName(todotype.name);
                                }}
                            >
                                {todotype.name}
                            </button>
                        </div>
                    ))}
                </div>

                <Modal
                    isOpen={modalVisible}
                    onClose={() => setModalVisible(false)}
                >
                    <TodotypeForm
                        value={updatingName}
                        setValue={setUpdatingName}
                        handleSubmit={handleUpdateTodotype}
                        buttonText='Update'
                        handleDelete={handleDeleteTodotype}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default Todotypes;
