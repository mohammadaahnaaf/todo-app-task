import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react';
import { deleteTask, formattedDateTime, getTasks } from '@ahnafya/utils';
import { Modal } from '@ahnafya/components';

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {

  const [tasks, setTasks] = React.useState<any[]>([])
  const [total, setTotal] = React.useState<number>(0)
  const [success, setSuccess] = React.useState<string>('')
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  // Get All Tasks
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksq = await getTasks();
        setTasks(tasksq.tasks)
        setTotal(tasksq.count)
        console.log('Tasks:', tasksq);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [success]);

  // Delete Task
  async function handleDelete(id: string) {
    try {
      const resp = await deleteTask(id);
      setSuccess('Task Deleted')
      setTimeout(() => {
        setSuccess('')
      }, 2000)
      console.log('Tasks:', resp);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Update Task 
  function handleEdit() {

  }

  const editmodal = (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className='text-[blue]'>
        Edit here
      </div>
    </Modal>
  )

  return (
    <>
      <Head>
        <title>ToDo | Home</title>
      </Head>
      <main className={`min-h-screen bg-white ${inter.className}`}>

        {editmodal}
        <header className='bg-[blue] text-white p-5 w-full'>
          <div className='max-w-5xl mx-auto w-full flex gap-4 items-center'>
            <code>Todo App Ahnafya</code>
            <code>{total}</code>
          </div>
        </header>

        <div className='max-w-5xl mx-auto w-full p-4'>
          <div className='grid gap-4 items-center w-full'>
            {tasks?.map((x: any, index: number) => (
              <div key={index} className={`rounded-lg flex justify-between gap-2 ${x.completed ? "bg-[green]" : " bg-[blue]"} hover:bg-black duration-300 cursor-pointer p-4`}>
                <div className='w-full'>
                  <p className='text-lg'>{index + 1}. {x.task}</p>
                  <p className='text-sm text-right w-full'>{formattedDateTime(x.completed_at)}
                  </p>
                </div>
                <div className='flex gap-2 items-end'>
                  <button className='bg-sky-600 p-2 rounded-full ring-1 ring-white'
                    onClick={openModal}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>

                  <button className='bg-[red] p-2 rounded-full ring-1 ring-white'
                    onClick={() => handleDelete(x.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}
