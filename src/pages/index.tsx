import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react';
import { deleteTask, getTasks } from '@ahnafya/utils';

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {

  const [tasks, setTasks] = React.useState<any[]>([])
  const [total, setTotal] = React.useState<number>(0)
  const [success, setSuccess] = React.useState<string>('')


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

  return (
    <>
      <Head>
        <title>ToDo | Home</title>
      </Head>
      <main className={`min-h-screen bg-white ${inter.className}`}>

        <header className='bg-[blue] text-white p-5 w-full'>
          <div className='max-w-5xl mx-auto w-full flex gap-4 items-center'>
            <code>Todo App Ahnafya</code>
            <code>{total}</code>
          </div>
        </header>

        <div className='max-w-5xl mx-auto w-full p-4'>
          <div className='grid gap-4 items-center w-full'>
            {tasks?.map((x: any, index: number) => (
              <div key={index} className={`rounded-lg flex justify-between gap-2 ${x.completed ? "bg-[green]" : " bg-[blue]"} hover:bg-black duration-300 hover:scale-95 cursor-pointer p-4`}>
                <div>
                  <p>{index + 1}. {x.task}</p>
                  <p>{index + 1}. {x.task}</p>
                </div>
                <div className='flex gap-2 items-end'>
                  <button className='bg-sky-600 px-3 py-1 rounded-md ring-1 ring-white'>Edit</button>
                  <button className='bg-[red] px-3 py-1 rounded-md ring-1 ring-white'
                    onClick={() => handleDelete(x.id)}
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}
