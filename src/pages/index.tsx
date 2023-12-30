import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react';
import { getTasks } from '@ahnafya/utils';

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {

  const [tasks, setTasks] = React.useState<any[]>([])
  const [total, setTotal] = React.useState<number>(0)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks.tasks)
        setTotal(tasks.count)
        console.log('Tasks:', tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

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
              <div key={index} className={`rounded-lg ${x.completed ? "bg-[green]" : " bg-[blue]"} hover:bg-black duration-300 hover:scale-95 cursor-pointer p-4`}>
                <p>{x.task}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}
