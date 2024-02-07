import { CreateTodoScreen } from 'app/features/todo/create-todo-screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <CreateTodoScreen />
    </>
  )
}
